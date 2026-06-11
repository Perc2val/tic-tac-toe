/* IIFE to build the gameboard*/




/* objects for the players with functions for X and O*/

const game = (()=> {
    
    (function (){ 
        return gameboard = {
            board: ["","","","","","","","",""],
            
    }
    })();
    (function (){
        return activePlayer = {
            test: ""
        }
    })();
    (function(){
        return gameFlow = function(){
            if(gameboard.board.filter(e => e == "X").length === gameboard.board.filter(e => e == "O").length){
                game.activePlayer.test = game.playerOne
                console.log("Its player one turn")
            } else {
                console.log("Its player two turn")
                game.activePlayer.test = game.playerTwo
            }
        }
    })();

    let checkSubset = (parentArray, subsetArray) => {
            return subsetArray.every((el) => {
                return parentArray.includes(el)
            })
    }

    console.log(gameboard.board)

    function createPlayer(givenName, marker){
        let playerName = givenName;
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
            if (checkSubset(playerMarkerPosition, winningConditions.winOne) ||
                checkSubset(playerMarkerPosition, winningConditions.winTwo) ||
                checkSubset(playerMarkerPosition, winningConditions.winThree) ||
                checkSubset(playerMarkerPosition, winningConditions.winFour) ||
                checkSubset(playerMarkerPosition, winningConditions.winFive) ||
                checkSubset(playerMarkerPosition, winningConditions.winSix) ||
                checkSubset(playerMarkerPosition, winningConditions.winSeven) ||
                checkSubset(playerMarkerPosition, winningConditions.winEight) 
            ){
                console.log(`${playerName} won `)
                resetGame();
            } else {
                gameFlow();
            }
        }

        function resetGame(){
            gameboard.board = ["","","","","","","","",""];
            playerName = "";
            playerMarkerPosition.length = 0;
            console.log(gameboard.board);
        }

        return {
            playerName, playerMarker, setMarker, 
        }
    }   

    
    
    

    const playerOne = createPlayer("Finn", "X")
    const playerTwo = createPlayer("Charly", "O")

    return {
        playerOne, playerTwo, gameboard, activePlayer
    }
})();

const renderGame = (()=>  {
    const body = document.querySelector("body");
    const gameboardDiv = document.createElement("div");
    gameboardDiv.classList.add("gameboard")
    body.appendChild(gameboardDiv);
    const renderGameBoard = (()=> {
        for(let i = 0; i < 9; i++){
            const div = document.createElement("div");
            gameboardDiv.appendChild(div)
            div.classList.add("gameboardDiv");
            div.addEventListener("click", () => {
                if (game.activePlayer.test == game.playerTwo){
                    game.playerOne.setMarker(i + 1);
                    div.textContent = `${game.activePlayer.test.playerMarker}`
                    test()
                } else{
                    game.playerTwo.setMarker(i + 1);
                    div.textContent = `${game.activePlayer.test.playerMarker}`
                    console.log(game.playerOne)
                    test();
                }
                
            });   
        };
    })();
})();

function test(){
    console.log(game.activePlayer.test)
}
