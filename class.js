const connection = require("./connection");

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    findEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    }

    findDepartment(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }

    findRole(){
        return this.connection.promise().query(
            "SELECT * FROM role"
        )
    }

    addEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",
            employee
        )
    }

    addDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department SET ?",
            department
        )
    }

    addRole(role){
        return this.connection.promise().query(
            "INSERT INTO role SET ?",
            role
        )
    }

    updateEmployeeRoles(role_id, employee_id){
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [
                role_id,
                employee_id
            ]
        )
    }
}

module.exports = new Database (connection);