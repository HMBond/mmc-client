import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import { FormEvent, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import './Dialog.css';

function Dialog({
  children,
  onSubmit,
  open,
  onClose,
  title,
  text,
  actions,
  submitIcon = 'Save',
  ...restProps
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleBackdropClick(e: globalThis.MouseEvent) {
    const target = e.target as HTMLDialogElement;
    if (target.tagName !== 'DIALOG') {
      //This prevents issues with forms
      return;
    }

    const rect = target.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!clickedInDialog) {
      console.log('close');
      onClose(e, 'backdropClick');
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleBackdropClick);
    return () => {
      document.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  useEffect(() => {
    if (dialogRef.current?.hasAttribute('open')) {
      !open && dialogRef.current?.close();
    } else {
      open && dialogRef.current?.showModal();
    }
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!open) return;
    onSubmit && onSubmit();
  }

  function handleCloseClick(event: MouseEvent) {
    onClose(event, 'closeClick');
  }

  return (
    <dialog aria-label={title} {...restProps} ref={dialogRef}>
      <form onSubmit={handleSubmit} method="dialog">
        <h2>{title}</h2>
        <div>
          {text && <p>{text}</p>}
          {children}
        </div>
        <div className="dialog__actions">
          <div className="dialog__left-actions">{actions}</div>
          {onSubmit ? (
            <button type="submit" className="fab">
              {submitIcon === 'Add' && <AddIcon />}
              {submitIcon === 'Save' && <SaveIcon />}
            </button>
          ) : (
            <button className="fab" onClick={handleCloseClick}>
              <CloseIcon />
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitIcon: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

type DialogProps = {
  children?: ReactNode;
  onSubmit?: () => void;
  open: boolean;
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void;
  title: string;
  text?: string;
  actions?: ReactNode;
  submitIcon?: string;
  [prop: string]: unknown;
};

export default Dialog;
