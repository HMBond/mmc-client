import React, { useContext, useRef, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import './Module.css';

function Module({ children, id, current }) {
  const { modules, setModules, editMode } = useContext(UserContext);
  const module = modules.get(id);
  const moduleRef = useRef(null);
  let startPosition;

  function handleOnDragStart(event) {
    overrideCursor(event);
    startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function overrideCursor(event) {
    if (event.altKey) {
      event.dataTransfer.effectAllowed = 'copyMove';
    } else {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  function handleOnDragEnd(event) {
    // TODO: if(event.altKey) insert new copy of this placer at newPosition
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: distance.x + moduleRef.current.offsetLeft,
      y: distance.y + moduleRef.current.offsetTop,
    };
    const module = { position: newPosition };
    setModules(new Map(modules.set(id, module)));
  }

  function handleOnDeleteClick(event) {
    modules.delete(id);
    setModules(new Map(modules));
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
      onDragStart={handleOnDragStart}
      onDragEndCapture={handleOnDragEnd}
      ref={moduleRef}
    >
      {children}
      <div className="module__controls">
        <Fab
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={handleOnDeleteClick}
        >
          <DeleteIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Module;
