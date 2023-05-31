function ChessPiece(color, position) {
    this.color = color;
    this.position = position;
}

ChessPiece.prototype.move = function (newPosition, board) {
    console.log(
        "Moving " +
            this.color +
            " piece from " +
            this.position +
            " to " +
            newPosition
    );
    this.position = newPosition;
};

ChessPiece.prototype.isPositionInsideBoard = function(col, row) {
    var isColInside = col >= 65 && col <= 72; // ASCII values for A to H
    var isRowInside = row >= 1 && row <= 8;
    return isColInside && isRowInside;
};

module.exports = ChessPiece;
