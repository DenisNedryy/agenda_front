export class MoviesList {

    render(data) {
        const el = document.querySelector(".home__bodyContainer__right__movies__body");

        if (!el) return;

        el.innerHTML = "";

        const ul = document.createElement("ul");
        ul.className = "moviesList";


        data.forEach(movie => {

            const li = document.createElement("li");
            li.className = "moviesList__item";
            li.dataset.id = movie.id;

            li.innerHTML = `
                <span class="moviesList__name">${movie.name}</span>
            `;

            ul.appendChild(li);
        });

        el.appendChild(ul);
    }

}