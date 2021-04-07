export interface Player {
  id: number;
}

export interface GameRoom {
  id: string;
  players: Player[];
}
