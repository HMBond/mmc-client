import { useContext } from 'react';
import PropTypes from 'prop-types';
import { WebMidi } from 'webmidi';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { MidiContext, DeviceSelect, UserContext } from '../..';
import { SelectChangeEvent } from '@mui/material';

type MidiSettingsProps = { restartMidi: () => Promise<void> };

function MidiSettings({ restartMidi }: MidiSettingsProps) {
  const midiContext = useContext(MidiContext)!;
  const { input, setInput, inputs, output, setOutput, outputs } = midiContext;
  const { setInputName, setOutputName } = useContext(UserContext)!;

  function handleInputSelect(event: SelectChangeEvent<string>) {
    const selected = WebMidi.getInputById(event.target.value);
    if (!selected)
      throw Error(`WebMidi can not find ${event.target.value} in inputs`);
    setInput(selected);
    setInputName(selected.name);
  }

  function handleOutputSelect(event: SelectChangeEvent<string>) {
    const selected = WebMidi.getOutputById(event.target.value);
    if (!selected)
      throw Error(`WebMidi can not find ${event.target.value} in outputs`);
    setOutput(selected);
    setOutputName(selected.name);
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
