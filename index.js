//required packages
const inquirer = require('inquirer');
const handleRequest = require('./question-responses');

//local packacges
const Question = require('./helpers/question');

//starting question to ask the user
const startingQuestion = async () => {

    const question = await inquirer.prompt(
        [new Question(
                'list', 
                'startingOption', 
                `What would you like to do ?`, 
                [
                    'view all departments',
                    'view all roles',
                    'view all employees', 
                    'add a department', 
                    'add a role', 
                    'add an employee', 
                    'update an employee', 
                    'view employees by manager', 
                    'view employees by department', 
                    'delete department', 
                    'delete role', 
                    'delete employee',
                    'view utilized budget',
                    'exit'
                ]
        )]
    );

    const result = await question.startingOption;

    return result;

};

//function call to inalize the application
const init = async () => {
   
    const result = await startingQuestion();

    if(result == 'exit'){
        console.log(`Bye!`)
        return;
    }
    else {
        const getResonse = await handleRequest(result);        
    };
};

init();