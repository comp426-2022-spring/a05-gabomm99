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
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
