fetch('https://api.open5e.com/v2/classes/')
  .then(response => response.json())
  .then(data => {
    const classList = data.results;
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');

    classList.forEach(classData => {
      if (classData.subclass_of === null) {
        console.log(classData);
        const card = document.createElement('div');
        card.classList.add('class-card');
        card.innerHTML = `
          <h2>${classData.name}</h2>
          `;
        cardContainer.appendChild(card);

        // Add event listener to toggle description visibility
        card.addEventListener('click', () => {
          modal.innerHTML = `
          <div>
              <h2>${classData.name}</h2>
              <p>Features</p><p>${classData.levels.features.map(features => features.name).join(', ')}</p></p>
              <button id="continue-button">Continue</button>
          </div>
          `;
          modal.classList.add('open');

          // Store the selected class in localStorage
          localStorage.setItem('selectedClass', JSON.stringify(classData.name));

          // Add event listener to the continue button
          const continueButton = modal.querySelector('#continue-button');
          continueButton.addEventListener('click', () => {
            window.location.href = 'background.html';
          });
        });
      }
    });

    // Add event listener to close modal
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('open');
      }
    });
  })
  .catch(error => console.error('Error:', error));