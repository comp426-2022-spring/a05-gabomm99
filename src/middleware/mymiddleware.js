// Middleware function definitions go here
const config = require("../config/general.config.js");
const flipGame = require("../controllers/mycontrollers.js")
const app = config.app
const express = config.express
const db = config.db
const morgan = config.morgan
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
function helpScript(args){
    if (args.help || args.h) {
        console.log(help)
        process.exit(0)
    }
}


function debugScript(args, db, app){
if(args.debug == true){
    console.log(args['debug'])
    app.get('/app/log/access', (req, res) =>{
      console.log("in app/log/access")
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
}
function logScript(args, app){
  if(args.log == true){
  console.log(args['debug'])
  // Create a write stream to append to an access.log file
  const accessLog = fs.createWriteStream('../../data/log/access.log', { flags: 'a' })
  // Set up the access logging middleware
  app.use(morgan('combined', { stream: accessLog }))
}
}

//App use() requirements
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

intData = (req, res, next) => {
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
    }


module.exports = {
    helpScript: helpScript,
    debugScript: debugScript,
    logScript: logScript,
    intData: intData
};