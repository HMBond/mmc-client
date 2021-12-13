import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { UserContext } from '../../';
import './ViewControl.css';

function ViewControl() {
  const { views, activeView, setActiveView } = useContext(UserContext);

  function handleViewButtonClick(view) {
    setActiveView(view);
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
    </div>
  );
}

export default ViewControl;
