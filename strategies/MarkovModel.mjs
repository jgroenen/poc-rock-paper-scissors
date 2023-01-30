export default function () {
    var moveCounts = {
        "R": { "R": 1, "P": 1, "S": 1 },
        "P": { "R": 1, "P": 1, "S": 1 },
        "S": { "R": 1, "P": 1, "S": 1 }
    };
    var lastMove = "R";

    /**
     * Add opponents move to moves memory.
     * @param {("R"|"P"|"S"))} move
     */
    function addMove(move) {
        moveCounts[lastMove][move]++;
        lastMove = move;
    }

    /**
     * Roulette wheel selects predicted move based on moves memory.
     * @returns "R", "P" or "S" move
     */
    function predictMove() {
        var total = Object.values(moveCounts[lastMove]).reduce((total, moveCount) => total + moveCount, 0);
        var random = Math.floor(Math.random() * total);
        for (var move in moveCounts[lastMove]) {
            if (moveCounts[lastMove][move] < random) random -= moveCounts[lastMove][move];
            else return move;
        }
    }

    return {
        name: "MarkovModel",
        addMove,
        predictMove
    }
}
