const { logQuery } = require('../helpers/db-query');

function Query(req, variable) {
    this.query = req,
    this.executeQuery = () => {
        logQuery(this.query, variable);
    }
};

module.exports = Query;