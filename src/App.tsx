import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TitleScreen from './components/TitleScreen';
import { GameRoom } from './domain/GameRoom';
import DrawingDto, { drawingFromDto } from './dto/DrawingDto';
import { GameRoomDto } from './dto/GameRoomDto';
import { PhraseDto, phraseFromDto } from './dto/PhraseDto';
import { PlayerDto } from './dto/PlayerDto';
import { VoteDto } from './dto/VoteDto';
import GameRoomComponent from './features/gameRoom/GameRoom';
import {
  gameStarted,
  playerFinihedDrawing,
  playerFinishedMakingFakePhrase,
  playerFinishedVoting,
  playerIdAssigned,
  playerJoined,
  roomStateUpdated,
  selectGameRoomId,
  showVotingResults,
  startMakingFakePhrases,
  startVoting,
} from './features/gameRoom/gameRoomSlice';

const Background = styled.div`
  height: 100%;
  background-color: black;
`;

const Container = styled.div`
  max-width: 40em;
  margin: auto;
  background-color: #292f36;
  height: 100%;
  overflow: auto;
`;

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const roomId = useAppSelector(selectGameRoomId);

  console.log(roomId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io('ws://192.168.1.7:3001');
    //const newSocket = io('wss://drawchevo.spiderbeaver.com/', { path: '/server/socket.io' });

    newSocket.on('connect', () => {
      console.log(`Connected ${newSocket.id}`);
    });

    newSocket.on('disconnect', () => {
      console.log(`Disconnected ${newSocket.id}`);
    });

    newSocket.on('UPDATE_ROOM_STATE', ({ room }: { room: GameRoomDto }) => {
      const newState: GameRoom = {
        id: room.id,
        hostId: room.hostId,
        state: room.state,
        players: room.players.map((player) => ({
          id: player.id,
          username: player.username,
          status: player.status,
        })),
        originalPhrase: room.originalPhrase ? phraseFromDto(room.originalPhrase) : null,
        // TODO: This also needs to be updated
        currentPlayerId: null,
        currentDrawing: null,
        votingOptions: null,
        votes: [],
      };
      dispatch(roomStateUpdated({ newState: newState }));
    });

    newSocket.on('PLAYER_JOINED', ({ player }: { player: PlayerDto }) => {
      dispatch(playerJoined({ playerId: player.id, username: player.username }));
    });

    newSocket.on('ASSING_PLAYER_ID', ({ playerId }: { playerId: number }) => {
      dispatch(playerIdAssigned({ playerId: playerId }));
    });

    newSocket.on('ASSIGN_PLAYER_TOKEN', ({ token }: { token: string }) => {
      window.sessionStorage.setItem('drawchevo_player_token', token);
    });

    newSocket.on('STARTED_GAME', () => {
      dispatch(gameStarted());
    });

    newSocket.on('PLAYER_FINISHED_DRAWING', ({ playerId }: { playerId: number }) => {
      dispatch(playerFinihedDrawing({ playerId: playerId }));
    });

    newSocket.on(
      'START_MAKING_FAKE_PHRASES',
      ({ currentPlayerId, drawing: drawingDto }: { currentPlayerId: number; drawing: DrawingDto }) => {
        const drawing = drawingFromDto(drawingDto);
        dispatch(startMakingFakePhrases({ currentPlayerId: currentPlayerId, drawing: drawing }));
      }
    );

    newSocket.on('PLAYER_FINISHED_MAKING_FAKE_PHRASE', ({ playerId }: { playerId: number }) => {
      dispatch(playerFinishedMakingFakePhrase({ playerId: playerId }));
    });

    newSocket.on('START_VOTING', ({ phrases: phrasesDto }: { phrases: PhraseDto[] }) => {
      const phrases = phrasesDto.map((dto) => phraseFromDto(dto));
      dispatch(startVoting({ phrases: phrases }));
    });

    newSocket.on('PLAYER_FINISHED_VOTING', ({ playerId }: { playerId: number }) => {
      dispatch(playerFinishedVoting({ playerId: playerId }));
    });

    interface ShowVotingResultsPayload {
      votes: VoteDto[];
      originalPhrase: PhraseDto;
    }
    newSocket.on('SHOW_VOTING_RESULTS', ({ votes, originalPhrase }: ShowVotingResultsPayload) => {
      dispatch(showVotingResults({ originalPhrase: originalPhrase, votes: votes }));
    });

    setSocket(newSocket);
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      const playerToken = window.sessionStorage.getItem('drawchevo_player_token');
      if (playerToken) {
        socket.emit('RECONNECT', { playerToken: playerToken });
      }
    }
  }, [socket]);

  return (
    <Background>
      <Container>
        {socket &&
          (roomId !== undefined ? (
            <GameRoomComponent socket={socket}></GameRoomComponent>
          ) : (
            <TitleScreen socket={socket}></TitleScreen>
          ))}
      </Container>
    </Background>
  );
}

export default App;
