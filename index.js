const exp=require("express");
const app=exp();
const axios = require('axios');




//homepage
app.get('/', function (req, res) {
  
  axios.get('https://www.ncei.noaa.gov/cdo-web/webservices/v2/datasets',
    {headers: {token: "eJwfgCcxLxQVkQFQXIphWyrmRBPYSvqu"}
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log("err mess",error.message);
  });
  
  
  
  
  
  
})

//import userApp&productApp
const callbackApp= require("./module/querieswithcallbacks");
const promiseApp = require("./module/querieswithpromise");
const asyncApp = require("./module/querieswithasyncawait");
const sequelizeApp=require('./module/sequelize')
//execute routes based on path
app.use("/callback",callbackApp)
app.use("/promise",promiseApp)
app.use("/async",asyncApp)
app.use("/sequelize",sequelizeApp)
const port=5000
app.listen(port,()=>console.log(`Server can hear you on ${port}....`))

