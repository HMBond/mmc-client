import PropTypes from 'prop-types';
import { ModuleType, moduleTypes } from '../../../types/modules';
import { Button, ButtonGroup } from '@mui/material';

ModuleTypeSelector.propTypes = {
  handleModuleChoice: PropTypes.func.isRequired,
};

type ModuleTypeSelectorProps = {
  handleModuleChoice: (type: ModuleType) => void;
};

function ModuleTypeSelector({ handleModuleChoice }: ModuleTypeSelectorProps) {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="vertical button group"
      variant="contained"
    >
      {moduleTypes.map((type) => (
        <Button key={type} onClick={() => handleModuleChoice(type)}>
          {type}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ModuleTypeSelector;
