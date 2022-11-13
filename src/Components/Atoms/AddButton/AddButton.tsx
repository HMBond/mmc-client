import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { MouseEvent } from 'react';
import { useStateContext } from '../../contextProviders/context';

type ViewProps = {
  onClick: (event: MouseEvent) => void;
};

function AddButton({ onClick }: ViewProps) {
  const [state] = useStateContext();

  if (state.editMode) {
    return (
      <button className="fab" onClick={onClick}>
        <AddIcon />
      </button>
    );
  } else return null;
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
