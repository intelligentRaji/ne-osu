import { ActionsTypes } from '@/consts/enums/actionTypes';
import { StatusTypes } from '@/consts/enums/statusTypes';
import { createAction } from '@reduxjs/toolkit';

export const changeGameStatus = createAction<StatusTypes>(ActionsTypes.SET_STATUS);
