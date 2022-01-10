import { Button, ButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { ModuleType, moduleTypes } from '../../../types/Module.types';

ModuleTypeMenu.propTypes = {
  handleModuleChoice: PropTypes.func.isRequired,
};

type ModuleTypeMenuProps = {
  handleModuleChoice: (type: ModuleType) => void;
};

function ModuleTypeMenu({ handleModuleChoice }: ModuleTypeMenuProps) {
  return (
    <ButtonGroup orientation="vertical" aria-label="vertical button group" variant="contained">
      {moduleTypes.map((type) => (
        <Button key={type} onClick={() => handleModuleChoice(type)}>
          {type}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ModuleTypeMenu;
