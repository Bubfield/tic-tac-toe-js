//state variables
let userName = "";
let user = { player: "User", mark: null };
let AI = { player: "AI", mark: null };
let gameStatus = "new";
let openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let activeBoard = ["", "", "", "", "", "", "", "", ""];
let whoseTurn = null;
let whoWon = null;

//state setters
function setUserName(name) {
  userName = name;
}

function setUser(obj) {
  user = obj;
}

function setAI(obj) {
  AI = obj;
}

function setGameStatus(status) {
  gameStatus = status;
}

function setOpenSquares(squares) {
  openSquares = squares;
}

function setActiveBoard(board) {
  activeBoard = board;
}

function setWhoWon(winner) {
  whoWon = winner;
}

function setWhoseTurn(who) {
  whoseTurn = who;
}

//essential functions
const whoGoesFirst = (mark) => {
  if (mark === "X") {
    setWhoseTurn("User");
  } else {
    setWhoseTurn("AI");
  }
};

const fullRestart = () => {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setUserName("");
  setUser({ player: "User", mark: null });
  setAI({ player: "AI", mark: null });
  setGameStatus("new");
  setWhoseTurn(null);
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
};

function roundRestart() {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setGameStatus("active");
  setWhoseTurn(user.mark === "X" ? "User" : "AI");
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
}

const handleMarks = (mark) => {
  setUser({ ...user, mark: mark });
  setAI({ ...AI, mark: mark === "X" ? "O" : "X" });
  whoGoesFirst(mark);
};

const updateActiveBoard = (whichPlayer, whichSquare) => {
  let updatedBoard = [...activeBoard];
  updatedBoard[whichSquare] = whichPlayer;
  setActiveBoard(updatedBoard);
};

const updateOpenSquares = (whichSquare) => {
  setOpenSquares(
    openSquares.filter((squareID) => squareID !== whichSquare + 1)
  );
};

const isAnOpenSquare = (whichSquare) => {
  return openSquares.indexOf(whichSquare + 1) !== -1;
};

const itIsPlayersTurn = (player) => {
  return player === whoseTurn;
};

const placeMark = (whichPlayer, whichSquare) => {
  const { player, mark } = whichPlayer;
  if (isAnOpenSquare(whichSquare) && itIsPlayersTurn(player)) {
    updateActiveBoard(mark, whichSquare);
    updateOpenSquares(whichSquare);
    triggerNextTurn();
  } else {
    return;
  }
};

const triggerNextTurn = () => {
  if (whoseTurn === "User") {
    setWhoseTurn("AI");
  } else {
    setWhoseTurn("User");
  }
};

const setWinner = (mark) => {
  if (mark === user.mark) {
    setWhoWon(userName);
  } else {
    setWhoWon("The Computer");
  }
};

const allSquaresAreOccupied = (one, two, three) => {
  return one && two && three;
};

const allSquaresAreEqual = (one, two, three) => {
  return one === two && one === three;
};

const checkRow = (num1, num2, num3) => {
  let one = activeBoard[num1];
  let two = activeBoard[num2];
  let three = activeBoard[num3];
  if (allSquaresAreOccupied(one, two, three)) {
    if (allSquaresAreEqual(one, two, three)) {
      setWinner(one);
      return true;
    }
  }
};

const checkHorizontalStreaks = () => {
  return checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8);
};

const checkVerticalStreaks = () => {
  return checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8);
};

const checkDiagonalStreaks = () => {
  return checkRow(0, 4, 8) || checkRow(2, 4, 6);
};

const checkForWin = () => {
  return (
    checkHorizontalStreaks() || checkVerticalStreaks() || checkDiagonalStreaks()
  );
};

const checkForDraw = () => {
  return !checkForWin() && !openSquares.length;
};

//DOM manipulation functions
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

//adding event listeners and functions

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
    displayStartButton();
  });

  O.addEventListener("click", () => {
    handleMarks("O");
    displayStartButton();
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
  startButtonFunc(startButton);
}

function handleClickOnStartButton(startButton) {
  hideStartButton(startButton);
  hideNoteDiv();
  hideXorODiv();
  hideHello();
  setGameStatus("active");
  OnAppStart();
}

function startButtonFunc(startButton) {
  startButton.addEventListener("click", () => {
    handleClickOnStartButton(startButton);
  });
}

function playerMove(squareIndex) {
  placeMark(user, squareIndex);
  if (checkForWin()) {
    setGameStatus("won");
    OnAppStart();
  }
  if (checkForDraw()) {
    setGameStatus("draw");
    OnAppStart();
  }
}

function AIMove() {
  let randomIndex = Math.floor(Math.random() * openSquares.length);
  setTimeout(() => {
    if (whoseTurn === "AI" && !whoWon && gameStatus !== "draw") {
      document.getElementById(openSquares[randomIndex]).textContent = AI.mark;
    }
    placeMark(AI, openSquares[randomIndex] - 1);
    if (checkForWin()) {
      setGameStatus("won");
      OnAppStart();
    }
    if (checkForDraw()) {
      setGameStatus("draw");
      OnAppStart();
    }
  }, 2000);
}

function handleClickOnGameboardSquares() {
  let gameboardSquare = document.querySelectorAll(".gameboard-square");
  gameboardSquare.forEach((square, squareIndex) =>
    square.addEventListener("click", (e) => {
      if (!e.target.textContent && whoseTurn === "User") {
        square.textContent = user.mark;
      }
      playerMove(squareIndex);
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
    OnAppStart();
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
    OnAppStart();
  });
}

function displayAnotherRoundBtn() {
  let anotherRoundBtn = document.querySelector(".another-round");
  anotherRoundBtn.style.display = "inline-block";
  handleAnotherRoundBtn(anotherRoundBtn);
}

//OnAppStart function
function OnAppStart() {
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

OnAppStart();
