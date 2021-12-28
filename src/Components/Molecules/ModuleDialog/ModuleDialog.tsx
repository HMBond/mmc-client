import PropTypes from 'prop-types';
import { ModuleType } from '../../../types/modules';
import ModuleDialogBase, { BaseProps } from './ModuleDialogBase';
import ButtonModuleDialog from './ButtonModuleDialog';
import SliderModuleDialog from './SliderModuleDialog';

ModuleDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

type Props = {
  type: ModuleType;
};

function ModuleDialog(props: BaseProps & Props) {
  const { type } = props;
  switch (type) {
    case 'Button':
      return <ButtonModuleDialog {...props} />;
      break;
    case 'Slider':
      return <SliderModuleDialog {...props} />;
      break;
    case 'Settings':
      return (
        <ModuleDialogBase {...props} title="New Settings"></ModuleDialogBase>
      );
      break;

    default:
      throw Error('ModuleDialog: Chosen type is not implemented yet');
      break;
  }
  return null;
}

export default ModuleDialog;
