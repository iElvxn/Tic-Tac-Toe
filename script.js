const Player = (name, mark, type) => {
    const getName = () => name;
    const getMark = () => mark;
    const getType = () => type;

    return{ getName, getMark, getType };
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setMark = (index, mark) => {
        board[index] = mark;
    }

    const getMark = (index) => {
        return(board[index]);
    }

    const checkStalemate = () => {
        let stalemate = false;
        let notNullCount = 0

        board.forEach(box => {
            if(box != ""){
                notNullCount++
            }
        })

        if(notNullCount === 9){
            stalemate = true
        }else{
            stalemate = false
        }
        return(stalemate);
    }

    const checkWinner = (player1, player2) => {
        const winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        winningCombos.forEach(combos => {
            let xCount = 0;
            let oCount = 0;
            
            combos.forEach(box => {
                if(board[box] === 'X'){
                    xCount++;
                    if(xCount === 3){roundOver(player1, player1.getMark(), 'win')}
                }
                if(board[box] === 'O'){
                    oCount++;
                    if(oCount === 3){roundOver(player2, player2.getMark(), 'win')}
                }
            })
            if(xCount != 3 && oCount != 3){
                if(checkStalemate() == true){
                    roundOver(null, null, 'stalemate')
                } 
            }
        })
    }

    const roundOver = (winner, mark, result) => {
        gameCompleted = true;
        if(result === 'win'){
            console.log(winner.getName() + " has won!");
        } else{
            if(result === 'stalemate'){
                console.log('Stalemate');
            }
        }  
    }

    return{ checkWinner, setMark, getMark, roundOver, checkStalemate };
})();


const gameBoxes = document.querySelectorAll('.gameBox');
const player1 = Player('Joe', 'X', 'Player');
const player2 = Player('Box', 'O', 'Player');
//const player2 = Player('Bob', 'O', 'AI');
let turn = 1;
let gameCompleted = false;

gameBoxes.forEach(box =>{
    box.addEventListener('click', e => {
        // if the User wants to play against another Player
        if(gameCompleted === false){
            if(player2.getType() === 'Player'){
                if(turn === 1){
                    if(gameBoard.getMark(e.target.dataset.index) === ''){
                        console.log('1')
                        gameBoard.setMark(e.target.dataset.index, player1.getMark());
                        let xImage = document.createElement('img');
                        xImage.classList.add('markers');
                        xImage.src = 'images/X.png';
                        box.appendChild(xImage);
                        turn = 2
                    }
    
                }else { //turn 2
                    if(gameBoard.getMark(e.target.dataset.index) === ''){
                        console.log('2')
                        gameBoard.setMark(e.target.dataset.index, player2.getMark());
                        let oImage = document.createElement('img');
                        oImage.classList.add('markers');
                        oImage.src = 'images/O.png';
                        box.appendChild(oImage);
                        turn = 1
                    }     
                }
                gameBoard.checkWinner(player1, player2);
            }
            // if the User wants to play against an AI
            if(player2.getType === 'AI'){
                if(turn === 1){
                    if(gameBoard.getMark(e.target.dataset.index) != 'X' && gameBoard.getMark(e.target.dataset.index) != 'O'){
                        gameBoard.setMark(e.target.dataset.index, player1.getMark());
                        let xImage = document.createElement('img'); //can prob put in the gameboard module
                        xImage.classList.add('markers');
                        xImage.src = 'images/X.png';
                        box.appendChild(xImage);
                        turn = 2
                        //then maybe call the bot move here.
                    }
                }
            }
        }
    })
});

