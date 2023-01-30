export default function (strategy) {
    console.log('rock-paper-scissors AI loaded');

    loadStrategy(strategy);

    /**
     * Loads strategy for predicting opponents move.
     * @param {*} strategy 
     */
    async function loadStrategy(strategyName) {
        strategy = new (await import(`./strategies/${strategyName}.mjs`).then(module => module.default))();
        console.log(`strategy "${strategy.name}" loaded`);
    }

    /**
     * Passes opponents move to strategy.
     * @param {("R"|"P"|"S"))} move
     */
    function addMove(move) {
        strategy.addMove(move);
    }

    /**
     * Desides move based on predicted move.
     * @returns "R", "P" or "S" move
     */
    function getMove() {
        switch (strategy.predictMove()) {
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
        loadStrategy,
        addMove,
        getMove,
        returnWinner
    }
}