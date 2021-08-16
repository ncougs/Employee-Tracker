//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');
const { executeQuery } = require('../helpers/db-query');

//function to delete a department
const deleteDepartment = async () => {
    //get all current department to choose from
    const departmentRows = await executeQuery(`SELECT * from department`);

    const currentDepartments = [];

    departmentRows[0].forEach(row => {
        currentDepartments.push(row.name);
    });

    //prompt user to confirm which department to delete
    const question = inquirer.prompt(
        [
            new Question('list','department', `Which department would you like to delete ?`, currentDepartments),
        ]
    );
    //JSON containing result of department to delete      
    const selectedDepartment = await question;

    //determine which deparment was selected    
    const departmentRow = departmentRows[0].find(row => row.name === selectedDepartment.department);
    
    const departmentID = departmentRow.id;
    
    //generate query string for deleting the department.
    const queryString = `DELETE FROM department WHERE id = ?`; 
    
    //return new Query object
    return new Query(queryString, [departmentID]);
 
};

module.exports = deleteDepartment;