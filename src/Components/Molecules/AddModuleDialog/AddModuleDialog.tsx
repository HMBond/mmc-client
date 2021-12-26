import PropTypes from 'prop-types';
import { ModuleType } from '../../../types/modules';
import AddModuleDialogBase, { BaseProps } from './AddModuleDialogBase';
import AddButtonModuleDialog from './AddButtonModuleDialog';
import AddSliderModuleDialog from './AddSliderModuleDialog';

AddModuleDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

type Props = {
  type: ModuleType;
};

function AddModuleDialog(props: BaseProps & Props) {
  const { type } = props;
  switch (type) {
    case 'Button':
      return <AddButtonModuleDialog {...props} />;
      break;
    case 'Slider':
      return <AddSliderModuleDialog {...props} />;
      break;
    case 'Settings':
      return (
        <AddModuleDialogBase
          {...props}
          title="New Settings"
        ></AddModuleDialogBase>
      );
      break;

    default:
      throw Error('AddModuleDialog: Chosen type is not implemented yet');
      break;
  }
  return null;
}

export default AddModuleDialog;
