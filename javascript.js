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
            activ: "",
            inactiv: "",
        }
    })();
    (function(){
        return gameFlow = function(){
            if(gameboard.board.filter(e => e == "X").length === gameboard.board.filter(e => e == "O").length){
                game.activePlayer.activ = game.playerTwo
                game.activePlayer.inactiv = game.playerOne
            } else {
                game.activePlayer.activ = game.playerOne
                game.activePlayer.inactiv = game.playerTwo
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
                getPlayerMarkerPosition();
                checkWinner();
            } else {
                return
            }
        }

        function getPlayerMarkerPosition(){
            playerMarkerPosition.length = 0;
            let idx = gameboard.board.indexOf(playerMarker);
                while (idx !== -1) {
                playerMarkerPosition.push(idx);
                idx = gameboard.board.indexOf(playerMarker, idx + 1);
            }  
          
        }

        const checkWinner = function(){
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
                gameFlow()
                renderGame.renderWinningMessage();
                resetGame();
                renderGame.resetRenderGame();
            } else {
                gameFlow();
            }
        }

        const resetGame = function(){
            gameboard.board = ["","","","","","","","",""];
            playerName = "";
            playerMarkerPosition.length = 0;
        };

        return {
            playerName, playerMarker, setMarker, resetGame, checkWinner
        }
    }   

    
    
    

    const playerOne = createPlayer("Finn", "X")
    const playerTwo = createPlayer("Charly", "O")

    return {
        playerOne, playerTwo, gameboard, activePlayer, gameFlow
    }
})();

const renderGame = (()=>  {
    const body = document.querySelector("body");
    const gameboardDiv = document.createElement("div");
    gameboardDiv.classList.add("gameboard");
    const winningMessage = document.createElement("p");
    body.appendChild(winningMessage);
    body.appendChild(gameboardDiv);
    const renderWinningMessage = function(){
        
        winningMessage.textContent = `${game.activePlayer.activ.playerName} won the last game`
    }
    


    function renderGameBoard(){
        for(let i = 0; i < 9; i++){
            const div = document.createElement("div");
            gameboardDiv.appendChild(div)
            div.classList.add("gameboardDiv");
            div.addEventListener("click", () => {
                if (game.activePlayer.activ == game.playerOne){
                    game.playerTwo.setMarker(i + 1);
                    div.textContent = `${game.activePlayer.activ.playerMarker}`
                } else{
                    game.playerOne.setMarker(i + 1);
                    div.textContent = `${game.activePlayer.activ.playerMarker}`
                }
                
            });   
        };
    };

    const playerOneName = document.getElementById("nameOne");
    const playerTwoName = document.getElementById("nameTwo");
    const form = document.querySelector(".form")
    const startGame = document.querySelector(".start");
    const resetGameButton = document.querySelector(".reset")
    startGame.addEventListener("click", ()=> {
        game.playerOne.playerName = playerOneName.value;
        game.playerTwo.playerName = playerTwoName.value;
        if (playerOneName.value.length != 0 && playerTwoName.value.length != 0){
            renderGameBoard();
        } else {
            return
        }
        form.reset();
        
        playerOneName.value = "";
        playerTwoName.value = "";
    })

    const resetRenderGame = function(){
        game.playerOne.resetGame();
        game.playerTwo.resetGame();
        game.gameFlow();
        while (gameboardDiv.firstChild) {
            gameboardDiv.removeChild(gameboardDiv.firstChild);
        }
    }
    resetGameButton.addEventListener("click", resetRenderGame)
    return{
        renderWinningMessage, resetRenderGame,
    }
})();



