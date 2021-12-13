export function overrideCursor(event) {
  if (event.altKey) {
    event.dataTransfer.effectAllowed = 'copyMove';
  } else {
    event.dataTransfer.effectAllowed = 'move';
  }
}
