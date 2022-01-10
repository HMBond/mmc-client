import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import { Button, Fab, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { Dialog, MidiSettings, SaveDialog } from '../..';
import { useStateContext } from '../../../context';
import './Settings.css';

type SettingsProps = { restartMidi: () => Promise<any> };

function Settings({ restartMidi }: SettingsProps) {
  const { state, dispatch } = useStateContext();
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleThemeModeToggle(event: React.ChangeEvent, checked: boolean) {
    dispatch({ type: 'SET_INVERT_THEME', value: checked });
  }

  function handleLeftHandedChange() {
    dispatch({ type: 'SET_LEFT_HANDED', value: !state.leftHanded });
  }

  function handleShowEditButtonChange() {
    dispatch({ type: 'SET_SHOW_EDIT_BUTTON', value: !state.showEditButton });
  }

  function handleEditButtonClick() {
    dispatch({ type: 'SET_EDIT_MODE', value: !state.editMode });
  }

  function handleSaveClick() {
    setOpen(false);
    setSaveDialogOpen(true);
  }

  function handleUploadClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = handleUploadFileChanged;
    input.click();
  }

  function handleUploadFileChanged(event: any) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const reader = new FileReader();
      reader.onload = handleFileLoad;
      const file = event.target.files[0];
      if (!file.type.match('application/json')) {
        throw new Error('File is not a json');
      }
      reader.readAsText(file);
    } else {
      throw new Error('No File APIs supported');
    }
  }

  function handleFileLoad(event: ProgressEvent<FileReader>) {
    if (!event?.target?.result) {
      throw new Error('Could not read results from file');
    }
    dispatch({ type: 'SET_STATE', state: JSON.parse(event.target.result as string) });
  }

  function handleSaveDialogClose() {
    setSaveDialogOpen(false);
  }

  function handleSave(fileName: string) {
    dispatch({ type: 'SAVE_STATE_AS', fileName });
    setSaveDialogOpen(false);
  }

  function handleClearLocalStorage() {
    // TODO: Show 'Are you sure? Cancel / OK' dialog
    dispatch({ type: 'CLEAR_LOCAL_STORAGE' });
  }
  const { leftHanded, showEditButton, editMode, invertTheme, fileName } = state;

  return (
    <div className={`settings__controls ${leftHanded ? 'row-reversed' : ''}`}>
      {showEditButton && (
        <Fab color="default" aria-label="edit" size="large" onClick={handleEditButtonClick}>
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </Fab>
      )}
      <Fab color="default" aria-label="settings button" size="large" onClick={handleOpenClick}>
        <SettingsIcon />
      </Fab>
      <Dialog
        title="Settings"
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="settings"
        aria-describedby="global and midi settings"
        actions={
          <>
            <Button aria-label="save setup" onClick={handleSaveClick}>
              <FileDownloadIcon />
            </Button>
            <Button aria-label="save setup" onClick={handleUploadClick}>
              <FileUploadIcon />
            </Button>
            <Button color="warning" onClick={async () => await restartMidi()}>
              <SettingsInputSvideoIcon />
            </Button>
            <Button color="warning" onClick={handleClearLocalStorage}>
              <DeleteIcon />
            </Button>
          </>
        }
      >
        <div className="settings__general">
          <FormControlLabel
            control={<Switch checked={showEditButton} onChange={handleShowEditButtonChange} />}
            label="Show edit button"
          />
          <FormControlLabel
            control={<Switch checked={invertTheme} onChange={handleThemeModeToggle} />}
            label="Perform in light mode"
          />
          <FormControlLabel
            control={<Switch checked={leftHanded} onChange={handleLeftHandedChange} />}
            label="Left handed"
          />
        </div>
        <MidiSettings />
      </Dialog>
      <SaveDialog
        inputValue={fileName}
        onSubmit={handleSave}
        open={saveDialogOpen}
        onClose={handleSaveDialogClose}
      />
    </div>
  );
}

export default Settings;
