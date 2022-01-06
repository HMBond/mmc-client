import { useContext, useRef, DragEvent, TouchEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ModuleActions, UserContext } from '../..';
import { getElements, overrideCursor, toPx, getNewPosition } from './Placer_helpers';
import { Module, ModuleInterface } from '../../../types/modules';
import { Position } from '../../../types/types';
import './Placer.css';

Placer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
  const { editMode, activeView, addModule, updateModule } = useContext(UserContext) || {};
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
    const newPosition = getNewPosition(event, placerRef, startPosition);
    const {
      dataTransfer: { effectAllowed },
    } = event;
    // alt-key on dragstart sets effectAllowed to 'copyMove'
    if (effectAllowed === 'copyMove' && activeView !== undefined) {
      // create copy with new id
      let newModule = new Module({
        label: module.label,
        position: newPosition,
        type: module.type,
      });
      newModule = { ...module, ...newModule };
      addModule && addModule(activeView, newModule);
    } else {
      const newModule = { ...module, position: newPosition };
      updateModule && updateModule(module.id, newModule);
    }
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
