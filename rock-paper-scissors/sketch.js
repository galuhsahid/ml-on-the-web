// Base code is based on
// https://github.com/ml5js/ml5-examples/tree/release/javascript/FeatureExtractor_Image_Classification

const image = document.getElementById("image");
const countdown = document.getElementById("countdown");
const video = document.getElementById("video");

// Training & prediction elements
const ScissorsButton = document.getElementById("ScissorsButton");
const PaperButton = document.getElementById("PaperButton");
const RockButton = document.getElementById("RockButton");
const train = document.getElementById("train");
const loss = document.getElementById("loss");
const predict = document.getElementById("predict");

// Counter for training images
const amountOfScissorsImages = document.getElementById(
  "amountOfScissorsImages"
);
const amountOfPaperImages = document.getElementById("amountOfPaperImages");
const amountOfRockImages = document.getElementById("amountOfRockImages");

// Result
const result = document.getElementById("userResult");
const computerResult = document.getElementById("computerResult");
const winnerResult = document.getElementById("winner");
const confidence = document.getElementById("confidence");

let lossValue = 0;
let totalLoss = 0;
let featureExtractor = null;

let player = null;
let computer = null;
let winner = null;

const choices = ["Rock", "Paper", "Scissors"];
const numLabels = choices.length;

const startWebcam = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });

    video.srcObject = stream;
    video.play();
  } catch (e) {
    console.error(e);
  }
};

const loadModel = async () => {
  try {
    featureExtractor = ml5.featureExtractor("MobileNet");

    classifier = featureExtractor.classification(video, {
      numLabels: numLabels
    });
  } catch (e) {
    console.error(e);
  }
};

function setup() {
  try {
    startWebcam();
    loadModel();
  } catch (e) {
    console.error(e);
  }
}

function getComputerResult() {
  let chosen = null;
  try {
    chosen = choices[Math.floor(Math.random() * choices.length)];
    if (chosen == "Rock") {
      image.src = "images/rock.svg";
    } else if (chosen == "Paper") {
      image.src = "images/paper.svg";
    } else if (chosen == "Scissors") {
      image.src = "images/scissors.svg";
    }
  } catch (e) {
    console.error(e);
  }

  return chosen;
}

const getPlayerResult = async video => {
  try {
    let results = await classifier.classify(video);
    if (results && results[0]) {
      return results[0].label;
    }
  } catch (e) {
    console.error(err);
  }
};

function getWinner(player, computer) {
  if (player == "Paper") {
    if (computer == "Rock") return "Player";
    if (computer == "Scissors") return "Computer";
  } else if (player == "Rock") {
    if (computer == "Paper") return "Computer";
    if (computer == "Scissors") return "Player";
  } else if (player == "Scissors") {
    if (computer == "Paper") return "Player";
    if (computer == "Rock") return "Computer";
  }

  return "Tie";
}

const beginGame = async () => {
  // Get player's & computer's result
  player = await getPlayerResult(video);
  computer = getComputerResult();
  winner = getWinner(player, computer);

  result.innerText = "You played: " + player;
  computerResult.innerText = "Computer played: " + computer;

  winnerResult.innerText = "Winner is: " + winner;
};

predict.onclick = function() {
  let counter = 5;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      countdown.innerText = counter;
    } else if (counter === -1) {
      clearInterval(counter);
      beginGame();
    }
  }, 1000);
};

ScissorsButton.onclick = function() {
  classifier.addImage("Scissors");
  amountOfScissorsImages.innerText =
    Number(amountOfScissorsImages.innerText) + 1;
};

PaperButton.onclick = function() {
  classifier.addImage("Paper");
  amountOfPaperImages.innerText = Number(amountOfPaperImages.innerText) + 1;
};

RockButton.onclick = function() {
  classifier.addImage("Rock");
  amountOfRockImages.innerText = Number(amountOfRockImages.innerText) + 1;
};

const trainModel = async () => {
  try {
    await classifier.train(function(lossValue) {
      if (lossValue) {
        totalLoss = lossValue;
        loss.innerHTML = "Loss: " + totalLoss;
      } else {
        loss.innerHTML = "Training done! Final loss: " + totalLoss;
      }
    });
  } catch (e) {
    console.error(e);
  }
};

train.onclick = async function() {
  trainModel();
};

setup();
