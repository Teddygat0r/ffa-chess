var ChessPiece = require("./ChessPiece");

function Bishop(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Bishop";
}

Bishop.prototype = Object.create(ChessPiece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.move = function (newPosition, board) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));

    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));

    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);

    if (isInsideBoard && colDiff === rowDiff) {
        var colDir = newCol > currCol ? 1 : -1;
        var rowDir = newRow > currRow ? 1 : -1;

        for (var i = 1; i < colDiff; i++) {
            var col = String.fromCharCode(currCol + i * colDir);
            var row = currRow + i * rowDir;

            if (board[row][col] != null) {
                console.log("Piece obstructed at position " + col + row);
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

module.exports = Bishop;
