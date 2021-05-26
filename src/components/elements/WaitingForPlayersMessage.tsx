import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 2em;
  margin-top: 5em;
`;

export default function WaitingForPlayersMessage() {
  return <Message>Waiting for other players.</Message>;
}
