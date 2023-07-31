import { ActionsTypes } from '@/consts/enums/actionTypes';
import { StatusTypes } from '@/consts/enums/statusTypes';
import { IAction } from '@/models/interfaces/action';
import { createAction } from '@reduxjs/toolkit';

export interface IStatusAction extends IAction {
  status: StatusTypes;
}

export const changeGameStatus = createAction<StatusTypes>(ActionsTypes.SET_STATUS);
