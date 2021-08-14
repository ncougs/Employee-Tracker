const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const addRole = async () => {

    const currentDepartments = await executeQuery('SELECT * FROM department');

    const question = inquirer.prompt(
        [
            new Question('input','title', 'What is the title of the role ?'),
            new Question('input','salary', 'What is the salary of the role ?'),
            new Question('list','department', 'Which department does this role belong to ?', currentDepartments[0])
        ]
    );

    const role = await question;

    const departmetnRow = currentDepartments[0].find(row => row.name === role.department);

    const departmentID = departmetnRow.id;
    
    const queryString = `INSERT INTO role (title, salary, department_id) VALUES  ("${role.title}", ${role.salary}, ${departmentID})`;
       
    return new Query(queryString);
 
};

module.exports = addRole;

