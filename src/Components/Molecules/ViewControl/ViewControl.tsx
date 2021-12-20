import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AddButton, FormDialog, UserContext } from '../..';
import './ViewControl.css';
import { View } from '../../../Types/View';

function ViewControl() {
  const { addView, views, activeView, setActiveView, editMode } =
    useContext(UserContext)!;

  const [newViewDialogOpen, setNewViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: View) {
    setActiveView(view);
  }

  function handleAddModuleClick() {
    setNewViewDialogOpen(true);
  }

  function handleAddClick(label: string) {
    const newView = new View({ label, backgroundColor: '#002745', views });
    addView(newView);
    setNewViewDialogOpen(false);
  }

  function handleClose() {
    setNewViewDialogOpen(false);
  }

  return (
    <div className="view-control">
      {views.map((view) => {
        return (
          <Button
            disableElevation
            color={activeView.id === view.id ? 'warning' : 'secondary'}
            variant="contained"
            onClick={() => handleViewButtonClick(view)}
            key={view.id}
          >
            {view.label}
          </Button>
        );
      })}
      {editMode && <AddButton onClick={handleAddModuleClick} />}
      <FormDialog
        title="New view"
        successLabel="Add"
        label="Name"
        onSuccess={handleAddClick}
        open={newViewDialogOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default ViewControl;
