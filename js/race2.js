fetch('https://api.open5e.com/v2/races/')
  .then(response => response.json())
  .then(data => {
    const raceList = data.results;
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');

    raceList.forEach(race => {
      if (!race.is_subrace) {
        console.log(race);
        const card = document.createElement('div');
        card.classList.add('race-card');
        card.innerHTML = `
          <h2>${race.name}</h2>
          `;
        cardContainer.appendChild(card);

        // Add event listener to toggle description visibility
        card.addEventListener('click', () => {
          modal.innerHTML = `
          <div>
              <h2>${race.name}</h2>
              <p>Traits</p><p>${race.traits.map(trait => `<li>${trait.name} -- ${trait.desc}</li>`).join('')}</p>
              <button id="continue-button">Continue</button>
          </div>
          `;
          modal.classList.add('open');

          // Store the selected race in localStorage
          localStorage.setItem('selectedRace', JSON.stringify(race.name));

          // Add event listener to the continue button
          const continueButton = modal.querySelector('#continue-button');
          continueButton.addEventListener('click', () => {
            window.location.href = 'class.html';
          });
        });
      }
    });

    // Move the modal event listener outside the loop
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  })
  .catch(error => console.error('Error:', error));
