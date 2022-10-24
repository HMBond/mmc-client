import { PropsWithChildren } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type ContextProps = PropsWithChildren<{
  socket: ReconnectingWebSocket;
}>;
