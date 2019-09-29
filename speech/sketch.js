let classifier;
let label;
let confidence;
let results;
let lastPosition = 0;

const options = { probabilityThreshold: 0.98 };
const scrollBy = 500;

const loadModel = async () => {
  try {
    classifier = await ml5.soundClassifier("SpeechCommands18w", options);
  } catch (e) {
    console.error(e);
  }
};

const getPrediction = async () => {
  try {
    await classifier.classify(scrollPage);
  } catch (e) {
    console.error(e);
  }
};

function scrollPage(error, results) {
  try {
    if (results[0].label == "down") {
      lastPosition = lastPosition + scrollBy;
    } else if (results[0].label == "up") {
      lastPosition = lastPosition - scrollBy;
    }

    lastPosition = Math.max(0, lastPosition);

    window.scroll(0, lastPosition);
  } catch (e) {
    console.error(e);
  }
};

const start = async () => {
  await loadModel();
  getPrediction();
};

start();
