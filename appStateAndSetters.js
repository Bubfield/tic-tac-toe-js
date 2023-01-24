import { pubsub } from "./pubsub.js";

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
const setUserName = (name) => {
  userName = name;
};

const setUser = (obj) => {
  user = obj;
  pubsub.publish(
    "setUser",
    "marks are handled and start button should be displayed"
  );
};

const setAI = (obj) => {
  AI = obj;
};

const setGameStatus = (status) => {
  gameStatus = status;
  pubsub.publish("setGameStatus", `gamestatus is set to ${status}`);
};

const setOpenSquares = (squares) => {
  openSquares = squares;
};

const setActiveBoard = (board) => {
  activeBoard = board;
};

const setWhoWon = (mark) => {
  if (mark === user.mark) {
    whoWon = userName;
  } else if (mark === AI.mark) {
    whoWon = "The Computer";
  } else {
    whoWon = null;
  }
};

const setWhoseTurn = (who) => {
  whoseTurn = who;
};

export {
  userName,
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
};
