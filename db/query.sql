-- -- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
-- -- WHEN I choose to view all employees
-- -- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-- SELECT employee.id 'id', employee.first_name 'First Name', employee.last_name 'Last Name',
-- title 'Title', salary 'Salary', 
-- CONCAT(m.first_name, " ", m.last_name) AS Manager,
-- department.name 'Department'
-- FROM employee
-- join employee m ON (employee.manager_id = m.id)
-- LEFT OUTER JOIN role ON employee.role_id = role.id
-- LEFT OUTER JOIN department on role.department_id = department.id;  

-- -- WHEN I choose to view all departments
-- -- THEN I am presented with a formatted table showing department names and department ids

-- SELECT * FROM department;

-- -- WHEN I choose to view all roles
-- -- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

SELECT role.id, role.title, role.salary, department.name 'department' FROM role
JOIN department ON role.department_id = department.id;


-- -- View employees by manager.
-- -- Swap where clause to filter by manager id

-- SELECT employee.first_name, employee.last_name,
-- CONCAT(m.first_name, " ", m.last_name) AS Manager
-- FROM employee
-- JOIN employee m ON (employee.manager_id = m.id)
-- WHERE employee.manager_id = 3;

-- -- View employees by department.
-- -- Swap where clause to filter by manager dept id

-- SELECT employee.first_name, employee.last_name,
-- role.title,
-- department.name 'departement'
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- JOIN department on role.department_id = department.id
-- where department_id = 1;

-- //View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
 
SELECT department.name 'department', SUM(role.salary) AS 'utilized budget'
FROM department
JOIN role ON role.department_id = department.id
where department.id = 3;




