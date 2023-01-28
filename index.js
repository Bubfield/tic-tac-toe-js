import { pubsub } from "./pubsub.js";
import { setUserName } from "./appStateAndFunctions/appStateAndSetters.js";
import { name, enterNameBtn } from "./DOMmanipulation/listOfElements.js";
import { addListener } from "./DOMmanipulation/elementOperations.js";
import { clickEnterNameBtn } from "./DOMmanipulation/eventListenerFunctions.js";
import {
  onGameDraw,
  onGameStart,
  onGameWon,
  onGameWonOrDraw,
} from "./pubsubFunctions.js";

export function onAppStart() {
  addListener(name, "change", (e) => setUserName(e.target.value));
  addListener(enterNameBtn, "click", clickEnterNameBtn);
}

onAppStart();

pubsub.subscribe("click start btn or another round btn", onGameStart);
pubsub.subscribe("setGameStatus to won", onGameWon);
pubsub.subscribe("setGameStatus to won or draw", onGameWonOrDraw);
pubsub.subscribe("setGameStatus to draw", onGameDraw);
pubsub.subscribe("click full restart btn", onAppStart);
