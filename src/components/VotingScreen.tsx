import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../app/hooks';
import { selectCurrentDrawing, selectVotingOptions } from '../features/gameRoom/gameRoomSlice';
import DrawingCanvas from './DrawingCanvas';
import PhrasesVotingList from './PhrasesVotingList';

const Container = styled.div`
  height: 100%;
  padding: 1.5em;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'drawing'
    'phrases';
  overflow: scroll;
`;

const OptionsHeading = styled.h3`
  font-size: 1.2em;
  font-weight: 400;
  color: #ffffff;
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

export default function VotingScreen({ socket }: Props) {
  const currentDrawing = useAppSelector(selectCurrentDrawing);

  const [isDone, setIsDone] = useState(false);

  return (
    <>
      {!isDone ? (
        <Container>
          <header></header>
          {currentDrawing && <DrawingCanvas drawing={currentDrawing} size={400}></DrawingCanvas>}
          <div>
            <OptionsHeading>What do you think the original phrase is?</OptionsHeading>
            <PhrasesVotingList socket={socket} onVote={() => setIsDone(true)}></PhrasesVotingList>
          </div>
        </Container>
      ) : (
        <WaitingMessage>Waiting for other players.</WaitingMessage>
      )}
    </>
  );
}
