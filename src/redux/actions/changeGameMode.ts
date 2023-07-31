import { ActionsTypes } from '@/consts/enums/actionTypes';
import { GameModes } from '@/consts/enums/gameModes';
import { createAction } from '@reduxjs/toolkit';

export const changeGameMode = createAction<GameModes>(ActionsTypes.SET_MODE);
