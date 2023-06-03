var ChessPiece = require("./ChessPiece");

function Rook(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Rook";
}

Rook.prototype = Object.create(ChessPiece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.move = function (newPosition, board, crossaint=false) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));

    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));

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
                console.log(i);
                console.log(board);
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

module.exports = Rook;
