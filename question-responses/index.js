//interal modules required to run handleRequest
const viewDepartments = require('./view-departments');
const viewRoles = require('./view-roles');
const viewEmployees = require('./view-employees');
const addDepartment = require('./add-department');
const addRole = require('./add-role');
const addEmployee = require('./add-employee');
const updateEmployee = require('./udpate-employee');
const viewEmployeesByManager = require('./view-employees-by-manager');
const viewEmployeesByDepartment = require('./view-employees-by-department');
const deleteDepartment = require('./delete-department');
const deleteRole = require('./delete-role');
const deleteEmployee = require('./delete-employee');
const viewUtlizedBudget = require('./view-total-salary-utlized-budget');

//handle responses from startingOption

const handleRequest = async (startingOption) => {
 
    if(startingOption == 'view all departments') {viewDepartments.executeQuery();};
    if(startingOption == 'view all roles') {viewRoles.executeQuery();};
    if(startingOption == 'view all employees') {viewEmployees.executeQuery();};
    if(startingOption == 'add a department') {addDepartment().then(result => result.executeQuery())};
    if(startingOption == 'add a role') {addRole().then(result => result.executeQuery())}; 
    if(startingOption == 'add an employee') {addEmployee().then(result => result.executeQuery())}; 
    if(startingOption == 'update an employee') {updateEmployee().then(result => result.executeQuery())}; 
    if(startingOption == 'view employees by manager') {viewEmployeesByManager().then(result => result.executeQuery())}; 
    if(startingOption == 'view employees by department') {viewEmployeesByDepartment().then(result => result.executeQuery())}; 
    if(startingOption == 'delete department') {deleteDepartment().then(result => result.executeQuery())}; 
    if(startingOption == 'delete role') {deleteRole().then(result => result.executeQuery())}; 
    if(startingOption == 'delete employee') {deleteEmployee().then(result => result.executeQuery())}; 
    if(startingOption == 'view utilized budget') {viewUtlizedBudget().then(result => result.executeQuery())};

};

module.exports = handleRequest;
