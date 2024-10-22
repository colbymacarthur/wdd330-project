fetch('https://api.open5e.com/v2/backgrounds/')
    .then(response => response.json())
    .then(data => {
        const backgroundList = data.results;
        const cardContainer = document.getElementById('card-container');
        const modal = document.getElementById('modal');

        backgroundList.forEach(background => {
            console.log(background);
            const card = document.createElement('div');
            card.classList.add('background-card');

            // Make an additional API call to fetch the description
            fetch(`https://api.open5e.com/v2/backgrounds/${background.key}`)
                .then(response => response.json())
                .then(descriptionData => {
                    console.log(descriptionData);
                    card.innerHTML = `
                        <h2>${background.name}</h2>
                    `;
                    cardContainer.appendChild(card);

            // Add event listener to toggle description visibility
            card.addEventListener('click', () => {
                modal.innerHTML = `
                <div>
                    <h2>${background.name}</h2>
                    <p>Benefits</p><ul>${descriptionData.benefits.map(benefit => `<li>${benefit.name} -- ${benefit.desc.substr(0, 200)}</li>`).join('')}</ul>
                    <button id="continue-button">Continue</button>
                </div>
                `;
                modal.classList.add('open');

                // Store the selected background in localStorage
                localStorage.setItem('selectedBackground', JSON.stringify(background.name));

                // Add event listener to the continue button
                const continueButton = modal.querySelector('#continue-button');
                continueButton.addEventListener('click', () => {
                    window.location.href = 'feat.html';
                });
            });

            // Add event listener to close modal
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        });
    });
})
.catch(error => console.error('Error:', error));