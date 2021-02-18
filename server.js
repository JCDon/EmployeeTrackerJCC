const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
const Database = require("./class");

let managerArr = [];
let roleArr = [];
let manId;


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
                addNewDepartment();
                break;

            case "Create New Employee Role":
                addNewRole();
                break;

            case "Create New Employee":
                addNewEmployee();
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

// const isManager = () => {
//     inquirer.prompt([
//         {
//             type: "confirm",
//             message: "Is this a manager?",
//             name: "askIfMan"
//         }
//     ]).then((ans) => {
//         if (!ans.askIfMan) {
//             inquirer.prompt([
//                 {
//                     type: "list",
//                     choices: managersArr,
//                     message: "What is their manager id?",
//                     name: "empsMan"
//                 }
//             ]).then((ans) => {
//                 managersArr.push(manId);
//                 console.log(managersArr);
//             })
//         }
//     })
// }

const update = () => {
    Database.findEmployees().then(([data])=>{
        let employees = data;
        const employeeChoices = employees.map(({id, first_name, last_name})=>({
            name: `${first_name} ${last_name}`,
            value: id
        }))

   inquirer.prompt([
    {
        type: "list",
        message: "What is the employee's id you wish to change?",
        choices: employeeChoices,
        name: "id"
    }
    // ,
    // {
    //     type: "input",
    //     message: "What is the new role's id?",
    //     name: "role_id"
    // }
   ]).then((ans)=>{
       let id = ans.id;
       Database.findRole().then(([data])=>{
        let roles = data;
        const roleChoices = roles.map(({id, title})=>({
            name: title,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                choices: roleChoices,
                message: "Which role would you like to assign to this employee?",
                name: "role_id"
            }
        ]).then(data => Database.updateEmployeeRoles(data.role_id, id)).then(()=>start())
       })
    //    Database.updateEmployeeRoles(ans).then(()=>{
    //        start();
    //    })
   })
})
}

// an addDepartment function to prompt department specific questions
const addNewDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you'd like to create?",
            name: "name"
        }
    ]).then((ans) => {
        console.table(ans);
        Database.addDepartment(ans).then(()=> {
            start();
        })
    });
}

// an addRole function prompts role specific questions
const addNewRole = () => {
    Database.findDepartment().then(([data])=>{
        let departments = data;
        const departmentChoices = departments.map(({id, name})=>({
            name: name,
            value: id
        }))
        inquirer.prompt([
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
                type: "list",
                message: "Which department does this role belong to?",
                choices: departmentChoices,
                name: "department_id"
            }
        ]).then((ans) => {
            Database.addRole(ans).then(()=>{
                start();
            })
        })
    })
}

// an addEmployee function prompts employee specific questions

const addNewEmployee = () => {
    Database.findRole().then(([data])=>{
        let roles = data;
        const roleChoices = roles.map(({id, title})=>({
            name: title,
            value: id
        }))
    inquirer.prompt([
        {
            type: "input",
            message: "What is their first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is their last name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is their role ID?",
            choices: roleChoices,
            name: "role_id"
        }
    ]).then((ans) => {
        Database.addEmployee(ans).then(()=>{
            start();
        })
        
    })
})
}


// a function for viewing the department data
const viewDepartment = () => {
    Database.findDepartment().then(([data])=>{
        console.table(data);
        start();
    })
}

// a function for viewing the role data
const viewRole = () => {
    Database.findRole().then(([data])=>{
        console.table(data);
        start();
    })
}

// a function for viewing the employee data
const viewEmployee = () => {
    Database.findEmployees().then(([data])=>{
        console.table(data);
        start();
    })
}
start();

