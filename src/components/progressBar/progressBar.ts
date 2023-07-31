import './progressBar.scss';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent, IBaseComponent } from '../baseComponent/baseComponent';

export interface IProgressBar extends Omit<IBaseComponent, 'tag'> {
  value?: number;
  max?: number;
}

const DEFAULT_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;

export class ProgressBar extends BaseComponent {
  private readonly progress: BaseComponent;
  protected readonly maxValue = new BehaviorSubject(DEFAULT_MAX_VALUE);
  protected readonly value = new BehaviorSubject(DEFAULT_VALUE);

  constructor({ className = [], parent, value, max }: IProgressBar) {
    super({ className: ['progress-bar', ...className], parent });
    this.progress = new BaseComponent({
      className: ['progress-bar-progress'],
      parent: this.getNode(),
    });
    this.value.subscribe(this.displayProgress);
    this.maxValue.subscribe(this.displayProgress);
    if (value) {
      this.setValue(value);
    }
    if (max) {
      this.setMaxValue(max);
    }
  }

  private displayProgress = (currentProgress: number): void => {
    const progress = (currentProgress / this.maxValue.getValue()) * 100;
    this.progress.stylize('width', `${progress}%`);
  };

  public setValue(value: number): void {
    this.value.next(value);
  }

  public getValue(): number {
    return this.value.getValue();
  }

  public setMaxValue(value: number): void {
    this.maxValue.next(value);
  }

  public getMaxValue(): number {
    return this.maxValue.getValue();
  }
}
