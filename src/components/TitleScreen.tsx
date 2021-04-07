import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

export default function TitleScreen({ socket }: Props) {
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    socket.emit('CREATE_ROOM');
  };

  const handleJoinRoom = () => {
    socket.emit('JOIN_ROOM', { roomId: roomId });
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <input
        type="text"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      ></input>
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}
