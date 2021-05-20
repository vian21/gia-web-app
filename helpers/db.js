const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app',
    socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock' // not necesary! Only required for Unix Operating systems
})

module.exports = db;