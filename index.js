const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".user-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

//total 8 ways to win
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//initialize function to inititalise game

function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer === "X"){
        currPlayer = "0";
    }
    else{
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((pos) =>{
        if((gameGrid[pos[0]] !== "" || gameGrid[pos[1]] !== ""|| gameGrid[pos[2]] !== "") && 
        ((gameGrid[pos[0]] === gameGrid[pos[1]]) && (gameGrid[pos[1]] === gameGrid[pos[2]]))){

            if(gameGrid[pos[0]] === "X"){
                answer = "X";
            }
            else 
            answer = "0";

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });
    if(answer !== "" ){
        gameInfo.innerText = `Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //tie case
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount===9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        //now swap turn
        swapTurn();
        //check for winning
        checkGameOver();
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);