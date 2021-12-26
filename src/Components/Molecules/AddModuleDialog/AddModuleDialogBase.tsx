import { useState, ChangeEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Dialog } from '../..';
import { Module } from '../../../types/Module';
import { FormControl } from '@mui/material';

export type BaseProps = {
  onSubmit: (value: Module) => void;
  open: boolean;
  onClose: (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'
  ) => void;
};

type Props = {
  children?: ReactNode;
  title: string;
};

function AddModuleDialogBase({
  children,
  title,
  onSubmit,
  open,
  onClose,
}: Props & BaseProps) {
  const [label, setLabel] = useState('');

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function handleSubmit() {
    onSubmit(
      new Module({
        label,
        position: {
          x: 0.75 * window.innerWidth,
          y: 0.15 * window.innerHeight,
        },
      })
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={title}
      submitLabel="Add"
    >
      <FormControl component="fieldset" fullWidth>
        <TextField
          autoFocus
          margin="dense"
          label="Label"
          fullWidth
          variant="standard"
          value={label}
          onChange={handleLabelChange}
        />
      </FormControl>
      {children}
    </Dialog>
  );
}

AddModuleDialogBase.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddModuleDialogBase;
