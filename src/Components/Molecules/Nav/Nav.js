import React from 'react';
import { ViewControl } from '../../';
import './Nav.css';

function Nav({ children }) {
  return (
    <nav>
      <ViewControl />
      {children}
    </nav>
  );
}

export default Nav;
