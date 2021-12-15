import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../..';

type ViewProps = {
  onClick: React.MouseEventHandler;
};

function AddModuleButton({ onClick }: ViewProps) {
  const { editMode, leftHanded } = useContext(UserContext)!;

  if (editMode) {
    return (
      <Fab
        onClick={onClick}
        sx={{ m: '1rem', float: leftHanded ? 'none' : 'right' }}
      >
        <AddIcon />
      </Fab>
    );
  } else return null;
}

AddModuleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddModuleButton;
