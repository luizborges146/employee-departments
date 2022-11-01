/*=======================Department============================
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| id     | int         | NO   | PRI | NULL    | auto_increment |
| d_name | varchar(25) | NO   |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
    =======================EMPLOYEE============================
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| id         | int         | NO   | PRI | NULL    | auto_increment |
| f_name     | varchar(20) | YES  |     | NULL    |                |
| l_name     | varchar(30) | YES  |     | NULL    |                |
| role_id    | int         | YES  | MUL | NULL    |                |
| manager_id | int         | YES  | MUL | NULL    |                |
+------------+-------------+------+-----+---------+----------------+
    =======================Role============================
+--------+---------------+------+-----+---------+----------------+
| Field  | Type          | Null | Key | Default | Extra          |
+--------+---------------+------+-----+---------+----------------+
| id     | int           | NO   | PRI | NULL    | auto_increment |
| title  | varchar(30)   | NO   |     | NULL    |                |
| salary | decimal(10,2) | YES  |     | NULL    |                |
| dpt_id | int           | YES  | MUL | NULL    |                |
+--------+---------------+------+-----+---------+----------------+
*/
-- INSERT INTO department (d_name)
-- VALUES ('HR'),
--         ('Product'),
--         ('Sales'),
--         ('Leagal'),
--         ('Support');

-- INSERT INTO roles(title, salary, dpt_id)
-- VALUES ('HR BP', 80000, 1),
--         ('Senior HR BP', 105000, 1),
--         ('UI', 95000, 2),
--         ('Junior Develper', 100000,2),
--         ('Intern', 75000, 2),
--         ('Senior Sales', 80000, 3),
--         ('Customer Support', 75000, 5);

-- INSERT INTO employee (f_name, l_name, role_id)
-- VALUES ("Luiz", "Borges", 5),
--         ("Andrew", "Stone", 2),
--         ("Dani", "Hill", 6),
--         ("Mary", "Brooks", 1),
--         ("Leo", "OBrian", 3);



SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM roles;


