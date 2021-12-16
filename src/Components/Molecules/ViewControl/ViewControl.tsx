import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { AddButton, FormDialog, UserContext } from '../..';
import './ViewControl.css';
import { ViewModel } from '../../Organisms/View/View_model';

function ViewControl() {
  const { addView, views, activeView, setActiveView, editMode } =
    useContext(UserContext)!;

  const [newViewDialogOpen, setNewViewDialogOpen] = useState(false);

  function handleViewButtonClick(view: ViewModel) {
    setActiveView(view);
  }

  function handleAddModuleClick() {
    setNewViewDialogOpen(true);
  }

  function handleAddClick(label: string) {
    const newView = new ViewModel({ label, backgroundColor: '#002745', views });
    addView(newView, views);
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
        placeholder="Please specify view name..."
        onSuccess={handleAddClick}
        open={newViewDialogOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default ViewControl;
