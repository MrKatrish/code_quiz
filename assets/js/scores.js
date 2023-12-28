// scores.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the highscores from local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Display highscores
    displayHighscores(highscores);
  
    // Event listener for the clear button
    document.getElementById("clear").addEventListener("click", function () {
      // Clear highscores
      localStorage.removeItem("highscores");
      // Update the displayed highscores
      displayHighscores([]);
    });
  });
  
  // Function to display highscores
  function displayHighscores(highscores) {
    const highscoresList = document.getElementById("highscores");
  
    // Clear existing highscores
    highscoresList.innerHTML = "";
  
    // Sort highscores in descending order
    highscores.sort((a, b) => b.score - a.score);
  
    // Display highscores in the list
    highscores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials} - ${score.score}`;
      highscoresList.appendChild(listItem);
    });
  }
  