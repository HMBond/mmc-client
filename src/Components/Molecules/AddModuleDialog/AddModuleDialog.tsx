import PropTypes from 'prop-types';
import { ModuleType } from '../../../types/Module';
import AddModuleDialogBase, { BaseProps } from './AddModuleDialogBase';
import AddButtonDialog from './AddButtonDialog';
import AddSliderDialog from './AddSliderDialog';

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
      return <AddButtonDialog {...props} />;
      break;
    case 'Slider':
      return <AddSliderDialog {...props} />;
      break;
    case 'Settings':
      return (
        <AddModuleDialogBase
          {...props}
          title="Add Settings Module"
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
