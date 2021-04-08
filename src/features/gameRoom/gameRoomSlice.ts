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
        originalPhrase: newRoomState.originalPhrase,
      };
    },
    playerIdAssigned: (state, action: PayloadAction<{ playerId: number }>) => {
      state.myPlayerId = action.payload.playerId;
    },
    playerJoined: (state, action: PayloadAction<{ playerId: number; username: string }>) => {
      state.room?.players.push({ id: action.payload.playerId, username: action.payload.username, status: 'idle' });
    },
    gameStarted: (state) => {
      if (state.room) {
        state.room.state = 'DRAWING';
      }
    },
    playerFinihedDrawing: (state, action: PayloadAction<{ playerId: number }>) => {
      const player = state.room?.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.status = 'finished_drawing';
      }
    },
  },
});

export const {
  roomStateUpdated,
  playerIdAssigned,
  playerJoined,
  gameStarted,
  playerFinihedDrawing,
} = gameRoomSlice.actions;

export const selectGameRoomId = (state: RootState) => state.gameRoom.room?.id;
export const selectGameRoomHostId = (state: RootState) => state.gameRoom.room?.hostId;
export const selectGameRoomState = (state: RootState) => state.gameRoom.room?.state;
export const selectGameRoomPlayers = (state: RootState) => state.gameRoom.room?.players;
export const selectMe = (state: RootState) =>
  state.gameRoom.room?.players.find((p) => p.id === state.gameRoom.myPlayerId);
export const selectOriginalPhrase = (state: RootState) => state.gameRoom.room?.originalPhrase;

export default gameRoomSlice.reducer;
