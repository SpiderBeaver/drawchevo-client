import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

interface Props {
  socket: Socket;
}

export default function TitleScreen({ socket }: Props) {
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
  const [showJoinRoomForm, setShowJoinRoomForm] = useState(false);

  const handleCreateRoom = () => {
    setShowJoinRoomForm(false);
    setShowCreateRoomForm(true);
  };

  const handleJoinRoom = () => {
    setShowCreateRoomForm(false);
    setShowJoinRoomForm(true);
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      <div>{showCreateRoomForm && <CreateRoomForm socket={socket}></CreateRoomForm>}</div>
      <div>{showJoinRoomForm && <JoinRoomForm socket={socket}></JoinRoomForm>}</div>
    </div>
  );
}
