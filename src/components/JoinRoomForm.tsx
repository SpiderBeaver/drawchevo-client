import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  border: none;
  background: none;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 0.8em;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h2`
  margin: 0;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 2em;
  margin-bottom: 2em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #ffffff;
  margin-bottom: 0.5em;
`;

const TextInput = styled.input`
  padding: 0.6em;
  border: 1px solid #000000;
  border-radius: 3px;
  font-size: 1em;
  font-family: inherit;
  margin-bottom: 1.4em;
`;

const SubmitButton = styled.input`
  align-self: flex-end;
  margin-top: 1.5em;
  background-color: #e4572e;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 1.2em;
  padding: 0.3em 0.6em;
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
          <Label>Room ID</Label>
          <TextInput type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)}></TextInput>
          <Label>Username</Label>
          <TextInput type="text" value={username} onChange={(e) => setUsername(e.target.value)}></TextInput>
          <SubmitButton type="submit" value="Join room"></SubmitButton>
        </Form>
      </ContentContainer>
    </Container>
  );
}
