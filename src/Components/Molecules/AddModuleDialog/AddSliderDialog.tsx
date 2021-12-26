import { ChangeEvent, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AddModuleDialogBase, { BaseProps } from './AddModuleDialogBase';
import { Module, SliderModule, SliderOrientation } from '../../../types/Module';
import { MIDI_CHANNELS } from '../../definitions';
import {
  FormControl,
  InputLabel,
  NativeSelect,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { UserContextOrNull } from '../../../types/types';
import { UserContext } from '../..';

AddSliderDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

function AddSliderDialog(props: BaseProps) {
  const { modules } = useContext<UserContextOrNull>(UserContext) || {};
  const [channel, setChannel] = useState<number>(1);
  const [orientation, setOrientation] = useState<SliderOrientation>('vertical');

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

  function handleSubmit(moduleArgs: Module) {
    props.onSubmit(
      new SliderModule({
        ...moduleArgs,
        channel,
        orientation,
      })
    );
  }

  return (
    <AddModuleDialogBase {...props} onSubmit={handleSubmit} title="New Slider">
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
    </AddModuleDialogBase>
  );
}

export default AddSliderDialog;
