//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to delete an employee
const deleteEmployee = async () => {
    //get all current employees to choose from
    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name) AS employee FROM employee');

    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.employee);
    });
    
    //prompt user to confirm which employee to delete
    const question = inquirer.prompt(
        [
            new Question('list','employee', `Which employee would you like to delete ?`, currentEmployees),
        ]
    );
    //JSON containing result of employee to delete   
    const selectedEmployee = await question;
    
    //determine which employee was selected    
    const employeeRow = employeeRows[0].find(row => row.employee === selectedEmployee.employee);
    
    const employeeID = employeeRow.id;
    
    //generate query string for deleting the employee.
    const queryString = `DELETE FROM employee WHERE id = ?`; 
        
    //return new Query object
    return new Query(queryString, [employeeID]);
 
};

module.exports = deleteEmployee;