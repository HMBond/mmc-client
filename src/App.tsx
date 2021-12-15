import React, { useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Carrousel,
  LaunchPad,
  MidiButton,
  Module,
  Nav,
  Settings,
  View,
  ViewControl,
  MidiContext,
  UserContext,
  MidiSlider,
  MidiSettings,
} from './Components';
import './App.css';
import { ViewModel } from './Components/Organisms/View/View_model';
import { MidiSliderModel } from './Components/Molecules/Module/Module_model';

function App() {
  const { setInput, setInputs, setOutput, setOutputs } =
    useContext(MidiContext)!;
  const {
    activeView,
    views,
    modules,
    editMode,
    invertTheme,
    inputName,
    setInputName,
    outputName,
    setOutputName,
  } = useContext(UserContext)!;

  const theme = createTheme({
    palette: {
      mode: invertTheme !== editMode ? 'light' : 'dark',
    },
  });

  useEffect(() => {
    startMidi();
    return () => {
      (WebMidi as any).removeListener('portschanged', handleMidiPortChanged);
    };
    // eslint-disable-next-line
  }, []);

  async function startMidi() {
    await WebMidi.enable({ sysex: true })
      .then(() => {
        // TODO: try local storage (last) selected devices, otherwise first available:
        setInputStates();
        setOutputStates();
        (WebMidi as any).addListener('portschanged', handleMidiPortChanged);
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

  function handleMidiPortChanged({ port }: any) {
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
      (WebMidi as any).removeListener('portschanged', handleMidiPortChanged);
    }
    await startMidi();
  }

  function getModulesForView(view: ViewModel) {
    return modules.filter((item) => view.moduleIds.includes(item.id));
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {true && (
          <Nav>
            <Settings restartMidi={handleRestartMidi} />
            <LaunchPad />
            <ViewControl />
          </Nav>
        )}
        <Carrousel activeView={activeView} views={views}>
          {views &&
            views.map((view) => (
              <View key={view.id} view={view}>
                {getModulesForView(view).map((module) => (
                  <Module key={module.id} module={module}>
                    {module.type === 'button' && (
                      <MidiButton {...module}>{module.label}</MidiButton>
                    )}
                    {module.type === 'slider' && (
                      <MidiSlider module={module as MidiSliderModel}>
                        {module.label}
                      </MidiSlider>
                    )}
                    {module.type === 'settings' && (
                      <MidiSettings restartMidi={handleRestartMidi} />
                    )}
                  </Module>
                ))}
              </View>
            ))}
        </Carrousel>
      </ThemeProvider>
    </div>
  );
}

export default App;