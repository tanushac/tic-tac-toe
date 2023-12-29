let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#new-btn");
let msgCont=document.querySelector(".msg-container");
let msg=document.querySelector("#msg")

//to track player's turn
let turnO = true; //playerX, playerO

//to store winning cases, we will use 2-D arrays
const winPatterns = [

    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame=()=>{
    turnO=true;
    enableBox();
    msgCont.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {//playerO
            box.innerText = "O";
            box.style.color="#3559E0";
            turnO = false;
        }
        else {//playerX
            box.innerText = "X";
            box.style.color="#B80000";
            turnO = true;
        }
        box.disabled = true;//so that box doesn't change letter when clicked again
        checkWinner();
    });
});

const disableBox=()=>{
    for (let box of boxes) {
        box.disabled=true;
    }
}

const enableBox=()=>{
    for (let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`🎉Congratulations, Winner is ${winner}🎉`;
    msgCont.classList.remove("hide");
    disableBox();
}


const checkWinner = () => {
    let isTie = true;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    // Check for a tie
    for (let box of boxes) {
        if (box.innerText === "") {
            isTie = false; // If any box is empty, it's not a tie yet
            break;
        }
    }

    if (isTie) {
        msg.innerText = "It's a tie!";
        msgCont.classList.remove("hide");
        disableBox();
    }
};

newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

// console.log([pattern[0]], [pattern[1]], [pattern[2]]);
// console.log(
//     boxes[pattern[0]].innerText,
//     boxes[pattern[1]].innerText,
//     boxes[pattern[2]].innerText);//accessing each pattern's index