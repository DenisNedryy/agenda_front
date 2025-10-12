export class Vocabulary404 { 


    // si pas de vocabulaire => affiche la carte
    render404() {
        const el = document.querySelector(".vocabulary__content");
        if (el) {
            el.innerHTML = `<div class="englandMap404Container">
                                <img class="englendMap404" src="/public/assets/images/map/uk404.png" />
                             </div>`;
        }
    }

    // si pas de vocabulaire => affiche filters réduits
    renderFilter404() {
        const el = document.querySelector(".vocabulary__content__right__body");
        if (el) {
            el.innerHTML = "";
            // addVocabulary
            const addVoc = document.createElement("div");
            addVoc.className = "vocabulary__add";
            const titleAddVoc = document.createElement("p");
            titleAddVoc.textContent = "Vocabulary";
            addVoc.appendChild(titleAddVoc);
            // btn base
            const addBase = document.createElement("button");
            addBase.className = "btn-mini-white addBaseVocabulary";
            addBase.textContent = "Add basic vocabulary";
            addVoc.appendChild(addBase);
            el.appendChild(addVoc);
        }
    }
}