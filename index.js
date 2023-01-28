import { pubsub } from "./pubsub.js";
import {
  user,
  userName,
  gameStatus,
  whoWon,
  setUserName,
} from "./appStateAndFunctions/appStateAndSetters.js";
import {
  gameboard,
  startBtn,
  winDiv,
  restartBtn,
  anotherRndBtn,
  drawDiv,
  winText,
  name,
  enterNameBtn,
  gameboardSquares,
  noteDiv,
  XorODiv,
  hello,
  whatIsNameDiv,
  X,
  O,
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
  clickStartBtn,
  clickXorOMark,
} from "./DOMmanipulation/eventListenerFunctions.js";

export function onAppStart() {
  addListener(name, "change", (e) => setUserName(e.target.value));
  addListener(enterNameBtn, "click", clickEnterNameBtn);
}

onAppStart();

pubsub.subscribe("click enter btn", () => {
  assignText(hello, `Hello ${userName}!`);
  changeElementDisplay(hello, "block");
  changeElementDisplay(XorODiv, "block");
  changeElementDisplay(whatIsNameDiv, "none");
  addListener(X, "click", () => clickXorOMark("X"));
  addListener(O, "click", () => clickXorOMark("O"));
});
pubsub.subscribe("setGameStatus to active", () => {
  changeElementDisplay(startBtn, "none");
  changeElementDisplay(noteDiv, "none");
  changeElementDisplay(XorODiv, "none");
  changeElementDisplay(hello, "none");
  changeElementDisplay(gameboard, "flex");
  addListener(gameboardSquares, "click", (e) => clickSquares(e));
  if (user.mark === "O") {
    executeAIMove();
  }
});
pubsub.subscribe("click X or O mark", () => {
  changeElementDisplay(startBtn, "inline-block");
  addListener(startBtn, "click", clickStartBtn);
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
pubsub.subscribe("restart app", () => {
  assignText(gameboardSquares, "", "a");
  assignText(winText, "");
  assignText(name, "", "v");
  changeElementDisplay(noteDiv, "block");
  changeElementDisplay(whatIsNameDiv, "block");
  changeElementDisplay(gameboard, "none");
  changeElementDisplay(drawDiv, "none");
  changeElementDisplay(restartBtn, "none");
  changeElementDisplay(anotherRndBtn, "none");
  changeElementDisplay(startBtn, "none");
  onAppStart();
});
pubsub.subscribe("restart round", () => {
  assignText(gameboardSquares, "", "a");
  assignText(winText, "");
  changeElementDisplay(drawDiv, "none");
  changeElementDisplay(restartBtn, "none");
  changeElementDisplay(anotherRndBtn, "none");
});
