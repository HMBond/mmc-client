import { ChangeEvent, useContext, useState } from 'react';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { ModuleInterface } from '../../../types/modules';
import { UserContextOrNull } from '../../../types/types';
import { UserContext } from '../..';
import {
  DEFAULT_VELOCITY,
  MIDI_CHANNELS,
  MIDI_MAX,
  MIDI_MIN,
} from '../../definitions';
import ModuleDialogBase, { BaseProps, basePropTypes } from './ModuleDialogBase';

ButtonModuleDialog.propTypes = basePropTypes;

function ButtonModuleDialog(props: BaseProps) {
  const { module, onSubmit } = props;
  const [channel, setChannel] = useState<number>(module.channel || 1);
  const [note, setNote] = useState<string>(module.note || 'C3');
  const [velocity, setVelocity] = useState<number>(
    module.velocity || DEFAULT_VELOCITY
  );
  const { modules } = useContext<UserContextOrNull>(UserContext) || {};

  const getUsedChannels = (): number[] => {
    if (!modules) return [];
    return modules.map((module) => module.channel && module.channel);
  };

  function handleChannelChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(event.target.value);
    if (!value) {
      throw Error('Channel is 0 or not a number');
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

  function handleSubmit(moduleArgs: ModuleInterface) {
    onSubmit({
      ...moduleArgs,
      channel,
      note,
      velocity,
    });
  }

  return (
    <ModuleDialogBase {...props} onSubmit={handleSubmit}>
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
    </ModuleDialogBase>
  );
}

export default ButtonModuleDialog;
