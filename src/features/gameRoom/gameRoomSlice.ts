import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GameRoom } from '../../domain/GameRoom';

interface GameRoomState {
  room: GameRoom | null;
}

const initialState: GameRoomState = {
  room: null,
};

const gameRoomSlice = createSlice({
  name: 'gameRoom',
  initialState: initialState,
  reducers: {
    roomStateUpdated: (state, action: PayloadAction<{ newState: GameRoom }>) => {
      state.room = {
        id: action.payload.newState.id,
        players: action.payload.newState.players,
      };
    },
    playerJoined: (state, action: PayloadAction<{ playerId: string }>) => {
      state.room?.players.push(action.payload.playerId);
    },
  },
});

export const { roomStateUpdated, playerJoined } = gameRoomSlice.actions;

export const selectGameRoomId = (state: RootState) => state.gameRoom.room?.id;
export const selectGameRoomPlayers = (state: RootState) => state.gameRoom.room?.players;

export default gameRoomSlice.reducer;
