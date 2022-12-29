import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { ChangeEvent, useState } from 'react';
import { Dialog } from '../..';

type SaveDialogProps = {
  inputValue?: string;
  onSubmit: (value: string) => void;
  open: boolean;
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void;
};

function SaveDialog(props: SaveDialogProps) {
  const { inputValue, onSubmit, open, onClose } = props;
  const [value, setValue] = useState(inputValue || '');

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
      title="Save setup"
      onSubmit={handleSubmit}
      aria-describedby="specify a filename to save setup"
    >
      <TextField
        autoFocus
        margin="dense"
        label="File name"
        fullWidth
        variant={'outlined'}
        value={value}
        onChange={handleChange}
      />
    </Dialog>
  );
}

SaveDialog.propTypes = {
  inputValue: PropTypes.string,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

export default SaveDialog;
