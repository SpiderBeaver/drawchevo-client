export type GameState = 'NOT_STARTED' | 'STARTED';

export interface Player {
  id: number;
  username: string;
}

export interface GameRoom {
  id: string;
  hostId: number;
  state: GameState;
  players: Player[];
}
