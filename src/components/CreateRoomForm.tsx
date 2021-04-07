import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

export default function CreateRoomForm({ socket }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (username.length > 0) {
      socket.emit('CREATE_ROOM', { username: username });
    }
  };

  return (
    <>
      <h2>Crete new room</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type="submit" value="Create room"></input>
      </form>
    </>
  );
}
