const app = require("a05-gabomm99/src/general.config.js")
// Place your server entry point code here
const args = require("minimist")(process.argv.slice(2))
args['port', 'debug', 'log', 'help'];
var port = args.port || process.env.PORT || 5555

const server = app.listen(port, () =>{
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

module.exports = {
    args: args,
    server: server
};