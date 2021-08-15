//required packages
const inquirer = require('inquirer');
const handleRequest = require('./question-responses');

//local packacges
const Question = require('./helpers/question');

const init = async () => {
   
    const startingQuestion = await inquirer.prompt(
        [new Question(
                'list', 
                'startingOption', 
                `What would you like to do ?`, 
                ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee', 'view employees by manager']
        )]
    );

    const startingOption = startingQuestion.startingOption;

    handleRequest(startingOption);
    
};

init();


//still to do:
//View employees by manager.
//View employees by department.
//Delete departments, roles, and employees.
//View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.