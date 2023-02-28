const exp = require("express");
const promiseApp = exp.Router();
promiseApp.use(exp.json());
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'madhu',
    database: 'myfirstdb'
});

promiseApp.get("/get-users", (req, res) => {
    // Attempt to connect to the MySQL database
    connection.connect()
        .then(() => {
            let sql = `select * from myfirstdb.users`;
            // Execute the SQL query and handle the result
            return connection.query(sql)
        })
        .then(result => {
            return res.status(200).send(JSON.stringify(result))
        })
        .catch(err =>{
           return res.status(500).send(err.message);
        }
            )
});

module.exports = promiseApp;