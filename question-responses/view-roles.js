const Query = require('../helpers/query');

const queryString = `SELECT role.id, role.title, role.salary, department.name 'department'
                    FROM role
                    JOIN department ON role.department_id = department.id`;

const viewRoles = new Query(queryString);

module.exports = viewRoles;