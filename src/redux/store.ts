import { configureStore } from '@reduxjs/toolkit';
import { statusReducer } from './reducers/status';

export const store = configureStore({
  reducer: statusReducer,
});
