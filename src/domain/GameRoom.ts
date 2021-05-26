import Drawing from './Drawing';
import { Phrase } from './Phrase';
import { Player } from './Player';
import { Vote } from './Vote';

export type GameState =
  | 'NOT_STARTED'
  | 'MAKING_PHRASES'
  | 'DRAWING'
  | 'MAKING_FAKE_PHRASES'
  | 'VOTING'
  | 'SHOWING_VOTING_RESULTS';

export interface GameRoom {
  id: string;
  hostId: number;
  state: GameState;
  players: Player[];
  originalPhrase: Phrase | null;
  currentPlayerId: number | null;
  currentDrawing: Drawing | null;
  votingOptions: Phrase[] | null;
  votes: Vote[];
}
