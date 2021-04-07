export type GameState = 'NOT_STARTED' | 'STARTED';

export interface Player {
  id: number;
}

export interface GameRoom {
  id: string;
  hostId: number;
  state: GameState;
  players: Player[];
}
