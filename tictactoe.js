/* THE ODIN PROJECT - JAVASCRIPT - TIC TAC TOE PROJECT

METHOD/APPROACH:
    - start with two-players then AI (player 1 always "X")
    - gameboard as an array inside gameBoard object
    - players stored in objects
    - object to control the flow of game
    - little global code as possible
    - if one of something (gameBoard/displayController), then use Module. If more than one, use factories.
    - JS-HTML render the contents of gameboard array to webpage.
    - logic to place markers to a specific spot; disallow multiple placements.
    - check gameover
    - restart/clear interface
    - ambitious option: let player play against AI & make computer make the first move.
    * overall 4 main/starting objects: gameBoard (module), players (FF), gameControl (FF).
    * overall 2 main functions: render(), markToDOM (mark symbol and update DOM).

LEARNED:
    - refresher: Module pattern - just an FF (alt. to Constructors) that can be publicized through return, but is just enclosed in
    IIFE.
    - in FF, properties are declared as functions, then returned.
    - in if logic, make sure to separate and group logics of && and || using brackets.
    - order of which functions are declared are important if values are to be passed as arguments to suceeding function/module.
    - To pass arguments into Module Pattern, return function inside the Module.

PSEUDO: (THINK IN OBJECTS CONTEXT)
    - make grid in HTML/CSS & assign each box (child div's) with array element of gameboard
    - start button to enable inputs - given start button is clicked before any actions.
    - store X/O somewhere to keep track of box indices??
        - other option: when three boxes are same symbols in a row/diagonal, then the player wins.
        - if all boxes have value, but nothing in a row, then draw.
    * if a grid box is clicked, then render (innerHTML/innerHTML) = X or O.
        - make sure if X or O exists, then don't populate.
    - taking turns: inside gameplay object, use array collecting the symbols by turn/onclick; if the latest element in an array is
     “X”, then place “O” if grid box is clicked – put array inside the gameplay object.
    - Players as object; user can choose and select from the FF.
        - if button clicked, then user2 = player or AI.
        - player name can be arg input then displayed through FF.
        - display using playerX.name.
    -  Make logic for win: inside the gameplay object:
        - if grid in a row/diagonal, is “X”, then user1 wins: use simple if statement with &&, ||.

STATUS:
    - can't get e.preventDefault() to work <- odd problem that seems to occur randomly; solved by including preventDefault() with 
    addEventListener, instead of onsubmit.
    - modal box starts immediately on page load - fix problem with modal (CAN'T RESOLVE; JUST DISPLAY WINNER THROUGH DOM).
        - couldn't resolve because if statement was problematic, showing shaded background upon page load.
    - disable box click when winner determined - COMPLETE
    - make draw condition - COMPLETE
    - make reset - COMPLETE
    - make vs. AI (STUCK: when player vs AI selection is same, OR box already has content, then don't populate)
*/

const Players = (name) => {
    const getName = () => name;

    return {getName, selection};
};

//other option is to have two FF for each player, then assign a mark (X/O) for each.

