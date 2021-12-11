import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { UserContext } from '../../';
import './ViewControl.css';

function ViewControl() {
  const { views, activeView, setActiveView } = useContext(UserContext);

  function handleViewButtonClick(id) {
    setActiveView(id);
  }

  return (
    <div className="view-control">
      {[...views].map(([id, label]) => {
        return (
          <Button
            disableElevation={activeView === id}
            color={activeView === id ? 'warning' : 'primary'}
            variant="contained"
            onClick={() => handleViewButtonClick(id)}
            key={id}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default ViewControl;
