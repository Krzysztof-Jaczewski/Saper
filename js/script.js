
let boardSize = 9;
let bombNumber = 10;
const bomb = `<span>💣︁</span>`;

let blocks = [];
// const timerElement = documsent.querySelector(".js-timer");

// const bindDifficultyEvents = () => {
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
// }

const showBlockContent = (index) => {
    const block = blocks[index];
    if (!block.marked) {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                value: 1,
                cliked: true,
            },
            ...blocks.slice(index + 1),
        ]
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
            },
            ...blocks.slice(index + 1),
        ]
    } else if (block.content === flag) {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                content: questionMark,
                marked: true,
            },
            ...blocks.slice(index + 1),
        ]
    } else {
        blocks = [
            ...blocks.slice(0, index),
            {
                ...block,
                content: "",
                marked: false,
            },
            ...blocks.slice(index + 1),
        ]
    }

    render();
}

const bindLeftMouseButtonEvents = () => {
    const blocksLeftClick = document.querySelectorAll(".js-blocks");

    blocksLeftClick.forEach((block, index) => {
        block.addEventListener("click", () => {
            showBlockContent(index);
        });
    });
};

const bindRightMouseButtonEvents = () => {
    const blocksRightClick = document.querySelectorAll(".js-blocks");

    blocksRightClick.forEach((clickBlock, index) => {
        clickBlock.addEventListener("contextmenu", () => {
            markBlockContent(index);
        });
    });
};

const drawBombIndex = () => {
    let bombIndex = [];
    for (let i = 0; i < bombNumber; i++) {
        bombIndex[i] = Math.floor((Math.random() * boardSize ** 2) + 1);
    }
    return bombIndex;
}

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
                    danger: true,
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
        blocks[i] = {
            content: "",
            cliked: false,
            value: 0,
        };
    };
    render();
};

const renderBoard = () => {
    const board = document.querySelector(".playBoard")
    const boardBlocks = blocks
        .map(block => `
            <div class="
            playBoard__block
             playBoard__block--hidden
               js-blocks
            ${block.cliked ? "playBoard__block--disabled" : ""}"
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


    bindLeftMouseButtonEvents();
    bindRightMouseButtonEvents();
};

const init = () => {
    // clearBoard();
    fillScore();
    fillBlocks();
    placeBombs();
    // placeNumbers(bombPlacement);
    render();
};
init();
// bindDifficultyEvents();