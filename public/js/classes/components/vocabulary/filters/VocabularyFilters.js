export class VocabularyFilters {

    // right filters menu including families (prob % en vocabulary/tags/families) 
    renderFilter(data, options) {
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

            // btn add voc
            const btnAddVoc = document.createElement("button");
            btnAddVoc.className = "btn-mini-white addVocabulary";
            btnAddVoc.textContent = "Add vocabulary";
            addVoc.appendChild(btnAddVoc);

            // btn update voc
            const btnUpdateVoc = document.createElement("button");
            btnUpdateVoc.className = "btn-mini-white updateVocabulary";
            btnUpdateVoc.textContent = "Update vocabulary";
            addVoc.appendChild(btnUpdateVoc);

            el.appendChild(addVoc);

            // tags
            const tags = document.createElement("div");
            tags.className = "vocabulary__tags";
            const titleTags = document.createElement("p");
            titleTags.textContent = "Tags";
            tags.appendChild(titleTags);
            // tags-swap-lg
            const frToUk = document.createElement("button");
            frToUk.className = "btn-mini-white switch-lg";
            frToUk.textContent = `${options.isFrToUk ? 'fr to uk' : 'uk to fr'}`;
            tags.appendChild(frToUk);
            // tags-sounds
            const btnSound = document.createElement("button");
            btnSound.className = `btn-mini-white toggle-sounds ${options.isSounds ? "bgGreen" : "bgRed"}`;
            btnSound.textContent = `${options.isSounds ? 'sounds-on' : 'sounds-off'}`;
            tags.appendChild(btnSound);
            el.appendChild(tags);
            // families
            const families = document.createElement("div");
            families.className = "vocabulary__families";
            const titleFamilies = document.createElement("p");
            titleFamilies.textContent = "Families";
            families.appendChild(titleFamilies);
            for (let i = 0; i < data.length; i++) {
                const btn = document.createElement("button");
                btn.className = "btn-mini-white";
                btn.setAttribute("data-name", data[i]);
                btn.textContent = data[i];
                families.appendChild(btn);
            }

            el.appendChild(families);
        }
    }
}