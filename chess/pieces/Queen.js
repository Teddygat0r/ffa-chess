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

    if (
        this.isPositionInsideBoard(newCol, newRow) &&
        (colDiff === rowDiff || currCol === newCol || currRow === newRow)
    ) {
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

module.exports = Queen;
