import { gameService } from '@/services/gameService';
import { DEFAULT_LIFE_PROGRESS } from '@/consts/consts';
import { IProgressBar, ProgressBar } from '../progressBar/progressBar';

export class LifeProgress extends ProgressBar {
  constructor({ className, parent }: IProgressBar) {
    super({ className, parent, value: DEFAULT_LIFE_PROGRESS });
    gameService.lifeProgress$.subscribe((value: number) => {
      this.setValue(value);
    });
  }
}
