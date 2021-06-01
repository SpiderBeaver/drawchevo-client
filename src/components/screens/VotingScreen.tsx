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
import Container from '../elements/Container';
import InGameHeader from '../elements/header/InGameHeader';
import WaitingForPlayersMessage from '../elements/WaitingForPlayersMessage';
import PhrasesVotingList from '../PhrasesVotingList';

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'drawing'
    'phrases';
`;

const OptionsHeading = styled.h3`
  font-size: 1.2em;
  font-weight: 400;
  color: #ffffff;
`;

interface Props {
  socket: Socket;
}

export default function VotingScreen({ socket }: Props) {
  const currentDrawing = useAppSelector(selectCurrentDrawing)!;
  const me = useAppSelector(selectMe)!;
  const currentPlayerId = useAppSelector(selectCurrentPlayerId)!;
  const originalPhrase = useAppSelector(selectOriginalPhrase)!;

  const [isDone, setIsDone] = useState(false);

  return (
    <>
      {!isDone && currentPlayerId !== me.id && originalPhrase.authorId !== me.id ? (
        <Container>
          <Layout>
            <InGameHeader socket={socket}></InGameHeader>
            <DrawingCanvas drawing={currentDrawing} size={400}></DrawingCanvas>
            <div>
              <OptionsHeading>What do you think the original phrase is?</OptionsHeading>
              <PhrasesVotingList socket={socket} onVote={() => setIsDone(true)}></PhrasesVotingList>
            </div>
          </Layout>
        </Container>
      ) : (
        <Container>
          <InGameHeader socket={socket}></InGameHeader>
          <WaitingForPlayersMessage></WaitingForPlayersMessage>
        </Container>
      )}
    </>
  );
}
