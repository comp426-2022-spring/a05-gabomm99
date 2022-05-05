// The files in this directory contain functions that handle requests coming to different routes
function coinFlip() {
    let result
    let flip = Math.random()
    if ( flip < 0.5) {
      result = "heads"
    } else {
      result = "tails"
    }
    return result
  }
  
  function coinFlips(flips) {
    let multiFlip = []
    let i = 0
    while (i < flips){
      multiFlip.push(coinFlip())
      i++
    }
    return multiFlip
  }
  
  function countFlips(array) {
    let counter = {heads: 0, tails: 0} 
    for (let flip in array){
      if (array[flip] == "tails"){
        counter.tails++
      }
      else{
        counter.heads++
      }
    }
    return counter
  }
  
  function flipACoin(call) {
    let outcome = "lose"
    let flipOut = coinFlip()
    if (flipOut == call){
      outcome = "win"
    }
    let scenario = {call: call, flip: flipOut, result: outcome }
    return scenario
  }


  module.exports = {
    coinFlip: coinFlip,
    coinFlips: coinFlips,
    countFlips: countFlips,
    flipACoin: flipACoin
};