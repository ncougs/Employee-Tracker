const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

const deleteDepartment = async () => {

    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    const question = inquirer.prompt(
        [
            new Question('list','department', `Which department would you like to delete ?`, currentDepartments),
        ]
    );

    const selectedDepartment = await question;

    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;

    const queryString = `DELETE FROM department WHERE id = ?`; 
    
    return new Query(queryString, [departmentID]);
 
};

module.exports = deleteDepartment;