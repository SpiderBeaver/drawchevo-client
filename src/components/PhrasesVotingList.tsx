import React from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  options: string[];
  socket: Socket;
}

export default function PhrasesVotingList({ options, socket }: Props) {
  const handleOptionClick = (option: string) => {
    socket.emit('VOTE_FOR_PHRASE', { phrase: option });
  };

  return (
    <ul>
      {options.map((option) => (
        <li>
          <button onClick={() => handleOptionClick(option)}>{option}</button>
        </li>
      ))}
    </ul>
  );
}
