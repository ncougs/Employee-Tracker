const db = require('../db/connection');

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
          console.log(results);
        }
      );

      db.end();
};

module.exports = viewAllDepartments;
