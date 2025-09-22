export class ProjetsView {

    render(data) {
        const el = document.querySelector(".home__bodyContainer__left__projets__projetsContainer");
        if (el) {
            const ul = document.createElement("ul");
            ul.id = "todo";
            ul.className = "list";
            for (let i = 0; i < data.length; i++) {
                const li = document.createElement("li");
                li.setAttribute("data-id", data[i].id);
                li.textContent = `${data[i].sort_order} - ${data[i].name}`;
                ul.appendChild(li);
            }
            el.appendChild(ul);
        }
    }

    

}