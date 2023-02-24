const mysql = require('mysql2/promise');

const mysql2 = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events')

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
//   multipleStatements: true,
//   socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock' // not necesary! Only required for Unix Operating systems
})


const connection = mysql2.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
//   socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock' // not necesary! Only required for Unix Operating systems

});

const listener = new MySQLEvents(connection, {
  startAtEnd: true,
  excludedSchemas: {
    mysql: true,
  },
});



// instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
// instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);


// program()
//   .then(() => console.log('Waiting for database events...'))
//   .catch(console.error);

module.exports = {
  db,
  listener,
  MySQLEvents
};