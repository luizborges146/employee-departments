//Intall the dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connection with MySQL
const db = mysql.createConnection({
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

// ======================= Add an employee ============================================
const addNewEmployee = () => {
    const getRoles = 'SELECT * FROM roles; SELECT CONCAT (e.f_name," ",e.l_name) AS full_name FROM employee e';
    db.query(getRoles, (err, result) =>{
        if(err) throw err;

        inquirer
        .prompt([
            {
                type:"input",
                name:"firstName",
                message: "What is the first name?",

            },
            {
                type:"input",
                name:"lastName",
                message: "What is the last name?",
            },
            {
                name:"role",
                type:"list",
                choice: function() {
                    let choice = result[0].map((choice) => choice.title); // check the title in the Database
                    return choice;
                },
                message:"What is their role?",
            },
            {
                name:"manager",
                type:"list",
                choice: function() {
                    let choice = result[0].map((choice) => choice.full_name); // check the title in the Database
                    return choice;
                },
                message:"What is their role?",
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO employee(f_name,l_name,role_id,manager_id)
            VALUES(?,?,
                (SELECT id FROM roles WHERE title = ?),
                (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(f_name,'',l_name) = ?)
                AS tmptable))`, [response.firstName, response.lastName, response.role, response.manager]
            );
            menu();
        });
    });
}

// ======================= Add a role =================================================
const addNewRole = () =>{
    const roleQuery = "SELECT * FROM roles; SELECT * FROM department;";
    db.query(roleQuery, (err, result) => {
        if (err) throw err;

        inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message:"What is the title?",
            },
            {
                type: "input",
                name: "salary",
                message:"What is the salary?",
            },
            {
                type: "list",
                name: "department",
                choices: function() {
                    let choices = result[1].map((choice) => choice.name);
                    return choices;
                },
                message:"Chose a department?",
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO roles(title, salary, department_id) 
            VALUES("${response.title}","${response.salary}", 
            (SELECT id FROM department WHERE name = "${response.list}"));`
            );
            menu();
        });
    });
}

// ======================= Add a department ===========================================
const addNewDepartment = () => {
    const deptQuery = "SELECT * FROM department";
    db.query(deptQuery,(err, result) =>{
        if(err) throw err;

        inquirer
        .prompt([
            {
                type:"input",
                name:"dept",
                message:"Add the name of the new Department:",
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO department(name) VALUES(?)`,[response.dept],
            (err,result) => {
                menu();
            }
            );
        });
    });
}

// ======================= View employees =============================================
const allEmployees = () => {
    db.query("SELECT * FROM employee", (err, result) => {
        if(err) throw err;
        console.table(result);
        menu();
    })
}
// ======================= view roles =================================================
const allRoles = () => {
    db.query("SELECT * FROM roles", (err, result) => {
        if(err) throw err;
        console.table(result);
        menu();
    })
}
// ======================= View departments ===========================================
const allDepartments = () => {
    db.query("SELECT * FROM department", (err, result) => {
        if(err) throw err;
        console.table(result);
        menu();
    })
}
// ======================= Update employee role =======================================
// ======================= Update employee manager ====================================
// ======================= View the total salary per department =======================
// ======================= Exit =======================================================


/*
const askNewEmployee = [
    "What is the first name?", **
    "What is the last name?",***
    "What is their role?",****
    "Who is their manager?",
  ];

  */