import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AddButton, UserContext } from '../..';
import './ViewControl.css';
import { ViewModel } from '../../Organisms/View/View_model';

function ViewControl() {
  const { addView, views, activeView, setActiveView, editMode } =
    useContext(UserContext)!;

  function handleViewButtonClick(view: ViewModel) {
    setActiveView(view);
  }

  function handleAddModuleClick() {
    const label = 'TBD';
    const newView = new ViewModel({ label, backgroundColor: '#002745', views });
    addView(newView, views);
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
    </div>
  );
}

export default ViewControl;
