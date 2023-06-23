const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { Chess } = require("chess.js");
let gameData = [1, 0, 0, 0];
let chess = new Chess();

app.use(express.static("public"));

const reset = () => {
    chess = new Chess();
    gameData[0]++;
    io.emit("setup", {
        fen: chess.fen(),
        turn: chess.turn(),
        moves: chess.moves({ verbose: true }),
        history: chess.history({ verbose: true }),
        gameData: gameData,
    });
    
}


io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("setup", {
        fen: chess.fen(),
        turn: chess.turn(),
        moves: chess.moves({ verbose: true }),
        history: chess.history({ verbose: true }),
        gameData: gameData,
    });

    socket.on("move", (data) => {
        try {
            const move = chess.move(data);
            if (chess.isCheckmate()) {
                io.emit("checkmate", {
                    fen: chess.fen(),
                    win: chess.turn(),
                    moves: chess.moves({ verbose: true }),
                });
                gameData[1 + (chess.turn() === "b" ? 0 : 1)]++;
                reset();

            } else if (chess.isDraw()) {
                io.emit("draw", {
                    fen: chess.fen(),
                    moves: chess.moves({ verbose: true }),
                });
                gamedata[3]++;
                reset();
            } else {
                io.emit("boardUpdate", {
                    fen: chess.fen(),
                    turn: chess.turn(),
                    moves: chess.moves({ verbose: true }),
                });
            }
        } catch (error) {
            console.log(error);
            socket.emit("illegalMove");
        }
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
