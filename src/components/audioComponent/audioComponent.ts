export interface IAudioComponent {
  src?: string;
}

export class AudioComponent {
  protected readonly element: HTMLAudioElement;

  constructor({ src }: IAudioComponent) {
    this.element = new Audio();
    this.element.volume = 0.1;
    if (src) {
      this.element.src = src;
    }
  }

  public play(): void {
    this.element.play();
  }

  protected setSrc(path: string): void {
    this.element.src = path;
  }

  protected replay(): void {
    this.element.currentTime = 0;
    this.play();
  }

  public reset(): void {
    this.element.currentTime = 0;
  }

  public setVolume(value: number): void {
    this.element.volume = value / 100;
  }

  public getVolume(): number {
    return this.element.volume * 100;
  }

  public stop(): void {
    this.element.pause();
  }
}
