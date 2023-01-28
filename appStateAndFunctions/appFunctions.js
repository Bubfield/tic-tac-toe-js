import {
  setWhoseTurn,
  setAIMark,
  setActiveBoard,
  setGameStatus,
  setOpenSquares,
  setUserMark,
  setUserName,
  setWhoWon,
  activeBoard,
  openSquares,
  whoseTurn,
  whoWon,
  gameStatus,
  user,
  AI,
} from "./appStateAndSetters.js";

export const setWhoGoesFirst = (mark) => {
  if (mark === "X") {
    setWhoseTurn("User");
  } else {
    setWhoseTurn("AI");
  }
};

export const restartApp = () => {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setUserName("");
  setUserMark({ player: "User", mark: null });
  setAIMark({ player: "AI", mark: null });
  setGameStatus("new");
  setWhoseTurn(null);
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
};

export const restartRnd = () => {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setGameStatus("active");
  setWhoseTurn(user.mark === "X" ? "User" : "AI");
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
};

export const setUserAIMarks = (mark) => {
  setUserMark({ ...user, mark: mark });
  setAIMark({ ...AI, mark: mark === "X" ? "O" : "X" });
  setWhoGoesFirst(mark);
};

export const updateActiveBoard = (whichPlayer, whichSquare) => {
  let updatedBoard = [...activeBoard];
  updatedBoard[whichSquare] = whichPlayer;
  setActiveBoard(updatedBoard);
};

export const updateOpenSquares = (whichSquare) => {
  setOpenSquares(
    openSquares.filter((squareID) => squareID !== whichSquare + 1)
  );
};

export const checkIsOpenSquare = (whichSquare) => {
  return openSquares.indexOf(whichSquare + 1) !== -1;
};

export const checkIsPlayersTurn = (player) => {
  return player === whoseTurn;
};

export const checkForWinOrDraw = () => {
  return checkForWin() || checkForDraw();
};

export const placeMark = (whichPlayer, whichSquare) => {
  const { player, mark } = whichPlayer;
  if (checkIsOpenSquare(whichSquare) && checkIsPlayersTurn(player)) {
    updateActiveBoard(mark, whichSquare);
    updateOpenSquares(whichSquare);
    if (!checkForWinOrDraw()) {
      triggerNextTurn();
    }
  } else {
    return;
  }
};

export const triggerNextTurn = () => {
  if (whoseTurn === "User") {
    setWhoseTurn("AI");
  } else {
    setWhoseTurn("User");
  }
};

export const checkRowIsOccupied = (one, two, three) => {
  return one && two && three;
};

export const checkRowSquaresAreEqual = (one, two, three) => {
  return one === two && one === three;
};

export const checkRow = (num1, num2, num3) => {
  let one = activeBoard[num1];
  let two = activeBoard[num2];
  let three = activeBoard[num3];
  if (checkRowIsOccupied(one, two, three)) {
    if (checkRowSquaresAreEqual(one, two, three)) {
      setWhoWon(one);
      return true;
    }
  }
};

export const checkHorizontalStreaks = () => {
  return checkRow(0, 1, 2) || checkRow(3, 4, 5) || checkRow(6, 7, 8);
};

export const checkVerticalStreaks = () => {
  return checkRow(0, 3, 6) || checkRow(1, 4, 7) || checkRow(2, 5, 8);
};

export const checkDiagonalStreaks = () => {
  return checkRow(0, 4, 8) || checkRow(2, 4, 6);
};

export const checkForWin = () => {
  if (
    checkHorizontalStreaks() ||
    checkVerticalStreaks() ||
    checkDiagonalStreaks()
  ) {
    setGameStatus("won");
    return true;
  }
};

export const checkForDraw = () => {
  if (!whoWon && !openSquares.length) {
    setGameStatus("draw");
    return true;
  }
};

export const checkIfNOWinnerOrDraw = () => {
  return !whoWon && gameStatus !== "draw";
};
