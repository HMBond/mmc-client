import React, { useState, useEffect, useMemo } from 'react';
import { WebMidi } from 'webmidi';
import { MidiContext } from './context';
import './App.css';
import { MidiSettings, MidiSlider, MidiButton } from './Components';

function App() {
  const [inputDevice, setInputDevice] = useState({ id: '' });
  const [outputDevice, setOutputDevice] = useState({ id: '' });
  const midiContextProviderValue = useMemo(
    () => ({ inputDevice, outputDevice }),
    [inputDevice, outputDevice]
  );

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
      <MidiContext.Provider value={midiContextProviderValue}>
        <MidiSettings restartMidi={restartMidi} />
        <div className="mixer">
          <MidiSlider channel={1} />
        </div>
        <div className="launchpad">
          <MidiButton note="C3">Play</MidiButton>
        </div>
      </MidiContext.Provider>
    </div>
  );
}

export default App;
