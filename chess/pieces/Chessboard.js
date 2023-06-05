var Pawn = require("./Pawn");
var Rook = require("./Rook");
var Knight = require("./Knight");
var Bishop = require("./Bishop");
var Queen = require("./Queen");
var King = require("./King");

function Chessboard() {
    this.board = [];
    this.initializeBoard();
    this.current = "White";
    this.promotion = false;
    this.pp = null;
    this.turn = 0;
}

Chessboard.prototype.initializeBoard = function () {
    // Initialize the chessboard with pieces
    this.board = [
        [
            new Rook("White", "A1"),
            new Knight("White", "B1"),
            new Bishop("White", "C1"),
            new Queen("White", "D1"),
            new King("White", "E1"),
            new Bishop("White", "F1"),
            new Knight("White", "G1"),
            null, //new Rook("White", "H1"),
        ],
        [
            new Pawn("White", "A2"),
            new Pawn("White", "B2"),
            new Pawn("White", "C2"),
            null, //new Pawn("White", "D2"),
            new Pawn("White", "E2"),
            new Pawn("White", "F2"),
            new Pawn("White", "G2"),
            new Pawn("White", "H2"),
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
            new Pawn("Black", "A7"),
            new Pawn("Black", "B7"),
            new Pawn("Black", "C7"),
            new Pawn("Black", "D7"),
            new Pawn("Black", "E7"),
            new Pawn("Black", "F7"),
            new Pawn("Black", "G7"),
            new Pawn("Black", "H7"),
        ],
        [
            new Rook("Black", "A8"),
            new Knight("Black", "B8"),
            new Bishop("Black", "C8"),
            new Queen("Black", "D8"),
            new King("Black", "E8"),
            new Bishop("Black", "F8"),
            new Knight("Black", "G8"),
            new Rook("Black", "H8"),
        ],
    ];
};

Chessboard.prototype.movePiece = function (fromPosition, toPosition, board) {
    var fromCol = fromPosition.charCodeAt(0) - 65;
    var fromRow = parseInt(fromPosition.charAt(1)) - 1;
    var toCol = toPosition.charCodeAt(0) - 65;
    var toRow = parseInt(toPosition.charAt(1)) - 1;
    console.log(`Trying from ${fromPosition} to ${toPosition}`);
    if (
        this.isValidPosition(fromCol, fromRow) &&
        this.isValidPosition(toCol, toRow) &&
        this.board[fromRow][fromCol] != null &&
        this.board[fromRow][fromCol].color === this.current &&
        (this.board[toRow][toCol] === null ||
            this.board[fromRow][fromCol].color !==
                this.board[toRow][toCol].color) &&
        !this.promotion
    ) {
        var piece = this.board[fromRow][fromCol];

        //Inverts value of current.

        if (piece && piece.move(toPosition, this.board, this.turn)) {
            this.board[toRow][toCol] = piece;
            this.board[fromRow][fromCol] = null;
            this.current = this.current === "White" ? "Black" : "White";
            this.turn++;

            //If pawn is at the end of the board
            if (
                toRow == (this.board[toRow][toCol].color === "White" ? 7 : 0) &&
                this.board[toRow][toCol].piece == "Pawn"
            ) {
                this.promotion = true;
                this.pp = [toRow, toCol];
                return `Promotion ${this.board[toRow][toCol].color} ${toRow} ${toCol}`;
            }
            return `Moving ${this.board[toRow][toCol].color} ${this.board[toRow][toCol].piece} from ${fromPosition} to ${toPosition}`;
        } else {
            console.log("Invalid move.");
            return "Try Again";
        }
    } else {
        console.log("Invalid positions.");
        return "Try Again";
    }
};

Chessboard.prototype.promote = function (piece) {
    if (this.isValidPosition(this.pp[0], this.pp[1])) {
        if (piece == "Queen") {
            const cr = this.board[this.pp[0]][this.pp[1]];
            this.board[this.pp[0]][this.pp[1]] = new Queen(
                cr.color,
                cr.position
            );
            promotion = false;
        } else if (piece == "Rook") {
            const cr = this.board[this.pp[0]][this.pp[1]];
            this.board[this.pp[0]][this.pp[1]] = new Rook(
                cr.color,
                cr.position
            );
            promotion = false;
        } else if (piece == "Knight") {
            const cr = this.board[this.pp[0]][this.pp[1]];
            this.board[this.pp[0]][this.pp[1]] = new Knight(
                cr.color,
                cr.position
            );
            promotion = false;
        } else if (piece == "Bishop") {
            const cr = this.board[this.pp[0]][this.pp[1]];
            this.board[this.pp[0]][this.pp[1]] = new Bishop(
                cr.color,
                cr.position
            );
            promotion = false;
        }
    }
};

Chessboard.prototype.isValidPosition = function (col, row) {
    return col >= 0 && col < 8 && row >= 0 && row < 8;
};

Chessboard.prototype.getChecks = function() {
    
}



Chessboard.prototype.getAtk = function (board, color) {
    //Finish this later, use a 2d 8x8 array so u dont get repeats.

    const atkSqr = Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () => false)
    );

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] != null && board[i][j].color === color) {
                const targets =
                    board[i][j].piece === "Pawn"
                        ? board[i][j].getLegalAttacks(this.board)
                        : board[i][j].getLegalMoves(this.board);
                for (let x = 0; x < targets.length; x++) {
                    const currCol = targets[x].charCodeAt(0) - 65;
                    const currRow = parseInt(targets[x].charAt(1)) - 1;
                    atkSqr[currRow][currCol] = true;
                }
            }
        }
    }

    for (let i = 0; i < 8; i++) {
        let balls = "";
        for (let j = 0; j < 8; j++) {
            balls += atkSqr[i][j] ? "x" : ".";
        }
        console.log(balls);
    }

    return atkSqr;
};

module.exports = Chessboard;
