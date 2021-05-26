import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import DrawingScreen from '../../components/screens/DrawingScreen';
import FakePhraseScreen from '../../components/screens/FakePhraseScreen';
import LobbyScreen from '../../components/screens/LobbyScreen';
import VotingResultsScreen from '../../components/screens/VotingResultsScreen';
import VotingScreen from '../../components/screens/VotingScreen';
import WritePhraseScreen from '../../components/screens/WritePhraseScreen';
import { selectGameRoomState } from './gameRoomSlice';

interface Props {
  socket: Socket;
}

export default function GameRoom({ socket }: Props) {
  const gameState = useAppSelector(selectGameRoomState);

  return (
    <>
      {(() => {
        switch (gameState) {
          case 'NOT_STARTED':
            return <LobbyScreen socket={socket}></LobbyScreen>;
          case 'MAKING_PHRASES':
            return <WritePhraseScreen socket={socket}></WritePhraseScreen>;
          case 'DRAWING':
            return <DrawingScreen socket={socket}></DrawingScreen>;
          case 'MAKING_FAKE_PHRASES':
            return <FakePhraseScreen socket={socket}></FakePhraseScreen>;
          case 'VOTING':
            return <VotingScreen socket={socket}></VotingScreen>;
          case 'SHOWING_VOTING_RESULTS':
            return <VotingResultsScreen socket={socket}></VotingResultsScreen>;
        }
      })()}
    </>
  );
}
