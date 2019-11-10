var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;


var quizQuestions = [
    {
        question: "Which planet has the largest moon in the solar system?",
        choices: ["Earth", "Uranus", "Jupiter"],
        correctAnswer: "Jupiter"
    },

    {
        question: "What term do astronomers use to describe the two times a year when day and night are of equal length?",
        choices: ["Solstice", "Equinox", "Blue Moon"],
        correctAnswer: "Equinox"
    },

    {
        question: "Can a comet create a crater on the surface of the Earth?",
        choices: ["Yes", "No", "Only during a full moon"],
        correctAnswer: "No"
    },

    {
        question: "What does a light-year measure?",
        choices: ["Brightness", "Distance", "Time"],
        correctAnswer: "Time"
    },
    {
        question: "Which of the following best describes a supernova?",
        choices: ["A fast-moving meteor", "A bright explosion", "A pair of conjoined stars"],
        correctAnswer: "A bright explosion"
    }
    
];


//IF timer is over go to the next question. index -1 (last question)
function nextQuestion() {
    var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('game over!');
        displayResult();
    }
    else {


        currentQuestion++;
        loadQuestion();
    }

}
// timer goes down to zero - clearInterval . timeup fires whebever counter reaches zero
//timer refered in clearInterval to clear timer and not go down by negative numbers  

function timeUp() {
    clearInterval(timer);
    lost++;
    loadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}
//decrease timer - counter --; reset value back to 30 - counter= 30; 
function countDown() {
    counter--;
    $('#time').html('Timer: ' + counter);
    if (counter === 0) {
        timeUp();
    }
}
function loadQuestion() {
    counter = 15;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer:' + counter);

    $('#game').html(`
<h4>${question}</h4>
${loadChoices(choices)}  

${loadRemainingQuestion()}  
`);
}
//calling the function  to load choices above
//hold value of every single choice. can check in console. click on every single p  to see if user picked the correct answer.
function loadChoices(choices) {
    var result = '';
    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}





//check and see if clicked option is correct or incorrect

//

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        loadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;

        loadImage('Lose');
        setTimeout(nextQuestion, 3 * 1000);
    }

});;

// display result into entire game element. // call function whenever game is over. - function nextquestion .. call displayResult()
function displayResult() {
    var result = `
            <p> You got ${score} question(s) right </p>
            <p> You got ${lost} question(s) wrong </p>
            <p> Number of Total questions answered correctly : ${quizQuestions.length}  </p>
            <button class="btn btn-primary" id="reset"> Reset Game </button>
            `;
    $('#game').html(result);
}


// reset the game
$(document).on('click', '#reset', function () {
    counter = 15;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});;


function loadRemainingQuestion() {
    var remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

function loadImage(status) {
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="image">Correct!</p>
            <p class="image">The correct answer is <b>${correctAnswer}</b></p>
            <iframe src="https://media.giphy.com/media/13fhBmPSB3pEn6/source.gif" width="300" height="300" frameBorder="0"></iframe><p></p>
          
        `);
    } else {
        $('#game').html(`
            <p class="image">Incorrect!</p>
            <p class="image">The correct answer was <b>${correctAnswer}</b></p>
            <iframe src="https://giphy.com/embed/3ohfFOrOAW9GaczHc4" width="300" height="200" frameBorder="0"></iframe></p>
            
        `);
    }
}


loadQuestion();

