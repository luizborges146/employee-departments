//Intall the dependencies
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connection with MySQL
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Test1234!',
    database:'employee_db'

});

// Create a START MENU message
db.connect((err) => {
    if(err) throw err;

    console.table("\n\n Employee - Tracker \n\n");

    menu();
})

// Create a Prompt Menu
const menu = () => {
    inquirer.prompt(
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
                addNewEmployee();
                break;

            case "Add a role":
                addNewRole();
                break;
            
            case "Add a department":
                addNewDepartment();
                break;

            case "View employees":
                allEmployees();
                break;

            case "view roles":
                allRoles();
                break;

            case "View departments":
                allDepartments();
                break;

            case "Update employee role":
                employeeRoleUpdate();
                break;

            case "Update employee manager":
                employeeManagerUpdate();
                break;

            case "View the total salary per department":
                break;

            case "Exit":
                break;
        }
    });
}

// ======================= Add an employee ============================================
const addNewEmployee = () => {
    // const getRoles = 'SELECT * FROM roles; SELECT CONCAT(f_name, " ",l_name) AS full_name FROM employee';
    const getRoles = "SELECT * FROM roles"; 
    db.query(getRoles, (err, result) =>{
        if(err) throw err;

        console.table(result);

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
                choices: function() {
                    let getChoice = result.map((choice) => choice.title); // check the title in the Database
                    // console.log(getChoice);
                    return getChoice;
                },
                message:"What is their role?",
            },
            {
                name:"manager",
                type:"input",
                message:"What is The Manager ID?",
            },
        ])
        .then((response) => {
            db.query(`INSERT INTO employee(f_name,l_name,role_id,manager_id)
            VALUES(?,?,?,?)`, [response.firstName, response.lastName, result[result.findIndex((role => role.Title = response.role))].id, response.manager]
            );
            menu();
        });
    });
}

// ======================= Add a role =================================================
const addNewRole = () =>{
    checkDpt();
    console.log("\n");
    const roleQuery = "SELECT * FROM department;";
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
                type: "input",
                name: "department",
                message:"Please enter the department ID?",
            }
        ])
        .then((response) => {
            console.table(response);
            db.query(`INSERT INTO roles(title, salary, dpt_id) 
            VALUES("${response.title}",${response.salary}, "${response.department}");`
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
            db.query(`INSERT INTO department(d_name) VALUES(?)`,[response.dept],
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
    const queryRoles = "SELECT roles.id, roles.title, roles.salary, department.d_name AS department FROM roles LEFT JOIN department ON roles.dpt_id = department.id;"
    db.query(queryRoles, (err, result) => {
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
const employeeRoleUpdate = () => {
    inquirer
    .prompt([
        {
            name: "empId",
            type: "input",
            message: "What is the employee ID?",
          },
          {
            name: "roleId",
            type: "input",
            message: "What is the role ID?",
          },
    ])
    .then((response) => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, 
        [response.roleId, response.empId], (err, result) => {
            if(err) throw err;
            console.log(result);
            menu();
        });
    });
}
// ======================= Update employee manager ====================================
const employeeManagerUpdate = () => {
    inquirer
    .prompt([
        {
            name: "empId",
            type: "input",
            message: "What is the employee ID?",
          },
          {
            name: "managerId",
            type: "input",
            message: "What is the manager ID?",
          },
    ])
    .then((response) => {
        db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, 
        [response.managerId, response.empId], (err, result) => {
            if(err) throw err;
            console.log(result);
            menu();
        });
    });
}
// ======================= View the total salary per department =======================
// ======================= Exit =======================================================

  const checkDpt = () => {
    db.query("SELECT * FROM department", (err, result) => {
        if(err) throw err;
        console.table(result);
    })
}