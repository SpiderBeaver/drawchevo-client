import { Vote } from '../domain/Vote';
import { PhraseDto, phraseFromDto } from './PhraseDto';

export interface VoteDto {
  playerId: number;
  phrase: PhraseDto;
}

export function voteFromDto(dto: VoteDto): Vote {
  const vote: Vote = {
    playerId: dto.playerId,
    phrase: phraseFromDto(dto.phrase),
  };
  return vote;
}
