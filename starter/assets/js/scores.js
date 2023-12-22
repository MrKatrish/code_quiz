// scores.js

// Function to save the score
function saveScore() {
    const initialsInput = document.getElementById('initials');
    const initials = initialsInput.value.trim();
  
    if (initials !== '') {
      // Save the score and initials (you may use local storage or send it to a server)
      // Example: localStorage.setItem('highScore', JSON.stringify({ initials, score }));
      alert(`Score saved for ${initials}!`);
    } else {
      alert('Please enter your initials.');
    }
  }
  
  // Event listener for the submit button
  document.getElementById('submit').addEventListener('click', saveScore);
  