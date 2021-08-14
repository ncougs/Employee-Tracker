const { logQuery } = require('../helpers/db-query');

function Query(req) {
    this.query = req,
    this.executeQuery = () => {
        logQuery(this.query);
    }
};

module.exports = Query;