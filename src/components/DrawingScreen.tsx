import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../app/hooks';
import Drawing from '../domain/Drawing';
import { drawingToDto } from '../dto/DrawingDto';
import { selectOriginalPhrase } from '../features/gameRoom/gameRoomSlice';
import ActionButton from './ActionButton';
import DrawingBoard from './DrawingBoard';

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'prompt'
    'board';
`;

const Prompt = styled.p`
  color: #ffffff;
`;

const PromptPhrase = styled.span`
  font-weight: 700;
`;

interface Props {
  socket: Socket;
}

export default function DrawingScreen({ socket }: Props) {
  const originalPhrase = useAppSelector(selectOriginalPhrase);

  const handleDrawingDone = (drawing: Drawing) => {
    const drawingDto = drawingToDto(drawing);
    socket.emit('DRAWING_DONE', { drawing: drawingDto });
  };

  return (
    <Container>
      <header></header>
      <Prompt>
        Please draw: <PromptPhrase>{originalPhrase?.text}</PromptPhrase>
      </Prompt>
      <div>
        <DrawingBoard onDone={handleDrawingDone}></DrawingBoard>
      </div>
    </Container>
  );
}
