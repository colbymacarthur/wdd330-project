fetch('https://www.dnd5eapi.co/api/races/')
  .then(response => response.json())
  .then(data => {
    const raceList = data.results;
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');

    raceList.forEach(race => {
      console.log(race);
      const card = document.createElement('div');
      card.classList.add('race-card');

      // Make an additional API call to fetch the description
      fetch(`https://www.dnd5eapi.co/api/races/${race.index}/`)
        .then(response => response.json())
        .then(descriptionData => {
          console.log(descriptionData);
          card.innerHTML = `
            <h2>${race.name}</h2>
          `;
          cardContainer.appendChild(card);

          // Add event listener to toggle description visibility
        card.addEventListener('click', () => {
            modal.innerHTML = `
            <div>
                <h2>${race.name}</h2>
                <p>Alignment</p><p>${descriptionData.alignment}</p>
                <p>Size</p><p>${descriptionData.size_description}</p>
                <p>Languages</p><p>${descriptionData.language_desc}</p>
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

          // Add event listener to close modal
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.classList.remove('open');
            }
          });
        })
        .catch(error => console.error('Error:', error));
    });
  })
  .catch(error => console.error('Error:', error));
  