const gameBoard = (function() {
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
    let randArray = [];
    let randomSelect = "";

    //mark X/O onclick:
    gameBoard.gameArray.map(a => {
        a.addEventListener("click", function(event) {
            if ((a.innerHTML !== 'X' && a.innerHTML !== 'O') && gameControl() !== "wins") {
                if ((symArray[symArray.length-1] == 'O' || symArray[symArray.length-1] == null) && a.innerHTML !== 'O') {
                    a.innerHTML = 'X';
                    symArray.push('X');
                } else if ((symArray[symArray.length-1] == 'X' || symArray[symArray.length-1] == null) && a.innerHTML !== 'X') {
                    a.innerHTML = 'O';
                    symArray.push('O');
                }
            }
            //AI selection (LEARNED: making else if condition for case when aiSelect == a won't do anything on AI turn):
            /*randomSelect = Math.floor(Math.random() * gameBoard.gameArray.length);
            let aiSelect = gameBoard.gameArray[randomSelect];
            console.log(a);
            console.log(aiSelect);*/
            //aiSelect !== a; then aiSelect.innerHTML = 'symbol' inside if statement below only compares current a value, not the entire a values in the board.
            //above code returned two simultaneous boxes to be filled with symbols: placed symbol on same boxes for AI and player & placed symbol on already occupied box.

            //AI selection: KEY LESSON LEARNED: use filter method instead of above commented approach.
            let emptyBoxes = gameBoard.gameArray.filter(mark => mark.innerHTML == "");
            let availBoxes = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            if (gameControl() !== 'wins') {
                if ((randArray[randArray.length-1] == 'X' || randArray[randArray.length-1] == null) && availBoxes.innerText !== 'X') {
                    availBoxes.innerText = 'O';
                    randArray.push('O');
                } else if ((randArray[randArray.length-1] == 'O' || randArray[randArray.length-1] == null) && availBoxes.innerText !== 'O') {
                    availBoxes.innerText = 'X';
                    randArray.push('X');
                }
            }
            gameControl();
        })
    })

    //reset control:
    let reset = document.getElementById("reset");
    reset.addEventListener("click", function() {
        gameBoard.gameArray.map(a => {
            a.innerHTML = "";
            symArray = [];
            document.getElementById("winner").innerHTML = "";
        })
    })

}

let modelDOM = function() {
    render();
}

let gameControl = function() {
    //var modal = document.getElementById("myModal");
    //var span = document.getElementsByClassName("close")[0];
    /*
    span.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        */

    //Win Conditions:
    //player 1 criteria
    if (gameBoard.gameArray[0].innerHTML == 'X' && gameBoard.gameArray[1].innerHTML == 'X' && gameBoard.gameArray[2].innerHTML == 'X') {
        sayWinner = "Player1"
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[0].innerHTML == 'X' && gameBoard.gameArray[3].innerHTML == 'X' && gameBoard.gameArray[6].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[1].innerHTML == 'X' && gameBoard.gameArray[4].innerHTML == 'X' && gameBoard.gameArray[7].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[2].innerHTML == 'X' && gameBoard.gameArray[5].innerHTML == 'X' && gameBoard.gameArray[8].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[3].innerHTML == 'X' && gameBoard.gameArray[4].innerHTML == 'X' && gameBoard.gameArray[5].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[6].innerHTML == 'X' && gameBoard.gameArray[7].innerHTML == 'X' && gameBoard.gameArray[8].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[0].innerHTML == 'X' && gameBoard.gameArray[4].innerHTML == 'X' && gameBoard.gameArray[8].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[2].innerHTML == 'X' && gameBoard.gameArray[4].innerHTML == 'X' && gameBoard.gameArray[6].innerHTML == 'X') {
        sayWinner = "Player1";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    } 
    //player 2 criteria
    if (gameBoard.gameArray[0].innerHTML == 'O' && gameBoard.gameArray[1].innerHTML == 'O' && gameBoard.gameArray[2].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[0].innerHTML == 'O' && gameBoard.gameArray[3].innerHTML == 'O' && gameBoard.gameArray[6].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[1].innerHTML == 'O' && gameBoard.gameArray[4].innerHTML == 'O' && gameBoard.gameArray[7].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[2].innerHTML == 'O' && gameBoard.gameArray[5].innerHTML == 'O' && gameBoard.gameArray[8].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[3].innerHTML == 'O' && gameBoard.gameArray[4].innerHTML == 'O' && gameBoard.gameArray[5].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[6].innerHTML == 'O' && gameBoard.gameArray[7].innerHTML == 'O' && gameBoard.gameArray[8].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[0].innerHTML == 'O' && gameBoard.gameArray[4].innerHTML == 'O' && gameBoard.gameArray[8].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    }
    if (gameBoard.gameArray[2].innerHTML == 'O' && gameBoard.gameArray[4].innerHTML == 'O' && gameBoard.gameArray[6].innerHTML == 'O') {
        sayWinner = "Player2";
        gameWin.winGame(sayWinner);
        //modal.style.display = 'block';
        return "wins";
    } 
    //draw criteria
    if (gameBoard.gameArray.every(a => (a.innerHTML !== "" && (a.innerHTML == "X" || a.innerHTML == "O"))) == true) {
        gameWin.drawGame();
        return "wins";
    }

}

let gameWin = (function() {
    //call this function in modelDOM
    //put popup window including winner name
    return {winGame: function(winnerName){
            var content = document.getElementById("winner");
            content.innerHTML = winnerName + " Wins!";
        },
        drawGame: function(drawName) {
            var content = document.getElementById("winner");
            content.innerHTML = "Draw";
        }
    }
})();

modelDOM();
