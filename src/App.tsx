import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TitleScreen from './components/TitleScreen';
import { GameRoomDto } from './dto/GameRoomDto';
import { PlayerDto } from './dto/PlayerDto';
import GameRoomComponent from './features/gameRoom/GameRoom';
import { playerJoined, roomStateUpdated, selectGameRoomId } from './features/gameRoom/gameRoomSlice';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const roomId = useAppSelector(selectGameRoomId);

  console.log(roomId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io('ws://localhost:3001');

    newSocket.on('connect', () => {
      console.log(`Connected ${newSocket.id}`);
    });

    newSocket.on('disconnect', () => {
      console.log(`Disconnected ${newSocket.id}`);
    });

    newSocket.on('UPDATE_ROOM_STATE', ({ room }: { room: GameRoomDto }) => {
      dispatch(roomStateUpdated({ newState: room }));
    });

    newSocket.on('PLAYER_JOINED', ({ player }: { player: PlayerDto }) => {
      dispatch(playerJoined({ playerId: player.id }));
    });

    setSocket(newSocket);
  }, [dispatch]);

  return (
    <div className="App">
      {roomId !== undefined ? (
        <GameRoomComponent></GameRoomComponent>
      ) : (
        <div>{socket && <TitleScreen socket={socket}></TitleScreen>}</div>
      )}
    </div>
  );
}

export default App;
