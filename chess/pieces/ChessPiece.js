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
    var isColInside = col >= 0 && col <= 7; // ASCII values for A to H
    var isRowInside = row >= 0 && row <= 7;
    return isColInside && isRowInside;
};


ChessPiece.prototype.getLegalMoves = function(board) {
    return [];
};

ChessPiece.prototype.isTargetValid = function(col, row, board, legalMoves) {
    if(!this.isPositionInsideBoard(col, row)) return false;
    var target = board[row][col];

    if (target === null) {
        legalMoves.push(String.fromCharCode(col + 65) + (row + 1)); // Convert back to letter and number
        return true;
    } else if (target.color !== this.color) {
        legalMoves.push(String.fromCharCode(col + 65) + (row + 1)); // Convert back to letter and number
    }

    return false;
}

module.exports = ChessPiece;
