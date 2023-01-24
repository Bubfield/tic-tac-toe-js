import {
  user,
  AI,
  gameStatus,
  openSquares,
  activeBoard,
  whoseTurn,
  whoWon,
  setUserName,
  setUser,
  setAI,
  setGameStatus,
  setOpenSquares,
  setActiveBoard,
  setWhoWon,
  setWhoseTurn,
} from "./appStateAndSetters.js";

import { pubsub } from "./pubsub.js";

//important functions
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

const roundRestart = () => {
  setOpenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  setGameStatus("active");
  setWhoseTurn(user.mark === "X" ? "User" : "AI");
  setWhoWon(null);
  setActiveBoard(["", "", "", "", "", "", "", "", ""]);
};

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

const isThereWinOrDraw = () => {
  return checkForWin() || checkForDraw();
};

const placeMark = (whichPlayer, whichSquare) => {
  const { player, mark } = whichPlayer;
  if (isAnOpenSquare(whichSquare) && itIsPlayersTurn(player)) {
    updateActiveBoard(mark, whichSquare);
    updateOpenSquares(whichSquare);
    if (!isThereWinOrDraw()) {
      triggerNextTurn();
    }
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
      setWhoWon(one);
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
  if (
    checkHorizontalStreaks() ||
    checkVerticalStreaks() ||
    checkDiagonalStreaks()
  ) {
    setGameStatus("won");
    return true;
  }
};

const checkForDraw = () => {
  if (!whoWon && !openSquares.length) {
    setGameStatus("draw");
    return true;
  }
};

const thereIsNoWinnerOrDraw = () => {
  return !whoWon && gameStatus !== "draw";
};

export {
  thereIsNoWinnerOrDraw,
  checkForDraw,
  checkForWin,
  checkDiagonalStreaks,
  checkVerticalStreaks,
  checkHorizontalStreaks,
  checkRow,
  allSquaresAreEqual,
  allSquaresAreOccupied,
  triggerNextTurn,
  itIsPlayersTurn,
  isAnOpenSquare,
  placeMark,
  updateActiveBoard,
  updateOpenSquares,
  handleMarks,
  whoGoesFirst,
  fullRestart,
  roundRestart,
};
