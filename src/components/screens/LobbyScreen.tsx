import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Player } from '../../domain/Player';
import {
  gameQuit,
  selectGameRoomHostId,
  selectGameRoomId,
  selectGameRoomPlayers,
  selectMe,
} from '../../features/gameRoom/gameRoomSlice';
import ActionButton from '../elements/ActionButton';
import Container from '../elements/Container';
import InGameHeader from '../elements/header/InGameHeader';
import Heading from '../elements/Heading';

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr auto;
  grid-template-areas:
    'header'
    'heading'
    'room-id-line'
    'players-count'
    'players-list'
    'start-button';
`;

const RoomIdLine = styled.p`
  color: #ffffff;
  font-size: 1.1em;
  margin-top: 0;
  margin-bottom: 2em;
`;

const RoomId = styled.span`
  font-weight: 700;
`;

const PlayersCount = styled.p`
  color: #ffffff;
  margin-top: 0;
`;

const PlayersList = styled.ul`
  margin: 0;
  list-style-type: none;
  padding: 0;
  overflow-y: scroll;
`;

const PlayersListItem = styled.li`
  color: #ffffff;
  background-color: #323a43;
  padding: 0.6em;
  border-radius: 8px;
  margin-bottom: 0.5em;
`;

const MinimumPlayersMessage = styled.p`
  color: #ffffff;
`;

const StartGameButton = styled(ActionButton)`
  justify-self: end;
  margin-top: 1em;
`;

const WaitingMessage = styled.p`
  color: #ffffff;
`;

interface Props {
  socket: Socket;
  onLeave?: () => void;
}

export default function LobbyScreen({ socket, onLeave }: Props) {
  const roomId = useAppSelector(selectGameRoomId);
  const me = useAppSelector(selectMe);
  const players = useAppSelector(selectGameRoomPlayers)!;
  const hostId = useAppSelector(selectGameRoomHostId);

  const handleStartGame = () => {
    socket.emit('START_GAME');
  };

  return (
    <Container>
      <Layout>
        <InGameHeader socket={socket}></InGameHeader>
        <Heading>Waiting for players</Heading>
        <RoomIdLine>
          Room ID: <RoomId>{roomId}</RoomId>
        </RoomIdLine>
        <PlayersCount>{players?.length} players connected</PlayersCount>
        <PlayersList>
          {players?.map((player) => (
            <PlayersListItem>{player.username}</PlayersListItem>
          ))}
        </PlayersList>
        {me && me.id === hostId ? (
          players.length < 4 ? (
            <MinimumPlayersMessage>At least 4 players requred to start the game.</MinimumPlayersMessage>
          ) : (
            <StartGameButton onClick={handleStartGame}>Start game</StartGameButton>
          )
        ) : (
          <WaitingMessage>Waiting for the host to start.</WaitingMessage>
        )}
      </Layout>
    </Container>
  );
}
