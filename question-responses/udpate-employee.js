const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const updateEmployee = async () => {

    const employeeRows = await executeQuery('SELECT id, CONCAT (first_name, " ", last_name ) AS employee FROM employee');
    
    const currentEmployees = [];

    employeeRows[0].forEach(row => {
        currentEmployees.push(row.employee);
    });

    const roleRows = await executeQuery('SELECT * FROM role');

    const currentRoles = [];

    roleRows[0].forEach(row => {
        currentRoles.push(row.title);
    });

    const question = inquirer.prompt(
        [
            new Question('list','employee', 'Which employee would you like to update ?', currentEmployees),
            new Question('list','field', 'Which field would you like to update ?', ['first name', 'last name', 'role', 'manager'])
        ]
    );

    const updateEmployee = await question;

    const employeeRow = employeeRows[0].find(row => row.employee === updateEmployee.employee);
    
    const updateEmployeeID = employeeRow.id;

    const updateField = async () => {
        if(updateEmployee.field == 'first name') {
            const data = await inquirer.prompt(
                [
                    new Question('input','value', 'What is the employees first name ?')
                ]
            );

            return `SET first_name = "${data.value}"`
        };

        if(updateEmployee.field == 'last name') {
            const data = await inquirer.prompt(
                [
                    new Question('input','value', 'What is the employees last name ?')
                ]
            );

            return `SET last_name = "${data.value}"`
        };

        if(updateEmployee.field == 'role') {
            const data = await inquirer.prompt(
                [
                    new Question('list','value', `What is the employee's role ?`, currentRoles)
                ]
            );

            const roleRow = roleRows[0].find(row => row.title === data.value);

            const roleID = roleRow.id;

            return `SET role_id = ${roleID}`
        };

        if(updateEmployee.field == 'manager') {
            const data = await inquirer.prompt(
                [
                    new Question('list','value', `Who is the employee's manager ?`, currentEmployees)
                ]
            );

            const employeeRow = employeeRows[0].find(row => row.employee === data.value);
    
            const updateEmployeeID = employeeRow.id;

            return `SET manager_id = ${updateEmployeeID}`
        };

    };

    const updateQuery = await updateField();

    const queryString = `UPDATE employee ${updateQuery} WHERE id = ${updateEmployeeID}`; 
    
    return new Query(queryString);
 
};

module.exports = updateEmployee;
