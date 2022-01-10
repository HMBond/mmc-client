import { Button } from '@mui/material';
import { useState } from 'react';
import { AddButton, ViewActions, ViewDialog } from '../..';
import { useStateContext } from '../../../context';
import { View } from '../../../types/View.types';
import './ViewControl.css';

function ViewControl() {
  const { state, dispatch } = useStateContext();

  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: View) {
    dispatch({ type: 'SET_ACTIVE_VIEW_ID', value: view.id });
  }

  function handleAddClick() {
    setViewDialogOpen(true);
  }

  function handleSubmit(view: View) {
    dispatch({ type: 'ADD_VIEW', view });
    setViewDialogOpen(false);
  }

  function handleClose() {
    setViewDialogOpen(false);
  }

  const { views, editMode, activeViewId } = state;

  return (
    <div className="view-control">
      {views &&
        views.map((view) => {
          return (
            <div className="viewControl__button-wrapper" key={view.id}>
              <Button
                disableElevation
                color={activeViewId === view.id ? 'warning' : 'secondary'}
                variant="contained"
                onClick={() => handleViewButtonClick(view)}
              >
                {view.label}
              </Button>
              {editMode && <ViewActions view={view} />}
            </div>
          );
        })}
      {editMode && <AddButton onClick={handleAddClick} />}
      <ViewDialog
        open={viewDialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        add
        view={new View({}, views.length || 0)}
      />
    </div>
  );
}

export default ViewControl;
