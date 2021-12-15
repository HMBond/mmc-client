import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { UserContext } from '../..';
import './Nav.css';

type NavProps = {
  children: React.ReactNode;
};

function Nav({ children }: NavProps) {
  const { leftHanded } = useContext(UserContext)!;
  return (
    <AppBar position="static">
      <div className={`nav ${leftHanded ? 'row-reversed' : ''}`}>
        {children}
      </div>
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
