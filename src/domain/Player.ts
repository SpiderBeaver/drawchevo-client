export type PlayerStatus =
  | 'idle'
  | 'drawing'
  | 'finished_drawing'
  | 'making_fake_phrase'
  | 'finished_making_fake_phrase';

export interface Player {
  id: number;
  username: string;
  status: PlayerStatus;
}
