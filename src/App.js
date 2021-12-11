import React, { useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import './App.css';
import {
  MidiSettings,
  MidiSlider,
  LaunchPad,
  Carrousel,
  Module,
  View,
  Nav,
} from './Components';
import { MidiContext } from './Components/';
import { UserContext } from './Components/';

function App() {
  const { setInputDevice, setOutputDevice } = useContext(MidiContext);
  const { activeView, views } = useContext(UserContext);

  useEffect(() => {
    startMidi();
    // eslint-disable-next-line
  }, []);

  async function startMidi() {
    await WebMidi.enable({ sysex: true })
      .then(() => {
        setInputDevice(WebMidi.inputs[0] ? WebMidi.inputs[0] : '');
        setOutputDevice(WebMidi.outputs[0] ? WebMidi.outputs[0] : '');
      })
      .catch((error) => console.log(error));
  }

  async function restartMidi() {
    if (WebMidi.enabled) {
      await WebMidi.disable();
    }
    await startMidi();
  }

  return (
    <div className="App">
      <Nav>
        <LaunchPad />
      </Nav>
      <Carrousel activeView={activeView} viewCount={views.size}>
        <View pageNumber={0} label={'Settings'}>
          <Module id={1} label={'MIDI'}>
            <MidiSettings restartMidi={restartMidi} />
          </Module>
        </View>
        <View pageNumber={1} label={'Mixer'}>
          <Module id={2} label={'track 1 vol'}>
            <MidiSlider channel={1} />
          </Module>
        </View>
      </Carrousel>
    </div>
  );
}

export default App;
