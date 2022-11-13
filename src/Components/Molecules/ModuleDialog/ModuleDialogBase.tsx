import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { ChangeEvent, ReactNode, useState } from 'react';
import { Dialog } from '../..';
import { ModuleInterface, ModulePropTypes } from '../../../types/Module.types';

export const basePropTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  module: ModulePropTypes.isRequired,
};

ModuleDialogBase.propTypes = basePropTypes;

export type BaseProps = {
  onSubmit: (value: ModuleInterface) => void;
  open: boolean;
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void;
  module: ModuleInterface;
  add?: boolean;
};

type Props = {
  children?: ReactNode;
};

function ModuleDialogBase({ children, onSubmit, open, onClose, module, add }: Props & BaseProps) {
  const [label, setLabel] = useState(module.label);

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function handleSubmit() {
    onSubmit({ ...module, label });
  }

  const title = `${add ? 'New' : 'Edit'} ${module.type}`;
  const submitIcon = add ? 'Add' : 'Save';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={title}
      submitIcon={submitIcon}
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

export default ModuleDialogBase;
