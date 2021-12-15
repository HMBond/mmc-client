import React, { useContext, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fab from '@mui/material/Fab';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { UserContext, MidiSettings, FormDialog } from '../..';
import './Settings.css';

type SettingsProps = { restartMidi: Function };

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

  function handleThemeModeToggle(event: React.ChangeEvent, checked: boolean) {
    setInvertTheme(checked);
  }

  function handleLeftHandedChange() {
    setLeftHanded(!leftHanded);
  }

  function handleShowEditButtonChange() {
    setShowEditButton(!showEditButton);
    setEditMode(false);
  }

  function handleEditClick() {
    setEditMode(!editMode);
  }

  function handleSaveClick() {
    setSaveDialogOpen(true);
  }

  function handleSave(fileName: string) {
    saveUserContextAs(fileName);
    setFileName(fileName);
  }

  function handleClearLocalStorage() {
    // TODO: Show 'Are you sure? Cancel / OK' dialog
    clearLocalStorage();
  }

  return (
    <div className="settings">
      {showEditButton && (
        <Fab
          color="default"
          aria-label="edit"
          size="large"
          onClick={handleEditClick}
        >
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </Fab>
      )}
      {editMode && (
        <Fab
          color="default"
          aria-label="settings"
          size="large"
          onClick={handleSaveClick}
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
      <Modal
        keepMounted
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="settings"
        aria-describedby="global and midi settings"
      >
        <div className="settings__modal-content">
          <Card>
            <CardContent sx={{ display: 'grid', gap: 3, width: '20rem' }}>
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
              <Button variant="contained" onClick={handleClearLocalStorage}>
                Clear All
              </Button>
              <MidiSettings restartMidi={restartMidi} />
            </CardContent>
            <CardActions>
              <Button onClick={handleCloseClick} sx={{ ml: 'auto' }}>
                Close
              </Button>
            </CardActions>
          </Card>
        </div>
      </Modal>
      <FormDialog
        title="Save setup"
        label="File name"
        successLabel="Save"
        inputValue={fileName}
        onSuccess={handleSave}
        open={saveDialogOpen}
        setOpen={setSaveDialogOpen}
      />
    </div>
  );
}

export default Settings;
