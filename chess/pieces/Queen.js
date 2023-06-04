var ChessPiece = require("./ChessPiece");

function Queen(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Queen";
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.move = function (newPosition, board) {
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var newCol = newPosition.charCodeAt(0) - 65;
    var newRow = parseInt(newPosition.charAt(1)) - 1;
    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    if (
        this.isPositionInsideBoard(newCol, newRow) &&
        (colDiff === rowDiff || currCol === newCol || currRow === newRow)
    ) {
        var colDir = newCol > currCol ? 1 : newCol < currCol ? -1 : 0;
        var rowDir = newRow > currRow ? 1 : newRow < currRow ? -1 : 0;

        // Check diagonal path
        if (colDiff === rowDiff) {
            for (var i = 1; i < colDiff; i++) {
                var col = currCol + i * colDir;
                var row = currRow + i * rowDir;

                if (board[row][col] !== null) {
                    console.log("Piece obstructed at position " + String.fromCharCode(col + 65) + (row + 1));
                    return false;
                }
            }
        }

        // Check vertical and horizontal path
        if (currCol === newCol || currRow === newRow) {
            var startCol =
                currCol === newCol ? currCol : Math.min(currCol, newCol);
            var endCol =
                currCol === newCol ? currCol : Math.max(currCol, newCol);
            var startRow =
                currRow === newRow ? currRow : Math.min(currRow, newRow);
            var endRow =
                currRow === newRow ? currRow : Math.max(currRow, newRow);

            for (var col = startCol + 1; col < endCol; col++) {
                if (board[currRow][col] !== null) {
                    console.log(
                        "Piece obstructed at position " +
                            String.fromCharCode(col + 65) +
                            (currRow + 1)
                    );
                    return false;
                }
            }

            for (var row = startRow + 1; row < endRow; row++) {
                if (board[row][currCol] !== null) {
                    console.log(
                        "Piece obstructed at position " +
                            String.fromCharCode(currCol + 65) +
                            (row + 1)
                    );
                    return false;
                }
            }
        }
        console.log(
            `Moving ${this.color} Queen from ${this.position} to ${newPosition}`
        );
        this.position = newPosition;
        return true;
        // Additional logic specific to the Queen's move
    } else {
        console.log("Invalid move for Queen");
        return false;
    }
};

Queen.prototype.getLegalMoves = function (board) {
    var legalMoves = [];
    var currCol = this.position.charCodeAt(0) - 65; // Convert letter to index (a=0, b=1, ...)
    var currRow = parseInt(this.position.charAt(1)) - 1; // Convert number to index (1=0, 2=1, ...)

    // Check diagonal moves
    for (
        var col = currCol - 1, row = currRow - 1;
        col >= 0 && row >= 0;
        col--, row--
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol + 1, row = currRow - 1;
        col < 8 && row >= 0;
        col++, row--
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol - 1, row = currRow + 1;
        col >= 0 && row < 8;
        col--, row++
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol + 1, row = currRow + 1;
        col < 8 && row < 8;
        col++, row++
    ) {
        if (!this.isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    // Check horizontal and vertical moves
    for (var col = currCol - 1; col >= 0; col--) {
        if (!this.isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    for (var col = currCol + 1; col < 8; col++) {
        if (!this.isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    for (var row = currRow - 1; row >= 0; row--) {
        if (!this.isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }

    for (var row = currRow + 1; row < 8; row++) {
        if (!this.isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }
    return legalMoves;
}

module.exports = Queen;
