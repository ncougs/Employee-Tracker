const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const deleteRole = async () => {

    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });

    const question = inquirer.prompt(
        [
            new Question('list','role', `Which role would you like to delete ?`, currentRoles),
        ]
    );

    const selectedRole = await question;

    const roleRow = roleRows[0].find(row => row.title === selectedRole.role);
    
    const roleID = roleRow.id;

    const queryString = `DELETE FROM role WHERE id = ?`; 
    
    return new Query(queryString, [roleID]);
 
};

module.exports = deleteRole;