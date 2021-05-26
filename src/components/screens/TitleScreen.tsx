import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import ActionButton from '../elements/ActionButton';
import CreateRoomScreen from './CreateRoomScreen';
import JoinRoomForm from '../JoinRoomForm';
import Container from '../elements/Container';

const TitleScreenLayout = styled.div`
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
    <>
      {!showCreateRoomForm && !showJoinRoomForm && (
        <Container>
          <TitleScreenLayout>
            <Logo>DrawChevo</Logo>
            <Buttons>
              <TitleButton onClick={handleCreateRoom}>Create Room</TitleButton>
              <TitleButton onClick={handleJoinRoom}>Join Room</TitleButton>
            </Buttons>
          </TitleScreenLayout>
        </Container>
      )}

      {showCreateRoomForm && (
        <CreateRoomScreen
          socket={socket}
          onBack={() => {
            setShowCreateRoomForm(false);
          }}
        ></CreateRoomScreen>
      )}
      {showJoinRoomForm && (
        <JoinRoomForm
          socket={socket}
          onBack={() => {
            setShowJoinRoomForm(false);
          }}
        ></JoinRoomForm>
      )}
    </>
  );
}
