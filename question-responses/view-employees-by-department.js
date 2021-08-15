const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const viewEmployeesByDepartment = async () => {

    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    const question = inquirer.prompt(
        [
            new Question('list','department', `Which departments's employees would you like to view ?`, currentDepartments),
        ]
    );

    const selectedDepartment = await question;

    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;

    const queryString = `SELECT employee.first_name, employee.last_name,
                        role.title,
                        department.name 'departement'
                        FROM employee
                        JOIN role ON employee.role_id = role.id
                        JOIN department on role.department_id = department.id
                        where department_id = ?`; 
    
    return new Query(queryString, [departmentID]);
 
};

module.exports = viewEmployeesByDepartment;


