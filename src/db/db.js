const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mohankumar@2003',
    database: 'test',
    waitForConnections: true,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database:', connection.config.database);
        connection.release();
    }
});

const promisePool = pool.promise();

module.exports = promisePool;

