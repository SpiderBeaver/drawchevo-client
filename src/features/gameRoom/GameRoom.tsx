import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import DrawingBoard from '../../components/DrawingBoard';
import DrawingCanvas from '../../components/DrawingCanvas';
import DrawingScreen from '../../components/DrawingScreen';
import FakePhraseScreen from '../../components/FakePhraseScreen';
import LobbyScreen from '../../components/LobbyScreen';
import PhrasesVotingList from '../../components/PhrasesVotingList';
import VotingResultsScreen from '../../components/VotingResultsScreen';
import Drawing from '../../domain/Drawing';
import { drawingToDto } from '../../dto/DrawingDto';
import {
  selectCurrentDrawing,
  selectGameRoomHostId,
  selectGameRoomId,
  selectGameRoomPlayers,
  selectGameRoomState,
  selectMe,
  selectOriginalPhrase,
  selectVotes,
  selectVotingOptions,
} from './gameRoomSlice';

interface Props {
  socket: Socket;
}

export default function GameRoom({ socket }: Props) {
  const gameState = useAppSelector(selectGameRoomState);
  const originalPhrase = useAppSelector(selectOriginalPhrase);
  const currentDrawing = useAppSelector(selectCurrentDrawing);
  const votingOptions = useAppSelector(selectVotingOptions);

  const handleDrawingDone = (drawing: Drawing) => {
    const drawingDto = drawingToDto(drawing);
    socket.emit('DRAWING_DONE', { drawing: drawingDto });
  };

  return (
    <>
      {(() => {
        switch (gameState) {
          case 'NOT_STARTED':
            return <LobbyScreen socket={socket}></LobbyScreen>;
          case 'DRAWING':
            return <DrawingScreen socket={socket}></DrawingScreen>;
          case 'MAKING_FAKE_PHRASES':
            return <FakePhraseScreen socket={socket}></FakePhraseScreen>;
          case 'VOTING':
            return (
              <div>
                {currentDrawing && <DrawingCanvas drawing={currentDrawing} size={400}></DrawingCanvas>}
                {votingOptions && <PhrasesVotingList socket={socket} options={votingOptions}></PhrasesVotingList>}
              </div>
            );
          case 'SHOWING_VOTING_RESULTS':
            return <VotingResultsScreen socket={socket}></VotingResultsScreen>;
        }
      })()}
    </>
  );
}
