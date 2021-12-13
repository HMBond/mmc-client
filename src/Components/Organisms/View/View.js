import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';

function View({ children, backgroundColor }) {
  function allowDrop(even) {
    even.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
  }

  return (
    <div
      style={{ backgroundColor }}
      className="view"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      {children}
    </div>
  );
}

View.propTypes = {
  backgroundColor: PropTypes.string,
};

export default View;
