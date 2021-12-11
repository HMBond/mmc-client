import React, { useContext, useRef } from 'react';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import './Module.css';

function Module({ children, id }) {
  const { modules, setModules, editMode } = useContext(UserContext);
  const moduleData = modules.get(id);
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
    // todo: if(event.altKey) insert new copy of this placer at newPosition
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: distance.x + moduleRef.current.offsetLeft,
      y: distance.y + moduleRef.current.offsetTop,
    };
    const newModuleData = { position: newPosition };
    setModules(new Map(modules.set(id, newModuleData)));
  }

  function handleDeleteClick(event) {
    modules.delete(id);
    setModules(new Map(modules));
  }

  const modulePositionStyle = {
    left: moduleData?.position.x,
    top: moduleData?.position.y,
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
        <Fab color="secondary" size="small" aria-label="delete">
          <DeleteIcon onClick={handleDeleteClick} />
        </Fab>
      </div>
    </div>
  );
}

export default Module;
