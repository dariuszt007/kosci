const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let interval = null;

const rotations = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateX(90deg) rotateY(0deg)",
  3: "rotateY(-90deg) rotateX(0deg)",
  4: "rotateY(90deg) rotateX(0deg)",
  5: "rotateX(-90deg) rotateY(0deg)",
  6: "rotateY(180deg) rotateX(0deg)"
};

function randomFace() {
  return Math.floor(Math.random() * 6) + 1;
}

function setFace(dice, number) {
  dice.style.transform = rotations[number];
  dice.setAttribute("data-face", number);
}

function startRolling() {
  if (interval) return;

  dice1.classList.add("rolling");
  dice2.classList.add("rolling");

  interval = setInterval(() => {
    const face1 = randomFace();
    const face2 = randomFace();

    dice1.setAttribute("data-temp-face", face1);
    dice2.setAttribute("data-temp-face", face2);
  }, 120);
}

function stopRolling() {
  if (!interval) return;

  clearInterval(interval);
  interval = null;

  dice1.classList.remove("rolling");
  dice2.classList.remove("rolling");

  const final1 = randomFace();
  const final2 = randomFace();

  setFace(dice1, final1);
  setFace(dice2, final2);
}

startBtn.addEventListener("click", startRolling);
stopBtn.addEventListener("click", stopRolling);

setFace(dice1, 1);
setFace(dice2, 1);
