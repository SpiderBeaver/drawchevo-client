import { PlayerStatus } from '../domain/Player';

export interface PlayerDto {
  id: number;
  username: string;
  status: PlayerStatus;
}
