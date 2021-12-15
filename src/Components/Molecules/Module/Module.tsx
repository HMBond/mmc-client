import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../..';
import { overrideCursor, toPx } from './Module_helpers';
import { ModuleInterface } from './Module_model';
import './Module.css';

type ModuleProps = {
  children: React.ReactNode;
  module: ModuleInterface;
};

type Position = {
  x: number;
  y: number;
};

function Module({ children, module }: ModuleProps) {
  const { updateModule, deleteModule, editMode } = useContext(UserContext)!;
  const moduleRef = useRef<HTMLDivElement>(null);
  let startPosition: Position, touchMovePosition: Position;

  function handleDragStart(event: React.DragEvent) {
    overrideCursor(event);
    startPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleTouchStart(event: React.TouchEvent) {
    startPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchMove(event: React.TouchEvent) {
    if (moduleRef == null) {
      throw Error('module reference is not set...');
    }
    if (event.touches.length === 0) return;
    if (!startPosition) return;
    const current: HTMLElement = moduleRef.current!;
    const parent: HTMLElement = current.parentElement!;
    const x = event.touches[0].clientX - parent.getBoundingClientRect().left;
    const y = event.touches[0].clientY - parent.getBoundingClientRect().top;
    current.style.left = toPx(x);
    current.style.top = toPx(y);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const newModule = { ...module, position: touchMovePosition };
    updateModule(newModule.id, newModule);
  }

  function handleDragEnd(event: React.DragEvent) {
    // TODO: if(event.altKey) insert new copy of this placer at newPosition
    if (moduleRef == null) {
      throw Error('module reference is not set...');
    } else {
      const distance = {
        x: event.clientX - startPosition.x,
        y: event.clientY - startPosition.y,
      };
      const current: HTMLDivElement = moduleRef.current!;
      const newPosition = {
        x: distance.x + current.offsetLeft,
        y: distance.y + current.offsetTop,
      };
      const newModule = { ...module, position: newPosition };
      updateModule(newModule.id, newModule);
    }
  }

  function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
    deleteModule(module.id);
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
      onTouchStart={handleTouchStart}
      onDragEndCapture={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
