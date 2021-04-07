import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectGameRoomHostId, selectGameRoomId, selectGameRoomPlayers, selectMe } from './gameRoomSlice';

export default function GameRoom() {
  const roomId = useAppSelector(selectGameRoomId);
  const hostId = useAppSelector(selectGameRoomHostId);
  const me = useAppSelector(selectMe);
  const players = useAppSelector(selectGameRoomPlayers);

  return (
    <div>
      <h2>
        Welcome to room {roomId} {me?.id}
      </h2>
      {me && me.id === hostId ? <p>You are host</p> : null}
      <h3>Players</h3>
      <ul>
        {players?.map((player) => (
          <li>{player.id}</li>
        ))}
      </ul>
    </div>
  );
}
