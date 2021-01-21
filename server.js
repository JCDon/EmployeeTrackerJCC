const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password 
    password: "password",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});


// base inquirer to start the process
const start = () => {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Create New Department", "Create New Employee Role", "Create New Employee"],
            message: "What would you like to do?",
            name: "selectTask"
        }
    ]).then((ans) => {
        switch (ans.selectTask) {
            case "Create New Department":
                addDepartment();
                break;

            case "Create New Employee Role":
                addRole();
                break;

            case "Create New Employee":
                addEmployee();
                break;

            default:
                break;
        }
    })
}

// an addDepartment function to prompt department specific questions
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you'd like to create?",
            name: "depName"
        },
        {
            type: "input",
            message: "What is the department ID?",
            name: "depID"
        }
    ]).then((ans) => {
        console.table(ans);
        const query = connection.query(`INSERT INTO department (id, name)
        VALUES (${ans.depID}, "${ans.depName}");`, function (err, res) {
            if (err) throw err;

            console.table(res);
            connection.end();
        }
        );
    });
}

// an addRole function prompts role specific questions
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id for this role?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is the new role's title?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the new role's salary?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the new roles department_id?",
            name: "goToID"
        }
    ]).then((ans) => {
        console.table(ans);
        const query = connection.query(`INSERT INTO role (id, title, salary, department_id)
        VALUES (${ans.roleID}, "${ans.title}", ${ans.salary}, ${ans.goToID});`, function (err, res) {
            if (err) throw err;

            console.table(res);
            connection.end();
        }
        );
    })
}

// an addEmployee function prompts employee specific questions

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this employee's id?",
            name: "empID"
        },
        {
            type: "input",
            message: "What is their first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is their last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is their role ID?",
            name: "empRoleID"
        }
    ]).then((ans) => {
        console.table(ans);
        const query = connection.query(`INSERT INTO employee (id, first_name, last_name, role_id)
        VALUES (${ans.roleID}, "${ans.firstName}", ${ans.lastName}, ${ans.empRoleID});`, function (err, res) {
            if (err) throw err;

            console.table(res);
            connection.end();
        }
        );
    })
}

start();

