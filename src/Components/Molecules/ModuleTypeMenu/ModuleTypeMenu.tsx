import PropTypes from 'prop-types';
import { ModuleType, moduleTypes } from '../../../types/Module.types';
import './ModuleTypeMenu.css';

ModuleTypeMenu.propTypes = {
  handleModuleChoice: PropTypes.func.isRequired,
};

type ModuleTypeMenuProps = {
  handleModuleChoice: (type: ModuleType) => void;
};

function ModuleTypeMenu({ handleModuleChoice }: ModuleTypeMenuProps) {
  return (
    <div className="module-type-menu" aria-label="Choose a module type">
      {moduleTypes.map((type) => (
        <button color={'info'} key={type} onClick={() => handleModuleChoice(type)}>
          {type}
        </button>
      ))}
    </div>
  );
}

export default ModuleTypeMenu;
