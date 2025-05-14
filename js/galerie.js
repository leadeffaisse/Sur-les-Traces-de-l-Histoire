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

function addMemeToGallery(url, title = "") {
    const container = document.getElementById("galerie");
    const memeCard = document.createElement("div");
    memeCard.className = "meme-card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = title;

    const h3 = document.createElement("h3");
    h3.textContent = title || "Sans titre";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.onclick = () => memeCard.remove();

    memeCard.appendChild(img);
    memeCard.appendChild(h3);
    memeCard.appendChild(deleteBtn);
    container.appendChild(memeCard);
};

function addCustomMeme(event) {
    event.preventDefault();
    const url = document.getElementById("customUrl").value;
    const title = document.getElementById("customTitle").value;
    const fileInput = document.getElementById("customFile");
    const file = fileInput.files[0];

    if (url) {
        addMemeToGallery(url, title);
    } else if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addMemeToGallery(e.target.result, title);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Veuillez entrer une URL ou un fichier image.");
    }
    event.target.reset();
};