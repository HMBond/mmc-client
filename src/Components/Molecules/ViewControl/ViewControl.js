import React from 'react';
import { Button } from '@mui/material';
import './ViewControl.css';

function ViewControl({ views, onClick }) {
  return (
    <div className="view-control">
      {[...views].map(([id, label]) => {
        return (
          <Button variant="contained" onClick={() => onClick(id)} key={id}>
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default ViewControl;
