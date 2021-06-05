
let plansza = [];
var boardSize = 9;
let bombNumber = 10;
var ikonaFlagi = '<i class="fas fa-flag" aria-hidden="true"></i>';
var ikonaZnakuZapytania = '<i class="fas fa-question" aria-hidden="true"></i>';
var ikonaBomby = '<i class="fas fa-bomb" aria-hidden="true"></i>';
var normalFace = '<i class="fas fa-meh-o" aria-hidden="true"></i>';
var happyFace = '<i class="fas fa-smile-o" aria-hidden="true"></i>';
var sadFace = '<i class="fas fa-frown-o" aria-hidden="true"></i>';
// const timerElement = documsent.querySelector(".box__timer");
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

const fillBoard = () => {
    const board = document.querySelector(".playBoard")
    document.querySelector(".js-flagCounter").innerHTML = bombNumber;
    document.querySelector(".js-face").innerHTML = `<span>😐︁</span>`
    document.querySelector(".js-timer").innerHTML = 0;

    var boardBlocks = "";
    for (let i = 0; i < boardSize ** 2; i++) {
        boardBlocks += `
            <div 
            class="playBoard__block playBoard__block--hiden" >
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
    
};

init();