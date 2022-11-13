import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { WebMidi } from 'webmidi';
import {
  Carrousel,
  Label,
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

export default function MMC() {
  const [, midiDispatch] = useMidiContext();
  const [state, dispatch] = useStateContext();
  const { activeViewId, views, modules, editMode, invertTheme, inputId, outputId } = state;
  let cleanup: () => void;

  const theme = createTheme({
    palette: {
      mode: invertTheme !== editMode ? 'light' : 'dark',
    },
  });

  useEffect(() => {
    connectShareAction(state.socket);
  }, [state.socket]);

  useEffect(() => {
    connectLocalMidiDevices().then((callback) => {
      cleanup = callback;
    });
    return () => {
      cleanup();
    };
  }, []);

  function connectShareAction(socket?: ReconnectingWebSocket): void {
    socket?.addEventListener('message', (event) => {
      try {
        const {
          type,
          payload: { modules, views, activeViewId },
        } = JSON.parse(event.data);
        if (type === 'share') {
          if (!modules || !views) throw new Error('Sharing setup failed');
          if (!confirm('Are you sure you want to get the shared setup?')) return;
          dispatch({
            type: 'SET_STATE',
            state: {
              ...state,
              modules,
              views,
              activeViewId,
            },
          });
        }
      } catch (error) {
        error;
      }
    });
  }

  async function connectLocalMidiDevices() {
    await WebMidi.enable()
      .then(() => {
        setInputStates();
        setOutputStates();
        (WebMidi as any).addListener('portschanged', handleMidiPortChanged);
      })
      .catch((error) => {
        throw new Error(error);
      });
    return () => {
      (WebMidi as any).removeListener('portschanged', handleMidiPortChanged);
    };
  }

  function setInputStates() {
    midiDispatch({ type: 'SET_INPUTS', inputs: WebMidi.inputs });
    const preferredInput = inputId && WebMidi.getInputById(inputId);
    const input = preferredInput ? preferredInput : WebMidi.inputs[0];
    input && midiDispatch({ type: 'SET_INPUT', input: input });
  }

  function setOutputStates() {
    midiDispatch({ type: 'SET_OUTPUTS', outputs: WebMidi.outputs });
    const preferredOutput = outputId && WebMidi.getOutputById(outputId);
    const output = preferredOutput ? preferredOutput : WebMidi.outputs[0];
    output && midiDispatch({ type: 'SET_OUTPUT', output });
  }

  function handleMidiPortChanged({ port }: any) {
    if (port.type === 'input') {
      setInputStates();
      // prevent midi messages to be send to other connected devices
      if (port.state === 'disconnected') {
        midiDispatch({ type: 'SET_INPUT', input: null });
      }
    }

    if (port.type === 'output') {
      setOutputStates();
      // prevent midi messages to be send to other connected devices
      if (port.state === 'disconnected') {
        midiDispatch({ type: 'SET_OUTPUT', output: null });
      }
    }
  }

  async function handleRestartMidi() {
    if (WebMidi.enabled) {
      cleanup();
    }
    cleanup = await connectLocalMidiDevices();
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
                  {module.type === 'Label' && <Label>{module.label}</Label>}
                </Placer>
              ))}
            </View>
          ))}
      </Carrousel>
    </ThemeProvider>
  );
}
