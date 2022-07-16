import { AppView } from '../view/appView';
import { Item } from '../model/item';

export class App {
  appView: AppView;

  constructor(filter: HTMLElement, items: Item[]) {
    this.appView = new AppView(filter, items);
  }

  start(): void {
    this.appView.viewContent();
  }
}

export default App;
