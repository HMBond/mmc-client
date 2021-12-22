import { useContext } from 'react';
import { WebMidi } from 'webmidi';
import PropTypes from 'prop-types';
import { Alert, Button, SelectChangeEvent } from '@mui/material';
import { MidiContext, DeviceSelect, UserContext } from '../..';

type MidiSettingsProps = { restartMidi: () => void };

function MidiSettings({ restartMidi }: MidiSettingsProps) {
  const { input, setInput, inputs, output, setOutput, outputs } =
    useContext(MidiContext) || {};
  const { setInputName, setOutputName } = useContext(UserContext) || {};

  function handleInputSelect(event: SelectChangeEvent<string>) {
    const selected = WebMidi.getInputById(event.target.value);
    if (!selected)
      throw Error(`WebMidi can not find ${event.target.value} in inputs`);
    setInput && setInput(selected);
    setInputName && setInputName(selected.name);
  }

  function handleOutputSelect(event: SelectChangeEvent<string>) {
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
        <Button variant="contained" onClick={async () => await restartMidi()}>
          Restart MIDI
        </Button>
        <DeviceSelect
          deviceTypeName="input"
          devices={inputs}
          selected={input}
          onChange={handleInputSelect}
        />
        <DeviceSelect
          deviceTypeName="output"
          devices={outputs}
          selected={output}
          onChange={handleOutputSelect}
        />
      </>
    );
  }
}

MidiSettings.propTypes = {
  restartMidi: PropTypes.func,
};

export default MidiSettings;
