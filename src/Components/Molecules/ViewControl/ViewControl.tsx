import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AddButton, AddViewDialog, UserContext } from '../..';
import './ViewControl.css';
import { View } from '../../../types/View';

function ViewControl() {
  const { addView, views, activeView, setActiveView, editMode } =
    useContext(UserContext) || {};

  const [newViewDialogOpen, setNewViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: View) {
    setActiveView && setActiveView(view);
  }

  function handleAddModuleClick() {
    setNewViewDialogOpen(true);
  }

  function handleAddClick(label: string) {
    if (!views) {
      throw Error('Can not add view, while there are no views existing');
      return;
    }
    const newView = new View({
      label,
      backgroundColor: '#002745',
      currentViewCount: views.length,
    });
    addView && addView(newView);
    setNewViewDialogOpen(false);
  }

  function handleClose() {
    setNewViewDialogOpen(false);
  }

  return (
    <div className="view-control">
      {views &&
        views.map((view) => {
          return (
            <Button
              disableElevation
              color={activeView?.id === view.id ? 'warning' : 'secondary'}
              variant="contained"
              onClick={() => handleViewButtonClick(view)}
              key={view.id}
            >
              {view.label}
            </Button>
          );
        })}
      {editMode && <AddButton onClick={handleAddModuleClick} />}
      <AddViewDialog
        onSubmit={handleAddClick}
        open={newViewDialogOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default ViewControl;
