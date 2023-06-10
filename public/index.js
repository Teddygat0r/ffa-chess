var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");
var promotion = false;
var turn = -1;
var boards = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("load", function (msg) {
    boards = msg;
    console.log(msg);
    turn = msg.length - 1;
    loadBoard(turn);
});

socket.on("chat message", function (msg) {
    boards.push(msg);
    if(turn === boards.length - 2){
        turn++;
        loadBoard(turn);
    }
    
});

socket.on("promotion", function (msg) {
    document.getElementById("promotion").show();
    promotion = true;
});

socket.on("getTiles", function (pos) {
    var circles = document.querySelectorAll(".circle");

    for (var i = 0; i < circles.length; i++) {
        circles[i].parentNode.removeChild(circles[i]);
    }

    for (let i = 0; i < pos.length; i++) {
        const currCol = pos[i].charCodeAt(0) - 65;
        const currRow = 7 - (parseInt(pos[i].charAt(1)) - 1);

        const diva = document.createElement("div");
        diva.className = "circle";
        document.getElementById(`cell-${currRow}-${currCol}`).appendChild(diva);
    }
});

function promote(chr) {
    if (promotion) {
        promotion = false;
        socket.emit("promotion", chr);
        document.getElementById("promotion").close();
    }
}

function loadBoard(ind){
    const msg = boards[ind];

    for (let i = 0; i < msg.length; i++) {
        for (let j = 0; j < msg.length; j++) {
            document
                .getElementById(`cell-${7 - i}-${j}`)
                .getElementsByTagName("img")[0].src =
                "./assets/" +
                (msg[i][j] ? msg[i][j].piece : " ") +
                (msg[i][j] ? msg[i][j].color : " ").charAt(0) +
                ".png";
            document
                .getElementById(`cell-${7 - i}-${j}`)
                .getElementsByTagName("img")[0].style.visibility = msg[i][j]
                ? "visible"
                : "hidden";
            document
                .getElementById(`cell-${7 - i}-${j}`)
                .getElementsByTagName("img")[0].draggable = msg[i][j]
                ? "true"
                : "false";
            /*document.getElementById(`cell-${7 - i}-${j}`).style.color =
                            msg[i][j] ? msg[i][j].color : " ";*/
        }
    }

    document.getElementById('turn').innerText = `${turn} / ${boards.length - 1}`;
}

const getPreviousBoard = () => {
    if(turn - 1 >= 0){
        turn--;
        loadBoard(turn);
    }
}

const getNextBoard = () => {
    if(turn + 1 < boards.length){
        turn++;
        loadBoard(turn);
    }
}