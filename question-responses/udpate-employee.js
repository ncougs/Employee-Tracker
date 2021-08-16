//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to update an employee
const updateEmployee = async () => {
    //get all current employees to choose from
    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name ) AS employee FROM employee');
    
    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.employee);
    });

    //get all current roles to choose from
    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });

    //prompt user to confirm which employee to update and the field
    const question = inquirer.prompt(
        [
            new Question('list','employee', 'Which employee would you like to update ?', currentEmployees),
            new Question('list','field', 'Which field would you like to update ?', ['first name', 'last name', 'role', 'manager'])
        ]
    );
    //JSON containing result of employee to udpate   
    const updateEmployee = await question;

    //determine which employee was selected    
    const employeeRow = employeeRows[0].find(row => row.employee === updateEmployee.employee);
    
    const updateEmployeeID = employeeRow.id;

    //function to handle repsonse of user input
    const updateField = async () => {
        //if updating first name
        if(updateEmployee.field == 'first name') {
            const data = await inquirer.prompt(
                [
                    new Question('input','value', 'What is the employees first name ?')
                ]
            );

            return `SET first_name = "${data.value}"`
        };
        //if updating last name
        if(updateEmployee.field == 'last name') {
            const data = await inquirer.prompt(
                [
                    new Question('input','value', 'What is the employees last name ?')
                ]
            );

            return `SET last_name = "${data.value}"`
        };
       //if updating role
        if(updateEmployee.field == 'role') {
            //ask user to confirm the new role
            const data = await inquirer.prompt(
                [
                    new Question('list','value', `What is the employee's role ?`, currentRoles)
                ]
            );
            //determine which role was selected
            //then find the assoicated role_id
            const roleRow = roleRows[0].find(row => row.title === data.value);

            const roleID = roleRow.id;

            return `SET role_id = ${roleID}`
        };

        if(updateEmployee.field == 'manager') {
            //if updating manager
            const data = await inquirer.prompt(
                [
                    new Question('list','value', `Who is the employee's manager ?`, currentEmployees)
                ]
            );
            //determine which employee was selected as the manager
            //then find the assoicated employee_id
            const employeeRow = employeeRows[0].find(row => row.employee === data.value);
    
            const updateEmployeeID = employeeRow.id;

            return `SET manager_id = ${updateEmployeeID}`
        };

    };

    //wait for results of updateField
    const updateQuery = await updateField();

    //generate new query based of result of updateField()
    const queryString = `UPDATE employee ${updateQuery} WHERE id = ${updateEmployeeID}`; 
    
    //return new Query object
    return new Query(queryString);
 
};

module.exports = updateEmployee;
