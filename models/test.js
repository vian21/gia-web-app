const db = require('../helpers/db');

// function select() {
    db.all('SELECT * FROM users;', [], (error, rows) => {
        // return rows
        console.log(rows)
    });
// }


// console.log(select())
db.close();