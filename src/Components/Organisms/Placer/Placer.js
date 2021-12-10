import React, { useContext, useRef } from 'react';
import { UserContext } from '../../Organisms/ContextProviders/UserContextProvider';
import './Placer.css';

function Placer({ children, id }) {
  const { placers, setPlacers, editMode } = useContext(UserContext);
  const placerData = placers.get(id);
  const placerRef = useRef(null);
  let startPosition;

  function handleOnDragStart(event) {
    event.dataTransfer.setData('text/plain', null);
    if (event.altKey) {
      event.dataTransfer.effectAllowed = 'copyMove';
      // todo: insert new copy of this placer at newPosition at handleOndragEnd
    } else {
      event.dataTransfer.effectAllowed = 'move';
    }
    startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleOnDragEnd(event) {
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: distance.x + placerRef.current.offsetLeft,
      y: distance.y + placerRef.current.offsetTop,
    };
    const newPlacerData = { position: newPosition };
    setPlacers(new Map(placers.set(id, newPlacerData)));
  }

  const placerPositionStyle = {
    left: placerData?.position.x,
    top: placerData?.position.y,
  };

  return (
    <div
      className="placer"
      style={placerPositionStyle}
      draggable={editMode}
      onDragStart={handleOnDragStart}
      onDragEndCapture={handleOnDragEnd}
      ref={placerRef}
    >
      {children}
    </div>
  );
}

export default Placer;
