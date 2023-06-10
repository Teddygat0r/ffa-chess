const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Chessboard = require("./chess/pieces/Chessboard");

let board = new Chessboard();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

board.getAtk(board.board, "White");

io.on("connection", (socket) => {
    socket.emit("load", board.turns);
    socket.on("chat message", (msg) => {
        const resp = board.movePiece(msg.substring(0, 2), msg.substring(3, 5));
        if(resp.substring(0, 9) === "Promotion") io.emit("promotion", resp);
        io.emit("chat message", board.board);
    });

    socket.on("promotion", (msg) => {
        board.promote(msg);
        io.emit("chat message", board.board);
    });

    socket.on("getLegalTiles", (x, y) => {
        if(board.board[x][y] != null)
            socket.emit("getTiles", board.board[x][y].getLegalMoves(board.board, board.turn));
    });
});



server.listen(3000, () => {
    console.log("listening on *:3000");
});
