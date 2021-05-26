import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas:
    'header'
    'form';
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
  background-color: #e4572e;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 1.2em;
  padding: 0.3em 0.6em;
`;

const WaitingMessage = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 2em;
  margin-top: 5em;
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
          <header></header>
          <Form onSubmit={handleSubmit}>
            <Label>Write a short phrase.</Label>
            <TextInput type="text" value={text} onChange={(e) => setText(e.target.value)}></TextInput>
            <SubmitButton type="submit" value="Done"></SubmitButton>
          </Form>
        </Container>
      ) : (
        <WaitingMessage>Waiting for other players.</WaitingMessage>
      )}
    </>
  );
}
