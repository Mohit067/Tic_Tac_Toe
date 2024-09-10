document.addEventListener("DOMContentLoaded", function(){

const container = document.getElementById("container");
let value = 'X';
let active = true;


function Restart(){
    const restart = document.createElement('button');
    restart.classList.add('restart-btn');
    restart.textContent = "Restart";

    restart.addEventListener('click', function(){
        location.reload();
    })

    document.body.appendChild(restart);
}

function isWon(){
    const cells = document.getElementsByClassName('cell');
    const values = Array.from(cells).map(cell => cell.textContent);


    const winningCombo = [
        [0,1,2],//for rows
        [3,4,5],
        [6,7,8],
        [0,3,6],//for columns
        [1,4,7],
        [2,6,8],
        [0,4,8],//for diagonals
        [2,4,6]
    ];

    return winningCombo.some(combo => {
        const [a,b,c] = combo;
        return values[a] && values[a] === values[b] && values[a] === values[c];
    });
}


function filled(){ 

    const cells = document.getElementsByClassName('cell');
    const values = Array.from(cells).map(cell => cell.textContent);
    return values.every(cell => cell); //every() return true if all cells are fullfilled

}


function runGame(){
    const turn = document.getElementById('turn');
    const cells = document.getElementsByClassName('cell');

    turn.textContent = `turn: ${value}`;


    Array.from(cells).forEach(cell => {
        cell.addEventListener('click', function(event){
            const element = event.target;

            if(!element.textContent && active){
                element.textContent = value;

                if(isWon()){
                    active = false;
                    alert(`game won by ${value}`);

                    Restart();
                }

                else if(filled() && active) {
                    active = false;
                    alert("Game Tied !!!")

                    Restart();
                }

                else{

                    value = value==='X' ? 'O' : 'X';
                    turn.textContent = `turn: ${value}`; 
                }
            }
        })
    })

}

function initiateGame(){
    const turn = document.createElement('turn');
    turn.id = 'turn';

    document.body.insertBefore(turn, container);

    const Start = document.createElement('button');
    Start.textContent = "Start";
    Start.classList.add('start-btn');

    Start.addEventListener('click', function StartGame(){
        Start.style.display = 'none';

        runGame();
    })

    document.body.appendChild(Start);
}

initiateGame();

});