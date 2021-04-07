export interface Player {
  id: number;
}

export interface GameRoom {
  id: string;
  hostId: number;
  players: Player[];
}
