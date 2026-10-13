const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let interval = null;

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

  faces[number].forEach(className => {
    const dot = dice.querySelector("." + className);
    if (dot) {
      dot.style.visibility = "visible";
    }
  });
}

function randomFace() {
  return Math.floor(Math.random() * 6) + 1;
}

startBtn.addEventListener("click", () => {
  if (interval) return;

  dice1.classList.add("rolling");
  dice2.classList.add("rolling");

  interval = setInterval(() => {
    showFace(dice1, randomFace());
    showFace(dice2, randomFace());
  }, 100);
});

stopBtn.addEventListener("click", () => {
  if (!interval) return;

  clearInterval(interval);
  interval = null;

  dice1.classList.remove("rolling");
  dice2.classList.remove("rolling");

  showFace(dice1, randomFace());
  showFace(dice2, randomFace());
});

showFace(dice1, 1);
showFace(dice2, 1);
