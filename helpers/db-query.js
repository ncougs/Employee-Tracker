const cTable = require('console.table');

//db query to result in a console.log
const logQuery = async (query, variable) => {
    require('dotenv').config()
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: process.env.DB_USER, password: process.env.DB_PASS, database: 'business'});
    // query database
    connection.query(query, variable).then(data => console.table(data[0]));
    //end connection
    connection.end();
};

//db query
const executeQuery = async (query, variable) => {
    require('dotenv').config()
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: process.env.DB_USER, password: process.env.DB_PASS, database: 'business'});
    // query database
    const result = await connection.query(query);
    //end connection
    connection.end();

    return result;
};

module.exports = { logQuery, executeQuery };
