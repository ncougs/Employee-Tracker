const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const viewUtlizedBudget = async () => {

    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    const question = inquirer.prompt(
        [
            new Question('list','department', `Which department's utlized budget would you like to view ?`, currentDepartments),
        ]
    );

    const selectedDepartment = await question;

    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;

    const queryString = `SELECT department.name 'department', SUM(role.salary) AS 'utilized budget'
                        FROM department
                        JOIN role ON role.department_id = department.id
                        where department.id = ?`; 
    
    return new Query(queryString, [departmentID]);
 
};

module.exports = viewUtlizedBudget;