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
                ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        )]
    );

    const startingOption = startingQuestion.startingOption;

    handleRequest(startingOption);
    
};

init();
