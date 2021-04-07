import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import {
  selectGameRoomHostId,
  selectGameRoomId,
  selectGameRoomPlayers,
  selectGameRoomState,
  selectMe,
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

  const handleStartGame = () => {
    socket.emit('START_GAME');
  };

  return (
    <div>
      <h2>
        Welcome to room {roomId} {me?.username}
      </h2>
      <h3>Players</h3>
      <ul>
        {players?.map((player) => (
          <li>{player.username}</li>
        ))}
      </ul>
      {me && me.id === hostId ? <button onClick={handleStartGame}>Start game</button> : <p>Waiting for the host</p>}
      {gameState && <p>{gameState}</p>}
    </div>
  );
}
