import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import DrawingBoard from '../../components/DrawingBoard';
import DrawingCanvas from '../../components/DrawingCanvas';
import FakePhraseForm from '../../components/FakePhraseForm';
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
  const roomId = useAppSelector(selectGameRoomId);
  const hostId = useAppSelector(selectGameRoomHostId);
  const gameState = useAppSelector(selectGameRoomState);
  const me = useAppSelector(selectMe);
  const players = useAppSelector(selectGameRoomPlayers);
  const originalPhrase = useAppSelector(selectOriginalPhrase);
  const currentDrawing = useAppSelector(selectCurrentDrawing);
  const votingOptions = useAppSelector(selectVotingOptions);
  const votes = useAppSelector(selectVotes);

  const handleStartGame = () => {
    socket.emit('START_GAME');
  };

  const handleDrawingDone = (drawing: Drawing) => {
    const drawingDto = drawingToDto(drawing);
    socket.emit('DRAWING_DONE', { drawing: drawingDto });
  };

  return (
    <div>
      <h2>
        Welcome to room {roomId} {me?.username}
      </h2>
      <h3>Players</h3>
      <ul>
        {players?.map((player) => (
          <li>
            {player.username} ({player.status})
          </li>
        ))}
      </ul>
      {me && me.id === hostId ? <button onClick={handleStartGame}>Start game</button> : <p>Waiting for the host</p>}
      {gameState && <p>{gameState}</p>}

      {(() => {
        switch (gameState) {
          case 'DRAWING':
            return (
              <div>
                <p>Please draw '{originalPhrase}'</p>
                <DrawingBoard onDone={handleDrawingDone}></DrawingBoard>
              </div>
            );
          case 'MAKING_FAKE_PHRASES':
            return (
              <div>
                {currentDrawing && <DrawingCanvas drawing={currentDrawing}></DrawingCanvas>}
                <FakePhraseForm socket={socket}></FakePhraseForm>
              </div>
            );
          case 'VOTING':
            return (
              <div>
                {currentDrawing && <DrawingCanvas drawing={currentDrawing}></DrawingCanvas>}
                {votingOptions && <PhrasesVotingList socket={socket} options={votingOptions}></PhrasesVotingList>}
              </div>
            );
          case 'SHOWING_VOTING_RESULTS':
            return <VotingResultsScreen socket={socket}></VotingResultsScreen>;
        }
      })()}
    </div>
  );
}
