// Flip game definitions

//Requiring controllers
const config = require("../config/general.config.js");
const flipGame = require("../controllers/mycontrollers.js")
const express = config.express
const app = config.app
app.use(express.json());

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
    var sumFlip = flipGame.countFlips(manyFlip)
    res.type('application/json')
    res.status(200).json({'raw': manyFlip, 'summary': sumFlip})
})


const headGuess = app.get('/app/flip/call/:guess(heads|tails)', (req, res) => {
  var flipResult = flipGame.flipACoin(req.params.guess)
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})


const bodyFlips = app.post('/app/flip/coins/', (req, res) => {
  const flips = coinFlips(req.body.number)
  const count = countFlips(flips)
  res.status(200).json({"raw":flips,"summary":count})
})

const bodyCoin = app.post('/app/flip/call/', (req, res) => {
  const game = flipACoin(req.body.guess)
  res.status(200).json(game)
})

module.exports = {root, oneFlip, manyFlips, headGuess, bodyFlips, bodyCoin}

