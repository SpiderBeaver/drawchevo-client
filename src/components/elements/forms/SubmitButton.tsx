import React from 'react';
import styled from 'styled-components';

const SubmitButtonStyled = styled.input`
  align-self: flex-end;
  margin-top: 1.5em;
  background-color: #e4572e;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 1.2em;
  padding: 0.3em 0.6em;
`;

interface Props {
  text: string;
}

export default function SubmitButton({ text }: Props) {
  return <SubmitButtonStyled type="submit" value={text}></SubmitButtonStyled>;
}
