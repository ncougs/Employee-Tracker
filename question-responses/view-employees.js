const Query = require('../helpers/query');

const queryString = `SELECT employee.id 'id', employee.first_name 'First Name', employee.last_name 'Last Name',
                    title 'Title', salary 'Salary', 
                    CONCAT(m.first_name, " ", m.last_name) AS Manager,
                    department.name 'Department'
                    FROM employee
                    join employee m ON (employee.manager_id = m.id)
                    JOIN role ON employee.role_id = role.id
                    JOIN department on role.department_id = department.id`;

const viewEmployees = new Query(queryString);

module.exports = viewEmployees;