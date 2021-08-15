const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const viewEmployeeByManager = async () => {

    const managerRows = await executeQuery(`SELECT b.id, CONCAT(b.first_name, " ", b.last_name) AS manager FROM employee a, Employee b WHERE a.manager_id = b.id GROUP BY a.manager_id`);
    
    const currentManagers = [];

    managerRows[0].forEach(row => {
        currentManagers.push(row.manager);
    });

    const question = inquirer.prompt(
        [
            new Question('list','manager', `Which manager's employees would you like to view ?`, currentManagers),
        ]
    );

    const selectedManager = await question;

    const managerRow = managerRows[0].find(row => row.manager === selectedManager.manager);
    
    const managerID = managerRow.id;

    const queryString = `SELECT employee.first_name, employee.last_name,
                        CONCAT(m.first_name, " ", m.last_name) AS Manager
                        FROM employee
                        JOIN employee m ON (employee.manager_id = m.id)
                        WHERE employee.manager_id = ?`; 
    
    return new Query(queryString, [managerID]);
 
};

module.exports = viewEmployeeByManager;

