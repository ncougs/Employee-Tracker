const viewDepartments = require('./view-departments');
const viewRoles = require('./view-roles');
const viewEmployees = require('./view-employees');
const addDepartment = require('./add-department');
const addRole = require('./add-role');
const addEmployee = require('./add-employee');
const updateEmployee = require('./udpate-employee');

//handle responses from startingOption

const handleRequest = (startingOption) => {
    if(startingOption == 'view all departments') {viewDepartments.executeQuery();};
    if(startingOption == 'view all roles') {viewRoles.executeQuery();};
    if(startingOption == 'view all employees') {viewEmployees.executeQuery();};
    if(startingOption == 'add a department') {addDepartment().then(result => result.executeQuery())};
    if(startingOption == 'add a role') {addRole().then(result => result.executeQuery())}; 
    if(startingOption == 'add an employee') {addEmployee().then(result => result.executeQuery())}; 
    if(startingOption == 'update an employee role') {updateEmployee().then(result => result.executeQuery())}; 
};

module.exports = handleRequest;
