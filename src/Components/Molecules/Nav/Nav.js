import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Nav.css';

function Nav({ children, theme }) {
  return (
    <AppBar position="static">
      <div className="nav">{children}</div>
    </AppBar>
  );
}

export default Nav;
