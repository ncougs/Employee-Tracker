//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to view utlized budgets
const viewUtlizedBudget = async () => {
    //get departments to choose from
    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    //prompt user to confirm which departents budget to view
    const question = inquirer.prompt(
        [
            new Question('list','department', `Which department's utlized budget would you like to view ?`, currentDepartments),
        ]
    );
    //JSON containing result of department to view   
    const selectedDepartment = await question;
    
    //determine which department was selected    
    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;
   
    //generate query string for departments utilized budget
    const queryString = `SELECT department.name 'department', SUM(role.salary) AS 'utilized budget'
                        FROM department
                        JOIN role ON role.department_id = department.id
                        where department.id = ?`; 
    //return new Query object
    return new Query(queryString, [departmentID]);
 
};

module.exports = viewUtlizedBudget;