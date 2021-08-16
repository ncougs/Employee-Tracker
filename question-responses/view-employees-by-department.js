//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to view employees by department
const viewEmployeesByDepartment = async () => {
    //get current departments to choose from
    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    //prompt user to confirm which departents employees to view
    const question = inquirer.prompt(
        [
            new Question('list','department', `Which departments's employees would you like to view ?`, currentDepartments),
        ]
    );
    //JSON containing result of department to view   
    const selectedDepartment = await question;

    //determine which department was selected    
    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;

    //generate query string for to view employees by department
    const queryString = `SELECT employee.first_name, employee.last_name,
                        role.title,
                        department.name 'departement'
                        FROM employee
                        JOIN role ON employee.role_id = role.id
                        JOIN department on role.department_id = department.id
                        where department_id = ?`; 
    
    //return new Query object
    return new Query(queryString, [departmentID]);
 
};

module.exports = viewEmployeesByDepartment;


