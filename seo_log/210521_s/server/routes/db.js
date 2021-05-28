const mysql = require('mysql');
const db = mysql.createPool({
    host : '18.191.210.34',
    user : 'root',
    password : 'P@ssW0rd',
    database : 'ssc'
});

module.exports = db;