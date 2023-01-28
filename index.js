import { pubsub } from "./pubsub.js";
import {
  user,
  gameStatus,
  whoWon,
  setUserName,
} from "./appStateAndFunctions/appStateAndSetters.js";
import {
  winDiv,
  restartBtn,
  anotherRndBtn,
  drawDiv,
  winText,
  name,
  enterNameBtn,
  gameboardSquares,
} from "./DOMmanipulation/listOfElements.js";
import {
  addListener,
  assignText,
  changeElementDisplay,
} from "./DOMmanipulation/elementOperations.js";
import {
  clickAnotherRndBtn,
  clickRestartBtn,
  executeAIMove,
  clickEnterNameBtn,
  clickSquares,
} from "./DOMmanipulation/eventListenerFunctions.js";

export function onAppStart() {
  addListener(name, "change", (e) => setUserName(e.target.value));
  addListener(enterNameBtn, "click", clickEnterNameBtn);
}

onAppStart();

pubsub.subscribe("click start btn or another round btn", () => {
  if (gameStatus === "active") {
    addListener(gameboardSquares, "click", (e) => clickSquares(e));
    if (user.mark === "O") {
      executeAIMove();
    }
  }
});
pubsub.subscribe("setGameStatus to won", () => {
  if (gameStatus === "won") {
    assignText(winText, `${whoWon} won!`);
    changeElementDisplay(winDiv, "block");
  }
});
pubsub.subscribe("setGameStatus to won or draw", () => {
  if (gameStatus === "won" || gameStatus === "draw") {
    changeElementDisplay(restartBtn, "inline-block");
    changeElementDisplay(anotherRndBtn, "inline-block");
    addListener(restartBtn, "click", clickRestartBtn);
    addListener(anotherRndBtn, "click", clickAnotherRndBtn);
  }
});
pubsub.subscribe("setGameStatus to draw", () => {
  if (gameStatus === "draw") {
    changeElementDisplay(drawDiv, "block");
  }
});
pubsub.subscribe("click full restart btn", () => {
  onAppStart();
});
