function capitaliseFirstLetter(text: string) {
  const splitText = text.split("");
  splitText[0] = splitText[0].toUpperCase();
  return splitText.join("");
}

function numberFromDuration(duration: string) {
  return Number(duration.split(" ")[0]);
}

export { capitaliseFirstLetter, numberFromDuration };
