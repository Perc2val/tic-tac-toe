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
        const playerMarkerPosition = []; 
        const setMarker = function(position){
            if (gameboard.board[position-1]== ""){
                gameboard.board[position - 1] = marker;
                console.log(gameboard.board);
                getPlayerMarkerPosition();
                checkWinner();
            } else {
                console.log("You cant place your marker there")
                console.log(gameboard.board)
            }
        }
        function getPlayerMarkerPosition(){
            playerMarkerPosition.length = 0;
            let idx = gameboard.board.indexOf(playerMarker);
                while (idx !== -1) {
                playerMarkerPosition.push(idx);
                idx = gameboard.board.indexOf(playerMarker, idx + 1);
            }  
            console.log(playerMarkerPosition);
        }
        function checkWinner(){
            /*const winningConditions = (["0","1","2"]["0","3","6"]["1","4","7"]["3","4","5"]["2","5","8"]["6","7","8"]["0","4","8"]["6","4","2"])*/
            const winningConditions ={
                winOne:[0,1,2],
                winTwo:[0,3,6],
                winThree:[1,4,7],
                winFour:[3,4,5],
                winFive:[2,5,8],
                winSix:[6,7,8],
                winSeven:[0,4,8],
                winEight:[6,4,2]}
            if (winningConditions.winOne.toString() == playerMarkerPosition.toString() ||
                winningConditions.winTwo.toString() == playerMarkerPosition.toString() ||
                winningConditions.winThree.toString() == playerMarkerPosition.toString() ||
                winningConditions.winFour.toString() == playerMarkerPosition.toString() ||
                winningConditions.winFive.toString() == playerMarkerPosition.toString() ||
                winningConditions.winSix.toString() == playerMarkerPosition.toString() ||
                winningConditions.winSeven.toString() == playerMarkerPosition.toString() ||
                winningConditions.winEight.toString() == playerMarkerPosition.toString()){
                console.log(`${playerName} won with the winning combination ${winningConditions.winOne}`)
            } else {
                gameFlow();
            }
        }

        return {
            playerName, playerMarker, setMarker, playerMarkerPosition,
        }
    }

    
    
    

    const playerOne = createPlayer("Finn", "X")
    const playerTwo = createPlayer("Charly", "O")

    return {
        playerOne, playerTwo,
    }
})();
