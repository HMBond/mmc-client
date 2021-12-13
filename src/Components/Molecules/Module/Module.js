import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import { overrideCursor } from './Module_helpers.js';
import './Module.css';

function Module({ children, module }) {
  const { updateModule, deleteModule, editMode } = useContext(UserContext);
  const moduleRef = useRef(null);
  let startPosition;

  function handleDragStart(event) {
    overrideCursor(event);
    startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleDragEnd(event) {
    // TODO: if(event.altKey) insert new copy of this placer at newPosition
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: distance.x + moduleRef.current.offsetLeft,
      y: distance.y + moduleRef.current.offsetTop,
    };
    const newModule = { ...module, position: newPosition };
    updateModule(newModule);
  }

  function handleDeleteClick(event) {
    deleteModule(module);
  }

  const modulePositionStyle = {
    left: module?.position?.x,
    top: module?.position?.y,
  };

  return (
    <div
      className="module"
      style={modulePositionStyle}
      draggable={editMode}
      onDragStart={handleDragStart}
      onDragEndCapture={handleDragEnd}
      ref={moduleRef}
    >
      {children}
      <div className="module__controls">
        <Fab
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </Fab>
      </div>
    </div>
  );
}

Module.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Module;
