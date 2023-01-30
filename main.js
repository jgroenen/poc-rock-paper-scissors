import RPS from "./RPS.mjs";
var rps = new RPS("Random");

document.querySelectorAll("[data-rps-strategy]").forEach(function (strategyEl) {
    strategyEl.onchange = function (e) {
        rps.loadStrategy(e.target.value);
    };
});

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
        document.querySelectorAll("[data-rps-winner]").forEach(function (winnerEl) {
            var winner = rps.returnWinner({name: "You", move: playEl.dataset.rpsPlay}, {name: "AI", move: move});
            winnerEl.innerHTML = winner;
            document.querySelectorAll(`[data-rps-score="${winner}"]`).forEach(function (scoreEl) {
                scoreEl.innerHTML++;
            });
        });

        // Display the graphical bar
        document.querySelectorAll("canvas").forEach(function (canvasEl) {
            var ctx = canvasEl.getContext("2d");
            var score = parseInt(document.querySelectorAll('[data-rps-score="You"]')[0].innerHTML);
            score = score / (score + parseInt(document.querySelectorAll('[data-rps-score="AI"]')[0].innerHTML));

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvasEl.width, 10);

            ctx.fillStyle = "#FFF000";
            ctx.fillRect(0, 0, canvasEl.width * score, 10);
        });

        // Log the player move
        rps.addMove(playEl.dataset.rpsPlay);
    }
});
