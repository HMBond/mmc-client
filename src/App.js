import React, { useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import './App.css';
import {
  MidiSettings,
  MidiSlider,
  LaunchPad,
  Carrousel,
  Placer,
  View,
  Nav,
} from './Components';
import { MidiContext } from './Components/Organisms/ContextProviders/MidiContextProvider';
import { UserContext } from './Components/Organisms/ContextProviders/UserContextProvider';

function App() {
  const { setInputDevice, setOutputDevice } = useContext(MidiContext);
  const { activeView, setActiveView, views } = useContext(UserContext);

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

  function handleViewToggle() {
    setActiveView(activeView ? 0 : 1);
  }

  return (
    <div className="App">
      <Nav>
        <LaunchPad />
      </Nav>
      <Carrousel activeView={activeView} viewCount={views.size}>
        <View pageNumber={0} label={'Settings'}>
          <Placer id={1}>
            <MidiSettings restartMidi={restartMidi} />
          </Placer>
        </View>
        <View pageNumber={1} label={'Mixer'}>
          <div className="mixer">
            <MidiSlider channel={1} />
          </div>
        </View>
      </Carrousel>
    </div>
  );
}

export default App;
