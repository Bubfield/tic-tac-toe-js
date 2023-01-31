export let userName = "";
export let user = { player: "User", mark: null };
export let AI = { player: "AI", mark: null };
export let gameStatus = "new";
export let openSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export let activeBoard = ["", "", "", "", "", "", "", "", ""];
export let whoseTurn = null;
export let whoWon = null;

export const setUserName = (name) => {
  userName = name;
};

export const setUserMark = (obj) => {
  user = obj;
};

export const setAIMark = (obj) => {
  AI = obj;
};

export const setGameStatus = (status) => {
  gameStatus = status;
};

export const setOpenSquares = (squares) => {
  openSquares = squares;
};

export const setActiveBoard = (board) => {
  activeBoard = board;
};

export const setWhoseTurn = (who) => {
  whoseTurn = who;
};

export const setWhoWon = (mark) => {
  if (mark === user.mark) {
    whoWon = userName;
  } else if (mark === AI.mark) {
    whoWon = "The Computer";
  } else {
    whoWon = null;
  }
};
