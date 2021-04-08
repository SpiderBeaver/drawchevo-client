import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TitleScreen from './components/TitleScreen';
import { GameRoom } from './domain/GameRoom';
import { GameRoomDto } from './dto/GameRoomDto';
import { PlayerDto } from './dto/PlayerDto';
import GameRoomComponent from './features/gameRoom/GameRoom';
import {
  gameStarted,
  playerFinihedDrawing,
  playerIdAssigned,
  playerJoined,
  roomStateUpdated,
  selectGameRoomId,
} from './features/gameRoom/gameRoomSlice';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const roomId = useAppSelector(selectGameRoomId);

  console.log(roomId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io('ws://192.168.1.7:3001');

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
        originalPhrase: room.originalPhrase,
      };
      dispatch(roomStateUpdated({ newState: newState }));
    });

    newSocket.on('PLAYER_JOINED', ({ player }: { player: PlayerDto }) => {
      dispatch(playerJoined({ playerId: player.id, username: player.username }));
    });

    newSocket.on('ASSING_PLAYER_ID', ({ playerId }: { playerId: number }) => {
      dispatch(playerIdAssigned({ playerId: playerId }));
    });

    newSocket.on('STARTED_GAME', () => {
      dispatch(gameStarted());
    });

    newSocket.on('PLAYER_FINISHED_DRAWING', ({ playerId }: { playerId: number }) => {
      dispatch(playerFinihedDrawing({ playerId: playerId }));
    });

    setSocket(newSocket);
  }, [dispatch]);

  return (
    <div className="App">
      {socket &&
        (roomId !== undefined ? (
          <GameRoomComponent socket={socket}></GameRoomComponent>
        ) : (
          <TitleScreen socket={socket}></TitleScreen>
        ))}
    </div>
  );
}

export default App;
