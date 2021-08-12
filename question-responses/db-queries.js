//Connect to db
const db = require('../db/connection');

//Different db queries

//view all departments
const viewDepartments = `SELECT * FROM department`;

//view all roles
const viewRoles = `SELECT role.id, role.title, role.salary, department.name 'department'
                    FROM role
                    JOIN department ON role.department_id = department.id`;

//View all employees
const viewEmployes = `SELECT employee.id 'id', employee.first_name 'First Name', employee.last_name 'Last Name',
                      title 'Title', salary 'Salary', 
                      CONCAT(m.first_name, " ", m.last_name) AS Manager,
                      department.name 'Department'
                      FROM employee
                      join employee m ON (employee.manager_id = m.id)
                      JOIN role ON employee.role_id = role.id
                      JOIN department on role.department_id = department.id`;

// View employees by manager
const viewManagerEmployees = `SELECT employee.first_name, employee.last_name,
                              CONCAT(m.first_name, " ", m.last_name) AS Manager
                              FROM employee
                              JOIN employee m ON (employee.manager_id = m.id)
                              WHERE employee.manager_id = ?;`;

// View employees by department    
const viewDepartmentEmployees = `SELECT employee.first_name, employee.last_name,
                                role.title,
                                department.name 'departement'
                                FROM employee
                                JOIN role ON employee.role_id = role.id
                                JOIN department on role.department_id = department.id
                                where department_id = ?`;                    


const dbQuery = (request, condition) => {
  //check which question was asked
  const query = (request) => {
      if (request == 'view all departments') {return viewDepartments};
      if (request == 'view all roles') {return viewRoles};
      if (request == 'view all employees') {return viewEmployes};
  };

  //perform db query
  db.query(query(request), condition, (err, results) => {
        console.log(results);
      }
  );

  //end db connection
  db.end();
};

module.exports = dbQuery;
