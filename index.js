const exp=require("express");
const app=exp();



//homepage
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

//import userApp&productApp
const callbackApp= require("./module/querieswithcallbacks");
const promiseApp = require("./module/querieswithpromise");
const asyncApp = require("./module/querieswithasyncawait");
//execute routes based on path
app.use("/callback",callbackApp)
app.use("/promise",promiseApp)
app.use("/async",asyncApp)
const port=5000
app.listen(port,()=>console.log(`Server can hear you on ${port}....`))

