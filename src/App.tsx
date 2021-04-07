import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import TitleScreen from './components/TitleScreen';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io('ws://localhost:3001');

    newSocket.on('connect', () => {
      console.log(`Connected ${newSocket.id}`);
    });

    newSocket.on('disconnect', () => {
      console.log(`Disconnected ${newSocket.id}`);
    });

    newSocket.on('CREATED_ROOM', ({ roomId }: { roomId: string }) => {
      console.log(`Room created ${roomId}`);
      setRoomId(roomId);
    });

    newSocket.on('JOINED_ROOM', ({ roomId }: { roomId: string }) => {
      console.log(`Room joined ${roomId}`);
      setRoomId(roomId);
    });

    setSocket(newSocket);
  }, []);

  return (
    <div className="App">
      {roomId !== null ? (
        <div>Welcome to room {roomId}</div>
      ) : (
        <div>{socket && <TitleScreen socket={socket}></TitleScreen>}</div>
      )}
    </div>
  );
}

export default App;
