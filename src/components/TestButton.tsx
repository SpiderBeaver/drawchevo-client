import React from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

export default function TestButton({ socket }: Props) {
  const onTest = () => {
    socket.emit('message', { content: 'hi' });
  };

  return <button onClick={onTest}>test ^_*</button>;
}
