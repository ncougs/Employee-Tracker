//packages required
const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');

//function to handle adding a department
const addDepartment = async () => {
  //first ask user what department to add
  const question = await inquirer.prompt([new Question('input','department', 'What department would you like to add ?')]);
  //await response from the user
  const department = await question.department;
  //generate SQL querystring
  const queryString = `INSERT INTO department (name) VALUES ("${department}")`;
  //return a new Query object 
  return new Query(queryString);
 
};

module.exports = addDepartment;




