import { DragEvent, RefObject } from 'react';

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
    throw Error('reference is not set...');
  }
  const current = reference.current;
  if (!current) {
    throw Error('reference has no dom element (current)');
  }
  const parent = current.parentElement;
  if (!parent) {
    throw Error('referenced element has no parentElement');
  }
  return { current, parent };
}
