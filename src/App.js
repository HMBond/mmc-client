import React, { useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Carrousel,
  LaunchPad,
  MidiSlider,
  Module,
  Nav,
  Settings,
  View,
  ViewControl,
  MidiContext,
  UserContext,
} from './Components';
import './App.css';

function App() {
  const { setInput, setInputs, setOutput, setOutputs } =
    useContext(MidiContext);
  const {
    activeView,
    views,
    editMode,
    invertThemeMode,
    inputName,
    setInputName,
    outputName,
    setOutputName,
  } = useContext(UserContext);

  const theme = createTheme({
    palette: {
      mode: invertThemeMode ^ editMode ? 'light' : 'dark',
    },
  });

  useEffect(() => {
    startMidi();
    return () => {
      WebMidi.removeListener('portschanged', handleMidiPortChanged);
    };
    // eslint-disable-next-line
  }, []);

  async function startMidi() {
    await WebMidi.enable({ sysex: true })
      .then(() => {
        // TODO: try local storage (last) selected devices, otherwise first available:
        window.midi = WebMidi;
        setInputStates();
        setOutputStates();
        WebMidi.addListener('portschanged', handleMidiPortChanged);
      })
      .catch((error) => console.log(error));
  }

  function setInputStates() {
    setInputs(WebMidi.inputs);
    const firstOrDefaultInput = inputName
      ? WebMidi.getInputByName(inputName)
      : WebMidi.inputs[0];
    setInput(firstOrDefaultInput);
    setInputName(firstOrDefaultInput?.name ?? '');
  }

  function setOutputStates() {
    setOutputs(WebMidi.outputs);
    const firstOrDefaultOutput = outputName
      ? WebMidi.getOutputByName(outputName)
      : WebMidi.outputs[0];
    setOutput(firstOrDefaultOutput);
    setOutputName(firstOrDefaultOutput?.name ?? '');
  }

  function handleMidiPortChanged({ port }) {
    if (port.type === 'input') {
      setInputStates();
      if (port.state === 'disconnected') {
        setInput({});
      }
    }

    if (port.type === 'output') {
      setOutputStates();
      if (port.state === 'disconnected') {
        setOutput({});
      }
    }
  }

  async function handleRestartMidi() {
    if (WebMidi.enabled) {
      WebMidi.removeListener('portschanged', handleMidiPortChanged);
    }
    await startMidi();
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav>
          <Settings restartMidi={handleRestartMidi} />
          <LaunchPad />
          <ViewControl />
        </Nav>
        <Carrousel activeView={activeView} viewCount={views.size}>
          <View pageNumber={0} label={'First view'}>
            <Module id={2} label={'track 1 vol'}>
              <MidiSlider channel={1} />
            </Module>
          </View>
        </Carrousel>
      </ThemeProvider>
    </div>
  );
}

export default App;
