import { WMC, MidiContextProvider, UserContextProvider } from './Components';

export default function App() {
  return (
    <MidiContextProvider>
      <UserContextProvider>
        <WMC />
      </UserContextProvider>
    </MidiContextProvider>
  );
}
