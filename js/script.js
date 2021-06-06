let boardSize = 9;
let bombNumber = 10;
let won = false;
let blocks = [];

const fillBlocks = () => {
    for (let i = 0; i < boardSize ** 2; i++) {
        blocks[i] = {
            content: ``,
            mine: false,
            value: 0,
        };
    };
    render();
};
const fillValues = () => {
    blocks.forEach((block, index) => {
        const top = index - boardSize;
        const bottom = index + boardSize;
        const left = index - 1;
        const right = index + 1;
        const verticalWall = index % boardSize;
        const bottomWall = boardSize ** 2 - 1;
        let mineAround = 0;

        if (blocks[index].mine) {
            mineAround = " "
            blocks[index].value = mineAround;
            return;
        };

        if (verticalWall > 0 && top > 0 && blocks[top - 1].mine) mineAround++;

        if (top >= 0 && blocks[top].mine) mineAround++;

        if (verticalWall < boardSize - 1 && top >= 0 && blocks[top + 1].mine) mineAround++;

        if (verticalWall > 0 && blocks[left].mine) mineAround++;

        if (index < bottomWall) { if (verticalWall < boardSize - 1 && blocks[right].mine) mineAround++; }

        if (verticalWall > 0 && bottom <= bottomWall && blocks[bottom - 1].mine) mineAround++;

        if (bottom <= bottomWall && blocks[bottom].mine) mineAround++;

        if (verticalWall < boardSize - 1 && bottom < bottomWall && blocks[bottom + 1].mine) mineAround++;

        block.value = mineAround;

    });
    render();
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
};

const lostGame = () => {
    const bomb = `<span>💣︁</span>`;
    blocks.forEach(block => {
        if (block.mine) {
            block.value = bomb;
            block.clicked = true;
            block.disabled = true;
        };
    });
    render();
};

const revealBlock = (index) => {
    blocks = [
        ...blocks.slice(0, index),
        {
            ...blocks[index],
            clicked: true,
            disabled: true,
        },
        ...blocks.slice(index + 1),
    ];
    render();
};

const revealEmptySpaceAndNumbersAround = (index) => {

    if (index >= boardSize ** 2 || index < 0) return;

    if (blocks[index].value === 0 && !blocks[index].clicked && !blocks[index].marked) {
        blocks[index].clicked = true;
        blocks[index].disabled = true;
        if (index % boardSize !== 0) {
            revealEmptySpaceAndNumbersAround(index + boardSize - 1);
            revealEmptySpaceAndNumbersAround(index - 1);
            revealEmptySpaceAndNumbersAround(index - boardSize - 1);
        }
        if (index % boardSize !== boardSize - 1) {
            revealEmptySpaceAndNumbersAround(index - boardSize + 1);
            revealEmptySpaceAndNumbersAround(index + 1);
            revealEmptySpaceAndNumbersAround(index + boardSize + 1);
        }
        revealEmptySpaceAndNumbersAround(index + boardSize);
        revealEmptySpaceAndNumbersAround(index - boardSize);
    } else if (!blocks[index].marked) {
        revealBlock(index);
        face = `<span>😐︁</span>`;
    };
};

const checkIsGameWon = ()=>{
    const clickedBloks = blocks.filter(({clicked}) => clicked).length;
    const markedBloks = blocks.filter(({marked}) => marked).length;
    let blocksLeft = bombNumber+markedBloks;
    const bomb = `<span>💣︁</span>`;


    if(boardSize**2 - clickedBloks === blocksLeft){
        blocks.forEach(block => {
            if (block.mine) {
                block.value = bomb;
                block.marked = true;
                block.clicked = true;
                block.disabled = true;
            };
        });
        face = `<span>😎︁</span>`;
        render();
    };
};

const showBlockContent = (index) => {
    if (!blocks[index].marked) {
        if (blocks[index].mine) {
            lostGame();
            disableAllBlocks();
        }
        else if (!blocks[index].value) {
            revealEmptySpaceAndNumbersAround(index);
            face = `<span>😐︁</span>`
        } else {
            revealBlock(index);
            face = `<span>😐︁</span>`;
        };
    };
    checkIsGameWon();
    render();
};

const placeFlag = (index, flag) => {
    blocks = [
        ...blocks.slice(0, index),
        {
            ...blocks[index],
            content: flag,
            marked: true,
        },
        ...blocks.slice(index + 1),
    ];
}

const placeQuestionMark = (index, questionMark) => {
    blocks = [
        ...blocks.slice(0, index),
        {
            ...blocks[index],
            content: questionMark,
            marked: true,
        },
        ...blocks.slice(index + 1),
    ];
};

const clearContent = (index) => {
    blocks = [
        ...blocks.slice(0, index),
        {
            ...blocks[index],
            content: "",
            marked: false,
        },
        ...blocks.slice(index + 1),
    ];
};

const markBlockContent = (index) => {
    const flag = `<span>F</span>`;
    const questionMark = `<span>?︁</span>`;

    if (blocks[index].content === "") {
        placeFlag(index, flag);
        bombNumber--;
    } else if (blocks[index].content === flag) {
        placeQuestionMark(index, questionMark);
        bombNumber++;
    } else {
        clearContent(index);
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

const placeMineInBlocks = (block, index) => {
    blocks = [
        ...blocks.slice(0, index),
        {
            ...block,
            mine: true,
        },
        ...blocks.slice(index + 1),
    ];
};

const placeBombs = () => {
    const bombsIndex = drawBombIndex();
    console.log(bombsIndex);
    blocks.forEach((block, index) => {
        if (bombsIndex.includes(index)) {
            placeMineInBlocks(block, index);
        }
    });
    render();
};

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
            ${!block.clicked ? " playBoard__block--hidden" : ""}
            ${block.disabled ? "playBoard__block--disabled" : ""}
            ${block.clicked && block.mine ? "playBoard__block--lost " : ""}
            ${block.disabled && block.mine && block.marked ? "playBoard__block--correct" : ""}"
            >
            ${block.marked && !block.clicked ? block.content : ""}
            ${block.clicked && block.value ? block.value : ""}
            </div>
        `)
        .join("")
    board.innerHTML = boardBlocks;
};

const clearBoard = () => {
    blocks = [];
    face = `<span>😐︁</span>`;
};

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
