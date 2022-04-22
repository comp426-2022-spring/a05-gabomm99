// Route (endpoint) definitions go in this directory
app.get('/app', (req, res) => {
    res.type('text/plain')
    res.status(200).end(`200 OK`)
}
)
app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.type('application/json')
    res.status(200).json({'flip': flip})
})

app.get('/app/flips/:number', (req,res) => {
    var manyFlip = coinFlips(req.params.number)
    var sumFlip = countFlips(manyFlip)
    res.type('application/json')
    res.status(200).json({'raw': manyFlip, 'summary': sumFlip})
})


app.get('/app/flip/call/heads', (req, res) => {
  var flipResult = flipACoin("heads")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

app.get('/app/flip/call/tails', (req, res) => {
  var flipResult = flipACoin("tails")
  var call = flipResult.call
  var flip = flipResult.flip
  var result = flipResult.result
  res.type('application/json')
  res.status(200).json({'call': call, 'flip': flip, 'result': result})
})

app.use(function(req, res){
  res.type('text/plain')
  res.status(404).send("Endpoint does not exist")
})