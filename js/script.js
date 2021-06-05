
let boardSize = 9;
let bombNumber = 10;
let bomb = `<span>💣︁</span>`;
let blocks = [
    { content: "5" },
    { content: "5ad" },
];
// const timerElement = documsent.querySelector(".js-timer");
const playBoard = document.querySelector(".box");

document.querySelector(".js-easy").addEventListener('click', () => {
    playBoard.classList.remove("box--medium");
    playBoard.classList.remove("box--hard");
    boardSize = 9;
    bombNumber = 10;
    init();
});

document.querySelector(".js-medium").addEventListener('click', () => {
    playBoard.classList.remove("box--hard");
    playBoard.classList.add("box--medium");
    boardSize = 14;
    bombNumber = 30;
    init();
});

document.querySelector(".js-hard").addEventListener('click', () => {
    playBoard.classList.remove("box--medium");
    playBoard.classList.add("box--hard");
    boardSize = 18;
    bombNumber = 60;
    init();
});
const showBlockContent = (index) => {

}

const markBlockContent = (index) => {

}

// const bindLeftMouseButtonEvents = () => {
//     boardBlocks.forEach((clickBlock, index) => {
//         clickBlock.addEventListener("click", () => {
//             showBlockContent(index);
//         });
//     });
// };
// const bindRightMouseButtonEvents = () => {
//     boardBlocks.forEach((clickBlock, index) => {
//         clickBlock.addEventListener("contextmenu", () => {
//             markBlockContent(index);
//         });
//     });
// };

const drawBombIndex = () => {
    let bombIndex = [];
    for (let i = 0; i < bombNumber; i++) {
        bombIndex[i] = Math.floor((Math.random() * boardSize ** 2) + 1);
    }
    return bombIndex;
}

// const placeNumbers = (bombPlacement) => {
//     let number=[];
//     bombPlacement.forEach((block, index) => {
//         console.log(block);
//         if(block.innerHTML === bomb){
//             bombPlacement[index-1].innerHTML = number[index-1]+=1;
//             bombPlacement[index+1].innerHTML = number[index+1]+=1;
//             bombPlacement[index-1+boardSize].innerHTML = number[index-1+boardSize]+=1;
//             bombPlacement[index+1+boardSize].innerHTML = number[index+1+boardSize]+=1;
//             bombPlacement[index+boardSize].innerHTML = number[index+boardSize]+=1;
//             bombPlacement[index-1-boardSize].innerHTML = number[index-1-boardSize]+=1;
//             bombPlacement[index-boardSize].innerHTML = number[index-boardSize]+=1;
//             bombPlacement[index+1-boardSize].innerHTML = number[index+1-boardSize]+=1;
//         }
//     });
// }

const placeBombs = () => {
    const bombsIndex = drawBombIndex();
    console.log(bombsIndex);
    blocks.forEach((block, index) => {
        if (bombsIndex.includes(index)) {
            blocks = [
                ...blocks.slice(0, index),
                {
                    ...block,
                    content: bomb
                },
                ...blocks.slice(index + 1),
            ]
        }
    });
    render();
}

const fillScore = () => {
    document.querySelector(".js-flagCounter").innerHTML = bombNumber;
    document.querySelector(".js-face").innerHTML = `<span>😐︁</span>`
    document.querySelector(".js-timer").innerHTML = 0;
};

const fillBlocks = () => {
    for (let i = 0; i < boardSize ** 2; i++) {
        blocks[i] ={ content: " " };
    };
    render();
};

const renderBoard = () => {
    const board = document.querySelector(".playBoard")
    const boardBlocks = blocks
        .map(block => `
            <div class="playBoard__block playBoard__block--hidden  js-blocks" >
            ${block.content}
            </div>
        `)
        .join("")

    board.innerHTML = boardBlocks;
};
const render = () => {
    renderBoard();
    // bindLeftMouseButtonEvents();
    // bindRightMouseButtonEvents();
};

const init = () => {
    fillScore();
    fillBlocks();
    placeBombs();
    // placeNumbers(bombPlacement);
    render();
};

init();