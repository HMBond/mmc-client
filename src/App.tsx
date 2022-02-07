import { MidiContextProvider, MMC, StateContextProvider } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <StateContextProvider>
        <MMC />
      </StateContextProvider>
    </MidiContextProvider>
  );
}
