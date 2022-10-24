import { MidiContextProvider, MMC, StateContextProvider } from './components';
import { connectWebSocket } from './webSocket';

export default function App() {
  const socket = connectWebSocket({
    host: (import.meta.env.VITE_WS_HOST as string) || 'localhost',
    port: (import.meta.env.VITE_WS_PORT as string) || '8080',
  });
  return (
    <MidiContextProvider socket={socket}>
      <StateContextProvider socket={socket}>
        <MMC />
      </StateContextProvider>
    </MidiContextProvider>
  );
}
