import ModuleDialogBase, { BaseProps, basePropTypes } from './ModuleDialogBase';
import ButtonModuleDialog from './ButtonModuleDialog';
import SliderModuleDialog from './SliderModuleDialog';

ModuleDialog.propTypes = basePropTypes;

function ModuleDialog(props: BaseProps) {
  const { type } = props.module;
  switch (type) {
    case 'Button':
      return <ButtonModuleDialog {...props} />;
      break;
    case 'Slider':
      return <SliderModuleDialog {...props} />;
      break;
    case 'Settings':
      return <ModuleDialogBase {...props}></ModuleDialogBase>;
      break;

    default:
      throw new Error('ModuleDialog: Chosen type is not implemented yet');
      break;
  }
  return null;
}

export default ModuleDialog;
