import React, { useContext } from 'react';
import { UserContext } from '../../';
import { ViewControl } from '../../';
import './Nav.css';

function Nav({ children }) {
  const { views, setActiveView } = useContext(UserContext);

  function handleViewButtonClick(id) {
    setActiveView(id);
  }

  return (
    <nav>
      <ViewControl views={views} onClick={handleViewButtonClick} />
      {children}
    </nav>
  );
}

export default Nav;
