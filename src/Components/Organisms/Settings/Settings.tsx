import { ChangeEvent, useContext, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, Fab, FormControlLabel, Switch } from '@mui/material';
import { UserContext, MidiSettings, FormDialog, Dialog } from '../..';
import './Settings.css';

type SettingsProps = { restartMidi: () => void };

function Settings({ restartMidi }: SettingsProps) {
  const {
    editMode,
    setEditMode,
    invertTheme,
    setInvertTheme,
    showEditButton,
    setShowEditButton,
    leftHanded,
    setLeftHanded,
    saveUserContextAs,
    fileName,
    setFileName,
    clearLocalStorage,
  } = useContext(UserContext)!;
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleThemeModeToggle(event: ChangeEvent, checked: boolean) {
    setInvertTheme(checked);
  }

  function handleLeftHandedChange() {
    setLeftHanded(!leftHanded);
  }

  function handleShowEditButtonChange() {
    setShowEditButton(!showEditButton);
    setEditMode(false);
  }

  function handleEditButtonClick() {
    setEditMode(!editMode);
  }

  function handleSaveButtonClick() {
    setSaveDialogOpen(true);
  }

  function handleSaveDialogClose() {
    setSaveDialogOpen(false);
  }

  function handleSave(fileName: string) {
    saveUserContextAs(fileName);
    setFileName(fileName);
    setSaveDialogOpen(false);
  }

  function handleClearLocalStorage() {
    // TODO: Show 'Are you sure? Cancel / OK' dialog
    clearLocalStorage();
  }

  return (
    <div className={`settings__controls ${leftHanded ? 'row-reversed' : ''}`}>
      {showEditButton && (
        <Fab
          color="default"
          aria-label="edit"
          size="large"
          onClick={handleEditButtonClick}
        >
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </Fab>
      )}
      {editMode && (
        <Fab
          color="default"
          aria-label="settings"
          size="large"
          onClick={handleSaveButtonClick}
        >
          <SaveAsIcon />
        </Fab>
      )}
      <Fab
        color="default"
        aria-label="settings button"
        size="large"
        onClick={handleOpenClick}
      >
        <SettingsIcon />
      </Fab>
      <Dialog
        title="Settings"
        open={open}
        onClose={handleCloseClick}
        dividers
        aria-labelledby="settings"
        aria-describedby="global and midi settings"
        actions={
          <Button color="warning" onClick={handleClearLocalStorage}>
            Clear All
          </Button>
        }
      >
        <div className="settings__dialog-content">
          <div className={'settings__general'}>
            <FormControlLabel
              control={
                <Switch
                  checked={showEditButton}
                  onChange={handleShowEditButtonChange}
                />
              }
              label="Show edit button"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={invertTheme}
                  onChange={handleThemeModeToggle}
                />
              }
              label="Perform in light mode"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={leftHanded}
                  onChange={handleLeftHandedChange}
                />
              }
              label="Left handed"
            />
          </div>
          <MidiSettings restartMidi={restartMidi} />
        </div>
      </Dialog>
      <FormDialog
        title="Save setup"
        label="File name"
        submitLabel="Save"
        inputValue={fileName}
        onSubmit={handleSave}
        open={saveDialogOpen}
        onClose={handleSaveDialogClose}
      />
    </div>
  );
}

export default Settings;
