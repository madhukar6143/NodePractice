const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'madhu',
  database: 'myfirstdb'
});

connection.connect()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database', err);
  });