import { useContext, ChangeEvent } from 'react';
import { WebMidi } from 'webmidi';
import { Alert, Typography } from '@mui/material';
import { MidiContext, DeviceSelect, UserContext } from '../..';

function MidiSettings({ label }: { label?: string }) {
  const { input, setInput, inputs, output, setOutput, outputs } =
    useContext(MidiContext) || {};
  const { setInputName, setOutputName, editMode } =
    useContext(UserContext) || {};

  function handleInputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const selected = WebMidi.getInputById(event.target.value);
    if (!selected)
      throw Error(`WebMidi can not find ${event.target.value} in inputs`);
    setInput && setInput(selected);
    setInputName && setInputName(selected.name);
  }

  function handleOutputSelect(event: ChangeEvent<HTMLSelectElement>) {
    const selected = WebMidi.getOutputById(event.target.value);
    if (!selected)
      throw Error(`WebMidi can not find ${event.target.value} in outputs`);
    setOutput && setOutput(selected);
    setOutputName && setOutputName(selected.name);
  }

  if (!WebMidi.enabled) {
    return <Alert severity="error">WebMidi is not enabled!</Alert>;
  } else {
    return (
      <>
        {label && <Typography component="label">{label}</Typography>}
        <DeviceSelect
          deviceType="input"
          devices={inputs}
          selected={input}
          onChange={handleInputSelect}
          disabled={editMode}
        />
        <DeviceSelect
          deviceType="output"
          devices={outputs}
          selected={output}
          onChange={handleOutputSelect}
          disabled={editMode}
        />
      </>
    );
  }
}

export default MidiSettings;
