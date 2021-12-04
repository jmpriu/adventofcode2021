class Board {
    constructor(boardNumbers) {
        this.score = -1;
        this.numbers = boardNumbers;
        this.state = new Array(5).fill(null).map(_ => new Array(5).fill(false));
    }

    reset() {
        this.score = -1;
        this.state = new Array(5).fill(null).map(_ => new Array(5).fill(false)); 
    }
    markNumber(number) {
        this.numbers.forEach((row, rowIndex) => {
            const index = row.findIndex(value => value === number);
            if (index >= 0) {
                this.state[rowIndex][index] = true;
            }
        });
    }
    checkIsWinner() {
        const winningRow = this.state.some(row => {
            return row.every(isCheck => isCheck)
        });
        if (winningRow) {
            return true;
        }
        for (let i = 0; i < 5; i++) {   
            let winningColumn = true;
            for (let j = 0; winningColumn && j < 5; j++) {
               if (!this.state[j][i]) {
                   winningColumn = false;
               }
            }
            if (winningColumn) {
                return true;
            } else {
                winningColumn = true;
            }
        }
        return false;
    }
    toString() {
        return this.numbers.map(row => row.join(' ')).join('\r\n');
    }
    getSumOfUnmatchedNumbers() {
        let sum = 0;
        this.state.forEach((row, i) => {
            row.forEach((isCheck, j) => {
                if (!isCheck) {
                    sum += this.numbers[i][j];
                }
            })
        })
        return sum;
    }
    calculateScore(lastNumberCalled) {
        this.score = this.getSumOfUnmatchedNumbers() * lastNumberCalled
    }
    getScore() {
        return this.score;
    }
}

module.exports = Board;