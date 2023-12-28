// logic.js

// Global Variables
let timer;
let timeRemaining;
let currentQuestionIndex;
let score;

// Sound elements
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

// Event listeners
document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('submit').addEventListener('click', saveScore);

// Function to start the quiz
function startQuiz() {
  // Initialize variables
  timeRemaining = 120;
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
    // Play correct sound
    correctSound.play();
    // Display "Correct" message
    displayFeedback("Correct");
  } else {
    // Play incorrect sound
    incorrectSound.play();
    // Display "Wrong" message
    displayFeedback("Wrong");

    // Deduct 5 seconds for a wrong answer
    timeRemaining -= 5;

    // Update the timer display
    document.getElementById('time').textContent = timeRemaining;
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


// Function to display feedback (right or wrong)
function displayFeedback(feedback) {
  const feedbackElement = document.getElementById('feedback');
  feedbackElement.textContent = feedback;
  feedbackElement.classList.remove('hide');

  // Hide feedback after a short delay (you can adjust the duration)
  setTimeout(function () {
    feedbackElement.classList.add('hide');
  }, 1000);
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

// Function to save the score
function saveScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Get existing highscores from local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add the current score to the highscores
    highscores.push({ initials, score });

    // Save the updated highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Alert the user (you may customize this part)
    alert(`Score saved for ${initials}!`);
  } else {
    alert("Please enter your initials.");
  }
}
