import { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Dialog } from '../..';

AddViewDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

type Props = {
  onSubmit: (value: string) => void;
  open: boolean;
  onClose: (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'
  ) => void;
};

function AddViewDialog({ onSubmit, open, onClose }: Props) {
  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    onSubmit(value);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="New view"
      submitLabel="Add"
    >
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        fullWidth
        variant={'standard'}
        value={value}
        onChange={handleChange}
      />
    </Dialog>
  );
}

export default AddViewDialog;
