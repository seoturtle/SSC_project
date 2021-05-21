const mysql = require('mysql');
const db = mysql.createPool({
    host : '18.223.211.83',
    user : 'root',
    password : 'P@ssW0rd',
    database : 'ssc'
});

module.exports = db;