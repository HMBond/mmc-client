import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AddButton, ViewDialog, UserContext, ViewActions } from '../..';
import { View } from '../../../types/view';
import './ViewControl.css';

function ViewControl() {
  const { addView, views, activeView, setActiveView, editMode } = useContext(UserContext) || {};

  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: View) {
    setActiveView && setActiveView(view);
  }

  function handleAddModuleClick() {
    setViewDialogOpen(true);
  }

  function handleSubmit(view: View) {
    addView && addView(view);
    setViewDialogOpen(false);
  }

  function handleClose() {
    setViewDialogOpen(false);
  }

  return (
    <div className="view-control">
      {views &&
        views.map((view) => {
          return (
            <div className="viewControl__button-wrapper" key={view.id}>
              <Button
                disableElevation
                color={activeView?.id === view.id ? 'warning' : 'secondary'}
                variant="contained"
                onClick={() => handleViewButtonClick(view)}
              >
                {view.label}
              </Button>
              <ViewActions view={view} />
            </div>
          );
        })}
      {editMode && <AddButton onClick={handleAddModuleClick} />}
      <ViewDialog
        open={viewDialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        add
        view={new View({}, views?.length || 0)}
      />
    </div>
  );
}

export default ViewControl;
