import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../app/hooks';
import { selectCurrentDrawing } from '../features/gameRoom/gameRoomSlice';
import DrawingCanvas from './DrawingCanvas';

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'drawing'
    'form';
`;

const DrawingContainer = styled.div`
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
  background-color: #e4572e;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 1.2em;
  padding: 0.3em 0.6em;
`;

interface Props {
  socket: Socket;
}

export default function FakePhraseScreen({ socket }: Props) {
  const currentDrawing = useAppSelector(selectCurrentDrawing);

  const [text, setText] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit('FAKE_PHRASE_DONE', { text: text });
  };

  return (
    <Container>
      <header></header>
      <DrawingContainer>
        {currentDrawing && <DrawingCanvas drawing={currentDrawing} size={400}></DrawingCanvas>}
      </DrawingContainer>
      <Form onSubmit={handleSubmit}>
        <Label>Please name this drawing.</Label>
        <TextInput type="text" value={text} onChange={(e) => setText(e.target.value)}></TextInput>
        <SubmitButton type="submit" value="Done"></SubmitButton>
      </Form>
    </Container>
  );
}
