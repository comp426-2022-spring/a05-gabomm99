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
    fetch("http://localhost:5555/app/flip/coins", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({"number" : document.getElementById("coinNums")})
        }).then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);

            // Put summary results into the summary table.
            document.getElementById("headFlipped").innerHTML = result.summary.heads;
            document.getElementById("tailsFlipped").innerHTML = result.summary.tails;
        })
    }

 
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
