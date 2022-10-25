import ReconnectingWebSocket from 'reconnecting-websocket';

let socket: ReconnectingWebSocket | undefined;

export function connectWebSocket({ host, port }: { host: string; port: string }) {
  // Create WebSocket connection.
  if (socket) return socket;
  socket = new ReconnectingWebSocket(`ws://${host}:${port}`);

  // Connection opened
  socket.addEventListener('open', () => {
    // socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log(`Message from server: ${event.data}`);
  });

  // Connection error
  socket.addEventListener('error', (event) => {
    console.error('WebSocket server error: ', event);
  });

  // Connection closed
  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed', event);
  });

  return socket;
}
