import { MouseEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './Dialog.css';

type DialogProps = {
  children?: ReactNode;
  onSubmit?: () => void;
  open: boolean;
  onClose: (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'
  ) => void;
  title: string;
  text?: string;
  actions?: ReactNode;
  submitLabel?: string;
  dividers?: boolean;
  [prop: string]: unknown;
};

function Dialog(props: DialogProps) {
  const {
    children,
    onSubmit,
    open,
    onClose,
    title,
    text,
    actions,
    submitLabel = 'OK',
    dividers,
    ...restProps
  } = props;

  function handleCloseClick(event: MouseEvent) {
    onClose(event, 'closeClick');
  }

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      {...restProps}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={dividers} className="dialog__content">
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <div className="dialog__left-actions">{actions}</div>
        <Button onClick={handleCloseClick}>Close</Button>
        {onSubmit && <Button onClick={onSubmit}>{submitLabel}</Button>}
      </DialogActions>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  actions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dividers: PropTypes.bool,
};

export default Dialog;
