const mysql  = require('mysql2')

const conn = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user:'sql10715307',
    password: '',
    DB: 'sql10715307',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = {
    conn: pool.promise()
}