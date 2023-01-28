import { pubsub } from "../pubsub.js";
import {
  placeMark,
  setUserAIMarks,
  restartApp,
  restartRnd,
  checkIfNOWinnerOrDraw,
} from "../appStateAndFunctions/appFunctions.js";
import {
  setGameStatus,
  whoseTurn,
  user,
  openSquares,
  AI,
} from "../appStateAndFunctions/appStateAndSetters.js";
import { assignText } from "./elementOperations.js";

export function clickSquares(e) {
  if (checkIfNOWinnerOrDraw()) {
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
  restartApp();
  pubsub.publish("restart app");
}

export function clickAnotherRndBtn() {
  restartRnd();
  pubsub.publish("restart round");
}

export function clickEnterNameBtn() {
  pubsub.publish("click enter btn");
}

export function clickStartBtn() {
  setGameStatus("active");
  pubsub.publish("setGameStatus to active");
}

export function clickXorOMark(mark) {
  setUserAIMarks(mark);
  pubsub.publish("click X or O mark");
}
