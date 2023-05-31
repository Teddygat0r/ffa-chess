var ChessPiece = require("./ChessPiece");

function King(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "King";
}

King.prototype = Object.create(ChessPiece.prototype);
King.prototype.constructor = King;

King.prototype.move = function (newPosition, board) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));

    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));

    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);

    if (
        isInsideBoard &&
        ((colDiff === 1 && rowDiff === 0) ||
            (colDiff === 0 && rowDiff === 1) ||
            (colDiff === 1 && rowDiff === 1))
    ) {
        console.log(
            "Moving " +
                this.color +
                " King from " +
                this.position +
                " to " +
                newPosition
        );
        this.position = newPosition;
        // Additional logic specific to the King's move
        return true;
    } else {
        console.log("Invalid move for King");
        return false;
    }
};


module.exports = King;
