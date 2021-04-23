import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import ActionButton from './ActionButton';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

const TitleScreenContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Logo = styled.h1`
  color: #e4572e;
  font-weight: 700;
  font-size: 3.5em;
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleButton = styled(ActionButton)`
  margin-bottom: 1em;
`;

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
    <TitleScreenContainer>
      <Logo>DrawChevo</Logo>
      <Buttons>
        <TitleButton onClick={handleCreateRoom}>Create Room</TitleButton>
        <TitleButton onClick={handleJoinRoom}>Join Room</TitleButton>
      </Buttons>

      {showCreateRoomForm && <CreateRoomForm socket={socket}></CreateRoomForm>}
      {showJoinRoomForm && <JoinRoomForm socket={socket}></JoinRoomForm>}
    </TitleScreenContainer>
  );
}
