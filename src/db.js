const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Mohankumar@2003',
    database:'test',
    waitForConnections:true

});

module.exports = pool.promise();
