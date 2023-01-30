export default function () {
    console.log('rock-paper-scissors AI loaded');

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

    /**
     * Desides move based on predicted move.
     * @returns "R", "P" or "S" move
     */
    function getMove() {
        switch (predictMove()) {
            case "R": return "P";
            case "P": return "S";
            case "S": return "R";
        }
    }

    /**
     * 
     * @param {*} p1 
     * @param {*} p2 
     * @returns {string} winner name
     */
    function returnWinner(p1, p2) {
        if (p1.move == p2.move) return "TIE";
        switch (p1.move) {
            case "R": return p2.move == "P" ? p2.name : p1.name;
            case "P": return p2.move == "S" ? p2.name : p1.name;
            case "S": return p2.move == "R" ? p2.name : p1.name;
        }
    }

    return {
        addMove,
        getMove,
        returnWinner
    }
}