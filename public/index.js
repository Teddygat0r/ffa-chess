const socket = io();
let turn = "w";
let moves = [];
let history = [];
let currentTurn = 0;
let allowMoves = true;
let gameData = [];

const addOverlay = (square) => {
    $(".square-" + square).prepend('<div class="overlay"></div>');
};
const removeOverlay = () => {
    $("div.overlay").remove();
};

const onMouseoverSquare = (square, piece) => {
    removeOverlay();
    if (allowMoves)
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].from === square) {
                addOverlay(moves[i].to);
            }
        }
};

const onMouseoutSquare = () => {
    removeOverlay();
};

const onDragStart = (source, piece, position, orientation) => {
    // only pick up pieces for the side to move
    if (!allowMoves) return false;
    if (
        (turn === "w" && piece.search(/^b/) !== -1) ||
        (turn === "b" && piece.search(/^w/) !== -1)
    ) {
        return false;
    }
};

const onDrop = (source, target) => {
    // see if the move is legal
    socket.emit("move", {
        from: source,
        to: target,
        promotion: "q", // NOTE: always promote to a queen for example simplicity
    });
};

const config = {
    draggable: true,
    position: "start",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
};

const downloadFen = () => {
    let ts = "";
    for (let i = 0; i < history.length; i++) {
        ts += history[i] + "\n";
    }

    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(ts)
    );
    element.setAttribute("download", `FEN-${ gameData[0] }-${ gameData[1] }-${ gameData[2] }-${ gameData[3] }-${ history.length }.txt`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const board1 = Chessboard("board1", config);

const setBoard = (t) => {
    allowMoves = t === history.length - 1;
    board1.position(history[t]);
};

const setGameData = () => {
    document.getElementById("label").innerText = `Game #${gameData[0]}`;
    document.getElementById(
        "wins"
    ).innerText = `White: ${gameData[1]} Wins  | Draw: ${gameData[3]} Games | Black: ${gameData[2]} Wins`;
};

const getPreviousBoard = () => {
    if (currentTurn > 0) {
        currentTurn--;
        setBoard(currentTurn);
    }
};

const getNextBoard = () => {
    if (currentTurn < history.length - 1) {
        currentTurn++;
        setBoard(currentTurn);
    }
};

const getFirstBoard = () => {
    currentTurn = 0;
    setBoard(currentTurn);
};

const getLastBoard = () => {
    currentTurn = history.length - 1;
    setBoard(currentTurn);
};

socket.on("setup", (data) => {
    turn = data.turn;
    moves = data.moves;
    history = [];
    for (let i = 0; i < data.history.length; i++) {
        history.push(data.history[i].before);
    }
    history.push(data.fen);
    currentTurn = history.length - 1;
    setBoard(currentTurn);
    gameData = data.gameData;
    setGameData();
});

socket.on("boardUpdate", (data) => {
    history.push(data.fen);
    if (currentTurn == history.length - 2) {
        currentTurn++;
        setBoard(currentTurn);
    }
    turn = data.turn;
    moves = data.moves;
});

socket.on("illegalMove", () => {
    setBoard(currentTurn);
});

socket.on("checkmate", (data) => {
    history.push(data.fen);
    if (currentTurn == history.length - 2) {
        currentTurn++;
        setBoard(currentTurn);
    }

    alert(`${data.win === "w" ? "White" : "Black"} in Checkmate!`);
});
socket.on("draw", (data) => {
    history.push(data.fen);
    if (currentTurn == history.length - 2) {
        currentTurn++;
        setBoard(currentTurn);
    }
    alert("Draw");
});
