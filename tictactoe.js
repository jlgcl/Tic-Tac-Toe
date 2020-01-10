/* THE ODIN PROJECT - JAVASCRIPT - TIC TAC TOE PROJECT

METHOD/APPROACH:
    - start with two-players then AI (player 1 always "X")
    - gameboard as an array inside Gameboard object
    - players stored in objects
    - object to control the flow of game
    - little global code as possible
    - if one of something (gameBoard/displayController), then use Module. If more than one, use factories.
    - JS-HTML render the contents of gameboard array to webpage.
    - logic to place markers to a specific spot; disallow multiple placements.
    - check gameover
    - restart/clear interface
    - ambitious option: let player play against AI & make computer make the first move.
    * overall 4 main/starting objects: Gameboard (module), players (FF), gameControl (FF).
    * overall 2 main functions: render(), markToDOM (mark symbol and update DOM).

LEARNED:
    - refresher: Module pattern - just an FF (alt. to Constructors) that can be publicized through return, but is just enclosed in
    IIFE.
    - in FF, properties are declared as functions, then returned.

PSEUDO: (THINK IN OBJECTS CONTEXT)
    - make grid in HTML/CSS & assign each box (child div's) with array element of gameboard - COMPLETE
    - start button to enable inputs - given start button is clicked before any actions.
    - store X/O somewhere to keep track of box indices?? (STUCK)
        - other option: when three boxes are same symbols in a row/diagonal, then the player wins.
        - if all boxes have value, but nothing in a row, then draw.
    * if a grid box is clicked, then render (innerHTML/textContent) = X or O.
        - make sure if X or O exists, then don't populate.
    - taking turns: inside gameplay object, use array collecting the symbols by turn/onclick; if the latest element in an array is
     “X”, then place “O” if grid box is clicked – put array inside the gameplay object.
    - Players as object; user can choose and select from the FF. - COMPLETE
        - if button clicked, then user2 = player or AI.
        - player name can be arg input then displayed through FF.
        - display using playerX.name.
    -  Make logic for win: inside the gameplay object:
        - if grid in a row/diagonal, is “X”, then user1 wins: use simple if statement with &&, ||.

STATUS:
    - can't get e.preventDefault() to work <- odd problem that seems to occur randomly; solved by including preventDefault() with 
    addEventListener, instead of onsubmit.
*/

const Players = (name) => {
    const getName = () => name;

    return {getName};
};

//other option is to have two FF for each player, then assign a mark (X/O) for each.

const Gameboard = (function() {
    let box1 = document.getElementById("one");
    let box2 = document.getElementById("two");
    let box3 = document.getElementById("three");
    let box4 = document.getElementById("four");
    let box5 = document.getElementById("five");
    let box6 = document.getElementById("six");
    let box7 = document.getElementById("seven");
    let box8 = document.getElementById("eight");
    let box9 = document.getElementById("nine");

    let gameArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    return {gameArray};
})();

let render = function() {   //call this function in modelDOM function.
    //let submit = document.getElementById("submit");
    let button = document.getElementById("submitButton");
    button.addEventListener ("click", function(e){
        e.preventDefault();
    
        const playerOne = Players(document.getElementById("player1").value);
        const playerTwo = Players(document.getElementById("player2").value);
        document.getElementById("playerOne").innerHTML = playerOne.getName();
        document.getElementById("playerTwo").innerHTML = playerTwo.getName();
    });

    let symArray = [];
    //mark X/O onclick: (something is wrong with below code)
    Gameboard.gameArray.map(a => {
        a.addEventListener("click", function() {
            if (a.textContent !== 'X' || a.textContent !== 'O') {
                if (symArray[symArray-1] == 'X') {
                    a.innerHTML == 'O';
                    symArray.push(a.innerHTML);
                } else if (symArray[symArray-1] == 'O') {
                    a.innerHTML == 'X';
                    symArray.push(a.innerHTML);
                }
            }
        })
    })
}

let modelDOM = function() {
    render();
}

let Gamecontrol = function(winnerName) {
    //call this function in modelDOM
    //put popup window including winner name.
}

modelDOM();
