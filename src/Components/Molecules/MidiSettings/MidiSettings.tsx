import { Alert, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { WebMidi } from 'webmidi';
import { DeviceSelect } from '../..';
import { useMidiContext, useStateContext } from '../../../context';
import { ModuleInterface } from '../../../types/Module.types';

type MidiSettingsProps = {
  module?: ModuleInterface;
};

function MidiSettings({ module }: MidiSettingsProps) {
  const { midiState, midiDispatch } = useMidiContext();
  const { state, dispatch } = useStateContext();

  function handleInputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;
    const input = WebMidi.getInputById(id);
    if (!input) throw new Error(`WebMidi can not find inputs with id: ${id}`);
    midiDispatch({ type: 'SET_INPUT', input });
    dispatch({ type: 'SET_INPUT_ID', value: id });
  }

  function handleOutputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;
    const output = WebMidi.getOutputById(id);
    if (!output) throw new Error(`WebMidi can not find outputs with id: ${id}`);
    midiDispatch({ type: 'SET_OUTPUT', output });
    dispatch({ type: 'SET_OUTPUT_ID', value: id });
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
