import Knex from 'knex'
const db = Knex({
    client: 'mssql',
    connection: {
        server: process.env.DB_SERVER,
        user: process.env.DB_USER,
        password: '_Admin123',
        database: 'master',
        port: 1433,

        //trustServerCertificate: true
    },
    pool: { min: 2, max: 10 },
})
export default db
