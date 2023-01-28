let classesArray = [
  ".XorO-div",
  ".whatisname-div",
  ".hello",
  ".note-div",
  ".win-text",
  ".win",
  ".draw",
  ".gameboard",
  ".restart",
  ".another-round",
  ".start-button",
  ".enter-name",
  ".X",
  ".O",
];

function grabElements(arrayOfClassNames) {
  let elements = [];
  for (let i = 0; i < arrayOfClassNames.length; i++) {
    elements.push(document.querySelector(arrayOfClassNames[i]));
  }
  return elements;
}

export let [
  XorODiv,
  whatIsNameDiv,
  hello,
  noteDiv,
  winText,
  winDiv,
  drawDiv,
  gameboard,
  restartBtn,
  anotherRndBtn,
  startBtn,
  enterNameBtn,
  X,
  O,
] = grabElements(classesArray);

export let gameboardSquares = document.querySelectorAll(".gameboard-square");
export let name = document.getElementById("name");
