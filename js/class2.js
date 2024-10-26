fetch('https://api.open5e.com/v2/classes/')
  .then(response => response.json())
  .then(data => {
    const classList = data.results;
    const cardContainer = document.getElementById('card-container');
    const modal = document.getElementById('modal');

    classList.forEach(classData => {
      if (classData.subclass_of === null) {
        const levelOneFeatures = classData.levels[1].features;
        const levelTwoFeatures = classData.levels[2].features;
    
        // Fetch feature descriptions
        const fetchFeatureDescriptions = async (features) => {
          const featureDescriptions = await Promise.all(features.map((featureKey) => {
            return fetch(`https://api.open5e.com/v2/classes/${classData.key}/features/desc/`)
              .then(response => response.json())
              .then(data => data.desc);
          }));
          return featureDescriptions;
        };
    
        // Fetch and display feature descriptions
        fetchFeatureDescriptions(levelOneFeatures).then((descriptions) => {
          console.log(descriptions);
          // Display feature descriptions in the modal
          card.addEventListener('click', () => {
            modal.innerHTML = `
              <div>
                <h2>${classData.name}</h2>
                <p>Features</p>
                <ul>
                  ${descriptions.map((description) => `<li>${description}</li>`).join('')}
                </ul>
                <p>Level 2 Features</p>
                <ul>
                  ${levelTwoFeatures.map((feature) => `<li>${feature.name}</li>`).join('')}
                </ul>
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