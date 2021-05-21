import { CardsController } from "./Controllers/CardsController.js";

class App {
  cardsController = new CardsController();
}

window["app"] = new App();
