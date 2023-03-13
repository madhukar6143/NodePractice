const {DataTypes,Sequelize} = require("sequelize");
const exp = require("express");
const sequelizeApp = exp.Router();
sequelizeApp.use(exp.json());
const mysql = require('mysql2');
const sequelize = new Sequelize(
 'mydb',
 'root',
 'madhu',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const Book = sequelize.define("books", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    subject: {
      type: DataTypes.INTEGER,
    }
 });
 


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});





sequelizeApp.get("/insert-data", (req, res) => {
    try {
        // Get the request body as an object
        Book.create({
            title: "Clean Code",
            author: "Robert Cecil Martin",
            release_date: "2021-12-14",
            subject: 3
        }).then(result => {
            console.log(result)
            res.status(201).send(result.toJSON())
            
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
            res.status(500).send(error)
        });
     
    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});


sequelizeApp.get("/create-data", (req, res) => {
    try {
        // Get the request body as an object
         sequelize.sync().then(() => {
            console.log('Book table created successfully!');
            return res.status(201).send('Book table created successfully!');
         }).catch((error) => {
            console.error('Unable to create table : ', error);
            res.status(400).send('Unable to create table : ', error);
         });
    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});

sequelizeApp.get("/getusers", (req, res) => {
    try {
        // Get the request body as an object
        Book.findAll().then(response => {
          return res.status(200).send(response)
        }).catch((error) => {
            return res.status(400).send('Unable to retrive data : ', error);
        });
    
    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});


sequelizeApp.get("/getoneuser", (req, res) => {
    try {
        // Get the request body as an object
        Book.findOne({
            where: {
                id : "1"
            }
        }).then(response => {
            return res.status(200).send(response)
        
        }).catch((error) => {
            return res.status(400).send('Unable to retrive data : ', error);
        });
    
    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});

Book.destroy({
    where: {
      id: 2
    }
}).then(() => {
    console.log("Successfully deleted record.")
}).catch((error) => {
    console.error('Failed to delete record : ', error);
});

sequelizeApp.get("/deleteuser", (req, res) => {
    try {
        // Get the request body as an object
        Book.destroy({
            where: {
              id: 2
            }
        }).then((numDeleted) => {
            if (numDeleted === 1) 
            res.status(201).send('data deleted succesfully')
            else
            res.status(404).send("record not found")
        }).catch((error) => {
            
            return res.status(400).send('Unable to delete data : ', error);
        });

    } catch (error) {
        // Handle any other errors that may occur and return a 500 status code with an error message
        return res.status(500).send({ error: error.message });
    }
});



module.exports = sequelizeApp;
