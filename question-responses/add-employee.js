//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to add an employee
const addEmployee = async () => {
    //Get all current Roles available
    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });

    //Get all the current employees available - Used to select the new employees manager
    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name ) AS Manager FROM employee');
    
    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.Manager);
    });

    //ask the user details of the new employee
    const question = inquirer.prompt(
        [
            new Question('input','firstName', 'What employees first name ?'),
            new Question('input','lastName', 'What employees last names ?'),
            new Question('list','role', `What is the employee's role ?`, currentRoles),
            new Question('list','manager', `Who is the employee's manager ?`, currentEmployees)
        ]
    );
    //JSON containing result of new employee    
    const employee = await question;

    //determine which role was selected
    //then determine based off that selection what is the associated role_id      
    const roleRow = roleRows[0].find(row => row.title === employee.role);

    const roleID = roleRow.id;

    //determine which manager was selected
    //then determine based off that selection what is the associated manager_id         
    const managerRow = employeeRows[0].find(row => row.Manager === employee.manager);

    const mangerID = managerRow.id;
   
    //Generate query string with new employee details, linking to a role_id and manager_id 
    const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${roleID}, ${mangerID})`;
    
    //return new Query object
    return new Query(queryString);
 
};

module.exports = addEmployee;