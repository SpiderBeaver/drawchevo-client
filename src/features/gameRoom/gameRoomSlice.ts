import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GameRoom } from '../../domain/GameRoom';

interface GameRoomState {
  room: GameRoom | null;
  myPlayerId: number | null;
}

const initialState: GameRoomState = {
  room: null,
  myPlayerId: null,
};

const gameRoomSlice = createSlice({
  name: 'gameRoom',
  initialState: initialState,
  reducers: {
    roomStateUpdated: (state, action: PayloadAction<{ newState: GameRoom }>) => {
      const newRoomState = action.payload.newState;
      state.room = {
        id: newRoomState.id,
        hostId: newRoomState.hostId,
        state: newRoomState.state,
        players: newRoomState.players,
      };
    },
    playerIdAssigned: (state, action: PayloadAction<{ playerId: number }>) => {
      state.myPlayerId = action.payload.playerId;
    },
    playerJoined: (state, action: PayloadAction<{ playerId: number }>) => {
      state.room?.players.push({ id: action.payload.playerId });
    },
    gameStarted: (state) => {
      if (state.room) {
        state.room.state = 'STARTED';
      }
    },
  },
});

export const { roomStateUpdated, playerIdAssigned, playerJoined, gameStarted } = gameRoomSlice.actions;

export const selectGameRoomId = (state: RootState) => state.gameRoom.room?.id;
export const selectGameRoomHostId = (state: RootState) => state.gameRoom.room?.hostId;
export const selectGameRoomState = (state: RootState) => state.gameRoom.room?.state;
export const selectGameRoomPlayers = (state: RootState) => state.gameRoom.room?.players;
export const selectMe = (state: RootState) =>
  state.gameRoom.room?.players.find((p) => p.id === state.gameRoom.myPlayerId);

export default gameRoomSlice.reducer;
