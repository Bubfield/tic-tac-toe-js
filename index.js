import { user, gameStatus } from "./appStateAndSetters.js";

import { displayDraw, displayWin } from "./domManipulation.js";

import {
  displayAnotherRoundBtn,
  displayRestart,
  displayGameBoard,
  inputUserName,
  enterName,
  AIMove,
  displayStartButton,
} from "./eventListeners.js";
import { pubsub } from "./pubsub.js";

//OnAppStart function
export function onGameStatusChange() {
  if (gameStatus === "new") {
    inputUserName();
    enterName();
  } else if (gameStatus === "active") {
    displayGameBoard();
    if (user.mark === "O") {
      AIMove();
    }
  } else if (gameStatus === "won") {
    displayWin();
  } else if (gameStatus === "draw") {
    displayDraw();
  }
  if (gameStatus === "won" || gameStatus === "draw") {
    displayRestart();
    displayAnotherRoundBtn();
  }
}

onGameStatusChange();
pubsub.subscribe("setGameStatus", onGameStatusChange);
pubsub.subscribe("setUser", displayStartButton);
