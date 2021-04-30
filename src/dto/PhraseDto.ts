import { Phrase } from '../domain/Phrase';

export interface PhraseDto {
  playerId: number;
  text: string;
}

export function phraseFromDto(dto: PhraseDto): Phrase {
  const phrase: Phrase = {
    playerId: dto.playerId,
    text: dto.text,
  };
  return phrase;
}
