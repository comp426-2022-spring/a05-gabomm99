const args = require("minimist")(process.argv.slice(2))
args['port', 'debug', 'log', 'help'];
var port = args.port || process.env.PORT || 5555

// Importing general config
const config = require("./src/config/general.config.js")
const routes = require("./src/routes/someroutes.js")
const midWare = require("./src/middleware/mymiddleware.js")
const express = config.express
const db = config.db
const app = config.app
app.use(express.static('./public'));


//Using express to get body field trhough URL or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// If --help or -h, echo help text to STDOUT and exit
midWare.helpScript(args)

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

//MIDDLEWARE
midWare.debugScript(args, db, app)

midWare.logScript(args, app)

app.use(midWare.intData)
//MIDDLEWARE


app.get(routes.root)

app.get(routes.oneFlip)

app.get(routes.manyFlips)


app.get(routes.headGuess)

app.post(routes.bodyCoin)

app.post(routes.bodyFlips)

app.use(function(req, res){
  res.type('text/plain')
  res.status(404).send("Endpoint does not exist")
})