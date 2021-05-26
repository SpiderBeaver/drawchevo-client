import { Phrase } from '../domain/Phrase';

export interface PhraseDto {
  authorId: number;
  drawingPlayerId: number | null;
  text: string;
}

export function phraseFromDto(dto: PhraseDto): Phrase {
  const phrase: Phrase = {
    authorId: dto.authorId,
    drawingPlayerId: dto.drawingPlayerId,
    text: dto.text,
  };
  return phrase;
}
