import express from "express";
import cors from "cors";
import { handleRegister } from "./controllers/register.js";
import { handleSigin } from "./controllers/sigin.js";
import { profileId } from "./controllers/profile.js";
import { handleEntries } from "./controllers/entries.js";
import { handleApiCall } from "./controllers/api.js";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(database);
});

app
  .route("/signin")
  .get((req, res) => {
    res.json("sign in page");
  })
  .post((req, res) => {
    handleSigin(req, res);
  });

app
  .route("/register")
  .get((req, res) => {
    res.json("register page");
  })
  .post((req, res) => {
    handleRegister(req, res);
  });

app.get("/profile/:id", (req, res) => {
  profileId(req, res);
});

app.put("/image", (req, res) => {
  handleEntries(req, res);
});

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res);
});

app.listen(3500, () => {
  console.log("Server running at 3500");
});
