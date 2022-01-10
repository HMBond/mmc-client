import { MidiContextProvider, StateContextProvider, WMC } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <StateContextProvider>
        <WMC />
      </StateContextProvider>
    </MidiContextProvider>
  );
}
