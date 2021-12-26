import { ChangeEvent, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AddModuleDialogBase, { BaseProps } from './AddModuleDialogBase';
import { ButtonModule, Module } from '../../../types/modules';
import {
  DEFAULT_VELOCITY,
  MIDI_CHANNELS,
  MIDI_MAX,
  MIDI_MIN,
} from '../../definitions';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { UserContextOrNull } from '../../../types/types';
import { UserContext } from '../..';

AddButtonModuleDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

function AddButtonModuleDialog(props: BaseProps) {
  const { modules } = useContext<UserContextOrNull>(UserContext) || {};

  const getUsedChannels = (): number[] => {
    if (!modules) return [];
    return modules.map((module) => module.channel && module.channel);
  };

  const [channel, setChannel] = useState<number>(1);
  const [note, setNote] = useState<string>('C3');
  const [velocity, setVelocity] = useState<number>(DEFAULT_VELOCITY);

  function handleChannelChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(event.target.value);
    if (!value) {
      throw Error('Channel is not a number or 0');
      return;
    }
    setChannel(value);
  }

  function handleNoteChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    // use validation for note validity, e.g. '#C4' ✅ 'M16' ❌
    setNote(value);
  }

  function handleVelocityChange(event: unknown, value: number | number[]) {
    if (typeof value === 'number') setVelocity(value);
  }

  function handleSubmit(moduleArgs: Module) {
    props.onSubmit(
      new ButtonModule({
        ...moduleArgs,
        channel,
        note,
        velocity,
      })
    );
  }

  return (
    <AddModuleDialogBase {...props} onSubmit={handleSubmit} title="New Button">
      <FormControl component="fieldset" fullWidth>
        <InputLabel variant="standard" htmlFor="module-channel-select">
          Channel
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: 'channel',
            id: 'module-channel-select',
            value: channel,
            onChange: handleChannelChange,
          }}
        >
          {MIDI_CHANNELS.map((channel) => (
            <option
              className={getUsedChannels().includes(channel) ? 'used' : ''}
              key={channel}
              value={channel}
            >
              {channel}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl component="fieldset" fullWidth>
        <TextField
          margin="dense"
          label="Note"
          fullWidth
          variant="standard"
          value={note}
          onChange={handleNoteChange}
        />
      </FormControl>
      <FormControl component="fieldset" fullWidth>
        <Typography variant="body2" gutterBottom>
          Velocity
        </Typography>
        <Slider
          id="slider-velocity-slider"
          size="small"
          orientation="horizontal"
          value={velocity}
          onChange={handleVelocityChange}
          min={MIDI_MIN}
          max={MIDI_MAX}
          step={1}
        />
      </FormControl>
    </AddModuleDialogBase>
  );
}

export default AddButtonModuleDialog;
