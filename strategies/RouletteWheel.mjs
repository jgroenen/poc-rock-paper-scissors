export default function () {
    var moveCounts = {
        "R": 1,
        "P": 1,
        "S": 1
    };

    /**
     * Add opponents move to moves memory.
     * @param {("R"|"P"|"S"))} move
     */
    function addMove(move) {
        moveCounts[move]++;
    }

    /**
     * Roulette wheel selects predicted move based on moves memory.
     * @returns "R", "P" or "S" move
     */
    function predictMove() {
        var total = Object.values(moveCounts).reduce((total, moveCount) => total + moveCount, 0);
        var random = Math.floor(Math.random() * total);
        for (var move in moveCounts) {
            if (moveCounts[move] < random) random -= moveCounts[move];
            else return move;
        }
    }

    return {
        name: "RouletteWheel",
        addMove,
        predictMove
    }
}
