const mysql = require("mysql");
const inquirer = require("inquirer");

let managerArr = [];
let roleArr = [];
let manId;

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

const start = () => {
    selectActionPath();
}

// a function to choose options
const selectActionPath = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Create", "View", "Update", "Quit this process"],
            name: "actionPath"
        }
    ]).then((ans) => {
        switch (ans.actionPath) {
            case "Create":
                create();
                break;
        
            case "View":
                view();
                break;
        
            case "Update":
                update();
                break;
        
            default:
                break;
        }
    })
}


// base inquirer to start the process
const create = () => {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Create New Department", "Create New Employee Role", "Create New Employee", "Quit this process"],
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

// a function for selecting viewable data tables
const view = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to view?",
            choices: ["View Departments", "View Roles", "View Employees", "Quit this process"],
            name: "selectView"
        }
    ]).then((ans) => {
        console.table(ans);
        switch (ans.selectView) {
            case "View Departments":
                viewDepartment();
                break;
        
            case "View Roles":
                viewRole();
                break;
        
            case "View Employees":
                viewEmployee();
                break;
        
            default:
                break;
        }
    })
}

const isManager = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Is this a manager?",
            name: "askIfMan"
        }
    ]).then((ans) => {
        if (!ans.askIfMan) {
            inquirer.prompt([
                {
                    type: "list",
                    choices: managersArr,
                    message: "WHat is their manager id?",
                    name: "empsMan"
                }
            ]).then((ans) => {
                managersArr.push(manId);
                console.log(managersArr);
            })
        }
    })
}

const update = () => {
    inquirer.prompt([
    {
        
    }
    ])
}

// 
// 
// 
// 


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
        const query = connection.query(`INSERT INTO department SET ?`,
        {
            id: ans.depID,
            name: ans.depName
        }, 
        function (res, err) {
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
        const query = connection.query(`INSERT INTO role SET ?`,
        {
            id: ans.roleID,
            title: ans.title,
            salary: ans.salary,
            department_id: ans.goToID
        },
         function (err, res) {
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
        manId = ans.empId;
        isManager();
        const query = connection.query(`INSERT INTO employee SET ?`,
        {
            id: ans.empID,
            first_name: ans.firstName,
            last_name: ans.lastName,
            role_id: ans.empRoleID
        },
         function (err, res) {
             if (err) throw err;
             
            console.table(res);
            connection.end();
        }
        );
    })
}


// a function for viewing the department data
const viewDepartment = () => {
    const query = connection.query(`SELECT * FROM departments`, function (res, err) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}

// a function for viewing the role data
const viewRole = () => {
    const query = connection.query(`SELECT * FROM role`, function (res, err) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

// a function for viewing the employee data
const viewEmployee = () => {
    const query = connection.query(`SELECT * FROM employee`, function (res, err) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}
start();

