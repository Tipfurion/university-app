import Knex from "knex";
const db = Knex({
  client: "mssql",
  connection: {
    server: "138.68.91.6",
    user: "sa",
    password: "_Admin123",
    database: "master",
    port: 1433

    //trustServerCertificate: true
  },
  pool: { min: 2, max: 10 }
});
export default db;
