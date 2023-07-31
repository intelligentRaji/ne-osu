import './dot.scss';
import {
  fromEvent,
  switchMap,
  interval,
  tap,
  map,
  Observable,
  takeWhile,
  finalize,
} from 'rxjs';
import { getRandomNumber } from '@/utils/getRandomNumber';
import { gameService } from '@/services/gameService';
import { SCORE_DOWN_INTERVAL, START_SCORE_ON_CLICK } from '@/consts/consts';
import { store } from '@/redux/store';
import { changeGameStatus } from '@/redux/actions/changeGameStatus';
import { StatusTypes } from '@/consts/enums/statusTypes';
import { EventEmitter } from '@/services/eventEmitter';
import { CustomEvents } from '@/consts/enums/customEvents';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';

export class Dot extends BaseComponent {
  private readonly timer: BaseComponent;
  private click$: Observable<number>;
  public readonly notify = new EventEmitter();

  constructor({ tag, className, parent }: IBaseComponent) {
    super({ tag, className, parent });
    this.timer = new BaseComponent({
      tag: 'span',
      className: ['timer'],
      parent: this.element,
    });
    gameService.activeScore$$.subscribe(this.showTime);
    this.click$ = fromEvent(this.element, 'click').pipe(
      tap(this.onDotClick),
      switchMap(this.timerOnClick),
      map((value) => value + 1),
      takeWhile((value) => value <= START_SCORE_ON_CLICK),
      finalize(this.lose),
    );
    this.subscribeStore();
  }

  private pending(): void {
    this.addEvent(
      'click',
      () => {
        store.dispatch(changeGameStatus(StatusTypes.START));
      },
      { once: true },
    );
    this.click$.subscribe((count) => {
      gameService.updateTime(START_SCORE_ON_CLICK - count);
    });
    this.element.removeAttribute('style');
    this.timer.setTextContent('Click');
  }

  private subscribeStore(): void {
    store.subscribe(() => {
      const { status } = store.getState();
      switch (status) {
        case StatusTypes.PENDING:
          this.pending();
          break;

        default:
          break;
      }
    });
  }

  private onDotClick = (): void => {
    gameService.updateScore();
    this.showTime(START_SCORE_ON_CLICK);
    this.moveDot();
    this.notify.emit(CustomEvents.dotClick, this.getDOMRect());
  };

  private showTime = (count: number): void => {
    this.timer.setTextContent(String(count));
  };

  private timerOnClick = (): Observable<number> => {
    const interval$ = interval(SCORE_DOWN_INTERVAL);
    return interval$;
  };

  private moveDot = (): void => {
    this.stylize(
      'transitionDuration',
      `${(START_SCORE_ON_CLICK * SCORE_DOWN_INTERVAL) / 1000}s`,
    );
    this.stylize('top', `${getRandomNumber(0, 100)}%`);
    this.stylize('left', `${getRandomNumber(0, 100)}%`);
  };

  private lose = (): void => {
    store.dispatch(changeGameStatus(StatusTypes.LOSE));
  };
}
