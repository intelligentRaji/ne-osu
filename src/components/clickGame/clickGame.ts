import './clickGame.scss';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';
import { BackgroundAudio } from '../backgroundAudio/backgroundAudio';
import { GameField } from '../gameField/gameField';
import { Score } from '../score/score';
import { LifeProgress } from '../lifeProgress/lifeProgress';

export class ClickGame extends BaseComponent {
  private readonly gameField: GameField;
  private readonly lifeProgress: LifeProgress;
  private readonly audio: BackgroundAudio;
  private readonly score: Score;

  constructor({ tag, className, parent }: IBaseComponent) {
    super({ tag, className, parent });
    this.score = new Score({ tag: 'h2', className: ['score'] });
    this.gameField = new GameField({ className: ['game-field'] });
    this.lifeProgress = new LifeProgress({ className: ['life-progress'] });
    this.audio = new BackgroundAudio({ src: './assets/audio/sonny-boy.mp3' });
    this.insertChildren(this.gameField, this.score, this.lifeProgress);
  }
}
