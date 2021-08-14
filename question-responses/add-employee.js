const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const addEmployee = async () => {

    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });

    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name ) AS Manager FROM employee');
    
    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.Manager);
    });

    const question = inquirer.prompt(
        [
            new Question('input','firstName', 'What employees first name ?'),
            new Question('input','lastName', 'What employees last names ?'),
            new Question('list','role', `What is the employee's role ?`, currentRoles),
            new Question('list','manager', `Who is the employee's manager ?`, currentEmployees)
        ]
    );

    const employee = await question;

    const roleRow = roleRows[0].find(row => row.title === employee.role);

    const roleID = roleRow.id;

    const managerRow = employeeRows[0].find(row => row.Manager === employee.manager);

    const mangerID = managerRow.id;
   
    const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${roleID}, ${mangerID})`;
       
    return new Query(queryString);
 
};

module.exports = addEmployee;