import PropTypes from 'prop-types';
import { DragEvent, ReactNode, TouchEvent, useRef } from 'react';
import { ModuleActions } from '../..';
import { useStateContext } from '../../../context';
import { Position } from '../../../types/misc.types';
import { Module, ModuleInterface, ModulePropTypes } from '../../../types/Module.types';
import { toPx } from '../../utils/css';
import { getElements, getNewPosition, overrideCursor } from '../../utils/placer';
import './Placer.css';

Placer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  module: ModulePropTypes,
};

type Props = {
  children: ReactNode;
  module: ModuleInterface;
};

function Placer({ children, module }: Props) {
  const [state, dispatch] = useStateContext();
  const { editMode } = state;
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
    const updated = { ...module, position: touchPosition };
    dispatch({ type: 'UPDATE_MODULE', id: module.id, module: updated });
  }

  function handleDragEnd(event: DragEvent) {
    const position = getNewPosition(event, placerRef, startPosition);
    const {
      dataTransfer: { effectAllowed },
    } = event;
    // workaround event.altKey is always false on end: alt-key on dragstart sets effectAllowed to 'copyMove'
    if (effectAllowed === 'copyMove') {
      const uniqueCopy = new Module({
        ...module,
        position,
      });
      dispatch({ type: 'ADD_MODULE', module: uniqueCopy });
    } else {
      const updated = { ...module, position };
      dispatch({ type: 'UPDATE_MODULE', id: module.id, module: updated });
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
