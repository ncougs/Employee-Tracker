const Question = require('../helpers/question');
const inquirer = require('inquirer');
const Query = require('../helpers/query');

const addDepartment = async () => {

  const question = await inquirer.prompt([new Question('input','department', 'What department would you like to add ?')]);

  const department = await question.department;
  
  const queryString = `INSERT INTO department (name) VALUES ("${department}")`;

  return new Query(queryString);
 
};

module.exports = addDepartment;




