//packages required
const Query = require('../helpers/query');
//query string to view roles
const queryString = `SELECT role.id, role.title, role.salary, department.name 'department'
                    FROM role
                    LEFT OUTER JOIN department ON role.department_id = department.id`;
//return new Query object
const viewRoles = new Query(queryString);

module.exports = viewRoles;