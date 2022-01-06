import { useContext, ChangeEvent } from 'react';
import { WebMidi } from 'webmidi';
import { Alert, Typography } from '@mui/material';
import { DeviceSelect, UserContext } from '../..';
import { ModuleInterface } from '../../../types/modules';
import { useMidiContext } from '../../../state/contexts';

type MidiSettingsProps = {
  module?: ModuleInterface;
};

function MidiSettings({ module }: MidiSettingsProps) {
  const { midiState, midiDispatch } = useMidiContext();
  const { setInputName, setOutputName, editMode } = useContext(UserContext) || {};

  function handleInputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const input = WebMidi.getInputById(event.target.value);
    if (!input) throw new Error(`WebMidi can not find ${event.target.value} in inputs`);
    midiDispatch({ type: 'SET_INPUT', input });
    setInputName && setInputName(input.name);
  }

  function handleOutputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const output = WebMidi.getOutputById(event.target.value);
    if (!output) throw new Error(`WebMidi can not find ${event.target.value} in outputs`);
    midiDispatch({ type: 'SET_OUTPUT', output });
    setOutputName && setOutputName(output.name);
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
          disabled={editMode && isModule}
        />
        <DeviceSelect
          deviceType="output"
          devices={midiState.outputs}
          selected={midiState.output}
          onChange={handleOutputSelect}
          disabled={editMode && isModule}
        />
      </>
    );
  }
}

export default MidiSettings;
