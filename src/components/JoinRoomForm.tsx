import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

export default function JoinRoomForm({ socket }: Props) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (roomId.length > 0 && username.length > 0) {
      socket.emit('JOIN_ROOM', { roomId: roomId, username: username });
    }
  };

  return (
    <>
      <h2>Join a room</h2>
      <form onSubmit={handleSubmit}>
        <label>Room ID</label>
        <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)}></input>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type="submit" value="Join room"></input>
      </form>
    </>
  );
}
