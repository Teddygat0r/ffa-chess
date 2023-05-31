var ChessPiece = require("./ChessPiece");

function Knight(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Knight";
}

Knight.prototype = Object.create(ChessPiece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.move = function (newPosition) {
    var currCol = this.position.charCodeAt(0);
    var currRow = parseInt(this.position.charAt(1));

    var newCol = newPosition.charCodeAt(0);
    var newRow = parseInt(newPosition.charAt(1));

    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);

    if (
        isInsideBoard &&
        ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2))
    ) {
        console.log(
            "Moving " +
                this.color +
                " Knight from " +
                this.position +
                " to " +
                newPosition
        );
        this.position = newPosition;
        return true;
        // Additional logic specific to the Knight's move
    } else {
        console.log("Invalid move for Knight");
        return false;
    }
};


module.exports = Knight;
