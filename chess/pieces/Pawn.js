var ChessPiece = require("./ChessPiece");

function Pawn(color, position) {
    ChessPiece.call(this, color, position);
    this.piece = "Pawn";
    this.firstMove = true;
    this.turn = -1;
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.move = function (newPosition, board, turn) {
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var newCol = newPosition.charCodeAt(0) - 65;
    var newRow = parseInt(newPosition.charAt(1)) - 1;
    var colDiff = Math.abs(newCol - currCol);
    var rowDiff = Math.abs(newRow - currRow);

    var isInsideBoard = this.isPositionInsideBoard(newCol, newRow);
    
    if (isInsideBoard) {
        var forwardDirection = this.color === "White" ? 1 : -1;
        console.log(
            board[newRow - forwardDirection][newCol] != null ?
            board[newRow - forwardDirection][newCol].crossaintable : ""); 
        if (
            colDiff === 0 &&
            newRow === currRow + 2 * forwardDirection &&
            this.firstMove
        ) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            this.turn = turn;
            return true;
        } else if (
            colDiff === 1 &&
            rowDiff === 1 &&
            newRow === currRow + forwardDirection &&
            board[newRow - forwardDirection][newCol] != null &&
            board[newRow - forwardDirection][newCol].piece == "Pawn" &&
            turn - board[newRow - forwardDirection][newCol].turn == 1
        ) {
            console.log(
                "Crossaint " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            board[newRow - forwardDirection][newCol] = null;
            this.firstMove = false;
            return true;
        } else if (
            colDiff === 1 &&
            rowDiff === 1 &&
            newRow === currRow + forwardDirection &&
            board[newRow][newCol] != null // insert fucking en crossaint fucking shit kms.
        ) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            
            return true;
            // Additional logic specific to capturing opponent's piece
        } else if (colDiff === 0 && newRow === currRow + forwardDirection) {
            console.log(
                "Moving " +
                    this.color +
                    " Pawn from " +
                    this.position +
                    " to " +
                    newPosition
            );
            this.position = newPosition;
            this.firstMove = false;
            return true;
        } else {
            console.log("Invalid move for Pawn2");
        }
    } else {
        console.log("Invalid move for Pawn3");
    }
    return false;
};

Pawn.prototype.getLegalMoves = function (board, turn=0) {
    var legalMoves = [];
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var forwardDirection = this.color === "White" ? 1 : -1;

    if (board[currRow + forwardDirection][currCol] === null) {
        legalMoves.push(
            String.fromCharCode(currCol + 65) + (currRow + 1 + forwardDirection)
        );

        // Check double forward move on the first move
        if (
            this.firstMove &&
            board[currRow + forwardDirection][currCol] === null
        ) {
            legalMoves.push(
                String.fromCharCode(currCol + 65) +
                    (currRow + 1 + 2 * forwardDirection)
            );
        }
    }

    if (
        board[currRow + forwardDirection][currCol - 1] != null &&
        board[currRow + forwardDirection][currCol - 1].color != this.color
    ) {
        legalMoves.push(
            String.fromCharCode(currCol + 65 - 1) +
                (currRow + 1 + forwardDirection)
        );
    }
    if (
        board[currRow + forwardDirection][currCol + 1] != null &&
        board[currRow + forwardDirection][currCol + 1].color != this.color
    ) {
        legalMoves.push(
            String.fromCharCode(currCol + 65 + 1) +
                (currRow + 1 + forwardDirection)
        );
    }
    if (this.position.charAt(1) == (this.color === "White" ? "5" : "4")) {
        var leftPiece = board[currRow][currCol - 1];
        var rightPiece = board[currRow][currCol + 1];

        if (
            leftPiece !== null &&
            leftPiece.color !== this.color &&
            leftPiece.piece === "Pawn" &&
            turn === leftPiece.turn + 1
        ) {
            legalMoves.push(
                String.fromCharCode(currCol + 65 - forwardDirection) +
                    (currRow + 1 + forwardDirection)
            );
        }

        if (
            rightPiece !== null &&
            rightPiece.color !== this.color &&
            rightPiece.piece === "Pawn" &&
            turn === rightPiece.turn + 1
        ) {
            legalMoves.push(
                String.fromCharCode(currCol + 65 + forwardDirection) +
                    (currRow + 1 + forwardDirection)
            );
        }
    }
    return legalMoves;
};


Pawn.prototype.getLegalAttacks = function (board, turn=0) {
    var legalMoves = [];
    var currCol = this.position.charCodeAt(0) - 65;
    var currRow = parseInt(this.position.charAt(1)) - 1;
    var forwardDirection = this.color === "White" ? 1 : -1;

    this.isTargetValid(currCol + 1, currRow + forwardDirection, board, legalMoves);
    this.isTargetValid(currCol - 1, currRow + forwardDirection, board, legalMoves);
    
    return legalMoves;
};

module.exports = Pawn;
