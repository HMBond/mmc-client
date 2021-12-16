import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../..';

type ViewProps = {
  onClick: React.MouseEventHandler;
};

function AddButton({ onClick }: ViewProps) {
  const { editMode } = useContext(UserContext)!;

  if (editMode) {
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
