import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { statusReducer } from './reducers/status';
import { modeReducer } from './reducers/mode';

const rootReducer = combineReducers({ status: statusReducer, mode: modeReducer });

export const store = configureStore({
  reducer: rootReducer,
});
