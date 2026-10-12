const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const lastResult = document.getElementById("lastResult");
const rollCountEl = document.getElementById("rollCount");
const bestScoreEl = document.getElementById("bestScore");
const historyList = document.getElementById("historyList");

let rollInterval = null;
let rollCount = 0;
let bestScore = 0;

const faces = {
  1: ["center"],
  2: ["top-left", "bottom-right"],
  3: ["top-left", "center", "bottom-right"],
  4: ["top-left", "top-right", "bottom-left", "bottom-right"],
  5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
};

function showFace(dice, number) {
  const dots = dice.querySelectorAll(".dot");

  dots.forEach(dot => {
    dot.style.visibility = "hidden";
  });

  faces[number].forEach(position => {
    const dot = dice.querySelector("." + position);
    if (dot) {
      dot.style.visibility = "visible";
    }
  });
}

function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function startRolling() {
  if (rollInterval !== null) return;

  dice1.classList.add("rolling");
  dice2.classList.add("rolling");

  rollInterval = setInterval(() => {
    showFace(dice1, getRandomNumber());
    showFace(dice2, getRandomNumber());
  }, 100);
}

function stopRolling() {
  if (rollInterval === null) return;

  clearInterval(rollInterval);
  rollInterval = null;

  dice1.classList.remove("rolling");
  dice2.classList.remove("rolling");

  const result1 = getRandomNumber();
  const result2 = getRandomNumber();
  const sum = result1 + result2;

  showFace(dice1, result1);
  showFace(dice2, result2);

  rollCount++;
  rollCountEl.textContent = rollCount;

  if (sum > bestScore) {
    bestScore = sum;
    bestScoreEl.textContent = bestScore;
  }

  lastResult.textContent = `${result1} + ${result2} = ${sum}`;

  if (historyList.children.length === 1 && historyList.children[0].textContent === "Brak rzutów") {
    historyList.innerHTML = "";
  }

  const listItem = document.createElement("li");
  listItem.textContent = `Rzut ${rollCount}: kostka 1 = ${result1}, kostka 2 = ${result2}, suma = ${sum}`;
  historyList.prepend(listItem);
}

function resetGame() {
  if (rollInterval !== null) {
    clearInterval(rollInterval);
    rollInterval = null;
  }

  dice1.classList.remove("rolling");
  dice2.classList.remove("rolling");

  showFace(dice1, 1);
  showFace(dice2, 1);

  rollCount = 0;
  bestScore = 0;

  rollCountEl.textContent = "0";
  bestScoreEl.textContent = "0";
  lastResult.textContent = "1 + 1 = 2";
  historyList.innerHTML = "<li>Brak rzutów</li>";
}

startBtn.addEventListener("click", startRolling);
stopBtn.addEventListener("click", stopRolling);
resetBtn.addEventListener("click", resetGame);

showFace(dice1, 1);
showFace(dice2, 1);
