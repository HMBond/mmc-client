import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SettingsIcon from '@mui/icons-material/Settings';
import { FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { Dialog, MidiSettings, SaveDialog } from '../..';
import { useStateContext, useThemeContext } from '../../contextProviders/context';
import Actions from './Actions';
import './Settings.css';

type SettingsProps = { restartMidi: () => Promise<any> };

function Settings({ restartMidi }: SettingsProps) {
  const [theme, dispatchThemeAction] = useThemeContext();
  const [state, dispatch] = useStateContext();
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleThemeModeToggle(event: React.ChangeEvent, checked: boolean) {
    dispatchThemeAction({ type: 'SET_MODE', mode: checked ? 'light' : 'dark' });
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

  function handleSaveDialogClose() {
    setSaveDialogOpen(false);
  }

  function handleSave(fileName: string) {
    dispatch({ type: 'SAVE_STATE_AS', fileName });
    setSaveDialogOpen(false);
  }

  const { leftHanded, showEditButton, editMode, fileName } = state;

  return (
    <div className={`settings__controls ${leftHanded ? 'row-reversed' : ''}`}>
      {showEditButton && (
        <button className={'fab'} aria-label="edit" onClick={handleEditButtonClick}>
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </button>
      )}
      <button className={'fab'} aria-label="settings" onClick={handleOpenClick}>
        <SettingsIcon />
      </button>
      <Dialog
        title="Settings"
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="settings"
        aria-describedby="global and midi settings"
        actions={Actions({ restartMidi, setOpen, setSaveDialogOpen })}
      >
        <div className="settings__general">
          <FormControlLabel
            control={<Switch checked={showEditButton} onChange={handleShowEditButtonChange} />}
            label="Edit button"
          />
          <FormControlLabel
            control={<Switch checked={theme.mode === 'light'} onChange={handleThemeModeToggle} />}
            label="Light mode"
          />
          <FormControlLabel
            control={<Switch checked={leftHanded} onChange={handleLeftHandedChange} />}
            label="Right to left"
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
