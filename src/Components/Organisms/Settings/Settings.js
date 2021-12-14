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

function Settings({ restartMidi }) {
  const {
    editMode,
    setEditMode,
    invertTheme,
    showEditButton,
    setShowEditButton,
    setInvertTheme,
    saveUserContextAs,
    fileName,
    setFileName,
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleSwitchThemeMode(event, checked) {
    setInvertTheme(checked);
  }

  function handleShowEditButtonChange() {
    setShowEditButton(!showEditButton);
  }

  function handleEditClick() {
    setEditMode(!editMode);
  }

  function handleSaveClick() {
    setSaveDialogOpen(true);
  }

  function handleSave(fileName) {
    saveUserContextAs(fileName);
    setFileName(fileName);
  }

  return (
    <div className="settings">
      {showEditButton && (
        <Fab
          color="info"
          aria-label="edit"
          size="large"
          edge="start"
          onClick={handleEditClick}
        >
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </Fab>
      )}
      <Fab
        color="info"
        aria-label="settings"
        size="large"
        edge="start"
        onClick={handleSaveClick}
      >
        <SaveAsIcon />
      </Fab>
      <Fab
        color="info"
        aria-label="settings button"
        size="large"
        edge="start"
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
        <div className="settings__modal-content" open={open}>
          <Card>
            <CardContent sx={{ display: 'grid', gap: 3, width: '20rem' }}>
              <FormControlLabel
                control={<Switch />}
                checked={showEditButton}
                onChange={handleShowEditButtonChange}
                label="Show edit button"
              />
              <FormControlLabel
                control={<Switch />}
                checked={invertTheme}
                onChange={handleSwitchThemeMode}
                label="Perform in light mode"
              />
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
        title="Save file"
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
