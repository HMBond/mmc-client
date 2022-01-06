import { WMC, UserContextProvider, MidiContextProvider } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <UserContextProvider>
        <WMC />
      </UserContextProvider>
    </MidiContextProvider>
  );
}
