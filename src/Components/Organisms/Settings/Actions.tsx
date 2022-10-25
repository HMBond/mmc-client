import { Fullscreen, FullscreenExit, Share } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useStateContext } from '../../../context';
import { handleUploadFileChanged } from '../../utils/file';

function Actions({ restartMidi, setOpen, setSaveDialogOpen }: ActionsProps) {
  const [, dispatch] = useStateContext();
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);

  function handleSaveClick() {
    setOpen(false);
    setSaveDialogOpen(true);
  }

  function handleUploadClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => handleUploadFileChanged(event, onFileLoad);
    input.click();
  }

  async function toggleFullScreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    }
    setFullscreen(!!document.fullscreenElement);
  }

  function handleShare() {
    dispatch({ type: 'SHARE' });
  }

  function onFileLoad(event: ProgressEvent<FileReader>) {
    if (!event?.target?.result) {
      throw new Error('Could not read results from file');
    }
    dispatch({ type: 'SET_STATE', state: JSON.parse(event.target.result as string) });
  }

  function handleClearLocalStorage() {
    // TODO: Show 'Are you sure? Cancel / OK' dialog
    dispatch({ type: 'CLEAR_LOCAL_STORAGE' });
  }

  return (
    <>
      <Button aria-label="save" onClick={handleSaveClick}>
        <FileDownloadIcon />
      </Button>
      <Button aria-label="load" onClick={handleUploadClick}>
        <FileUploadIcon />
      </Button>
      <Button aria-label="restart midi" color="warning" onClick={async () => await restartMidi()}>
        <SettingsInputSvideoIcon />
      </Button>
      <Button aria-label="reset setup" color="warning" onClick={handleClearLocalStorage}>
        <DeleteIcon />
      </Button>
      <Button aria-label="share setup" onClick={handleShare}>
        {<Share />}
      </Button>
      <Button aria-label="fullscreen" onClick={toggleFullScreen}>
        {fullscreen ? <FullscreenExit /> : <Fullscreen />}
      </Button>
    </>
  );
}

export default Actions;

type ActionsProps = {
  restartMidi: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSaveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
