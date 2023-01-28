import { pubsub } from "../pubsub.js";
import {
  placeMark,
  checkForWinOrDraw,
  resetAppStateFully,
  restartRnd,
  setUserAIMarks,
} from "../appStateAndFunctions/appFunctions.js";
import {
  whoseTurn,
  user,
  openSquares,
  AI,
  setGameStatus,
  userName,
} from "../appStateAndFunctions/appStateAndSetters.js";
import {
  addListener,
  assignText,
  changeElementDisplay,
} from "./elementOperations.js";
import {
  XorODiv,
  whatIsNameDiv,
  hello,
  noteDiv,
  winText,
  drawDiv,
  gameboard,
  restartBtn,
  anotherRndBtn,
  startBtn,
  X,
  O,
  name,
  gameboardSquares,
} from "./listOfElements.js";

export function clickSquares(e) {
  if (!checkForWinOrDraw()) {
    executePlayerMove(e);
    executeAIMove();
  }
  pubsub.publish("setGameStatus to won");
  pubsub.publish("setGameStatus to won or draw");
  pubsub.publish("setGameStatus to draw");
}

function executePlayerMove(e) {
  const square = e.target;
  const squareIndex = square.id - 1;
  if (!square.textContent && whoseTurn === "User") {
    assignText(square, user.mark);
    placeMark(user, squareIndex);
  }
}

function calculateAIMove() {
  const randomIndex = Math.floor(Math.random() * openSquares.length);
  const randomSquare = document.getElementById(openSquares[randomIndex]);
  const squareIndex = openSquares[randomIndex] - 1;
  return { randomSquare, squareIndex };
}

export function executeAIMove() {
  const { randomSquare, squareIndex } = calculateAIMove();
  setTimeout(() => {
    if (whoseTurn === "AI") {
      assignText(randomSquare, AI.mark);
      placeMark(AI, squareIndex);
    }
  }, 2000);
}

export function clickRestartBtn() {
  resetAppStateFully();
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
  pubsub.publish("click full restart btn");
}

export function clickAnotherRndBtn() {
  restartRnd();
  assignText(gameboardSquares, "", "a");
  assignText(winText, "");
  changeElementDisplay(drawDiv, "none");
  changeElementDisplay(restartBtn, "none");
  changeElementDisplay(anotherRndBtn, "none");
  pubsub.publish("click start btn or another round btn");
}

export function clickEnterNameBtn() {
  assignText(hello, `Hello ${userName}!`);
  changeElementDisplay(hello, "block");
  changeElementDisplay(XorODiv, "block");
  changeElementDisplay(whatIsNameDiv, "none");
  addListener(X, "click", () => clickXorOMark("X"));
  addListener(O, "click", () => clickXorOMark("O"));
}

export function clickStartBtn() {
  changeElementDisplay(startBtn, "none");
  changeElementDisplay(noteDiv, "none");
  changeElementDisplay(XorODiv, "none");
  changeElementDisplay(hello, "none");
  changeElementDisplay(gameboard, "flex");
  setGameStatus("active");
  pubsub.publish("click start btn or another round btn");
}

export function clickXorOMark(mark) {
  setUserAIMarks(mark);
  changeElementDisplay(startBtn, "inline-block");
  addListener(startBtn, "click", clickStartBtn);
}
