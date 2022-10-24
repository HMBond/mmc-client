export function handleUploadFileChanged(
  event: Event,
  onLoad: (event: ProgressEvent<FileReader>) => void
) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const reader = new FileReader();
    reader.onload = onLoad;
    const firstFile = getFirstFile(event);
    reader.readAsText(firstFile);
  } else {
    throw new Error('No File APIs supported');
  }
}

function getFirstFile(event: Event): Blob {
  if (event === null || event.target == null) {
    throw new Error('Event target (input with type="file") does not exist');
  }
  const files = (event.target as HTMLInputElement).files;
  if (!files || !files[0]) {
    throw new Error('No files were given with the event');
  }
  const firstFile = files[0];
  if (!firstFile.type.match('application/json')) {
    throw new Error('File is not a json');
  }
  return firstFile;
}
