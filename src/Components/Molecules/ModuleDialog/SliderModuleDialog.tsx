import { ChangeEvent, useContext, useState } from 'react';
import ModuleDialogBase, { BaseProps, basePropTypes } from './ModuleDialogBase';
import { ModuleInterface, SliderOrientation } from '../../../models/modules';
import { MIDI_CHANNELS } from '../../definitions';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { UserContextOrNull } from '../../../models/types';
import { UserContext } from '../..';

SliderModuleDialog.propTypes = basePropTypes;

function SliderModuleDialog(props: BaseProps) {
  const { module, onSubmit } = props;
  const [channel, setChannel] = useState<number>(module.channel);
  const [orientation, setOrientation] = useState<SliderOrientation>(
    module.orientation
  );
  const { modules } = useContext<UserContextOrNull>(UserContext) || {};

  const getUsedChannels = (): number[] => {
    if (!modules) return [];
    return modules.map((module) => {
      if (module.channel) return module.channel;
    });
  };

  function handleOrientationChange(event: unknown, value: SliderOrientation) {
    setOrientation(value);
  }

  function handleChannelChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(event.target.value);
    if (!value) {
      throw Error('Channel is not a number or 0');
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
