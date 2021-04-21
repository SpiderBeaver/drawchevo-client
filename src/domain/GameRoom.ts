import Drawing from './Drawing';
import { Player } from './Player';

export type GameState = 'NOT_STARTED' | 'DRAWING' | 'MAKING_FAKE_PHRASES' | 'VOTING';

export interface GameRoom {
  id: string;
  hostId: number;
  state: GameState;
  players: Player[];
  originalPhrase: string | null;
  currentDrawing: Drawing | null;
  votingOptions: string[] | null;
}
