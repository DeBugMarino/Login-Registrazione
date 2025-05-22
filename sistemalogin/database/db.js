import pgPromise from "pg-promise";

const dataBase = pgPromise();
const db = dataBase({
  host: "localhost",
  port: 5432,
  database: "postgress",
  user: "postgres",
  password: "postgres",
});

export default db;
