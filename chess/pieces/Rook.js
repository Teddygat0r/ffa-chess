var ChessPiece = require("./ChessPiece");

function Rook(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Rook";
}

Rook.prototype = Object.create(ChessPiece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.move = function (newPosition, board, crossaint = false) {
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var newCol = newPosition.charCodeAt(0) - 65;
    var newRow = parseInt(newPosition.charAt(1)) - 1;
    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);
    if (isInsideBoard && (currCol === newCol || currRow === newRow)) {
        var start, end;
        if (currCol === newCol) {
            // Moving vertically
            start = Math.min(currRow, newRow) + 1;
            end = Math.max(currRow, newRow);
        } else {
            // Moving horizontally
            start = Math.min(currCol, newCol) + 1;
            end = Math.max(currCol, newCol);
        }

        for (var i = start; i < end; i++) {
            var square;
            if (currCol === newCol) {
                // Check vertical squares
                square = board[i][currCol];
            } else {
                // Check horizontal squares
                square = board[currRow][i];
            }

            if (square !== null) {
                console.log(
                    "There is a piece between " +
                        this.position +
                        " and " +
                        newPosition
                );
                return false;
            }
        }

        console.log(
            "Moving " +
                this.color +
                " Rook from " +
                this.position +
                " to " +
                newPosition
        );
        this.position = newPosition;
        return true;
        // Additional logic specific to the Rook's move
    } else {
        console.log("Invalid move for Rook");
        return false;
    }
};

Rook.prototype.getLegalMoves = function (board) {
    var legalMoves = [];
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;

    // Check horizontal moves to the left
    for (var col = currCol - 1; col >= 0; col--) {
        if (!this.isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    // Check horizontal moves to the right
    for (var col = currCol + 1; col < 8; col++) {
        if (!this.isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    // Check vertical moves upwards
    for (var row = currRow - 1; row >= 0; row--) {
        if (!this.isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }

    // Check vertical moves downwards
    for (var row = currRow + 1; row < 8; row++) {
        if (!this.isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }

    return legalMoves;
};


module.exports = Rook;
