import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../ContextProviders/UserContextProvider';
import './View.css';

function View({ children, id, backgroundColor }) {
  const { activeView } = useContext(UserContext);
  function allowDrop(even) {
    even.preventDefault();
  }

  function handleOnDrop(event) {
    event.preventDefault();
  }

  return (
    <div
      style={{ backgroundColor }}
      className="view"
      onDrop={handleOnDrop}
      onDragOver={allowDrop}
      active={(id === activeView).toString()}
    >
      {children}
    </div>
  );
}

View.propTypes = {
  id: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default View;
