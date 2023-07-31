import { StatusTypes } from '@/consts/enums/statusTypes';
import { State } from '@/models/interfaces/state';

export const initialState: State = {
  status: StatusTypes.PENDING,
};
