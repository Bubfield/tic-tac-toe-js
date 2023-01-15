let userName = "";
let userMark = "";
let AIMark = "";
let gameStatus = "new";
let openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let activeBoard = ["", "", "", "", "", "", "", "", ""];
let whoseTurn = null;
let whoWon = null;

function setUserName(name) {
  userName = name;
}

function setUserMark(mark) {
  userMark = mark;
}

function handleMarks(mark) {
  setUserMark(mark);
  setAIMark(mark === "X" ? "O" : "X");
  whoGoesFirst(mark);
}

function setAIMark(mark) {
  AIMark = mark;
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

function promptUserForName() {
  let name;
  do {
    name = prompt("Hello and welcome to Tic Tac Toe! Please enter your name!");
  } while (!name);
  setUserName(name);
}

function promptUserForMark() {
  let mark;
  do {
    mark = prompt("Choose your mark. You can only choose X or O!");
  } while (mark !== "X" && mark !== "O");
  handleMarks(mark);
}

function displayGameBoard() {
  let gameboard = document.querySelector(".gameboard");
  gameboard.style.display = "flex";
  handleClickOnGameboardSquares();
}

function hideStartButton(startButton) {
  startButton.style.display = "none";
}

function hideHello() {
  let hello = document.querySelector(".hello");
  hello.style.display = "none";
}

function displayStartButton() {
  let startButton = document.querySelector(".start-button");
  startButton.style.display = "inline-block";
  handleClickOnStartButton(startButton);
}

function displayHello() {
  let hello = document.querySelector(".hello");
  hello.style.display = "block";
  hello.textContent = `Hello ${userName}!`;
}

function handleClickOnStartButton(startButton) {
  startButton.addEventListener("click", () => {
    hideStartButton(startButton);
    hideHello();
    setGameStatus("active");
    OnAppStart();
  });
}

function whoGoesFirst(mark) {
  if (mark === "X") {
    setWhoseTurn("User");
  } else {
    setWhoseTurn("AI");
  }
}

function handleRestart() {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setUserName("");
  setUserMark("");
  setAIMark("");
  setGameStatus("new");
  setWhoseTurn(null);
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
}

function roundRestart() {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setGameStatus("active");
  setWhoseTurn(userMark === "X" ? "User" : "AI");
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
}

function placeMark(whichPlayer, whichSquare) {
  if (openSquares.indexOf(whichSquare + 1) !== -1) {
    let updatedBoard = [...activeBoard];
    updatedBoard[whichSquare] = whichPlayer;
    setActiveBoard(updatedBoard);
    setOpenSquares(openSquares.filter((square) => square !== whichSquare + 1));
    triggerNextTurn();
  } else {
    return;
  }
}

function triggerNextTurn() {
  if (whoseTurn === "User") {
    setWhoseTurn("AI");
  } else {
    setWhoseTurn("User");
  }
}

function setWinner(mark) {
  if (mark === userMark) {
    setWhoWon(userName);
  } else {
    setWhoWon("The Computer");
  }
}

function checkRow(num1, num2, num3) {
  let arr = [...activeBoard];
  if (arr[num1] && arr[num2] && arr[num3]) {
    if (arr[num1] === arr[num2] && arr[num1] === arr[num3]) {
      setWinner(arr[num1]);
      return true;
    }
  }
}

function checkHorizontalStreaks() {
  return checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8);
}

function checkVerticalStreaks() {
  return checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8);
}

function checkDiagonalStreaks() {
  return checkRow(0, 4, 8) || checkRow(2, 4, 6);
}

function checkForWin() {
  return (
    checkHorizontalStreaks() || checkVerticalStreaks() || checkDiagonalStreaks()
  );
}

function checkForDraw() {
  if (!checkForWin() && !openSquares.length) {
    return true;
  }
}

function playerMove(square, squareIndex) {
  placeMark(userMark, squareIndex);
  square.textContent = userMark;
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
      document.getElementById(openSquares[randomIndex]).textContent = AIMark;
      placeMark(AIMark, openSquares[randomIndex] - 1);
      if (checkForWin()) {
        setGameStatus("won");
        OnAppStart();
      }
      if (checkForDraw()) {
        setGameStatus("draw");
        OnAppStart();
      }
    }
  }, 2000);
}

function handleClickOnGameboardSquares() {
  let gameboardSquare = document.querySelectorAll(".gameboard-square");
  gameboardSquare.forEach((square, squareIndex) =>
    square.addEventListener("click", (e) => {
      if (!e.target.textContent && whoseTurn === "User") {
        playerMove(square, squareIndex);
      }
      AIMove();
    })
  );
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

function handleRestartButton(restart) {
  restart.addEventListener("click", () => {
    handleRestart();
    clearGameBoard();
    hideGameboard();
    clearWinText();
    hideDraw();
    hideRestartBtn();
    hideAnotherRoundBtn();
    setTimeout(() => {
      OnAppStart();
    }, 1000);
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

function OnAppStart() {
  if (gameStatus === "new") {
    promptUserForName();
    promptUserForMark();
    displayStartButton();
    displayHello();
  } else if (gameStatus === "active") {
    displayGameBoard();
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
