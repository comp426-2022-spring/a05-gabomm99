// Focus div based on nav button click
function divSetter(divTag){
    let allActiveElem = document.getElementsByClassName("active")
    let allActvArray = Array.from(allActiveElem)
    allActvArray.forEach(function (thisDiv){
        thisDiv.setAttribute("class", "hidden");
    })

    document.getElementById(divTag).setAttribute("class", "active");
}
// Flip one coin and show coin image to match result when button clicked
/*const coin = document.getElementById("coin")
coin.addEventListener("click", flipCoin)
*/
function flipCoin() {
    fetch('http://localhost:5555/app/flip', {mode: 'cors'})
        .then(function(response){
            return response.json()
        })
        .then(function(result){
            console.log(result);
            document.getElementById("result").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip + ".png")
        })
}
// Flip multiple coins and show coin images in table as well as summary results
function flipCoins() {
    fetch('http://localhost:5555/app/flip/coins', {
        body: JSON.stringify({
            "number": document.getElementById("coinNums").value
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "post"
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);

            document.getElementById("headFlipped").innerHTML = result.summary.heads;
            document.getElementById("tailsFlipped").innerHTML = result.summary.tails;
            var verboseTable = document.getElementById("verbose");
            for (var i = 0; i < result.raw.length; i++) {

                var newRow = document.createElement("tr");
                var newNumber = document.createElement("td");
                newNumber.innerHTML = i + 1;
                newRow.appendChild(newNumber);

                var thisResult = document.createElement("td");
                thisResult.innerHTML = result.raw[i];
                newRow.appendChild(thisResult);

                var newPic = document.createElement("td");
                var realImg = document.createElement("img");
                realImg.setAttribute("src", "assets/img/" + result.raw[i] + ".png");
                realImg.setAttribute("class", "smallcoin");
                newPic.appendChild(realImg);
                newRow.appendChild(newPic);

                verboseTable.appendChild(newRow);
            }
        })
    }

// Guess a flip by clicking either heads or tails button
function guessFlip(guess) {
    fetch('http://localhost:5555/app/flip/call', {
        body: JSON.stringify({
            "guess": guess
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "post"
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (results) {
            console.log(results);

            document.getElementById("win?").innerHTML = results.result;
            document.getElementById("winFlip").setAttribute("src", "assets/img/" + results.flip + ".png")

        })
}