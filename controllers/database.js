import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "anishapotteti",
    password: "",
    database: "face_detection",
  },
});

export default db;
