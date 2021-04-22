import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Drawing from '../../domain/Drawing';
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
        // TODO: I don't like that it means different things depending on game state.
        originalPhrase: newRoomState.originalPhrase,
        currentDrawing: newRoomState.currentDrawing,
        votingOptions: newRoomState.votingOptions,
        votes: newRoomState.votes,
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
    startMakingFakePhrases: (state, action: PayloadAction<{ drawing: Drawing }>) => {
      if (state.room) {
        state.room.state = 'MAKING_FAKE_PHRASES';
        state.room.currentDrawing = action.payload.drawing;
        state.room.players.forEach((p) => (p.status = 'making_fake_phrase'));
      }
    },
    playerFinishedMakingFakePhrase: (state, action: PayloadAction<{ playerId: number }>) => {
      if (state.room) {
        const player = state.room.players.find((p) => p.id === action.payload.playerId);
        if (player) {
          player.status = 'finished_making_fake_phrase';
        }
      }
    },
    startVoting: (state, action: PayloadAction<{ options: string[] }>) => {
      if (state.room) {
        state.room.state = 'VOTING';
        state.room.votingOptions = action.payload.options;
        state.room.players.forEach((player) => {
          player.status = 'voting';
        });
      }
    },
    playerFinishedVoting: (state, action: PayloadAction<{ playerId: number }>) => {
      if (state.room) {
        const player = state.room.players.find((player) => player.id === action.payload.playerId);
        if (player) {
          player.status = 'finished_voting';
        }
      }
    },
    showVotingResults: (
      state,
      action: PayloadAction<{
        votes: {
          playerId: number;
          phrase: string;
        }[];
        originalPhrase: string;
      }>
    ) => {
      if (state.room) {
        state.room.state = 'SHOWING_VOTING_RESULTS';
        state.room.originalPhrase = action.payload.originalPhrase;
        state.room.votes = action.payload.votes;
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
  startMakingFakePhrases,
  playerFinishedMakingFakePhrase,
  startVoting,
  playerFinishedVoting,
  showVotingResults,
} = gameRoomSlice.actions;

export const selectGameRoomId = (state: RootState) => state.gameRoom.room?.id;
export const selectGameRoomHostId = (state: RootState) => state.gameRoom.room?.hostId;
export const selectGameRoomState = (state: RootState) => state.gameRoom.room?.state;
export const selectGameRoomPlayers = (state: RootState) => state.gameRoom.room?.players;
export const selectMe = (state: RootState) =>
  state.gameRoom.room?.players.find((p) => p.id === state.gameRoom.myPlayerId);
export const selectOriginalPhrase = (state: RootState) => state.gameRoom.room?.originalPhrase;
export const selectCurrentDrawing = (state: RootState) => state.gameRoom.room?.currentDrawing;
export const selectVotingOptions = (state: RootState) => state.gameRoom.room?.votingOptions;
export const selectVotes = (state: RootState) => state.gameRoom.room?.votes;

export default gameRoomSlice.reducer;
