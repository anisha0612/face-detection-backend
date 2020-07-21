import db from "./database.js";

const profileId = (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      user.length ? res.json(user[0]) : res.status(400).json("not found");
    })
    .catch((err) => res.status(400).json("error getting user"));
};

export { profileId };
