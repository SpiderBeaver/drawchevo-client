import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Drawing from '../../domain/Drawing';
import { GameRoom } from '../../domain/GameRoom';
import { Phrase } from '../../domain/Phrase';
import { Vote } from '../../domain/Vote';

interface GameRoomState {
  room: GameRoom | null;
  myPlayerId: number | null;
}

const initialState: GameRoomState = {
  room: null,
  myPlayerId: null,
};

export interface UpdatePointsActionPayload {
  points: {
    playerId: number;
    points: number;
  }[];
}

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
        currentPlayerId: newRoomState.currentPlayerId,
        currentDrawing: newRoomState.currentDrawing,
        votingOptions: newRoomState.votingOptions,
        votes: newRoomState.votes,
      };
    },
    playerIdAssigned: (state, action: PayloadAction<{ playerId: number }>) => {
      state.myPlayerId = action.payload.playerId;
    },
    playerJoined: (state, action: PayloadAction<{ playerId: number; username: string }>) => {
      state.room?.players.push({
        id: action.payload.playerId,
        username: action.payload.username,
        status: 'idle',
        points: 0,
      });
    },
    gameStarted: (state) => {
      if (state.room) {
        state.room.state = 'MAKING_PHRASES';
      }
    },
    makingPhrasesStarted: (state) => {
      if (state.room) {
        state.room.state = 'MAKING_PHRASES';
      }
    },
    playerFinihedDrawing: (state, action: PayloadAction<{ playerId: number }>) => {
      const player = state.room?.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.status = 'finished_drawing';
      }
    },
    startMakingFakePhrases: (
      state,
      action: PayloadAction<{ currentPlayerId: number; originalPhrase: Phrase; drawing: Drawing }>
    ) => {
      if (state.room) {
        state.room.state = 'MAKING_FAKE_PHRASES';
        state.room.currentPlayerId = action.payload.currentPlayerId;
        state.room.originalPhrase = action.payload.originalPhrase;
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
    startVoting: (state, action: PayloadAction<{ phrases: Phrase[] }>) => {
      if (state.room) {
        state.room.state = 'VOTING';
        state.room.votingOptions = action.payload.phrases;
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
    updatePoints: (state, action: PayloadAction<UpdatePointsActionPayload>) => {
      if (state.room) {
        const room = state.room;
        action.payload.points.forEach((playerPoints) => {
          const player = room.players.find((player) => player.id === playerPoints.playerId)!;
          player.points = playerPoints.points;
        });
      }
    },
    showVotingResults: (state, action: PayloadAction<{ votes: Vote[]; originalPhrase: Phrase }>) => {
      if (state.room) {
        state.room.state = 'SHOWING_VOTING_RESULTS';
        state.room.originalPhrase = action.payload.originalPhrase;
        state.room.votes = action.payload.votes;
      }
    },
    gameQuit: (state) => {
      state.room = null;
      state.myPlayerId = null;
    },
    gameEnded: (state) => {
      state.room = null;
      state.myPlayerId = null;
    },
  },
});

export const {
  roomStateUpdated,
  playerIdAssigned,
  playerJoined,
  gameStarted,
  makingPhrasesStarted,
  playerFinihedDrawing,
  startMakingFakePhrases,
  playerFinishedMakingFakePhrase,
  startVoting,
  playerFinishedVoting,
  updatePoints,
  showVotingResults,
  gameQuit,
  gameEnded,
} = gameRoomSlice.actions;

export const selectGameRoomId = (state: RootState) => state.gameRoom.room?.id;
export const selectGameRoomHostId = (state: RootState) => state.gameRoom.room?.hostId;
export const selectGameRoomState = (state: RootState) => state.gameRoom.room?.state;
export const selectGameRoomPlayers = (state: RootState) => state.gameRoom.room?.players;
export const selectMe = (state: RootState) =>
  state.gameRoom.room?.players.find((p) => p.id === state.gameRoom.myPlayerId);
export const selectOriginalPhrase = (state: RootState) => state.gameRoom.room?.originalPhrase;
export const selectCurrentPlayerId = (state: RootState) => state.gameRoom.room?.currentPlayerId;
export const selectCurrentDrawing = (state: RootState) => state.gameRoom.room?.currentDrawing;
export const selectVotingOptions = (state: RootState) => state.gameRoom.room?.votingOptions;
export const selectVotes = (state: RootState) => state.gameRoom.room?.votes;

export default gameRoomSlice.reducer;
