import './clickGame.scss';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';
import { BackgroundAudio } from '../backgroundAudio/backgroundAudio';
import { GameField } from '../gameField/gameField';
import { Score } from '../score/score';

export class ClickGame extends BaseComponent {
  private readonly gameField: GameField;
  private readonly audio: BackgroundAudio;
  private readonly score: Score;

  constructor({ tag, className, parent }: IBaseComponent) {
    super({ tag, className, parent });
    this.score = new Score({ tag: 'h2', className: ['score'], parent: this.element });
    this.gameField = new GameField({ className: ['game-field'], parent: this.element });
    this.audio = new BackgroundAudio({ src: './assets/audio/sonny-boy.mp3' });
  }
}
