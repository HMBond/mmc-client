import React, { useContext, useEffect, useState } from 'react';
import { WebMidi } from 'webmidi';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { MidiContext, DeviceSelect, UserContext } from '../..';

function MidiSettings({ restartMidi }) {
  const { input, setInput, inputs, output, setOutput, outputs } =
    useContext(MidiContext);

  const { setInputName, setOutputName } = useContext(UserContext);

  function handleOnInputSelect(event) {
    const selected = WebMidi?.getInputById(event.target.value);
    setInput(selected);
    setInputName(selected.name);
  }

  function handleOnOutputSelect(event) {
    const selected = WebMidi?.getOutputById(event.target.value);
    setOutput(selected);
    setOutputName(selected.name);
  }

  if (!WebMidi.enabled) {
    return <Alert severity="error">WebMidi is not enabled!</Alert>;
  } else {
    return (
      <Box sx={{ display: 'grid', gap: 3 }}>
        <Button variant="contained" onClick={async () => await restartMidi()}>
          Restart MIDI
        </Button>
        <DeviceSelect
          deviceTypeName="input"
          devices={inputs}
          selected={input}
          onChange={handleOnInputSelect}
        />
        <DeviceSelect
          deviceTypeName="output"
          devices={outputs}
          selected={output}
          onChange={handleOnOutputSelect}
        />
      </Box>
    );
  }
}

export default MidiSettings;
