// Flip game definitions

//Requiring controllers
const config = require("../config/general.config.js");
const flipGame = require("../controllers/mycontrollers.js")

//const gameRoutes = config.express.Router();

const root = app.get('/app', (req, res) => {
    res.type('text/plain')
    res.status(200).end(`200 OK`)
}
)
const oneFlip = app.get('/app/flip', (req, res) => {
    var flip = flipGame.coinFlip()
    res.type('application/json')
    res.status(200).json({'flip': flip})
})

const manyFlips = app.get('/app/flips/:number', (req,res) => {
    var manyFlip = flipGame.coinFlips(req.params.number)
    var sumFlip = countFlips(manyFlip)
    res.type('application/json')
    res.status(200).json({'raw': manyFlip, 'summary': sumFlip})
})


const headGuess = app.get('/app/flip/call/heads', (req, res) => {
  var flipResult = flipGame.flipACoin("heads")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

const tailGuess = app.get('/app/flip/call/tails', (req, res) => {
  var flipResult = flipGame.flipACoin("tails")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

module.exports = {root, oneFlip, manyFlips, headGuess, tailGuess}

