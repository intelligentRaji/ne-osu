import { createReducer } from '@reduxjs/toolkit';
import { changeGameStatus } from '../actions/changeGameStatus';
import { initialState } from '../store.models';

export const statusReducer = createReducer(initialState.status, (builder) => {
  builder.addCase(changeGameStatus, (state, { payload }) => payload);
});
