
let boardSize = 9;
let bombNumber = 10;

// const timerElement = documsent.querySelector(".js-timer");
const playBoard = document.querySelector(".box");

document.querySelector(".js-easy").addEventListener('click', () => {
    playBoard.classList.remove("box--medium");
    playBoard.classList.remove("box--hard");
    boardSize = 9;
    bombNumber = 10;
    fillBoard();
});

document.querySelector(".js-medium").addEventListener('click', () => {
    playBoard.classList.remove("box--hard");
    playBoard.classList.add("box--medium");
    boardSize = 14;
    bombNumber = 30;
    fillBoard();
});

document.querySelector(".js-hard").addEventListener('click', () => {
    playBoard.classList.remove("box--medium");
    playBoard.classList.add("box--hard");
    boardSize = 20;
    bombNumber = 60;
    fillBoard();
});


// const bindEvents = () =>{
//     const blocks = document.querySelectorAll(".playBoard__block");
//     blocks.forEach((element, index) => {
//         element.addEventListener("click" , funkcje[i][0], false);
//     });
// }
const drawBombIndex = ()=>{
    let bombIndex = [];
    for(let i=0;i<bombNumber;i++){
        bombIndex[i] = Math.floor((Math.random()*boardSize**2)+1);
    }
    console.log(bombIndex)
    return bombIndex;
}

const  placeBombs = () =>{
    const bombsIndex = drawBombIndex();
    const bombPlacement = document.querySelectorAll(".js-blocks");
    bombPlacement.forEach((block,index) => {
        if(bombsIndex.includes(index))block.innerHTML =`<span>💣︁</span>`
    });
}

const fillBoard = () => {
    const board = document.querySelector(".playBoard")
    document.querySelector(".js-flagCounter").innerHTML = bombNumber;
    document.querySelector(".js-face").innerHTML = `<span>😐︁</span>`
    document.querySelector(".js-timer").innerHTML = 0;

    var boardBlocks = " ";
    for (let i = 0; i < boardSize ** 2; i++) {
        boardBlocks += `
            <div class="playBoard__block js-blocks" >
           
            </div>
        `
    };
    board.innerHTML = boardBlocks;
    // render();
};
// const render = () =>{
// bindEvents();

// };

const init = () => {
    fillBoard();
    placeBombs();
};

init();