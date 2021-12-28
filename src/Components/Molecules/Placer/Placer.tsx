import { useContext, useRef, DragEvent, TouchEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import { overrideCursor, toPx } from './Placer_helpers';
import { ModuleInterface } from '../../../types/modules';
import { Position } from '../../../types/types';
import './Placer.css';

type PlacerProps = {
  children: ReactNode;
  module: ModuleInterface;
};

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

function Placer({ children, module }: PlacerProps) {
  const { updateModule, deleteModule, editMode } =
    useContext(UserContext) || {};
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
    if (placerRef == null) {
      throw Error('placer reference is not set...');
    }
    if (event.touches.length === 0) return;
    if (!startPosition) return;
    const current = placerRef.current;
    if (!current) {
      throw Error('placerRef has no dom element (current)');
      return;
    }
    const parent = current.parentElement;
    if (!parent) {
      throw Error('placerRef.current has no parentElement');
      return;
    }
    touchPosition = {
      x: event.touches[0].clientX - parent.getBoundingClientRect().left,
      y: event.touches[0].clientY - parent.getBoundingClientRect().top,
    };
    current.style.left = toPx(touchPosition.x);
    current.style.top = toPx(touchPosition.y);
  }

  function handleTouchEnd() {
    if (touchPosition === module.position) return;
    const newModule = { ...module, position: touchPosition };
    updateModule && updateModule(module.id, newModule);
  }

  function handleDragEnd(event: DragEvent) {
    // TODO: if(event.altKey) insert new copy of this placer at newPosition
    if (placerRef == null) {
      throw Error('placerRef is not set...');
      return;
    }
    const current = placerRef.current;
    if (!current) {
      throw Error('placerRef has no dom element (current)');
      return;
    }
    const distance = {
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    };
    const newPosition = {
      x: distance.x + current.offsetLeft,
      y: distance.y + current.offsetTop,
    };
    const newModule = { ...module, position: newPosition };
    updateModule && updateModule(newModule.id, newModule);
  }

  function handleDeleteClick() {
    deleteModule && deleteModule(module.id);
  }

  const modulePositionStyle = {
    left: module.position.x,
    top: module.position.y,
  };

  return (
    <div
      className="placer"
      style={modulePositionStyle}
      draggable={editMode}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onDragEndCapture={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={placerRef}
    >
      {children}
      <div className="placer__controls">
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

export default Placer;
