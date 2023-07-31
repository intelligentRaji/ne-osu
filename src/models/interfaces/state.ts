import { GameModes } from '@/consts/enums/gameModes';
import { StatusTypes } from '@/consts/enums/statusTypes';

export interface State {
  status: StatusTypes;
  mode: GameModes;
}
