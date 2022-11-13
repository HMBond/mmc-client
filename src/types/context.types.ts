import { PropsWithChildren } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type ThemeContextProps = { children: JSX.Element };

export type StateContextProps = PropsWithChildren<{
  socket?: ReconnectingWebSocket;
}>;

export type MidiContextProps = PropsWithChildren<{
  socket?: ReconnectingWebSocket;
}>;
