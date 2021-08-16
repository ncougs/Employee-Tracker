//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to view employees by manager
const viewEmployeeByManager = async () => {

    //get current managers to choose from
    const managerRows = await executeQuery(`SELECT b.id, CONCAT(b.first_name, " ", b.last_name) AS manager FROM employee a, Employee b WHERE a.manager_id = b.id GROUP BY a.manager_id`);
    
    const currentManagers = [];

    managerRows[0].forEach(row => {
        currentManagers.push(row.manager);
    });

    //prompt user to confirm which managers employees to view
    const question = inquirer.prompt(
        [
            new Question('list','manager', `Which manager's employees would you like to view ?`, currentManagers),
        ]
    );
    //JSON containing result of manager to view   
    const selectedManager = await question;
    
    //determine which department was selected    
    const managerRow = managerRows[0].find(row => row.manager === selectedManager.manager);
    
    const managerID = managerRow.id;

    //generate query string for to view employees by manager
    const queryString = `SELECT employee.first_name, employee.last_name,
                        CONCAT(m.first_name, " ", m.last_name) AS Manager
                        FROM employee
                        JOIN employee m ON (employee.manager_id = m.id)
                        WHERE employee.manager_id = ?`; 
    
    //return new Query object
    return new Query(queryString, [managerID]);
 
};

module.exports = viewEmployeeByManager;

