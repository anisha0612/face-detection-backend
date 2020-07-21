import db from "./database.js";
import bcrypt from "bcrypt";

const handleSigin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Invalid form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compare(password, data[0].hash);
      // if (password !== "") {
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", email)
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("Unable to get user"));
      }
      // }
      return res.status(400).json("error logging in");
    })
    .catch((err) => res.status(400).json("Wrong Credentials"));
};

export { handleSigin };
