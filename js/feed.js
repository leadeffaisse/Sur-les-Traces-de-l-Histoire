document.addEventListener("DOMContentLoaded", () => {
    requestJoke();

    const refreshIcon = document.getElementById("refresh");
    refreshIcon.addEventListener("click", () => {
        requestJoke();
    });
});

function requestJoke() {
    const container = document.getElementById("joke-container");
    container.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
            .then(res => res.json())
            .then(joke => {
                const bloc = addJoke(joke);
                container.appendChild(bloc);
            })
            .catch(err => console.error("Erreur dans la génération des blagues :", err));
    }
}

function addJoke(joke) {
    const bloc = document.createElement("div");
    bloc.className = "joke-box";

    if (joke.type === "twopart") {
        bloc.innerHTML = `
        <p class="setup">${joke.setup}</p>
        <p class="delivery">${joke.delivery}</p>
        `;
    } else {
        bloc.innerHTML = `<p class="single">${joke.joke}</p>`;
    }
    return bloc;
}