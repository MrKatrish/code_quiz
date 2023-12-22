// logic.js

// Global Variables
let timer;
let timeRemaining;
let currentQuestionIndex;
let score;

// Event listener for the "Start Quiz" button
document.getElementById('start').addEventListener('click', startQuiz);
// Function to start the quiz
function startQuiz() {
  // Initialize variables
  timeRemaining = 60;
  currentQuestionIndex = 0;
  score = 0;

  // Hide start screen and display questions
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    // Update time remaining
    timeRemaining--;

    // Update the timer display
    document.getElementById('time').textContent = timeRemaining;

    // Check if time is up
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display questions
function displayQuestion() {
  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // Display question title
  document.getElementById('question-title').textContent = currentQuestion.title;

  // Display choices
  const choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = '';

  currentQuestion.choices.forEach(function (choice, index) {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.addEventListener('click', function () {
      checkAnswer(index);
    });
    choicesContainer.appendChild(choiceButton);
  });
}

// Function to check the selected answer
function checkAnswer(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (choiceIndex === currentQuestion.correctAnswer) {
    // Increment score for correct answer
    score++;
  } else {
    // Subtract time for incorrect answer
    timeRemaining -= 10;
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Hide questions and display end screen
  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');

  // Display final score
  document.getElementById('final-score').textContent = score;
}
