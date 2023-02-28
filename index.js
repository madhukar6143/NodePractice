const exp=require("express")
const app=exp();



//homepage
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

//import userApp&productApp
const userApp = require("./module/querieswithcallbacks");
const promiseApp = require("./module/querieswithpromise");
//execute routes based on path
app.use("/callback",userApp)
app.use("/promise",promiseApp)
const port=5000
app.listen(port,()=>console.log(`Server can hear you on ${port}....`))

