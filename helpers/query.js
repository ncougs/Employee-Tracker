//packages required
const { logQuery } = require('../helpers/db-query');

//construct object to hold the query string
//also performs the query and logs the result with this.query
//takes in two parameters: 1. query string 2. prepared statement variable
function Query(req, variable) {
    this.query = req,
    this.executeQuery = () => {
        logQuery(this.query, variable);
    }
};

module.exports = Query;