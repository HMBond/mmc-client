import { ChangeEvent } from 'react';
import { WebMidi } from 'webmidi';
import { Alert, Typography } from '@mui/material';
import { DeviceSelect } from '../..';
import { ModuleInterface } from '../../../types/modules';
import { useMidiContext, useStateContext } from '../../../context';

type MidiSettingsProps = {
  module?: ModuleInterface;
};

function MidiSettings({ module }: MidiSettingsProps) {
  const { midiState, midiDispatch } = useMidiContext();
  const { state } = useStateContext();

  function handleInputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const input = WebMidi.getInputById(event.target.value);
    if (!input) throw new Error(`WebMidi can not find ${event.target.value} in inputs`);
    midiDispatch({ type: 'SET_INPUT', input });
  }

  function handleOutputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const output = WebMidi.getOutputById(event.target.value);
    if (!output) throw new Error(`WebMidi can not find ${event.target.value} in outputs`);
    midiDispatch({ type: 'SET_OUTPUT', output });
  }

  if (!WebMidi.enabled) {
    return <Alert severity="error">WebMidi is not enabled!</Alert>;
  } else {
    const isModule = module !== undefined;
    return (
      <>
        {module?.label && <Typography component="label">{module.label}</Typography>}
        <DeviceSelect
          deviceType="input"
          devices={midiState.inputs}
          selected={midiState.input}
          onChange={handleInputSelect}
          disabled={state.editMode && isModule}
        />
        <DeviceSelect
          deviceType="output"
          devices={midiState.outputs}
          selected={midiState.output}
          onChange={handleOutputSelect}
          disabled={state.editMode && isModule}
        />
      </>
    );
  }
}

export default MidiSettings;
