const mysql = require('mysql');
const db = mysql.createPool({
    host : '3.34.137.243',
    user : 'root',
    password : '1234',
    database : 'ssc'
});

module.exports = db;