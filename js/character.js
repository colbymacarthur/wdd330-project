// character.js

// Retrieve the stored character data from localStorage
const selectedBackground = localStorage.getItem('selectedBackground').replace(/"/g, '');
const selectedClass = localStorage.getItem('selectedClass').replace(/"/g, '');
const selectedFeat = localStorage.getItem('selectedFeat').replace(/"/g, '');
const selectedRace = localStorage.getItem('selectedRace').replace(/"/g, '');

// Update the HTML elements to display the character summary
const cardContainer = document.querySelector('#character-container');

if (cardContainer) {
  // Create a new HTML element to display the character summary
    const characterSummary = document.createElement('div');
    characterSummary.classList.add('character-card');
    characterSummary.innerHTML = `
        <p>Race: ${selectedRace}</p>
        <p>Class: ${selectedClass}</p>
        <p>Background: ${selectedBackground}</p>
        <p>Feat: ${selectedFeat}</p>
    `;

  // Add the character summary element to the card container
  cardContainer.appendChild(characterSummary);
} else {
  console.error('Card container element not found');
}

// Add an event listener to the button to clear local storage
const goBackButton = document.querySelector('button');
goBackButton.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'race.html';
});