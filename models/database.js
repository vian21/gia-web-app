const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../app.sqlite3',(error)=>{
    if(error){
        throw error
    }else{
        db.run(`CREATE TABLE users(
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT,
            password TEXT,
            idNumber INT,
            contacts TEXT,
            DOB DATE,
            gender INT,
            accountActive INT,
            confirmationCode INT       
        );`);
    }
});

db.close();

