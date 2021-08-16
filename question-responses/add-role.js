//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to add an a role
const addRole = async () => {
    //Get all of the current departments available
    const currentDepartments = await executeQuery('SELECT * FROM department');

    //Ask user details of the new role
    const question = inquirer.prompt(
        [
            new Question('input','title', 'What is the title of the role ?'),
            new Question('input','salary', 'What is the salary of the role ?'),
            new Question('list','department', 'Which department does this role belong to ?', currentDepartments[0])
        ]
    );
    //JSON containing result of new role        
    const role = await question;

    //determine which deparment was selected
    //then determine based off that selection what is the associated department_id    
    const departmetnRow = currentDepartments[0].find(row => row.name === role.department);

    const departmentID = departmetnRow.id;
    
    //generate new query string with response from the user and include department_id
    const queryString = `INSERT INTO role (title, salary, department_id) VALUES  ("${role.title}", ${role.salary}, ${departmentID})`;
    
    //return new Query object
    return new Query(queryString);
 
};

module.exports = addRole;

