export type PlayerStatus = 'idle' | 'drawing' | 'finished_drawing';

export interface Player {
  id: number;
  username: string;
  status: PlayerStatus;
}
