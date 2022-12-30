import { useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { MidiContextProvider, MMC, StateContextProvider } from './components';
import ThemeContextProvider from './components/contextProviders/ThemeProvider';
import { connectWebSocket } from './webSocket';

export default function App() {
  const [socket, setSocket] = useState<ReconnectingWebSocket>();
  const host = import.meta.env.VITE_WS_HOST?.toString() || 'localhost';
  const port = import.meta.env.VITE_WS_PORT?.toString() || '8080';
  const ws = connectWebSocket({ host, port });
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
