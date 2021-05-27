import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppDispatch } from '../../../app/hooks';
import { gameQuit } from '../../../features/gameRoom/gameRoomSlice';

const Header = styled.header`
  margin-bottom: 2em;
`;

const QuitButton = styled.button`
  border: none;
  background: none;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 0.8em;
`;

interface Props {
  socket: Socket;
}

export default function InGameHeader({ socket }: Props) {
  const dispatch = useAppDispatch();

  const handleQuit = () => {
    window.sessionStorage.removeItem('drawchevo_player_token');
    socket.emit('QUIT_GAME');
    dispatch(gameQuit());
  };

  return (
    <Header>
      <QuitButton onClick={handleQuit}>Quit game</QuitButton>
    </Header>
  );
}
