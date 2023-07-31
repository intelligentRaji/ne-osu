import { DEFAULT_COUNT, DEFAULT_TIME, TIME_TO_CLICK } from '@/consts/consts';
import { BehaviorSubject } from 'rxjs';

class GameService {
  private timeToClick = TIME_TO_CLICK;
  public readonly activeScore$$ = new BehaviorSubject(DEFAULT_TIME);
  public readonly score$$ = new BehaviorSubject(DEFAULT_COUNT);

  public getTimeToClick(): number {
    return this.timeToClick;
  }

  public updateTimeToClick(time: number): void {
    this.timeToClick = time;
  }

  public updateScore(): void {
    const score = this.score$$.getValue() + this.activeScore$$.getValue();
    this.score$$.next(score);
  }

  public reset(): void {
    this.score$$.next(DEFAULT_COUNT);
    this.activeScore$$.next(TIME_TO_CLICK);
    this.timeToClick = TIME_TO_CLICK;
  }

  public updateTime = (time: number): void => {
    this.activeScore$$.next(time);
  };
}

export const gameService = new GameService();
