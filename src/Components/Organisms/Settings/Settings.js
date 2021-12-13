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
import { UserContext, MidiSettings } from '../..';
import './Settings.css';

function Settings({ restartMidi }) {
  const { editMode, setEditMode, invertThemeMode, setInvertThemeMode } =
    useContext(UserContext);
  const [open, setOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleSwitchThemeMode(event, checked) {
    setInvertThemeMode(checked);
  }

  function handleEditClick() {
    setEditMode(!editMode);
  }

  return (
    <div className="settings">
      <Fab
        color="info"
        aria-label="menu"
        size="large"
        edge="start"
        sx={{ mr: 2 }}
        onClick={handleEditClick}
      >
        {editMode ? <EditOffIcon /> : <ModeEditIcon />}
      </Fab>
      <Fab
        color="info"
        aria-label="settings button"
        size="large"
        edge="start"
        sx={{ mr: 2 }}
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
                checked={invertThemeMode}
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
    </div>
  );
}

export default Settings;
