/* IIFE to build the gameboard*/




/* objects for the players with functions for X and O*/

const game = (()=> {

    (function (){ 
    return gameboard = {
            board: ["","","","","","","","",""]
            
        }
    })();

    (function(){
        return gameFlow = function(){
            if(gameboard.board.filter(e => e == "X").length === gameboard.board.filter(e => e == "O").length){
                console.log("Its player one turn")
            } else {
                console.log("Its player two turn")
            }
        }
    })();

    console.log(gameboard.board)

    function createPlayer(givenName, marker){
        const playerName = givenName;
        const playerMarker = marker;
        const setMarker = function(position){
            if (gameboard.board[position-1]== ""){
                gameboard.board[position - 1] = marker;
                console.log(gameboard.board);
                gameFlow();
            } else {
                console.log("You cant place your marker there")
                console.log(gameboard.board)
            }
        }
        return {
            playerName, playerMarker, setMarker,
        }
    }

    function checkWinner(){

    }

    const playerOne = createPlayer("Finn", "X")
    const playerTwo = createPlayer("Charly", "O")

    return {
        playerOne, playerTwo,
    }
})();
