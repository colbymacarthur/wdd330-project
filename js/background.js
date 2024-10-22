fetch('https://www.dnd5eapi.co/api/feats/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));