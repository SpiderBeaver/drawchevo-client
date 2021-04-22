import React from 'react';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../app/hooks';
import { selectGameRoomHostId, selectMe, selectOriginalPhrase, selectVotes } from '../features/gameRoom/gameRoomSlice';

interface Props {
  socket: Socket;
}

export default function VotingResultsScreen({ socket }: Props) {
  const hostId = useAppSelector(selectGameRoomHostId);
  const me = useAppSelector(selectMe);
  const originalPhrase = useAppSelector(selectOriginalPhrase);
  const votes = useAppSelector(selectVotes);

  const handleNextRoundButton = () => {
    socket.emit('START_NEXT_ROUND');
  };

  return (
    <div>
      <p>Original: {originalPhrase}</p>
      {votes && (
        <ul>
          {votes.map((vote) => (
            <li>
              {vote.playerId} - {vote.phrase}
            </li>
          ))}
        </ul>
      )}
      {me && me.id === hostId ? <button onClick={handleNextRoundButton}>Next round</button> : null}
    </div>
  );
}
