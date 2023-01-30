export default function () {
    var dict = {
        "": {"R": 1, "P": 1, "S": 1}
    };
    var history = "";

    /**
     * Add opponents move to moves memory.
     * @param {("R"|"P"|"S"))} move
     */
    function addMove(move) {
        dict[history][move]++;
        history = (history + move).slice(-5);
        if (!dict[history]) dict[history] = {"R": 1, "P": 1, "S": 1};
    }

    /**
     * Roulette wheel selects predicted move based on moves memory.
     * @returns "R", "P" or "S" move
     */
    function predictMove() {
        var total = Object.values(dict[history]).reduce((total, moveCount) => total + moveCount, 0);
        var random = Math.floor(Math.random() * total);
        for (var move in dict[history]) {
            if (dict[history][move] < random) random -= dict[history][move];
            else return move;
        }
    }

    return {
        name: "History",
        addMove,
        predictMove
    }
}
