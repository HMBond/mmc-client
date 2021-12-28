import { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Dialog } from '../..';

ViewDialog.propTypes = {
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

function ViewDialog({ onSubmit, open, onClose }: Props) {
  const [label, setLabel] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function handleSubmit() {
    onSubmit(label);
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
        value={label}
        onChange={handleChange}
      />
    </Dialog>
  );
}

export default ViewDialog;
