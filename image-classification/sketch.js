const image = document.getElementById("image");
const video = document.getElementById("video");
const result = document.getElementById("result");
const probability = document.getElementById("probability");
const modelLoaded = document.getElementById("loaded");
const uploadImage = document.getElementById("upload-image");

let webcamOn = false;
let classifier;
let stream;

const startWebcam = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    image.style.display = "none";
    video.style.display = "block";

    video.srcObject = stream;
    video.play();

    webcamOn = true;
    getPrediction(video, "video");
  } catch (e) {
    console.error(e);
  }
};

const stopWebcam = async () => {
  try {
    image.style.display = "block";
    video.style.display = "none";
    await stream.getTracks()[0].stop();

    webcamOn = false;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Load selected model into our current classifier.
 */
const loadModel = async () => {
  const modelName = document.getElementById("modelForm").elements["modelForm"]
    .value;

  try {
    classifier = await ml5.imageClassifier(modelName);
  } catch (e) {
    console.error(e);
  }

  modelLoaded.innerText = "Model " + classifier.modelName + " telah dimuat!";
};

/**
 * Get prediction result and display it.
 * @param {HTML video or image element} input to be classified.
 * @param {string} type Type of input: image or video.
 */
const getPrediction = async (input, type) => {
  try {
    const results = await classifier.classify(input);

    result.innerText = results[0].label;
    probability.innerText = results[0].confidence;

    if ((type == "video") & webcamOn) {
      getPrediction(video, "video");
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Helper function to predict image.
 */
const predictImage = async () => {
  await getPrediction(image, "image");
};

uploadImage.onchange = function(event) {
  if (webcamOn) {
    stopWebcam();
  }

  const fileName = uploadImage.files[0]["name"];
  const filePath = "images/" + fileName;

  image.src = filePath;
};
