/* IIFE to build the gameboard*/
(function (){
    return gameboard = {
        board: ["","","","","","","","",""]
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
        } else {
            console.log("You cant place your marker there")
            console.log(gameboard.board)
        }
        
    }
    return {
        playerName, playerMarker, setMarker,
    }
}

const playerOne = createPlayer("Finn", "X")
const playerTwo = createPlayer("Charly", "O")


/* objects for the players with functions for X and O*/