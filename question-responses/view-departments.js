//packages required
const Query = require('../helpers/query');
//return new Query object
const viewDepartments = new Query(`SELECT * FROM department`);

module.exports = viewDepartments;



