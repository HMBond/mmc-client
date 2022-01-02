import { useContext, useRef, DragEvent, TouchEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ModuleActions, UserContext } from '../..';
import { getElements, overrideCursor, toPx } from './Placer_helpers';
import { ModuleInterface } from '../../../types/modules';
import { Position } from '../../../types/types';
import './Placer.css';

Placer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  module: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
};

type Props = {
  children: ReactNode;
  module: ModuleInterface;
};

function Placer({ children, module }: Props) {
  const { updateModule, editMode } = useContext(UserContext) || {};
  const placerRef = useRef<HTMLDivElement>(null);
  let startPosition: Position;
  let touchPosition: Position = { x: 0, y: 0 };

  function handleDragStart(event: DragEvent) {
    overrideCursor(event);
    startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleTouchStart(event: TouchEvent) {
    if (!editMode) return;
    touchPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchMove(event: TouchEvent) {
    if (!editMode) return;
    if (event.touches.length === 0) return;
    const { current, parent } = getElements(placerRef);
    touchPosition = {
      x: event.touches[0].clientX - parent.getBoundingClientRect().left,
      y: event.touches[0].clientY - parent.getBoundingClientRect().top,
    };

    current.style.left = toPx(touchPosition.x);
    current.style.top = toPx(touchPosition.y);
  }

  function handleTouchEnd() {
    if (!editMode) return;
    if (touchPosition === module.position) return;
    const newModule = { ...module, position: touchPosition };
    updateModule && updateModule(module.id, newModule);
  }

  function handleDragEnd(event: DragEvent) {
    // TODO: if(event.altKey) insert new copy of this placer at newPosition
    const { current } = getElements(placerRef);
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: current.offsetLeft + distance.x,
      y: current.offsetTop + distance.y,
    };
    const newModule = { ...module, position: newPosition };
    updateModule && updateModule(newModule.id, newModule);
  }

  const style = {
    left: module.position.x,
    top: module.position.y,
  };

  return (
    <div
      className="placer"
      style={style}
      draggable={editMode}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onDragEndCapture={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={placerRef}
    >
      {children}
      <ModuleActions module={module} />
    </div>
  );
}

export default Placer;
