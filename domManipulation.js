import { userName, whoWon } from "./appStateAndSetters.js";

//DOM manipulation
function XorODiv() {
  let XorODiv = document.querySelector(".XorO-div");
  XorODiv.style.display = "block";
}

function hideWhatIsNameDiv() {
  let whatIsNameDiv = document.querySelector(".whatisname-div");
  whatIsNameDiv.style.display = "none";
}

function hideStartButton(startButton) {
  startButton.style.display = "none";
}

function hideHello() {
  let hello = document.querySelector(".hello");
  hello.style.display = "none";
}

function displayHello() {
  let hello = document.querySelector(".hello");
  hello.style.display = "block";
  hello.textContent = `Hello ${userName}!`;
}

function hideNoteDiv() {
  let noteDiv = document.querySelector(".note-div");
  noteDiv.style.display = "none";
}

function hideXorODiv() {
  let XorODiv = document.querySelector(".XorO-div");
  XorODiv.style.display = "none";
}

function displayWin() {
  let winText = document.querySelector(".win-text");
  let win = document.querySelector(".win");
  winText.textContent = `${whoWon} won!`;
  win.style.display = "block";
}

function displayDraw() {
  let draw = document.querySelector(".draw");
  draw.style.display = "block";
}

function clearGameBoard() {
  let gameboardSquares = document.querySelectorAll(".gameboard-square");
  gameboardSquares.forEach((square) => (square.textContent = ""));
}

function hideGameboard() {
  let gameboard = document.querySelector(".gameboard");
  gameboard.style.display = "none";
}

function clearWinText() {
  let winText = document.querySelector(".win-text");
  winText.textContent = "";
}

function hideDraw() {
  let drawText = document.querySelector(".draw");
  drawText.style.display = "none";
}

function hideRestartBtn() {
  let restart = document.querySelector(".restart");
  restart.style.display = "none";
}

function hideAnotherRoundBtn() {
  let hideAnotherRoundBtn = document.querySelector(".another-round");
  hideAnotherRoundBtn.style.display = "none";
}

function displayNoteDiv() {
  let noteDiv = document.querySelector(".note-div");
  noteDiv.style.display = "block";
}

function displayWhatIsNameDiv() {
  let whatIsNameDiv = document.querySelector(".whatisname-div");
  whatIsNameDiv.style.display = "block";
}

function clearInputUserName() {
  let name = document.getElementById("name");
  name.value = "";
}

export {
  clearGameBoard,
  clearInputUserName,
  clearWinText,
  displayDraw,
  displayHello,
  displayNoteDiv,
  displayWhatIsNameDiv,
  displayWin,
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
};
