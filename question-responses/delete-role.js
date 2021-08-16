//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to delete an employee
const deleteRole = async () => {

    //get all current roles to choose from
    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });
    
    //prompt user to confirm which role to delete
    const question = inquirer.prompt(
        [
            new Question('list','role', `Which role would you like to delete ?`, currentRoles),
        ]
    );
    //JSON containing result of role to delete   
    const selectedRole = await question;
    
    //determine which role was selected    
    const roleRow = roleRows[0].find(row => row.title === selectedRole.role);
    
    const roleID = roleRow.id;
    
    //generate query string for deleting the role.
    const queryString = `DELETE FROM role WHERE id = ?`; 
    
    //return new Query object
    return new Query(queryString, [roleID]);
 
};

module.exports = deleteRole;