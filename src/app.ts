import './global.scss';
import { ClickGame } from './components/clickGame/clickGame';
import { store } from './redux/store';
import { changeGameStatus } from './redux/actions/changeGameStatus';
import { StatusTypes } from './consts/enums/statusTypes';

export class App {
  private readonly root = document.body;

  constructor() {
    new ClickGame({ parent: this.root, className: ['click-game'] });
  }

  public start(): void {
    store.dispatch(changeGameStatus(StatusTypes.PENDING));
  }
}

const app = new App();
app.start();
