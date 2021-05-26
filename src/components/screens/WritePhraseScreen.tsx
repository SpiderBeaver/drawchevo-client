import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import Container from '../elements/Container';
import Form from '../elements/forms/Form';
import Label from '../elements/forms/Label';
import SubmitButton from '../elements/forms/SubmitButton';
import TextInput from '../elements/forms/TextInput';
import WaitingForPlayersMessage from '../elements/WaitingForPlayersMessage';

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas:
    'header'
    'form';
`;

interface Props {
  socket: Socket;
}

export default function WritePhraseScreen({ socket }: Props) {
  const [isDone, setIsDone] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (text !== '') {
      socket.emit('PHRASE_DONE', { phrase: text });
      setIsDone(true);
    }
  };

  return (
    <>
      {!isDone ? (
        <Container>
          <Layout>
            <header></header>
            <Form onSubmit={handleSubmit}>
              <Label>Write a short phrase.</Label>
              <TextInput type="text" value={text} onChange={(e) => setText(e.target.value)}></TextInput>
              <SubmitButton text="Done"></SubmitButton>
            </Form>
          </Layout>
        </Container>
      ) : (
        <WaitingForPlayersMessage></WaitingForPlayersMessage>
      )}
    </>
  );
}
