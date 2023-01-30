export default function () {

    /**
     * Add opponents move to moves memory.
     * @param {("R"|"P"|"S"))} move
     */
    function addMove(move) {
        /* void */
    }

    /**
     * Roulette wheel selects predicted move based on moves memory.
     * @returns "R", "P" or "S" move
     */
    function predictMove() {
        var options = ["R", "P", "S"];
        var random = Math.floor(Math.random() * options.length);
        return options[random];
    }

    return {
        name: "Random",
        addMove,
        predictMove
    }
}
