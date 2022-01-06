import { DragEvent, RefObject } from 'react';
import { Position } from '../../../types/types';

export function overrideCursor(event: DragEvent) {
  if (!event || !event.dataTransfer) {
    console.error('No DragEvent passed to overrideCursor');
    return;
  }
  const dataTransfer: DataTransfer = event.dataTransfer;
  if (event.altKey) {
    dataTransfer.effectAllowed = 'copyMove';
  } else {
    dataTransfer.effectAllowed = 'move';
  }
}

/** Converts number into string with 'px' appended.
 * For example 123 becomes "123px"
 */
export function toPx(value: number): string {
  return value.toString() + 'px';
}

export function getElements(reference: RefObject<HTMLDivElement>): {
  current: HTMLDivElement;
  parent: HTMLElement;
} {
  if (reference == null) {
    throw new Error('reference is not set...');
  }
  const current = reference.current;
  if (!current) {
    throw new Error('reference has no dom element (current)');
  }
  const parent = current.parentElement;
  if (!parent) {
    throw new Error('referenced element has no parentElement');
  }
  return { current, parent };
}

export function getNewPosition(
  event: DragEvent<Element>,
  placerRef: RefObject<HTMLDivElement>,
  startPosition: Position
): Position {
  const { current } = getElements(placerRef);
  const distance = {
    x: event.clientX - startPosition.x,
    y: event.clientY - startPosition.y,
  };
  const newPosition = {
    x: current.offsetLeft + distance.x,
    y: current.offsetTop + distance.y,
  };
  return newPosition;
}
