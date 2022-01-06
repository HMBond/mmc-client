import { useContext, CSSProperties, useState } from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModuleDialog, UserContext } from '../..';
import { Module, ModuleInterface } from '../../../types/modules';
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
  const { deleteModule, updateModule } = useContext(UserContext) || {};
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleEditDialogSubmit(updated: Module) {
    updateModule && updateModule(module.id, updated);
    setShowEditDialog(false);
  }

  function handleDeleteClick() {
    deleteModule && deleteModule(module.id);
  }

  return (
    <div className="module-actions">
      <Fab
        style={{ '--order': 0 } as CSSProperties}
        className="module-actions__button"
        color="primary"
        size="small"
        aria-label="delete"
        onClick={handleEditClick}
      >
        <EditIcon />
      </Fab>
      <Fab
        style={{ '--order': 1 } as CSSProperties}
        className="module-actions__button"
        color="secondary"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon />
      </Fab>
      <ModuleDialog
        open={showEditDialog}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
        module={module}
      />
    </div>
  );
}

export default ModuleActions;
