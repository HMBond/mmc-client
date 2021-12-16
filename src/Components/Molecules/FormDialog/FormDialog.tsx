import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type FormDialogProps = {
  children?: React.ReactNode;
  inputValue: string;
  onSuccess: Function;
  open: boolean;
  onClose: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  title: string;
  label: string;
  text?: string;
  successLabel: string;
};

function FormDialog({
  children,
  inputValue,
  onSuccess,
  open,
  onClose,
  title,
  label,
  text,
  successLabel,
}: FormDialogProps) {
  const [value, setValue] = useState(inputValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleCancelClick(event: React.MouseEvent) {
    onClose(event, 'cancelClick');
  }

  function handleSuccess() {
    onSuccess(value);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
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
        <Button onClick={handleSuccess}>{successLabel}</Button>
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
  onSuccess: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.string,
  successLabel: PropTypes.string,
};

export default FormDialog;
