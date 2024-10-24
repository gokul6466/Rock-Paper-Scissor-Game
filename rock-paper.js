
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loss: 0,
    ties: 0
};

updateScore();

function computerChoice() {
    const randomnumber = Math.floor(Math.random() * 10);
    if (randomnumber >= 0 && randomnumber <= 3) {
        return "Rock";
    } else if (randomnumber >= 4 && randomnumber <= 6) {
        return "Paper";
    } else {
        return "scissors";
    }
}

document.querySelector(".js-rock-btn")
    .addEventListener('click', () => {
        playgame("Rock");
    })

document.querySelector(".js-paper-btn")
    .addEventListener('click', () => {
        playgame("Paper");
    })

document.querySelector(".js-scissor-btn")
    .addEventListener('click', () => {
        playgame("scissors");
    })


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playgame("Rock");
    }
    else if (event.key === 'p') {
        playgame("Paper")
    }
    else if (event.key === 's') {
        playgame("scissors")
    }

})



function playgame(yourchoice) {
    const computerMove = computerChoice();

    let result = "";

    if (yourchoice === "Rock") {
        if (computerMove === 'Rock') {
            result = "Tie.";
        }
        else if (computerMove === 'Paper') {
            result = "You Loss";
        }
        if (computerMove === 'scissors') {
            result = "You Win";
        }
    }


    if (yourchoice === "Paper") {
        if (computerMove === 'Rock') {
            result = "You Win";
        }
        else if (computerMove === 'Paper') {
            result = "Tie.";
        }
        if (computerMove === 'scissors') {
            result = "You Loss";
        }
    }


    if (yourchoice === "scissors") {
        if (computerMove === 'Rock') {
            result = "You Loss";
        }
        else if (computerMove === 'Paper') {
            result = "You Win";
        }
        if (computerMove === 'scissors') {
            result = "Tie.";
        }
    }



    if (result === "You Win") {
        score.wins += 1;
    }
    else if (result === "You Loss") {
        score.loss += 1;
    }
    else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();



    document.querySelector(".js-result")
        .innerHTML = ` ${result}`;

    document.querySelector(".js-moves")
        .innerHTML = ` you
        <img class="move-icon" src="./icons/${yourchoice.toLowerCase()}-emoji.png">
        <img class="move-icon" src="./icons/${computerMove.toLowerCase()}-emoji.png">computer`

}

function updateScore() {
    document.querySelector(".js-score")
        .innerHTML = `Wins:${score.wins}, Losses:${score.loss}, Ties:${score.ties}`

}

document.body.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") {
        confirmationDialog();
    }
})

document.querySelector(".js-reset-btn")
    .addEventListener('click', () => {
        confirmationDialog();
    })


function reset() {
    score = {
        wins: 0,
        loss: 0,
        ties: 0
    };
    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
}





document.querySelector(".js-auto-btn")
    .addEventListener('click', () => {
        autoPlay();
    })

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }

})

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

    const text = document.querySelector(".js-auto-btn");

    if (text.innerHTML === "Auto Play") {
        text.innerHTML = "Stop Playing"
    }
    else {
        text.innerHTML = "Auto Play"
    }


    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            playgame(computerChoice());
            computerChoice();

        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

hideConfirmationDialog()

function confirmationDialog() {

    removeConfirmationDialog()


    document.querySelector(".js-overlay")
        .innerHTML = ` <div class="js-confirmation-btn confirmation-btn ">Are you sure want to reset
        <button  class="js-yes yes-btn" >Yes</button>
        <button class="js-no  no-btn" >No</button>
        </div>
     
        `
    const yesBtn = document.querySelector(".js-yes");
    const noBtn = document.querySelector(".js-no");


    yesBtn.removeEventListener('click', onYesClick);
    yesBtn.addEventListener('click', onYesClick);

    noBtn.removeEventListener('click', hideConfirmationDialog);
    noBtn.addEventListener('click', hideConfirmationDialog);

}

function onYesClick() {
    reset();
    hideConfirmationDialog()
}

function hideConfirmationDialog() {
    document.querySelector(".js-overlay")
        .classList.add("disappear")
}

function removeConfirmationDialog() {
    document.querySelector(".js-overlay")
        .classList.remove("disappear");
}



