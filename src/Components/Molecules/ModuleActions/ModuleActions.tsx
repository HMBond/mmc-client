import { CSSProperties, useState } from 'react';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Module, ModuleInterface, ModulePropTypes } from '../../../types/modules';
import { useStateContext } from '../../../context';
import { ModuleDialog } from '../..';
import './ModuleActions.css';

ModuleActions.propTypes = {
  module: ModulePropTypes.isRequired,
};

type Props = {
  module: ModuleInterface;
};

function ModuleActions({ module }: Props) {
  const { dispatch } = useStateContext();
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleEditDialogSubmit(module: Module) {
    dispatch({ type: 'UPDATE_MODULE', id: module.id, module });
    setShowEditDialog(false);
  }

  function handleDeleteClick() {
    dispatch({ type: 'DELETE_MODULE', id: module.id });
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
