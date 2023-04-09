const questions = [
    {
        question: "Which country borders 14 nations and crosses 8 time zones?",
        answers: [
            { text: 'Tanzania', correct: false },
            { text: 'Uganda', correct: false },
            { text: 'Mongolia', correct: false },
            { text: 'Russia', correct: true },

        ]

    },
    {
        question: "What's the smallest country in the world?",
        answers: [
            { text: 'Nauru', correct: false },
            { text: 'Peru', correct: false },
            { text: 'Vatican City', correct: true },
            { text: 'Tuvalu', correct: false },

        ]

    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: true },
            { text: '1', correct: false },
            { text: '5', correct: false },

        ]

    },
    {
        question: "What does BMW stand for (in English)?",
        answers: [
            { text: 'Bollivian Motorcycle Works', correct: false },
            { text: 'Bollivian Motorcycle Works', correct: false },
            { text: 'Bavarian Motor Workstation', correct: false },
            { text: 'Bavarian Motor Works', correct: true },

        ]
    },
    {
        question: "Which country invented tea?",
        answers: [
            { text: 'India', correct: false },
            { text: 'Nepal', correct: false },
            { text: 'Pakistan', correct: false },
            { text: 'China', correct: true },

        ]
       
    }
    ,
    {
        question: "What is the common name for dried plums?",
        answers: [
            { text: 'Prunes', correct: true },
            { text: 'Pronges', correct: false },
            { text: 'Chuck', correct: false },
            { text: 'Pickled Plums', correct: false },

        ]
        
    },
    {
        question: "What is the capital of New Zealand?",
        answers: [
            { text: 'Canbarra', correct: false },
            { text: 'Wellington', correct: true },
            { text: 'Auckland', correct: false },
            { text: 'Brisbane', correct: false },

        ]
        
    }
    ,
    {
        question: "How many eyes does a bee have?",
        answers: [
            { text: '5', correct: true },
            { text: '4', correct: false },
            { text: '7', correct: false },
            { text: '6', correct: false },

        ]
        
    },
    {
        question: "How many hearts does a sponges have?(invertebrate animal)",
        answers: [
            { text: '7', correct: false },
            { text: '2', correct: false },
            { text: '0', correct: true },
            { text: '1', correct: false },

        ]
        
    },
    {
        question: "Tungsten is a chemical element with symbol ____ and atomic number 74.",
        answers: [
            { text: 'Tn', correct: false },
            { text: 'W', correct: true },
            { text: 'Ts', correct: false },
            { text: 'Gt', correct: false },

        ]
        
    }


]
// Get HTML elements
const questionContainer = document.querySelector('.question-container');
const questionElement = document.getElementById('question');
const answersButtons = document.getElementById('answers-btn');
const nextButton = document.getElementById('next-btn');
const progressBarFull = document.getElementById('progressBarFull');
const hudElement = document.getElementById('hud');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let isAnswerSelected = false;

// Display question and answers
function showQuestion(question) {
    isAnswerSelected = false;
    questionElement.innerText = question.question;
    answersButtons.innerHTML = '';
    question.answers.forEach((answer, index) => {
        createAnswerButton(answer.text, index);
    });
}

// Create answer buttons
function createAnswerButton(answerText, index) {
    const button = document.createElement('button');
    button.innerText = answerText;
    button.classList.add('btn');
    button.dataset.index = index;
    button.addEventListener('click', selectAnswer);
    answersButtons.appendChild(button);
}

// Event listener for answer selection
function selectAnswer(event) {
    if (!isAnswerSelected) {
        isAnswerSelected = true;
        const selectedButton = event.target;
        const selectedIndex = selectedButton.dataset.index;
        const question = questions[currentQuestionIndex];
        if (question.answers[selectedIndex].correct) {
            score++;
        }
        setStatusClass(selectedButton, question.answers[selectedIndex].correct);
        Array.from(answersButtons.children).forEach(button => {
            button.disabled = true;
        });
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerText = 'Finish';
        }
        nextButton.disabled = false;
        updateScore();
    }
}

// Set status class for correct/incorrect answers
function setStatusClass(button, correct) {
    button.classList.add(correct ? 'correct' : 'incorrect');
}

// Event listener for next button
nextButton.addEventListener('click', () => {
    if (isAnswerSelected) {
        nextButton.disabled = true;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            updateProgressBar();
        } else {
            showResults();
        }
    }
});

// Update progress bar
function updateProgressBar() {
    const progressText = document.getElementById('progress-text');
    progressText.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    const percentage = (currentQuestionIndex / questions.length) * 100;
    progressBarFull.style.width = `${percentage}%`;
}

// Display results
function showResults() {
    questionContainer.classList.add('hide');
    hudElement.innerHTML = `Score: ${score}/${questions.length}`;
    scoreElement.innerHTML = `Final Score: ${score}/${questions.length}`;
}

// Update current score
function updateScore() {
    hudElement.innerHTML = `Score: ${score}/${questions.length}`;
}

// Start the game
function startGame() {
    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
}

startGame();
