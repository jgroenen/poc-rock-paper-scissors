import RPS from "./RPS.mjs";
var rps = new RPS("Random");

document.querySelectorAll("[data-rps-strategy]").forEach(function (strategyEl) {
    strategyEl.onchange = function (e) {
        rps.loadStrategy(e.target.value);
    };
});

document.onkeyup = function (e) {
    switch (e.key) {
        case "r": case "R": document.querySelectorAll("[data-rps-play='R']")[0].click(); break;
        case "p": case "P": document.querySelectorAll("[data-rps-play='P']")[0].click(); break;
        case "s": case "S": document.querySelectorAll("[data-rps-play='S']")[0].click(); break;
    }
};

document.querySelectorAll("[data-rps-play]").forEach(function (playEl) {
    playEl.onclick = function () {

        // Highlight the player move
        document.querySelectorAll("[data-rps-play]").forEach(function (playEl) {
            playEl.classList.remove('active');
        });
        playEl.classList.add('active');

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
    };
});

var interval;
document.querySelectorAll("[data-autoplay]").forEach(function (autoplayEl) {
    autoplayEl.onclick = function () {

        // Stop current autoplay mode
        if (interval) clearInterval(interval);
        document.querySelectorAll("[data-autoplay]").forEach(function (autoplayEl) {
            autoplayEl.classList.remove('active');
        });

        switch (autoplayEl.dataset.autoplay) {
            case "random":
                interval = setInterval(function () {
                    var moveEls = document.querySelectorAll('[data-rps-play]');
                    var moveEl = moveEls[Math.floor(Math.random() * moveEls.length)];
                    moveEl.click();
                }, 50);
                autoplayEl.classList.add('active');
                break;
            case "biased":
                interval = setInterval(function () {
                    var moveEls = document.querySelectorAll('[data-rps-play]');
                    var chances = [30, 30, 40];
                    var chance = Math.floor(Math.random() * 100);
                    var i;
                    for (i = 0; chance > chances[i]; chance -= chances[i], ++i);
                    moveEls[i].click();
                }, 50);
                autoplayEl.classList.add('active');
                break;
            default: /*void*/;
        }
    };
});
