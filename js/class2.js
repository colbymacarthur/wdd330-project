fetch('https://api.open5e.com/v2/classes/')
  .then(response => response.json())
  .then(data => {
    const classList = data.results;
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');


    classList.forEach(classData => {
      if (!classData.subclass_of) {
      
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
            <p>Hit Dice</p><p>${classData.hit_dice}</p>
            <p>Features</p><ul>${classData.features.map(feature => `<li>${feature.name} -- ${feature.desc.substr(0, 200)}</li>`).join('')}</ul>

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
  })
  .catch(error => console.error('Error:', error));