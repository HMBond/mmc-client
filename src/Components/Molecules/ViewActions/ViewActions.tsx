import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { ViewDialog } from '../..';
import { View, ViewPropTypes } from '../../../types/View.types';
import { useStateContext } from '../../contextProviders/context';
import './ViewActions.css';

ViewActions.propTypes = {
  view: ViewPropTypes.isRequired,
};

type Props = {
  view: View;
};

function ViewActions({ view }: Props) {
  const [state, dispatch] = useStateContext();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const viewIndex = state.views.indexOf(view);

  function handleEditClick() {
    setEditDialogOpen(true);
  }

  function handleLeftClick() {
    dispatch({ type: 'MOVE_VIEW', view, toIndex: viewIndex - 1 });
  }

  function handleRightClick() {
    dispatch({ type: 'MOVE_VIEW', view, toIndex: viewIndex + 1 });
  }

  function handleEditDialogClose() {
    setEditDialogOpen(false);
  }

  function handleEditDialogSubmit(updated: View) {
    dispatch({ type: 'UPDATE_VIEW', id: view.id, view: updated });
    setEditDialogOpen(false);
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_VIEW', id: view.id });
  }

  return (
    <>
      <div className="view-actions">
        <Fab
          style={{ '--order': 0 } as CSSProperties}
          className="view-actions__button view-actions__button--edit"
          color="primary"
          size="small"
          aria-label="edit"
          onClick={handleEditClick}
        >
          <EditIcon />
        </Fab>
        {viewIndex > 0 && (
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
        )}
        {viewIndex !== state.views.length - 1 && (
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
        )}
      </div>
      <ViewDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
        onDelete={state.views.length > 1 ? handleDelete : undefined}
        view={view}
      />
    </>
  );
}

export default ViewActions;
