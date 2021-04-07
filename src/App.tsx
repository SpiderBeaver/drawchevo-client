import React from 'react';
import { io } from 'socket.io-client';
import './App.css';
import TestButton from './components/TestButton';

function App() {
  const socket = io('ws://localhost:3001');

  socket.on('connect', () => {
    console.log(`Connected ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected ${socket.id}`);
  });

  return (
    <div className="App">
      <TestButton socket={socket}></TestButton>
    </div>
  );
}

export default App;
