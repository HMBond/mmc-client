import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { WebMidi } from 'webmidi';
import {
  Carrousel,
  LaunchPad,
  MidiButton,
  MidiSettings,
  MidiSlider,
  Nav,
  Placer,
  Settings,
  View,
  ViewControl,
} from '.';
import { useMidiContext, useStateContext } from '../context';
import { ButtonModule, SliderModule } from '../types/Module.types';
import { View as ViewModel } from '../types/View.types';

export default function WMC() {
  const { midiDispatch } = useMidiContext();
  const { state } = useStateContext();
  const { activeViewId, views, modules, editMode, invertTheme, inputId, outputId } = state;

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
  }, []);

  async function startMidi() {
    await WebMidi.enable({ sysex: true })
      .then(() => {
        setInputStates();
        setOutputStates();
        (WebMidi as any).addListener('portschanged', handleMidiPortChanged);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function setInputStates() {
    midiDispatch({ type: 'SET_INPUTS', inputs: WebMidi.inputs });
    const preferredInput = inputId && WebMidi.getInputByName(inputId);
    const input = preferredInput ? preferredInput : WebMidi.inputs[0];
    if (!input) return;
    midiDispatch({ type: 'SET_INPUT', input: input });
  }

  function setOutputStates() {
    midiDispatch({ type: 'SET_OUTPUTS', outputs: WebMidi.outputs });
    const preferredOutput = outputId && WebMidi.getOutputByName(outputId);
    const output = preferredOutput ? preferredOutput : WebMidi.outputs[0];
    if (!output) return;
    midiDispatch({ type: 'SET_OUTPUT', output });
  }

  function handleMidiPortChanged({ port }: any) {
    if (port.type === 'input') {
      setInputStates();
      // make sure that you do not accidentally trigger other devices
      if (port.state === 'disconnected') {
        midiDispatch({ type: 'SET_INPUT', input: null });
      }
    }

    if (port.type === 'output') {
      setOutputStates();
      // make sure that you do not accidentally trigger other devices
      if (port.state === 'disconnected') {
        midiDispatch({ type: 'SET_OUTPUT', output: null });
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
      <Carrousel activeViewId={activeViewId} views={views}>
        {views &&
          views.map((view) => (
            <View key={view.id} view={view}>
              {getModulesForView(view).map((module) => (
                <Placer key={module.id} module={module}>
                  {module.type === 'Button' && (
                    <MidiButton {...(module as ButtonModule)}>{module.label}</MidiButton>
                  )}
                  {module.type === 'Slider' && <MidiSlider {...(module as SliderModule)} />}
                  {module.type === 'Settings' && <MidiSettings module={module as SliderModule} />}
                </Placer>
              ))}
            </View>
          ))}
      </Carrousel>
    </ThemeProvider>
  );
}
