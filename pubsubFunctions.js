import {
  gameStatus,
  whoWon,
  user,
} from "./appStateAndFunctions/appStateAndSetters.js";
import {
  winDiv,
  restartBtn,
  anotherRndBtn,
  drawDiv,
  winText,
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
  clickSquares,
} from "./DOMmanipulation/eventListenerFunctions.js";

export const onGameStart = () => {
  if (gameStatus === "active") {
    addListener(gameboardSquares, "click", (e) => clickSquares(e));
    if (user.mark === "O") {
      executeAIMove();
    }
  }
};

export const onGameWon = () => {
  if (gameStatus === "won") {
    assignText(winText, `${whoWon} won!`);
    changeElementDisplay(winDiv, "block");
  }
};

export const onGameWonOrDraw = () => {
  if (gameStatus === "won" || gameStatus === "draw") {
    changeElementDisplay(restartBtn, "inline-block");
    changeElementDisplay(anotherRndBtn, "inline-block");
    addListener(restartBtn, "click", clickRestartBtn);
    addListener(anotherRndBtn, "click", clickAnotherRndBtn);
  }
};

export const onGameDraw = () => {
  if (gameStatus === "draw") {
    changeElementDisplay(drawDiv, "block");
  }
};
