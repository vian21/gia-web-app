const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('../app.sqlite3', (error) => {
    if (error) {
        throw error
    } else {
        db.run(`INSERT INTO users(name,email,password,idNumber,gender) 
            VALUES('Patrick Igiraneza',
            'admin@gmail.com',
            '$2y$12$wcAXcPwClUTdr22Qnii2XeSGa0gKqhEGhUCva4AyPFLB.pHwu3ZNW',
            15026,0
            );`);
    }
});

db.close();