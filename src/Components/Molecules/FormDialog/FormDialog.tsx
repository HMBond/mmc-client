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
  setOpen: Function;
  title: string;
  label: string;
  successLabel: string;
};

function FormDialog({
  children,
  inputValue,
  onSuccess,
  open,
  setOpen,
  title,
  label,
  successLabel,
}: FormDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(inputValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSuccess() {
    onSuccess(value);
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={label}
          fullWidth
          variant={'outlined'}
          value={value}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
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
