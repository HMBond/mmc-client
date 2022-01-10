import { ChangeEvent, useState } from 'react';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { ModuleInterface, SliderOrientation } from '../../../types/Module.types';
import { MIDI_CHANNELS } from '../../definitions';
import { useStateContext } from '../../../context';
import ModuleDialogBase, { BaseProps, basePropTypes } from './ModuleDialogBase';

SliderModuleDialog.propTypes = basePropTypes;

function SliderModuleDialog(props: BaseProps) {
  const { module, onSubmit } = props;
  const [channel, setChannel] = useState<number>(module.channel);
  const [orientation, setOrientation] = useState<SliderOrientation>(module.orientation);
  const { state } = useStateContext();

  const getUsedChannels = (): number[] => {
    if (!state.modules) return [];
    return state.modules.map((module) => {
      if (module.channel) return module.channel;
    });
  };

  function handleOrientationChange(event: unknown, value: SliderOrientation) {
    setOrientation(value);
  }

  function handleChannelChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(event.target.value);
    if (!value) {
      throw new Error('Channel is not a number or 0');
      return;
    }
    setChannel(value);
  }

  function handleSubmit(moduleArgs: ModuleInterface) {
    onSubmit({
      ...moduleArgs,
      channel,
      orientation,
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
      <ToggleButtonGroup
        color="primary"
        value={orientation}
        exclusive
        onChange={handleOrientationChange}
      >
        <ToggleButton value="vertical">Vertical</ToggleButton>
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
      </ToggleButtonGroup>
    </ModuleDialogBase>
  );
}

export default SliderModuleDialog;
