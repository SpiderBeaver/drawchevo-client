import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppSelector } from '../../app/hooks';
import { Player } from '../../domain/Player';
import {
  selectGameRoomHostId,
  selectGameRoomId,
  selectGameRoomPlayers,
  selectMe,
} from '../../features/gameRoom/gameRoomSlice';
import ActionButton from '../elements/ActionButton';
import Container from '../elements/Container';
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

const Header = styled.header`
  margin-bottom: 2em;
`;

const BackButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 0.8em;
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
  const players = useAppSelector(selectGameRoomPlayers);
  const hostId = useAppSelector(selectGameRoomHostId);

  const handleStartGame = () => {
    socket.emit('START_GAME');
  };

  return (
    <Container>
      <Layout>
        <Header>
          <BackButton onClick={onLeave}>quit</BackButton>
        </Header>
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
          <StartGameButton onClick={handleStartGame}>Start game</StartGameButton>
        ) : (
          <WaitingMessage>Waiting for the host to start.</WaitingMessage>
        )}
      </Layout>
    </Container>
  );
}
