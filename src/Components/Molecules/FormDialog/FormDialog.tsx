import { useState, MouseEvent, ChangeEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type FormDialogProps = {
  children?: ReactNode;
  inputValue?: string;
  onSubmit: (value: string) => void;
  open: boolean;
  onClose: (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  title: string;
  label: string;
  text?: string;
  submitLabel: string;
};

function FormDialog({
  children,
  inputValue,
  onSubmit,
  open,
  onClose,
  title,
  label,
  text,
  submitLabel = 'OK',
}: FormDialogProps) {
  const [value, setValue] = useState(inputValue || '');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleCancelClick(event: MouseEvent) {
    onClose(event, 'cancelClick');
  }

  function handleSubmit() {
    onSubmit(value);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth keepMounted>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        <TextField
          autoFocus
          margin="dense"
          label={label}
          fullWidth
          variant={'outlined'}
          value={value}
          onChange={handleChange}
        />
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button onClick={handleSubmit}>{submitLabel}</Button>
      </DialogActions>
    </Dialog>
  );
}

FormDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  inputValue: PropTypes.string,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.string,
  submitLabel: PropTypes.string,
};

export default FormDialog;
