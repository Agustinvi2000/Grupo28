import mysql from "mysql2"

const conn = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user:'sql10715307',
    password: 'qW1p2JEblT',
    database: 'sql10715307',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export const pool = conn.promise()

