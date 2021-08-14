const Query = require('../helpers/query');

const viewDepartments = new Query(`SELECT * FROM department`);

module.exports = viewDepartments;



