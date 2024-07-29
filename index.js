const prompt = require('prompt-sync')();

class TicTacToe {
    constructor(size) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill(" "));
        this.currentPlayer = "X";
        this.moves = 0;
    }

    displayBoard() {
        this.board.forEach(row => {
            console.log(row.map(cell => cell === " " ? "   " : ` ${cell} `).join("|"));
            console.log("-".repeat(this.size * 4 - 1));
        });
    }

    isValidMove(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size && this.board[row][col] === " ";
    }

    makeMove(row, col) {
        if (this.isValidMove(row, col)) {
            this.board[row][col] = this.currentPlayer;
            this.moves++;
            return true;
        } else {
            console.log("Invalid move. Try again.");
            return false;
        }
    }

    checkWin() {
        const lines = [
            ...this.board, // rows
            ...this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex])), // columns
            this.board.map((row, i) => row[i]), // main diagonal
            this.board.map((row, i) => row[this.size - 1 - i]) // anti-diagonal
        ];

        return lines.some(line => line.every(cell => cell === this.currentPlayer));
    }

    play() {
        while (this.moves < this.size * this.size) {
            this.displayBoard();
            const row = parseInt(prompt(`Player ${this.currentPlayer}, enter your row (0-${this.size - 1}): `));
            const col = parseInt(prompt(`Player ${this.currentPlayer}, enter your column (0-${this.size - 1}): `));

            if (this.makeMove(row, col)) {
                if (this.checkWin()) {
                    this.displayBoard();
                    console.log(`Player ${this.currentPlayer} wins!`);
                    return;
                }
                this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            }
        }

        this.displayBoard();
        console.log("It's a tie!");
    }
}

const size = parseInt(prompt("Enter the size of the grid: "));
const game = new TicTacToe(size);
game.play();
