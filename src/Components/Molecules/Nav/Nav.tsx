import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import './Nav.css';

type NavProps = {
  children: React.ReactNode;
};

function Nav({ children }: NavProps) {
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
