import { finalize, interval, takeWhile } from 'rxjs';
import { store } from '@/redux/store';
import { StatusTypes } from '@/consts/enums/statusTypes';
import { AudioComponent, IAudioComponent } from '../audioComponent/audioComponent';

export class BackgroundAudio extends AudioComponent {
  constructor({ src }: IAudioComponent) {
    super({ src });
    this.subscribeStore();
  }

  public planeMute(delay = 100): void {
    interval(delay)
      .pipe(
        takeWhile(() => this.getVolume() - 1 >= 0),
        finalize(() => {
          this.stop();
        }),
      )
      .subscribe(() => this.setVolume(this.getVolume() - 1));
  }

  private subscribeStore(): void {
    store.subscribe(() => {
      const { status } = store.getState();
      switch (status) {
        case StatusTypes.START:
          this.play();
          break;

        case StatusTypes.LOSE:
          this.planeMute();
          break;

        case StatusTypes.PENDING:
          this.reset();
          break;

        default:
          break;
      }
    });
  }
}
