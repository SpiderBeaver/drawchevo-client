import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectGameRoomId, selectGameRoomPlayers } from './gameRoomSlice';

export default function GameRoom() {
  const roomId = useAppSelector(selectGameRoomId);
  const players = useAppSelector(selectGameRoomPlayers);

  return (
    <div>
      <h2>Welcome to room {roomId}</h2>
      <h3>Players</h3>
      <ul>
        {players?.map((player) => (
          <li>{player.id}</li>
        ))}
      </ul>
    </div>
  );
}
