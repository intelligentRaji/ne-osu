import './score.scss';
import { gameService } from '@/services/gameService';
import { store } from '@/redux/store';
import { StatusTypes } from '@/consts/enums/statusTypes';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';

export class Score extends BaseComponent {
  constructor({ tag, className, parent }: IBaseComponent) {
    super({ tag, className, parent });
    gameService.score$$.subscribe(this.showScore);
    this.subscribeStore();
  }

  public loadData(): void {
    gameService.score$$.subscribe(this.showScore);
  }

  private showScore = (score: number): void => {
    this.setTextContent(String(score));
  };

  private subscribeStore(): void {
    store.subscribe(() => {
      const { status } = store.getState();
      switch (status) {
        case StatusTypes.START:
          this.addClass('started');
          break;

        case StatusTypes.PENDING:
          this.removeClass('started');
          break;

        default:
          break;
      }
    });
  }
}
