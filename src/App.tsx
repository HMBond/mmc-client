import { WMC, UserContextProvider, MidiContextProvider, StateContextProvider } from './components';

export default function App() {
  return (
    <MidiContextProvider>
      <UserContextProvider>
        <StateContextProvider>
          <WMC />
        </StateContextProvider>
      </UserContextProvider>
    </MidiContextProvider>
  );
}
