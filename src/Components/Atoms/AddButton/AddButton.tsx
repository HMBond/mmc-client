import { MouseEvent } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useStateContext } from '../../../context';

type ViewProps = {
  onClick: (event: MouseEvent) => void;
};

function AddButton({ onClick }: ViewProps) {
  const { state } = useStateContext();

  if (state.editMode) {
    return (
      <Fab onClick={onClick}>
        <AddIcon />
      </Fab>
    );
  } else return null;
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
