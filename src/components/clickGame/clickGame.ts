import './clickGame.scss';
import { CustomEvents } from '@/consts/enums/customEvents';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';
import { Score } from '../score/score';
import { Dot } from '../dot/dot';
import { BackgroundAudio } from '../backgroundAudio/backgroundAudio';

export class ClickGame extends BaseComponent {
  private readonly score: Score;
  private readonly dot: Dot;
  private readonly audio: BackgroundAudio;

  constructor({ tag, className, parent }: IBaseComponent) {
    super({ tag, className, parent });
    this.score = new Score({ tag: 'h2', className: ['score'], parent: this.element });
    this.dot = new Dot({ className: ['dot'], parent: this.element });
    this.audio = new BackgroundAudio({ src: './assets/audio/sonny-boy.mp3' });
    this.dot.notify.on(CustomEvents.dotClick, this.showEcho);
  }

  private showEcho = (params: DOMRect): void => {
    const fieldParams = this.getDOMRect();
    const y = params.y - fieldParams.y;
    const x = params.x - fieldParams.x;
    const echo = new BaseComponent({ className: ['echo'], parent: this.element });

    echo.stylize('width', `${params.width}px`);
    echo.stylize('height', `${params.height}px`);
    echo.stylize('top', `${y}px`);
    echo.stylize('left', `${x}px`);
    echo.stylize('transition', 'all 0.5s linear 0s');

    setTimeout(() => {
      echo.stylize('opacity', '0');
      echo.stylize('borderWidth', '1px');
      echo.stylize('transform', 'scale(1.3)');
      echo.addEvent('transitionend', () => {
        echo.destroy();
      });
    });
  };
}
