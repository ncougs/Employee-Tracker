const logQuery = async (query, variable) => {
    require('dotenv').config()
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: process.env.DB_USER, password: process.env.DB_PASS, database: 'business'});
    // query database
    connection.query(query).then(data => console.log(data[0]));
};

const executeQuery = async (query, variable) => {
    require('dotenv').config()
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: process.env.DB_USER, password: process.env.DB_PASS, database: 'business'});
    // query database
    return connection.query(query);
};

module.exports = { logQuery, executeQuery };