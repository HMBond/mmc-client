import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import './Nav.css';

function Nav({ children }) {
  return (
    <AppBar position="static">
      <div className="nav">{children}</div>
    </AppBar>
  );
}

Nav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Nav;
