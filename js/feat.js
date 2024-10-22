fetch('https://api.open5e.com/v2/feats/')
    .then(response => response.json())
    .then(data => {
        const featList = data.results;
        const cardContainer = document.getElementById('card-container');
        const modal = document.getElementById('modal');

        featList.forEach(feat => {
            console.log(feat);
            const card = document.createElement('div');
            card.classList.add('feat-card');
            card.innerHTML = `
                <h2>${feat.name}</h2>
                `;
            cardContainer.appendChild(card);

            // Add event listener to toggle description visibility
            card.addEventListener('click', () => {
                modal.innerHTML = `
                <div>
                    <h2>${feat.name}</h2>
                    <p>Description</p><p>${feat.benefits.map(benefit => `<li>${benefit.desc}</li>`).join('')}</p>
                    <button id="continue-button">Continue</button>
                </div>
                `;
                modal.classList.add('open');

                // Store the selected feat in localStorage
                localStorage.setItem('selectedFeat', JSON.stringify(feat.name));

                // Add event listener to the continue button
                const continueButton = modal.querySelector('#continue-button');
                continueButton.addEventListener('click', () => {
                    window.location.href = 'character.html';
                });
            });

            // Add event listener to close modal
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        });
    })
    .catch(error => console.error('Error:', error));