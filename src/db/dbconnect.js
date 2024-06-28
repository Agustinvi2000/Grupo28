import mysql from "mysql2"

const conn = mysql.createPool({
    host: 'mysql-grupo28.alwaysdata.net',
    user:'grupo28',
    password: 'grze8cOyCbyK]8i7',
    database: 'grupo28_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


export const pool = conn.promise()

