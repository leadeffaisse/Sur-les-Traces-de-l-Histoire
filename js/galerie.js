document.addEventListener("DOMContentLoaded", () => {
    getMeme();
});

let currentColumns = 3;

function setColumns(count) {
    currentColumns = count;
    const container = document.getElementById("galerie");
    container.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
}

function getMeme() {
    const container = document.getElementById("galerie");
    container.innerHTML = "";
    setColumns(currentColumns);

    for (let i = 0; i < 9; i++) {
        fetch("https://meme-api.com/gimme")
            .then(res => res.json())
            .then(meme => {
                const memeCard = document.createElement("div");
                memeCard.className = "meme-card";
                memeCard.innerHTML = `
            <h3>${meme.title}</h3>
            <img src="${meme.url}" alt="${meme.title}">
        `;
                container.appendChild(memeCard);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du meme :", error);
            });
    }
}