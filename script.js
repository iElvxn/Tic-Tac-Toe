const Player = (mark) => {
    const getMark = () => mark;

    return{ getMark };
}

const gameBoard = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let board = ["", "", "", "", "", "", "", "", ""];

    const playerTurn = () => {
        const gameBoxes = document.querySelectorAll('.gameBox');
        let turn = 1;
        gameBoxes.forEach(box =>
            box.addEventListener('click', e => {
                if(turn === 1){
                    setMark(e.target.dataset.index, player1.getMark());
                    box.innerHTML = player1.getMark(); // just for visual purposes for now
                    turn = 2;
                }else {
                    setMark(e.target.dataset.index, player2.getMark());
                    box.innerHTML = player2.getMark();
                    turn = 1;
                }
                console.log('clicked');
            })
        );
    }
    
    const setMark = (index, mark) => {
        board[index] = mark;
    }

    const checkWinner = () => {
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
        //add code to check for win later
    }
    return{ checkWinner, playerTurn, setMark };
})();

/*
This was to test if it worked when it was outside a function

const gameBoxes = document.querySelectorAll('.gameBox');
const player1 = Player('X');
const player2 = Player('O');
let turn = 1;

gameBoxes.forEach(box =>
    box.addEventListener('click', e => {
        if(turn === 1){
            gameBoard.setMark(e.target.dataset.index, player1.getMark());
            box.innerHTML = player1.getMark() 
            turn = 2
        }else {
            gameBoard.setMark(e.target.dataset.index, player2.getMark());
            box.innerHTML = player2.getMark()
            turn = 1
        }
        console.log('clicked');
    })
);*/

