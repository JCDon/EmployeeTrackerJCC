DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);