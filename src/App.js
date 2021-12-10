import React, { useState, useEffect } from 'react';
import { WebMidi } from 'webmidi';
import './App.css';
import {
  MidiSettings,
  MidiSlider,
  LaunchPad,
  MidiContextProvider,
  UserContextProvider,
  Placer,
  View,
} from './Components';

function App() {
  const [inputDevice, setInputDevice] = useState({ id: '' });
  const [outputDevice, setOutputDevice] = useState({ id: '' });
  const [arrangement, setArrangement] = useState({
    placers: new Map(),
    views: new Map(),
    editMode: true,
  });

  useEffect(() => {
    startMidi();
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
      <MidiContextProvider
        inputDevice={inputDevice}
        outputDevice={outputDevice}
      >
        <UserContextProvider
          arrangement={arrangement}
          setArrangement={setArrangement}
        >
          <View>
            <Placer id={1}>
              <MidiSettings restartMidi={restartMidi} />
            </Placer>
            <div className="mixer">
              <MidiSlider channel={1} />
            </div>
            <LaunchPad />
          </View>
        </UserContextProvider>
      </MidiContextProvider>
    </div>
  );
}

export default App;
