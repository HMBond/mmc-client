import { DragEvent } from 'react';

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
