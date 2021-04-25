import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../app/hooks';
import { selectVotingOptions } from '../features/gameRoom/gameRoomSlice';

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
}

export default function PhrasesVotingList({ socket }: Props) {
  const votingOptions = useAppSelector(selectVotingOptions)!;

  const handleOptionClick = (option: string) => {
    socket.emit('VOTE_FOR_PHRASE', { phrase: option });
  };

  return (
    <List>
      {votingOptions.map((option) => (
        <ListItem>
          <Button onClick={() => handleOptionClick(option)}>{option}</Button>
        </ListItem>
      ))}
    </List>
  );
}
