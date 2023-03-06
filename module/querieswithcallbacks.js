const exp = require("express");
const callbackApp = exp.Router();
callbackApp.use(exp.json());
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'madhu',
    database: 'myfirstdb'
});

// Define a GET endpoint for retrieving user data from the database
callbackApp.get("/get-users", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to retrieve all user records
            let sql = `select * from mydb.marks`;
            // Execute the SQL query and handle the result
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.post("/create-user", (req, res) => {
    try {
        // Get the request body as an object
        let userObj = req.body;

        // Connect to the MySQL database using the 'connection' object
        connection.connect((err) => {
            if (err) {
                // Handle connection errors and return a 500 status code with an error message
                return res.status(500).send({ 'Error connecting to database': err.message });
            }

            // Define the SQL query to insert a new record into the 'users' table
            const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

            // Define the values to be inserted into the new record
            values = [userObj.username, userObj.password, userObj.email];

            // Execute the SQL query using the 'query' method of the 'connection' object
            connection.query(sql, values, (error, result) => {
                if (error) {
                    // Handle database errors and return a 500 status code with an error message
                    return res.status(500).send({ 'Error inserting record': error.message });
                }
                // Return a 200 status code with a success message if the new record is inserted successfully
                return res.status(200).send('New record inserted!');
            });
        });

    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.get("/innerjoin", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to retrieve all user records
            let sql = `select  students.roll_no,students.name, marks.subject, marks.marks
             from mydb.students
             join 
             mydb.marks on mydb.marks.roll_no=mydb.students.roll_no`;

            // Execute the SQL query to implement join/inner join
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});



callbackApp.get("/leftjoin", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to implement left outer join
            let sql = `select  students.roll_no,students.name, marks.subject, marks.marks
            from mydb.students
            left join 
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no`;

            // Execute the SQL query to implement left outer join
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.get("/rightjoin", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to implement right outer join
            let sql = `select  students.roll_no,students.name, marks.subject, marks.marks 
            from mydb.students 
            right join
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no`;

            // Execute the SQL query and handle the result
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.get("/groupby", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to retrieve all user records
            let sql = `select  students.name as student, avg(marks.marks) 
            from mydb.students 
            join 
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no 
            group by student`;

            // Execute the SQL query to group them based on name and return averag marks 
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.get("/orderby", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to retrieve all user records
            let sql = `select  students.name as student, avg(marks.marks) as avgmarks 
            from mydb.students 
            join
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no 
            group by student 
            order by avgmarks`;

            // Execute the SQL query order the studnets based on thier average marks
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});

callbackApp.get("/rank", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to rank based on window rank function
            let sql = `select students.name as student, avg(marks.marks) as avgmarks,
            RANK() OVER (order by avg(marks.marks) ) AS rank1 from mydb.students 
            join
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no 
            group by student `;

            // Execute the SQL query and handle the result
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


callbackApp.get("/denserank", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to rank the stuents based on marks
            let sql = `select students.name as student, avg(marks.marks) as avgmarks,
            DENSE_RANK() OVER (order by avg(marks.marks) ) AS rank1 from mydb.students 
            join
            mydb.marks on mydb.marks.roll_no=mydb.students.roll_no 
            group by student `;

            // Execute the SQL query and handle the result
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                console.table(result)
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});


// Define a GET endpoint for retrieving user data from the database
callbackApp.get("/limit", (req, res) => {
    try {
        // Attempt to connect to the MySQL database
        connection.connect((err) => {
            // If there is an error connecting to the database, return a 500 status code and an error message
            if (err) {
                return res.status(500).send('Error connecting to MySQL database: ' + err.message);
            }
            // Define the SQL query to retrieve only top 5 users
            let sql = `SELECT * FROM mydb.students limit 5;`;
            // Execute the SQL query and handle the result
            connection.query(sql, function (err, result) {
                // If there is an error executing the query, return a 500 status code and an error message
                if (err) {
                    return res.status(500).send('Error in getting data', err.message)
                }
                // If the query is successful, return a 200 status code and the retrieved user records as JSON
                return res.status(200).send(JSON.stringify(result));
            });
        });

    } catch (error) {
        // If there is an unhandled exception, return a 500 status code and an error message
        return res.status(500).send({ error: error.message });
    }
});

module.exports = callbackApp;