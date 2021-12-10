import React, { useContext, useRef } from 'react';
import { UserContext } from '../../../context';
import './Placer.css';

function Placer({ children, id }) {
  const { arrangement, setArrangement } = useContext(UserContext);
  const placerData = arrangement.placers.get(id);
  const placerRef = useRef(null);
  let startPosition;

  function handleOnDragStart(event) {
    event.dataTransfer.setData('text/plain', null);
    if (event.altKey) {
      event.dataTransfer.effectAllowed = 'copyMove';
      // insert new copy of this placer at newPosition at handleOndragEnd
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
    const newPlacerData = { ...placerData, position: newPosition };
    setArrangement({
      ...arrangement,
      placers: arrangement.placers.set(id, newPlacerData),
    });
  }

  const placerPositionStyle = {
    left: placerData?.position.x,
    top: placerData?.position.y,
  };

  return (
    <div
      className="placer"
      style={placerPositionStyle}
      draggable={arrangement.editMode}
      onDragStart={handleOnDragStart}
      onDragEndCapture={handleOnDragEnd}
      ref={placerRef}
    >
      {children}
    </div>
  );
}

export default Placer;
