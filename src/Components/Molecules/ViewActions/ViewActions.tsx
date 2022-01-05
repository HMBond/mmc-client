import { useContext, CSSProperties, useState } from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { UserContext, ViewDialog } from '../..';
import { View } from '../../../models/view';
import './ViewActions.css';

ViewActions.propTypes = {
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
  view: View;
};

function ViewActions({ view }: Props) {
  const { deleteView, updateView, moveView } = useContext(UserContext) || {};
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleLeftClick() {
    moveView && moveView(view.id, view.place - 1);
  }

  function handleRightClick() {
    moveView && moveView(view.id, view.place + 1);
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleEditDialogSubmit(updated: View) {
    updateView && updateView(view.id, updated);
    setShowEditDialog(false);
  }

  function handleDelete() {
    deleteView && deleteView(view.id);
  }

  return (
    <div className="view-actions">
      <Fab
        style={{ '--order': 0 } as CSSProperties}
        className="view-actions__button view-actions__button--edit"
        color="primary"
        size="small"
        aria-label="delete"
        onClick={handleEditClick}
      >
        <EditIcon />
      </Fab>
      <Fab
        style={{ '--order': 1 } as CSSProperties}
        className="view-actions__button view-actions__button--left"
        color="secondary"
        size="small"
        aria-label="move view left"
        onClick={handleLeftClick}
      >
        <ArrowLeft />
      </Fab>
      <Fab
        style={{ '--order': 1 } as CSSProperties}
        className="view-actions__button view-actions__button--right"
        color="secondary"
        size="small"
        aria-label="move view right"
        onClick={handleRightClick}
      >
        <ArrowRight />
      </Fab>
      <ViewDialog
        open={showEditDialog}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
        onDelete={handleDelete}
        view={view}
      />
    </div>
  );
}

export default ViewActions;
