import { useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Carrousel,
  LaunchPad,
  MidiButton,
  Placer,
  Nav,
  Settings,
  View,
  ViewControl,
  MidiContext,
  UserContext,
  MidiSlider,
  MidiSettings,
} from '.';
import { View as ViewModel } from '../types/view';
import { ButtonModule, SliderModule } from '../types/modules';

export default function WMC() {
  const { setInput, setInputs, setOutput, setOutputs } =
    useContext(MidiContext) || {};
  const {
    activeView,
    views,
    modules,
    editMode,
    invertTheme,
    inputName,
    setInputName,
    setOutputName,
  } = useContext(UserContext) || {};

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
        setInputStates();
        setOutputStates();
        (WebMidi as any).addListener('portschanged', handleMidiPortChanged);
      })
      .catch((error) => console.log(error));
  }

  function setInputStates() {
    setInputs && setInputs(WebMidi.inputs);
    const preferredInput = inputName && WebMidi.getInputByName(inputName);
    const firstOrDefault = preferredInput ? preferredInput : WebMidi.inputs[0];
    if (!firstOrDefault) return;
    setInput && setInput(firstOrDefault);
    setInputName && setInputName(firstOrDefault.name);
  }

  function setOutputStates() {
    setOutputs && setOutputs(WebMidi.outputs);
    const preferredOutput = inputName && WebMidi.getOutputByName(inputName);
    const firstOrDefault = preferredOutput
      ? preferredOutput
      : WebMidi.outputs[0];
    setOutput && setOutput(firstOrDefault);
    setOutputName && setOutputName(firstOrDefault.name);
  }

  function handleMidiPortChanged({ port }: any) {
    if (port.type === 'input') {
      setInputStates();
      if (port.state === 'disconnected') {
        setInput && setInput({});
      }
    }

    if (port.type === 'output') {
      setOutputStates();
      if (port.state === 'disconnected') {
        setOutput && setOutput({});
      }
    }
  }

  async function handleRestartMidi() {
    if (WebMidi.enabled) {
      (WebMidi as any).removeListener('portschanged', handleMidiPortChanged);
    }
    await startMidi();
    return;
  }

  function getModulesForView(view: ViewModel) {
    if (!modules) return [];
    return modules.filter((item) => view.moduleIds.includes(item.id));
  }

  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <Settings restartMidi={handleRestartMidi} />
        <LaunchPad />
        <ViewControl />
      </Nav>
      <Carrousel activeView={activeView} views={views}>
        {views &&
          views.map((view) => (
            <View key={view.id} view={view}>
              {getModulesForView(view).map((module) => (
                <Placer key={module.id} module={module}>
                  {module.type === 'Button' && (
                    <MidiButton {...(module as ButtonModule)}>
                      {module.label}
                    </MidiButton>
                  )}
                  {module.type === 'Slider' && (
                    <MidiSlider {...(module as SliderModule)} />
                  )}
                  {module.type === 'Settings' && (
                    <MidiSettings label={module.label} />
                  )}
                </Placer>
              ))}
            </View>
          ))}
      </Carrousel>
    </ThemeProvider>
  );
}
