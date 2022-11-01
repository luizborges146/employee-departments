DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    d_name VARCHAR(25) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    dpt_id INT,
    FOREIGN KEY (dpt_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(20),
    l_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SHOW COLUMNS FROM department;
SHOW COLUMNS FROM employee;
SHOW COLUMNS FROM roles;