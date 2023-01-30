import RPS from "./RPS.mjs";
var rps = new RPS();

document.querySelectorAll("[data-rps-play]").forEach(function (playEl) {
    playEl.onclick = function () {

        // Highlight the player move
        document.querySelectorAll("[data-rps-play]").forEach(function (playEl) {
            playEl.style.background = "none";
        });
        playEl.style.background = "#99FF99";

        // Get the AI move
        var move = rps.getMove();
        document.querySelectorAll("[data-rps-move]").forEach(function (moveEl) {
            moveEl.innerHTML =
                move == "R" ? "Rock":
                move == "P" ? "Paper":
                "Scissors";
        });

        // Display the winner
        document.querySelectorAll("[data-rps-winner]").forEach(function (el) {
            var winner = rps.returnWinner({name: "You", move: playEl.dataset.rpsPlay}, {name: "AI", move: move});
            el.innerHTML = winner;
            document.querySelectorAll(`[data-rps-score="${winner}"]`).forEach(function (scoreEl) {
                scoreEl.innerHTML++;
            });
        });

        // Log the player move
        rps.addMove(playEl.dataset.rpsPlay);
    }
});
