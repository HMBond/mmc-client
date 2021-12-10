import React, { useContext } from 'react';
import './Nav.css';
import { UserContext } from '../../Organisms/ContextProviders/UserContextProvider';
import { Button } from '@mui/material';

function Nav({ children }) {
  const { views, setActiveView } = useContext(UserContext);

  function handleViewButtonClick(id) {
    setActiveView(id);
  }

  return (
    <nav>
      <div className="views">
        {[...views].map(([id, label]) => {
          return (
            <Button
              variant="contained"
              onClick={() => handleViewButtonClick(id)}
              key={id}
            >
              {label}
            </Button>
          );
        })}
      </div>
      {children}
    </nav>
  );
}

export default Nav;
