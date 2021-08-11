//required packages
const inquirer = require('inquirer');

//local packacges
const Question = require('./helpers/question');
const viewAllDepartments = require ('./question-responses/view-all-departments');


inquirer.prompt(
    [new Question(
            'list', 
            'startingOption', 
            `What would you like to do ?`, 
            ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    )]
).then((answers) => {
    if (answers.startingOption === 'view all departments') {
        viewAllDepartments();
    };
  })
.catch(error => console.error(error));

