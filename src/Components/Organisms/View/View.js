import React from 'react';
import './View.css';

const View = ({ children }) => {
  function allowDrop(even) {
    even.preventDefault();
  }

  function handleOnDrop(event) {
    event.preventDefault();
  }

  return (
    <div className="view" onDrop={handleOnDrop} onDragOver={allowDrop}>
      {children}
    </div>
  );
};

export default View;
