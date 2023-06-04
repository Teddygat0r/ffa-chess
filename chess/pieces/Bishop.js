var ChessPiece = require("./ChessPiece");

function Bishop(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Bishop";
}

Bishop.prototype = Object.create(ChessPiece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.move = function (newPosition, board) {
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var newCol = newPosition.charCodeAt(0) - 65;
    var newRow = parseInt(newPosition.charAt(1)) - 1;
    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);

    if (isInsideBoard && colDiff === rowDiff) {
        var colDir = newCol > currCol ? 1 : -1;
        var rowDir = newRow > currRow ? 1 : -1;

        for (var i = 1; i < colDiff; i++) {
            var col = currCol + i * colDir;
            var row = currRow + i * rowDir;

            if (board[row][col] != null) {
                console.log(
                    "Piece obstructed at position " +
                        String.fromCharCode(col + 65) +
                        (row + 1)
                );
                return false;
            }
        }
        console.log(
            "Moving " +
                this.color +
                " Bishop from " +
                this.position +
                " to " +
                newPosition
        );
        this.position = newPosition;
        return true;
        // Additional logic specific to the Bishop's move
    } else {
        console.log("Invalid move for Bishop");
        return false;
    }
};

Bishop.prototype.getLegalMoves = function(board) {
    var legalMoves = [];
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;

    // Check diagonal moves to the top left
    for (
        var col = currCol - 1, row = currRow - 1;
        col >= 0 && row >= 0;
        col--, row--
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    // Check diagonal moves to the top right
    for (
        var col = currCol + 1, row = currRow - 1;
        col < 8 && row >= 0;
        col++, row--
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    // Check diagonal moves to the bottom left
    for (
        var col = currCol - 1, row = currRow + 1;
        col >= 0 && row < 8;
        col--, row++
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    // Check diagonal moves to the bottom right
    for (
        var col = currCol + 1, row = currRow + 1;
        col < 8 && row < 8;
        col++, row++
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    return legalMoves;
}
module.exports = Bishop;
