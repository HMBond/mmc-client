import { useState, ChangeEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Dialog } from '../..';
import { ModuleInterface } from '../../../types/modules';
import { FormControl } from '@mui/material';

export const basePropTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  module: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
};

ModuleDialogBase.propTypes = basePropTypes;

export type BaseProps = {
  onSubmit: (value: ModuleInterface) => void;
  open: boolean;
  onClose: (
    event: object,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'
  ) => void;
  module: ModuleInterface;
  add?: boolean;
};

type Props = {
  children?: ReactNode;
};

function ModuleDialogBase({
  children,
  onSubmit,
  open,
  onClose,
  module,
  add,
}: Props & BaseProps) {
  const [label, setLabel] = useState(module.label);

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function handleSubmit() {
    onSubmit({ ...module, label });
  }

  const title = `${add ? 'New' : 'Edit'} ${module.type}`;
  const submitLabel = add ? 'Add' : 'Save';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={title}
      submitLabel={submitLabel}
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
