import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

export default function FakePhraseForm({ socket }: Props) {
  const [text, setText] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit('FAKE_PHRASE_DONE', { text: text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
      <input type="submit" value="Sumbit"></input>
    </form>
  );
}
