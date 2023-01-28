export function addListener(element, type, fn) {
  //check if element is an array of elements
  if (Array.from(element).length) {
    element.forEach((item) => item.addEventListener(type, fn));
  } else {
    element.addEventListener(type, fn);
  }
}

export function changeElementDisplay(element, displayType) {
  element.style.display = displayType;
}

export function assignText(element, text, property = "tc") {
  //check if element is an array of elements
  if (property === "a") {
    element.forEach((item) => (item.textContent = text));
  }
  if (property === "tc") {
    element.textContent = text;
  } else if (property === "v") {
    element.value = text;
  }
}
