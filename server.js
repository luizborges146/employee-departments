//Intall the dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connection with MySQL
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    passowrd:'Test1234!',
    database:"employee_db"

})