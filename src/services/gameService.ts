import {
  DEFAULT_LIFE_PROGRESS,
  DEFAULT_SCORE,
  START_SCORE_ON_CLICK,
} from '@/consts/consts';
import { BehaviorSubject } from 'rxjs';

class GameService {
  private readonly lifeProgress$$ = new BehaviorSubject(DEFAULT_LIFE_PROGRESS);
  public readonly activeScore$$ = new BehaviorSubject(START_SCORE_ON_CLICK);
  public readonly score$$ = new BehaviorSubject(DEFAULT_SCORE);
  public lifeProgress$ = this.lifeProgress$$.pipe();

  public updateScore(): void {
    const score = this.score$$.getValue() + this.activeScore$$.getValue();
    this.score$$.next(score);
  }

  public reset(): void {
    this.score$$.next(DEFAULT_SCORE);
    this.activeScore$$.next(START_SCORE_ON_CLICK);
  }

  public updateTime = (time: number): void => {
    this.activeScore$$.next(time);
  };
}

export const gameService = new GameService();
