const exp = require("express");
const promiseApp = exp.Router();

// Set up middleware to parse JSON requests
promiseApp.use(exp.json());

// Import the MySQL library and create a promise-based connection to the MySQL database
const mysql = require('mysql2/promise');

// Define a route to retrieve all users from the 'users' table in the database
promiseApp.get("/get-users", (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'madhu',
        database: 'myfirstdb'
    })
    // Once connected to the database, execute a SQL query to retrieve all users
    .then(connection => {
        let sql = `select * from myfirstdb.users`;
        return connection.query(sql)
    })
    // If the query is successful, send the result to the client as a response
    .then((result) => {
        return res.status(200).send(result[0])
    })
    // If the query fails, send an error response to the client
    .catch((err) => { return res.status(500).send(err.message) })
});

// Define a route to create a new user in the 'users' table
promiseApp.post("/create-user", (req, res) => {
    // Extract the user object from the request body
    let userObj = req.body;

    // Attempt to connect to the MySQL database
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'madhu',
        database: 'myfirstdb'
    })
    // Once connected to the database, execute a SQL query to insert a new user record
    .then(connection => {
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        values = [userObj.username, userObj.password, userObj.email];
        return connection.query(sql,values)
    })
    // If the query is successful, send a success response to the client
    .then((result) => {
        res.status(200).send("Insertion Successful")
    })
    // If the query fails, send an error response to the client
    .catch((err) => { return res.status(500).send(err.message) })
});


module.exports = promiseApp;
