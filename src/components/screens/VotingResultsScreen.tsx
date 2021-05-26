import React from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import {
  selectGameRoomHostId,
  selectGameRoomPlayers,
  selectMe,
  selectVotes,
  selectVotingOptions,
} from '../../features/gameRoom/gameRoomSlice';
import ActionButton from '../elements/ActionButton';
import Container from '../elements/Container';
import Heading from '../elements/Heading';

const Layout = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    'header'
    'heading'
    'votes'
    'button';
`;

const PhrasesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  color: #ffffff;
`;

const PhrasesListItem = styled.li``;

const PhraseHeading = styled.h3`
  font-size: 1.1em;
  font-weight: 400;
`;

const Phrase = styled.div`
  border: 1px solid #191d21;
  border-radius: 8px;
  padding: 1em;
  font-size: 0.9em;
`;

const PhraseText = styled.p`
  margin: 0 0 1em 0;
`;

const VotesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const VotesListItem = styled.li`
  background-color: #56616d;
  color: #000000;
  padding: 0.3em 0.5em;
  border-radius: 0.3em;
  margin-right: 1em;
`;

interface Props {
  socket: Socket;
}

export default function VotingResultsScreen({ socket }: Props) {
  const hostId = useAppSelector(selectGameRoomHostId)!;
  const me = useAppSelector(selectMe)!;
  const players = useAppSelector(selectGameRoomPlayers)!;
  const votingOptions = useAppSelector(selectVotingOptions)!;
  const votes = useAppSelector(selectVotes)!;

  const handleNextRoundButton = () => {
    socket.emit('START_NEXT_ROUND');
  };

  return (
    <Container>
      <Layout>
        <header></header>
        <Heading>Voting results</Heading>

        <PhrasesList>
          {votingOptions.map((phrase) => (
            <PhrasesListItem>
              <PhraseHeading>{players.find((player) => player.id === phrase.authorId)!.username}</PhraseHeading>
              <Phrase>
                <PhraseText>{phrase.text}</PhraseText>
                <VotesList>
                  {votes
                    .filter((vote) => vote.phrase.authorId === phrase.authorId)
                    .map((vote) => (
                      <VotesListItem>{players.find((player) => player.id === vote.playerId)!.username}</VotesListItem>
                    ))}
                </VotesList>
              </Phrase>
            </PhrasesListItem>
          ))}
        </PhrasesList>

        {me && me.id === hostId ? <ActionButton onClick={handleNextRoundButton}>Next round</ActionButton> : null}
      </Layout>
    </Container>
  );
}
