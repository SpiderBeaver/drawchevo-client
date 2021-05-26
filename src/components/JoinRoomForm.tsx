import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import Container from './elements/Container';
import Form from './elements/forms/Form';
import InputGroup from './elements/forms/InputGroup';
import Label from './elements/forms/Label';
import SubmitButton from './elements/forms/SubmitButton';
import TextInput from './elements/forms/TextInput';
import BackButton from './elements/header/BackButton';
import Heading from './elements/Heading';

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Props {
  socket: Socket;
  onBack?: () => void;
}

export default function JoinRoomForm({ socket, onBack }: Props) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (roomId.length > 0 && username.length > 0) {
      socket.emit('JOIN_ROOM', { roomId: roomId, username: username });
    }
  };

  return (
    <Container>
      <header>
        <BackButton onClick={onBack}>back</BackButton>
      </header>

      <ContentContainer>
        <Heading>Join a room</Heading>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Room ID</Label>
            <TextInput type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)}></TextInput>
          </InputGroup>
          <InputGroup>
            <Label>Username</Label>
            <TextInput type="text" value={username} onChange={(e) => setUsername(e.target.value)}></TextInput>
          </InputGroup>
          <SubmitButton text="Join room"></SubmitButton>
        </Form>
      </ContentContainer>
    </Container>
  );
}
