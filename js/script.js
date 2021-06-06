
let boardSize = 9;
let bombNumber = 10;
const bomb = `<span>💣︁</span>`;
let face = `<span>😐︁</span>`
let gameEnd = false;

let blocks = [{
    content: "",
    value: 0,
    cliked: false,
    mine: false,
    marked: false,
}];

const fillBlocks = () => {
    for (let i = 0; i < boardSize ** 2; i++) {
        blocks[i] = {
            content: ``,
            mine:false,
        };
    };
    render();
};
const fillValues = () => {
    const allBlocks = document.querySelectorAll(".js-blocks");
    allBlocks.forEach((x, index) => {
        const top = index - boardSize;
        const bottom = index + boardSize;
        const left = index - 1;
        const right = index + 1;
        let mineAround = 0;

        if (blocks[index].mine) {
            mineAround = " "
            blocks[index].value = mineAround;
            return;
        }

        if (index % boardSize > 0 && top > 0 && blocks[top - 1].mine) mineAround++;
   
        if (top >= 0 && blocks[top].mine) mineAround++;
     
        if (index % boardSize < boardSize-1 && top >= 0 && blocks[top + 1].mine) mineAround++;
      
        if (index % boardSize > 0 && blocks[left].mine) mineAround++;
     
        if(index<80){ if (index % boardSize < boardSize-1 && blocks[right].mine) mineAround++;}

        if (index % boardSize > 0 && bottom <= 80 && blocks[bottom - 1].mine) mineAround++;

        if (bottom <= 80 && blocks[bottom].mine) mineAround++;

        if (index % boardSize < boardSize-1 && bottom < 80 && blocks[bottom + 1].mine) mineAround++;

        blocks[index].value = mineAround;
       
        render();
    });
};
const playBoard = document.querySelector(".box");

playBoard.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

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

const disableAllBlocks = () => {
    blocks = blocks.map(block => ({
        ...block,
        disabled: true,
    }));
    face = `<span>😵︁</span>`;
    renderScore();
}


const showBlockContent = (index) => {
    const block = blocks[index];
    if (!block.marked) {
        if (block.mine) {

            blocks = [
                ...blocks.slice(0, index),
                {
                    ...block,
                    content: bomb,
                    cliked: true,
                },
                ...blocks.slice(index + 1),
            ]
            disableAllBlocks();
        }
        else if (block.value) {
            blocks = [
                ...blocks.slice(0, index),
                {
                    ...block,
                    cliked: true,
                    disabled: true,
                },
                ...blocks.slice(index + 1),
            ]
            face = `<span>😐︁</span>`
        };
    }
    render();
}


const markBlockContent = (index) => {
    const block = blocks[index];
    const flag = `<span>F</span>`;
    const questionMark = `<span>?︁</span>`;

    if (block.content === "") {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                content: flag,
                marked: true,
                visible: true,
            },
            ...blocks.slice(index + 1),
        ];
        bombNumber--;
    } else if (block.content === flag) {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                content: questionMark,
                marked: true,
                visible: true,

            },
            ...blocks.slice(index + 1),
        ];
        bombNumber++;
    } else {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                content: "",
                marked: false,
            },
            ...blocks.slice(index + 1),
        ];
    }
    face = `<span>😐︁</span>`;
    render();
}
const changeFace = () => {
    face = `<span>︁😲</span>`;
    renderScore();
}

const mouseButtonEvents = () => {
    const blocksClick = document.querySelectorAll(".js-blocks");

    blocksClick.forEach((block, index) => {
        block.addEventListener("mousedown", () => {
            changeFace();
        });
        block.addEventListener("click", () => {
            showBlockContent(index);
        });
        block.addEventListener("contextmenu", () => {
            markBlockContent(index);
        });
    });
};

const drawBombIndex = () => {
    let bombIndex = [];
    for (let i = 0; i < bombNumber; i++) {
        bombIndex[i] = Math.floor((Math.random() * boardSize ** 2) + 1);
        if (bombIndex.slice(0, -1).includes(bombIndex[i])) i--;
    };
    return bombIndex;
};

const placeBombs = () => {
    const bombsIndex = drawBombIndex();
    console.log(bombsIndex);
    blocks.forEach((block, index) => {
        if (bombsIndex.includes(index)) {
            blocks = [
                ...blocks.slice(0, index),
                {
                    ...block,
                    content: bomb,
                    mine: true,
                },
                ...blocks.slice(index + 1),
            ]
        }
    });
    render();
}

const renderScore = () => {
    document.querySelector(".js-flagCounter").innerHTML = bombNumber;
    document.querySelector(".js-face").innerHTML = face;
    document.querySelector(".js-timer").innerHTML = 0;
};

const renderBoard = () => {
    const board = document.querySelector(".playBoard")
    const boardBlocks = blocks
        .map(block => `
            <div class="
            playBoard__block
            js-blocks
            ${!block.cliked ? " playBoard__block--hidden" : ""}
            ${block.disabled ? "playBoard__block--disabled" : ""}
            ${block.cliked && block.mine && !block.marked ? "playBoard__block--lost " : ""}
            ${block.disabled && block.mine && !block.marked ? " playBoard__block--hidden" : ""}
            ${!block.cliked && block.disabled && block.mine && block.marked ? "playBoard__block--correct" : ""}"
            >
            ${block.content}
            ${block.value ? block.value : ""}
            </div>
        `)
        .join("")
    board.innerHTML = boardBlocks;
};

const clearBoard = () => blocks = [];


const render = () => {
    renderBoard();
    renderScore();

    mouseButtonEvents();
};

const init = () => {
    clearBoard();
    fillBlocks();
    placeBombs();
    fillValues();

    render();
};
init();
