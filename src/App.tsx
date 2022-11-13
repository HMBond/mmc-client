import { useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { MidiContextProvider, MMC, StateContextProvider } from './components';
import ThemeContextProvider from './components/contextProviders/ThemeProvider';
import { connectWebSocket } from './webSocket';

export default function App() {
  const [socket, setSocket] = useState<ReconnectingWebSocket>();
  const ws = connectWebSocket({
    host: (import.meta.env.VITE_WS_HOST as string) || 'localhost',
    port: (import.meta.env.VITE_WS_PORT as string) || '8080',
  });
  ws.addEventListener('open', () => {
    setSocket(ws);
  });

  return (
    <MidiContextProvider socket={socket}>
      <StateContextProvider socket={socket}>
        <ThemeContextProvider>
          <MMC />
        </ThemeContextProvider>
      </StateContextProvider>
    </MidiContextProvider>
  );
}
