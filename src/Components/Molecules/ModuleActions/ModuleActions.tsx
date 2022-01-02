import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import { ModuleInterface } from '../../../types/modules';
import './ModuleActions.css';

ModuleActions.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
};

type Props = {
  module: ModuleInterface;
};

function ModuleActions({ module }: Props) {
  const { deleteModule } = useContext(UserContext) || {};

  function handleDeleteClick() {
    deleteModule && deleteModule(module.id);
  }

  return (
    <div className="module-actions">
      <Fab
        color="secondary"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
}

export default ModuleActions;
