import React from 'react';
import PropTypes from 'prop-types';
import './View.css';

type ViewProps = {
  children: React.ReactNode;
  backgroundColor: string;
};

function View({ children, backgroundColor }: ViewProps) {
  function allowDrop(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent) {
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  backgroundColor: PropTypes.string,
};

export default View;
