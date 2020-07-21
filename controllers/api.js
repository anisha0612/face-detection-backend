import Clarifai from "clarifai";
import dotenv from "dotenv";
dotenv.config();

const app = new Clarifai.App({ apiKey: process.env.REACT_APP_API_KEY });

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

export { handleApiCall };
