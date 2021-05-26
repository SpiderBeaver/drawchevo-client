import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../../app/hooks';
import {
  selectCurrentDrawing,
  selectCurrentPlayerId,
  selectMe,
  selectOriginalPhrase,
} from '../../features/gameRoom/gameRoomSlice';
import DrawingCanvas from '../DrawingCanvas';
import Form from '../elements/forms/Form';
import Label from '../elements/forms/Label';
import SubmitButton from '../elements/forms/SubmitButton';
import TextInput from '../elements/forms/TextInput';
import WaitingForPlayersMessage from '../elements/WaitingForPlayersMessage';

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

interface Props {
  socket: Socket;
}

export default function FakePhraseScreen({ socket }: Props) {
  const me = useAppSelector(selectMe)!;
  const currentPlayerId = useAppSelector(selectCurrentPlayerId)!;
  const currentDrawing = useAppSelector(selectCurrentDrawing)!;
  const originalPhrase = useAppSelector(selectOriginalPhrase)!;

  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit('FAKE_PHRASE_DONE', { text: text });
    setIsDone(true);
  };

  return (
    <>
      {!isDone && currentPlayerId !== me.id && originalPhrase.authorId !== me.id ? (
        <Container>
          <header></header>
          <DrawingContainer>
            {currentDrawing && <DrawingCanvas drawing={currentDrawing} size={400}></DrawingCanvas>}
          </DrawingContainer>
          <Form onSubmit={handleSubmit}>
            <Label>Please name this drawing.</Label>
            <TextInput type="text" value={text} onChange={(e) => setText(e.target.value)}></TextInput>
            <SubmitButton text="Done"></SubmitButton>
          </Form>
        </Container>
      ) : (
        <WaitingForPlayersMessage></WaitingForPlayersMessage>
      )}
    </>
  );
}
