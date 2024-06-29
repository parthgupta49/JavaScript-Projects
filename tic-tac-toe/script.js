const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("[gameInfo]");
const newGameBtn = document.querySelector(".new-game");

let currentPlayer;
let gameGrid = [];
let winnerIndices = [];
let playOrNot = true;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

initGame();

function initGame() {   
    currentPlayer = "X";
    playOrNot = true;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    updateTheUI();
    newGameBtn.classList.remove("active");
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (playOrNot) {
            if (gameGrid[index] === "") {
                handleClick(index);
                if (!(checkIfWon() === "")) {
                    let winner = checkIfWon();
                    gameInfo.textContent = `Winner Player - ${winner} `;
                    // make the color green of the grid which contains winner indices
                    makeColorGreen();
                    freezeTheGame();
                    newGameBtn.classList.add("active");
                    return;
                }
                changeCurrentPlayer();
            }
            checkEveryBoxIsFilled();
        }
    });
});


function checkEveryBoxIsFilled() {
    let count = 0;
    boxes.forEach((box) => {
        if (!(box.innerText === "")) {
            count++;
        }
    });
    if (count === 9) {
        gameInfo.textContent = `Game Tied !!`;
        freezeTheGame();
        newGameBtn.classList.add("active");
        return;
    }
}

function freezeTheGame() {
    playOrNot = false;
}

function makeColorGreen() {
    let arr = [];
    winnerIndices.forEach((value) => {
        boxes.forEach((box, index) => {
            if (index === value) {
                arr.push(box);
                // box.classList.add("active");
            }
        });
    });
    arr[0].classList.add('active');
    arr[1].classList.add('active');
    arr[2].classList.add('active');
}

function updateTheUI() {
    boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("active");
    });
}

function checkIfWon() {
    let winner = "";

    winningPosition.forEach((arr) => {
        let count = 0;
        let winnerIndices = [];
        // console.log(arr);
        arr.forEach((element) => {
            // console.log(currentPlayer);
            // if (gameGrid[element] == returnOldPlayer(currentPlayer)) {
            if (gameGrid[element] == currentPlayer) {
                winnerIndices.push(element);
                count++;
            }
        });
        // console.log("Count is : ",count)
        if (count == 3) {
            // console.log(`${returnOldPlayer(currentPlayer)} is the winner`)
            returnWinningIndices(winnerIndices);
            // winner = returnOldPlayer(currentPlayer);
            winner = currentPlayer;
            return;
        }
    });

    return winner;
}

function returnWinningIndices(winnerIndexes) {
    winnerIndices = winnerIndexes;
}

function returnOldPlayer(newplayer) {
    if (newplayer === "X") {
        return "O";
    }
    return "X";
}

// function myFun(index){
// main na jo maine gameGrid bnai hai usme har index pe likha hua h kon kispe present hai to m ky kar sakta hu ki
// main har baari jb nya click hoga tb ek fun run karauga jo ky karega ki
// gameGrid me se ye nikalega ki X kaha kaha present hai aur phir we can check with the winning position agar to winning position jaise hai waise agar gamegrid bhi hoti hai to the first win to get that winning position is the winner then everything is done... u can then only click on the new button which is then has to made visible ( invisible in the begining )
// aur ek aur check lagana hoga ki agr gamegrid bhar gyi aur koi winning position me nahi aa paya to it means game tied !!!
// }

function handleClick(index) {
    gameGrid[index] = currentPlayer;
    fillTheGrid(index);
    
}

function fillTheGrid(index) {
    boxes.forEach((box, ind) => {
        if (ind === index) {
            box.textContent = currentPlayer;
        }
    });
}
function changeCurrentPlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else currentPlayer = "X";
    updateCurrentPlayerText();
}

function updateCurrentPlayerText() {
    if (gameGrid.includes("")) {
        gameInfo.textContent = `Current Player - ${currentPlayer}`;
    }
}

let arrX = [];
let arrO = [];
function s() {
    gameGrid.forEach((ele, index) => {
        if (ele === "X") {
            console.log(index);
            arrX.push(index);
        } else arrO.push(index);
    });
    console.log(arrX);
    console.log("0 array : ");
    console.log(arrO);
}

newGameBtn.addEventListener("click", initGame);
