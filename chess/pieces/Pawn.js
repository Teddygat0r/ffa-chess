var ChessPiece = require("./ChessPiece");

function Pawn(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Pawn";
    this.firstMove = true;
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.move = function (newPosition, board, crossaint) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));

    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));

    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);
    
    if (isInsideBoard) {
        var forwardDirection = this.color === "White" ? 1 : -1;
        if (
            colDiff === 0 &&
            newRow === currRow + 2 * forwardDirection &&
            this.firstMove
        ) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            return true;
        } else if (
            colDiff === 1 &&
            rowDiff === 1 &&
            newRow === currRow + forwardDirection &&
            board[newRow - 1 - forwardDirection][newCol - 65] != null &&
            board[newRow - 1 - forwardDirection][newCol - 65].piece == "Pawn" &&
            crossaint
        ) {
            console.log(
                "Crossaint " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            board[newRow - 1 - forwardDirection][newCol - 65] = null;
            this.firstMove = false;
            return true;
        } else if (
            colDiff === 1 &&
            rowDiff === 1 &&
            newRow === currRow + forwardDirection &&
            board[newRow - 1][newCol - 65] != null // insert fucking en crossaint fucking shit kms.
        ) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            return true;
            // Additional logic specific to capturing opponent's piece
        } else if (colDiff === 0 && newRow === currRow + forwardDirection) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            return true;
        } else {
            console.log("Invalid move for Pawn2");
        }
    } else {
        console.log("Invalid move for Pawn3");
    }
    return false;
};

module.exports = Pawn;
