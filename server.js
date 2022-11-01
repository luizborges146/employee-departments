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

// Create a Prompt Menu

const menu = () => {
    insquirer.prompt(
        {
            type:"list",
            name: "menu",
            message:"What would you like to do?", // check this phrase with Andrew later
            choices:[
                "Add an employee",
                "Add a role",
                "Add a department",
                "View employees",
                "view roles",
                "View departments",
                "Update employee role",
                "Update employee manager",
                "View the total salary per department",
                "Exit",
                

            ]
        }
    )
    .then((response) => {
        switch (response.menu) {
            case "Add an employee":
                break;

            case "Add a role":
                break;
            
            case "Add a department":
                break;

            case "View employees":
                break;

            case "view roles":
                break;

            case "View departments":
                break;

            case "Update employee role":
                break;

            case "Update employee manager":
                break;

            case "View the total salary per department":
                break;

            case "Exit":
                break;
        }
    })
}

