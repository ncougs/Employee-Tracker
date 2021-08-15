const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const deleteEmployee = async () => {

    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name) AS employee FROM employee');

    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.employee);
    });

    const question = inquirer.prompt(
        [
            new Question('list','employee', `Which employee would you like to delete ?`, currentEmployees),
        ]
    );

    const selectedEmployee = await question;

    const employeeRow = employeeRows[0].find(row => row.employee === selectedEmployee.employee);
    
    const employeeID = employeeRow.id;

    const queryString = `DELETE FROM employee WHERE id = ?`; 
    
    return new Query(queryString, [employeeID]);
 
};

module.exports = deleteEmployee;