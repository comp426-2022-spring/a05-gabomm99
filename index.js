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
const express = config.express
const db = config.db
const app = config.app
const routes = require("./src/routes/someroutes.js")

// Importing general config

//Using express to get body field trhough URL or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

//MIDDLEWARE
if(args.debug == true){
  console.log(args['debug'])
  app.get('/app/log/access', (req, res) =>{
    console.log("in app/log/acces")
    try {
      const stmt = db.prepare('SELECT * FROM accesslog').all()
      res.status(200).json(stmt)
  } catch (error){
      console.error(error)
  }
  })
  app.get('/app/error', (req,res) =>{
    throw new Error('Error test successful.')
  })
}

if(args.log == true){
  console.log(args['debug'])
  // Create a write stream to append to an access.log file
  const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
  // Set up the access logging middleware
  app.use(morgan('combined', { stream: accessLog }))
}

app.use((req, res, next) => {
  let logdata = {
    remoteaddr: req.ip,
    remoteuser: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
}
  const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referrer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  const newData = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time,
    logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status,
    logdata.referer, logdata.useragent)
    next()
  })
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