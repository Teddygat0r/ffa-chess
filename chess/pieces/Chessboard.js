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
    this.crossaint = false;
    this.promotion = false;
    this.pp = null;
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
            new Pawn("Black", "H2"),
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
        this.isValidPosition(toCol, toRow) && this.board[fromRow][fromCol] != null && 
        this.board[fromRow][fromCol].color === this.current &&
        (this.board[toRow][toCol] === null ||
            this.board[fromRow][fromCol].color !==
                this.board[toRow][toCol].color) &&
        !this.promotion
    ) {
        var piece = this.board[fromRow][fromCol];

        //Inverts value of current.

        if (piece && piece.move(toPosition, this.board)) {
            if (
                this.board[fromRow][fromCol].piece == "Pawn" &&
                Math.abs(toRow - fromRow) == 2 &&
                (fromRow == 1 || fromRow == 6)
            ) {
                this.crossaint = true;
            } else {
                this.crossaint = false;
            }

            this.board[toRow][toCol] = piece;
            this.board[fromRow][fromCol] = null;
            this.current = this.current === "White" ? "Black" : "White";

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

module.exports = Chessboard;
