var ChessPiece = require("./ChessPiece");

function Queen(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Queen";
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.move = function (newPosition, board) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));
    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));
    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);
    console.log(this.getLegalMoves(board));

    if (
        this.isPositionInsideBoard(newCol, newRow) &&
        (colDiff === rowDiff || currCol === newCol || currRow === newRow)
    ) {
        var colDir = newCol > currCol ? 1 : newCol < currCol ? -1 : 0;
        var rowDir = newRow > currRow ? 1 : newRow < currRow ? -1 : 0;

        // Check diagonal path
        if (colDiff === rowDiff) {
            for (var i = 1; i < colDiff; i++) {
                var col = String.fromCharCode(currCol + i * colDir);
                var row = currRow + i * rowDir;

                if (board[row][col] !== null) {
                    console.log("Piece obstructed at position " + col + row);
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

            console.log(board[currRow][String.fromCharCode(col)]);
            for (var col = startCol + 1; col < endCol; col++) {
                if (board[currRow][String.fromCharCode(col)] !== null) {
                    console.log(
                        "Piece obstructed at position " +
                            String.fromCharCode(col) +
                            currRow
                    );
                    return false;
                }
            }

            for (var row = startRow + 1; row < endRow; row++) {
                if (board[row][String.fromCharCode(currCol)] !== null) {
                    console.log(
                        "Piece obstructed at position " +
                            this.position.charAt(0) +
                            row
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
    console.log(currCol + " " + currRow);

    // Check diagonal moves
    for (
        var col = currCol - 1, row = currRow - 1;
        col >= 0 && row >= 0;
        col--, row--
    ) {
        if (!isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol + 1, row = currRow - 1;
        col < 8 && row >= 0;
        col++, row--
    ) {
        if (!isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol - 1, row = currRow + 1;
        col >= 0 && row < 8;
        col--, row++
    ) {
        if (!isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    for (
        var col = currCol + 1, row = currRow + 1;
        col < 8 && row < 8;
        col++, row++
    ) {
        if (!isTargetValid(col, row, board, legalMoves)) {
            break;
        }
    }

    // Check horizontal and vertical moves
    for (var col = currCol - 1; col >= 0; col--) {
        if (!isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    for (var col = currCol + 1; col < 8; col++) {
        if (!isTargetValid(col, currRow, board, legalMoves)) {
            break;
        }
    }

    for (var row = currRow - 1; row >= 0; row--) {
        if (!isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }

    for (var row = currRow + 1; row < 8; row++) {
        if (!isTargetValid(currCol, row, board, legalMoves)) {
            break;
        }
    }

    return legalMoves;
}

function isTargetValid(col, row, board, legalMoves) {
    var target = board[row][col];
    console.log(row + " " + col + " " + target);

    if (target === null) {
        legalMoves.push(String.fromCharCode(col + 65) + (row + 1)); // Convert back to letter and number
        return true;
    } else if (target.color !== this.color) {
        legalMoves.push(String.fromCharCode(col + 65) + (row + 1)); // Convert back to letter and number
    }

    return false;
}

module.exports = Queen;
