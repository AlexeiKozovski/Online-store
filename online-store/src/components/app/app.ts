export class App {
  appView: AppView;

  constructor() {
    this.appView = new AppView();
  }

  start(): void {
    this.appView.viewContent();
  }
}

export default App;
