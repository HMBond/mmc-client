import { WMC, MidiContextProvider, StateContextProvider } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <StateContextProvider>
        <WMC />
      </StateContextProvider>
    </MidiContextProvider>
  );
}
