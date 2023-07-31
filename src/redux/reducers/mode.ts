import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../store.models';
import { changeGameMode } from '../actions/changeGameMode';

export const modeReducer = createReducer(initialState.mode, (builder) => {
  builder.addCase(changeGameMode, (state, { payload }) => payload);
});
