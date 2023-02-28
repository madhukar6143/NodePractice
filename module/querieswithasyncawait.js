
const exp = require("express");
const asyncApp = exp.Router();
asyncApp.use(exp.json());
const mysql = require('mysql2/promise');

// Define a route to retrieve all users from the 'users' table in the database
asyncApp.get("/get-users", async (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'madhu',
            database: 'myfirstdb'
        });
        // Define an SQL query to retrieve all users from the 'users' table
        let sql = `select * from myfirstdb.users`;
        // Execute the query and retrieve the result
        let result = await connection.query(sql);
        // Send the result to the client as a response
        res.status(200).send(result[0]);
    }
    // If there is an error, send an error response to the client
    catch (err) {
        return res.status(500).send(err.message);
    }
});

// Define a route to create a new user in the 'users' table
asyncApp.post("/create-user", async (req, res) => {
    try {
        // Retrieve the user object from the request body
        let userObj = req.body;
        // Attempt to connect to the MySQL database
        let connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'madhu',
            database: 'myfirstdb'
        });
        // Define the SQL query to insert a new record into the 'users' table
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        // Define the values to be inserted into the new record
        values = [userObj.username, userObj.password, userObj.email];
        // Execute the query and insert the new record into the 'users' table
        await connection.query(sql, values);
        // Send a success message to the client as a response
        res.status(200).send("Insertion Successful");
    }
    // If there is an error, log the error and send an error response to the client
    catch (err) {
        return res.status(500).send(err.message);
    }
});

// Export the Express router
module.exports = asyncApp;