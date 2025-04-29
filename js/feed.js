document.addEventListener("DOMContentLoaded", () => {
    fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
        .then(res => res.json())
        .then(joke => {
            addJoke(joke)
        });
});

function addJoke(joke) {
    const container = document.getElementById("joke-container");
    container.innerHTML = "";
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
    container.appendChild(bloc);
}