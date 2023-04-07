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
        if(gameCompleted === false){
            let stalemate = false;
            let marked = 0;

            board.forEach(box => {
                if(box != ""){
                    marked++;
                }
            })

            if(marked === 9){
                stalemate = true;
                gameCompleted = true;
                roundOver(null, null, 'stalemate');
            }
        }
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
        ];
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
                setTimeout(checkStalemate, 10);
            })
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
        endScreen(winner, result);
    }

    const aiMove = () => {
        if(gameCompleted == false){
            let possibleMoves = [];

            for(let i = 0; i < board.length; i++){
                if(board[i] === ''){
                    possibleMoves.push(i);
                }
            }
            let randomIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            gameBoard.setMark(randomIndex, player2.getMark());
            let oImage = document.createElement('img');
            oImage.classList.add('markers');
            oImage.src = 'images/O.png';

            const boxes = document.querySelectorAll('.gameBox');
            boxes.forEach(box => {
                if(parseInt(box.getAttribute('data-index')) === randomIndex){
                    box.appendChild(oImage);
                }
            })
            gameBoard.checkWinner(player1, player2);
            turn = 1;
        }
    }

    const restart = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameCompleted = false;
        turn = 1;
        const boxes = document.querySelectorAll('.gameBox');
        boxes.forEach(box => {
            while (box.firstChild) {
                box.removeChild(box.firstChild);
            }
        })
    }
    const endScreen = (winner, result) => {
        const body = document.querySelector('.modal-body');
        if(result === 'win'){
            if(winner === player1){
                body.innerHTML = 'Player 1 has won!';
            }else{
                if(player2.getType() === 'Player'){
                    body.innerHTML = 'Player 2 has won!';
                }else {
                    body.innerHTML = 'Yikes, how did you lose to an A.I?';
                }
            }
        }else {body.innerHTML = 'How boring, you stalemated?';}

        //event.preventDefault();
        if(modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    return{ checkWinner, setMark, getMark, roundOver, checkStalemate, aiMove, restart, endScreen };
})();


const gameBoxes = document.querySelectorAll('.gameBox');
const player1 = Player('Joe', 'X', 'Player');
let turn = 1;
let gameCompleted = false;

const playerSelectionBtn = document.getElementById('plr-btn');
const aiSelectionBtn = document.getElementById('ai-btn');

//add a thing that tells user to choose opponent first
let player2;
playerSelectionBtn.addEventListener('click', () => {
    if(playerSelectionBtn.classList != 'selected-btn'){
        player2 = Player('Bob', 'O', 'Player');
        playerSelectionBtn.classList.add('selected-btn');
        aiSelectionBtn.classList.remove('selected-btn');
        gameBoard.restart();
    }
})

aiSelectionBtn.addEventListener('click', () => {
    if(aiSelectionBtn.classList != 'selected-btn'){
        player2 = Player('Bob', 'O', 'AI');
        aiSelectionBtn.classList.add('selected-btn');
        playerSelectionBtn.classList.remove('selected-btn');
        gameBoard.restart();
    } 
})

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    gameBoard.restart();
})

gameBoxes.forEach(box =>{
    box.addEventListener('click', e => {
        // if the User wants to play against another Player
        if(gameCompleted === false){
            if(player2.getType() === 'Player'){
                if(turn === 1){
                    if(gameBoard.getMark(e.target.dataset.index) === ''){
                        gameBoard.setMark(e.target.dataset.index, player1.getMark());
                        let xImage = document.createElement('img');
                        xImage.classList.add('markers');
                        setTimeout(() => {
                            xImage.classList.add('active');
                        }, 1);
                        xImage.src = 'images/X.png';
                        box.appendChild(xImage);
                        turn = 2
                    }
    
                }else { //turn 2
                    if(gameBoard.getMark(e.target.dataset.index) === ''){
                        gameBoard.setMark(e.target.dataset.index, player2.getMark());
                        let oImage = document.createElement('img');
                        oImage.classList.add('markers');
                        setTimeout(() => {
                            oImage.classList.add('active');
                        }, 1);
                        oImage.src = 'images/O.png';
                        box.appendChild(oImage);
                        turn = 1
                    }     
                }
                gameBoard.checkWinner(player1, player2);
            }
            // if the User wants to play against an AI
            if(player2.getType() === 'AI'){
                if(turn === 1){
                    if(gameBoard.getMark(e.target.dataset.index) === ''){
                        gameBoard.setMark(e.target.dataset.index, player1.getMark());
                        let xImage = document.createElement('img'); 
                        xImage.classList.add('markers');
                        xImage.src = 'images/X.png';
                        box.appendChild(xImage);
                        turn = 2
                        gameBoard.checkWinner(player1, player2);
                        
                        setTimeout(gameBoard.aiMove, 177); //delays the AI move a lil bit
                        
                    }
                }
            }
        }
    })
});

const closeModalButtons = document.querySelectorAll('[data-close-button');
const overlay = document.querySelector('.overlay');

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal);
    })
})

function closeModal(modal){
    event.preventDefault();
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

