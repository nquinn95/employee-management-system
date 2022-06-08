const mysql = require("mysql2");
require('dotenv').config();

// const dbPass = DB_PASSWORD.process.env

const connection = mysql.createConnection(

{

host: 'localhost',

user: 'root',

password: 'WhiteHouse^1995$',

database: 'employees'

},

console.log(`Connected to the employees_db database.`)

);




// Set up error handling in case there is a messed up connection

connection.connect(function(err) {

if (err) throw err;

});




module.exports = connection;

