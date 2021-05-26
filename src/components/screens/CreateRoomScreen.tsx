import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import Container from '../elements/Container';
import Form from '../elements/forms/Form';
import Label from '../elements/forms/Label';
import SubmitButton from '../elements/forms/SubmitButton';
import TextInput from '../elements/forms/TextInput';
import BackButton from '../elements/header/BackButton';
import Heading from '../elements/Heading';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Props {
  socket: Socket;
  onBack?: () => void;
}

export default function CreateRoomScreen({ socket, onBack }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (username.length > 0) {
      socket.emit('CREATE_ROOM', { username: username });
    }
  };

  return (
    <Container>
      <header>
        <BackButton onClick={onBack}>back</BackButton>
      </header>

      <Content>
        <Heading>Create new room</Heading>
        <Form onSubmit={handleSubmit}>
          <Label>Username</Label>
          <TextInput type="text" value={username} onChange={(e) => setUsername(e.target.value)}></TextInput>
          <SubmitButton text="Create room"></SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
