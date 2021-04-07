import { Player } from './Player';

export type GameState = 'NOT_STARTED' | 'DRAWING';

export interface GameRoom {
  id: string;
  hostId: number;
  state: GameState;
  players: Player[];
  originalPhrase: string | undefined;
}
