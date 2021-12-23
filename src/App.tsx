import { WMC, MidiContextProvider, UserContextProvider } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <UserContextProvider>
        <WMC />
      </UserContextProvider>
    </MidiContextProvider>
  );
}
