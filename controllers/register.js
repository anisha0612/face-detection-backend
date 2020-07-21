import db from "./database.js";
import bcrypt from "bcrypt";

const handleRegister = (req, res) => {
  if (!email || !password || !name) {
    return res.status(400).json("Invalid form submission");
  }
  const { email, name, password } = req.body;
  // hashing and the password and creating a transaction
  bcrypt
    .hash(password, 12)
    .then((hash) => {
      db.transaction((trx) => {
        trx
          .insert({
            hash: hash,
            email: email,
          })
          .into("login")
          .returning("email")
          .then(async (loginEmail) => {
            const user = await trx("users")
              .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date(),
              })
              .returning("*");
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      });
    })
    .catch((err) => res.status(400).json("Unable to register"));
};

export { handleRegister };
