import {
  user,
  AI,
  openSquares,
  whoseTurn,
  setUserName,
  setGameStatus,
} from "./appStateAndSetters.js";

import {
  thereIsNoWinnerOrDraw,
  placeMark,
  handleMarks,
  fullRestart,
  roundRestart,
} from "./appImportantFunctions.js";

import {
  clearGameBoard,
  clearInputUserName,
  clearWinText,
  displayHello,
  displayNoteDiv,
  displayWhatIsNameDiv,
  XorODiv,
  hideAnotherRoundBtn,
  hideDraw,
  hideGameboard,
  hideHello,
  hideNoteDiv,
  hideRestartBtn,
  hideStartButton,
  hideWhatIsNameDiv,
  hideXorODiv,
} from "./domManipulation.js";

//event listeners and functions they execute
function enterNameOnClick() {
  displayHello();
  setTimeout(() => {
    hideWhatIsNameDiv();
    XorODiv();
    clickOnXorOMarks();
  }, 1000);
}

function enterName() {
  let enterName = document.querySelector(".enter-name");
  enterName.addEventListener("click", () => {
    enterNameOnClick();
  });
}

function inputUserName() {
  let name = document.getElementById("name");
  name.addEventListener("change", (e) => {
    setUserName(e.target.value);
  });
}

function clickOnXorOMarks() {
  let X = document.querySelector(".X");
  let O = document.querySelector(".O");
  X.addEventListener("click", () => {
    handleMarks("X");
  });

  O.addEventListener("click", () => {
    handleMarks("O");
  });
}

function displayGameBoard() {
  let gameboard = document.querySelector(".gameboard");
  gameboard.style.display = "flex";
  handleClickOnGameboardSquares();
}

function displayStartButton() {
  let startButton = document.querySelector(".start-button");
  startButton.style.display = "inline-block";
  handleClickOnStartButton(startButton);
}

function handleClickOnStartButton(startButton) {
  startButton.addEventListener("click", () => {
    hideStartButton(startButton);
    hideNoteDiv();
    hideXorODiv();
    hideHello();
    setGameStatus("active");
  });
}

function playerMove(e, squareIndex) {
  const square = e.target;
  if (!square.textContent && whoseTurn === "User") {
    square.textContent = user.mark;
    placeMark(user, squareIndex);
  }
}

function calculateAIMove() {
  const randomIndex = Math.floor(Math.random() * openSquares.length);
  const randomSquare = document.getElementById(openSquares[randomIndex]);
  return { randomIndex, randomSquare };
}

function AIMove() {
  const { randomIndex, randomSquare } = calculateAIMove();
  const squareIndex = openSquares[randomIndex] - 1;
  setTimeout(() => {
    if (whoseTurn === "AI" && thereIsNoWinnerOrDraw()) {
      randomSquare.textContent = AI.mark;
      placeMark(AI, squareIndex);
    }
  }, 2000);
}

function handleClickOnGameboardSquares() {
  let gameboardSquare = document.querySelectorAll(".gameboard-square");
  gameboardSquare.forEach((square, squareIndex) =>
    square.addEventListener("click", (e) => {
      playerMove(e, squareIndex);
      AIMove();
    })
  );
}

function handleRestartButton(restart) {
  restart.addEventListener("click", () => {
    fullRestart();
    clearGameBoard();
    hideGameboard();
    clearWinText();
    hideDraw();
    hideRestartBtn();
    hideAnotherRoundBtn();
    clearInputUserName();
    displayNoteDiv();
    displayWhatIsNameDiv();
  });
}

function displayRestart() {
  let restart = document.querySelector(".restart");
  restart.style.display = "inline-block";
  handleRestartButton(restart);
}

function handleAnotherRoundBtn(anotherRoundBtn) {
  anotherRoundBtn.addEventListener("click", () => {
    roundRestart();
    clearGameBoard();
    clearWinText();
    hideDraw();
    hideRestartBtn();
    hideAnotherRoundBtn();
  });
}

function displayAnotherRoundBtn() {
  let anotherRoundBtn = document.querySelector(".another-round");
  anotherRoundBtn.style.display = "inline-block";
  handleAnotherRoundBtn(anotherRoundBtn);
}

export {
  displayAnotherRoundBtn,
  displayRestart,
  displayGameBoard,
  inputUserName,
  enterName,
  AIMove,
  displayStartButton,
};
