import mysql2 from 'mysql2/promise'

const Connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "59762358",
    database: "TCCFREI"
})

export {Connection};