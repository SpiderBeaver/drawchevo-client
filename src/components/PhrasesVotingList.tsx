import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../app/hooks';
import { Phrase } from '../domain/Phrase';
import { selectVotingOptions } from '../features/gameRoom/gameRoomSlice';
import { shuffle } from '../utils';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 1em;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5em;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #191d21;
  border-radius: 8px;
`;

interface Props {
  socket: Socket;
  onVote?: () => void;
}

export default function PhrasesVotingList({ socket, onVote }: Props) {
  const votingOptions = useAppSelector(selectVotingOptions)!;
  const votingOptionsShuffled = shuffle(votingOptions);

  const handleOptionClick = (phrase: Phrase) => {
    socket.emit('VOTE_FOR_PHRASE', { phrasePlayerId: phrase.authorId });
    onVote?.();
  };

  return (
    <List>
      {votingOptionsShuffled.map((option) => (
        <ListItem>
          <Button onClick={() => handleOptionClick(option)}>{option.text}</Button>
        </ListItem>
      ))}
    </List>
  );
}
