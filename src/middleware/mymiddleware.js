// Middleware function definitions go here
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


function debuScript(args, db, app){
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
}

//App use() requirements
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

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

app.use(function(req, res){
       res.type('text/plain')
       res.status(404).send("Endpoint does not exist")
})