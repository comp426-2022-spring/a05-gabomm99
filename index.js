const args = require("minimist")(process.argv.slice(2))
args['port', 'debug', 'log', 'help'];
var port = args.port || process.env.PORT || 5555




/*const fs = require('fs')
const morgan = require('morgan')
//"Importing database script"
const db = require("./database.js")
//Requiring express for the whole app
const express = require('express')
const app = express()
*/
const config = require("./src/config/general.config.js")
const routes = require("./src/routes/someroutes.js")
const midWare = require("./src/middleware/mymiddleware.js")
const express = config.express
const db = config.db
const app = config.app


// Importing general config

//Using express to get body field trhough URL or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// If --help or -h, echo help text to STDOUT and exit
midWare.debugScript(args, db, app)

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

//MIDDLEWARE
midWare.debugScript(args, db, app)

if(args.log == true){
  console.log(args['debug'])
  // Create a write stream to append to an access.log file
  const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
  // Set up the access logging middleware
  app.use(morgan('combined', { stream: accessLog }))
}

app.use(intData)
//MIDDLEWARE


app.get(routes.root)

app.get(routes.oneFlip)

app.get(routes.manyFlips)


app.get(routes.headGuess)

app.get(routes.tailGuess)

app.use(function(req, res){
  res.type('text/plain')
  res.status(404).send("Endpoint does not exist")
})