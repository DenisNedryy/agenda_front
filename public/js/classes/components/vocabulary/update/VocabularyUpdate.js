export class VocabularyUpdate {


    // update base
    renderUpdateVocabularyBase() {
        const el = document.querySelector(".vocabulary__content");
        if (el) {
            el.innerHTML = `
                    <form id="vocabularyUpdateModal">
                         <div class="vocabularyUpdateModal__family"></div>
                        <div class="vocabularyUpdateModal__category"></div>
                        <button type="submit">Submit</button>
                    </form>
                    <div class="vocabulary__content__updateArray"></div>  
            `;
        }
    }

    // update families
    renderUpdateVocabularyFamilies(families) {
        const el = document.querySelector(".vocabularyUpdateModal__family");
        if (el) {
            el.innerHTML = "";
            // family
            const fieldsetFamily = document.createElement("fieldset");
            fieldsetFamily.id = "fieldset-update-family";
            const familyLabel = document.createElement("label");
            familyLabel.textContent = "Family";
            fieldsetFamily.appendChild(familyLabel);
            const familySelect = document.createElement("select");
            familySelect.id = "familyUpdateSelect";
            familySelect.name = "family";
            families.forEach((family) => {
                const option = document.createElement("option");
                option.value = family;
                option.textContent = family;
                familySelect.appendChild(option);
            });
            fieldsetFamily.appendChild(familySelect);
            el.appendChild(fieldsetFamily);
        }
    }

    // update categories
    renderUpdateVocabularyCategories(categories) {
        const el = document.querySelector(".vocabularyUpdateModal__category");
        if (el) {
            el.innerHTML = "";
            // category
            const fieldsetCategory = document.createElement("fieldset");
            fieldsetCategory.id = "fieldset-update-category";
            const categoryLabel = document.createElement("label");
            categoryLabel.textContent = "Category";
            fieldsetCategory.appendChild(categoryLabel);
            const categorySelect = document.createElement("select");
            categorySelect.id = "categoryUpdateSelect";
            categorySelect.name = "category";
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
            fieldsetCategory.appendChild(categorySelect);
            el.appendChild(fieldsetCategory);
        }
    }

    // update liste de vocabulaire
    renderVocabularyUpdateArray(vocabularies) {
        const el = document.querySelector(".vocabulary__content__updateArray");
        if (el) {
            el.innerHTML = "";
            el.innerHTML = `
                                <div class="deleteFamilyOrCategoryButtons">
                        <button class="btn-delete-family" data-family="${vocabularies[0].family}">Delete family</button>
                        <button class="btn-delete-category" data-family="${vocabularies[0].family}" data-category="${vocabularies[0].category}">Delete category</button>
                    </div>
            `;
            const container = document.createElement("div");
            container.className = "vocabulary__content__updateArray__container";

            const header = document.createElement("div");
            header.className = "vocabulary__content__updateArray__container__header";
            const nameFrKey = document.createElement("p");
            nameFrKey.textContent = "Name fr";
            header.appendChild(nameFrKey);
            const nameUkKey = document.createElement("p");
            nameUkKey.textContent = "Name uk";
            header.appendChild(nameUkKey);
            const deleteKey = document.createElement("p");
            deleteKey.textContent = "Delete";
            header.appendChild(deleteKey);
            container.appendChild(header);

            const body = document.createElement("ul");
            body.className = "vocabulary__content__updateArray__container__body";
            let cpt = 0;
            vocabularies.forEach((vocabulary) => {

                const vocLine = document.createElement("li");
                vocLine.setAttribute("data-id", vocabulary.uuid);
                vocLine.className = "vocabulary__content__updateArray__container__body__vocLine fade-in";
                const nameFrColumn = document.createElement("p");
                nameFrColumn.className = "vocabulary__content__updateArray__container__body__vocLine--fr";
                nameFrColumn.textContent = vocabulary.frName;
                vocLine.appendChild(nameFrColumn);
                const nameUkColumn = document.createElement("p");
                nameUkColumn.className = "vocabulary__content__updateArray__container__body__vocLine--uk";
                nameUkColumn.textContent = vocabulary.ukName;
                vocLine.appendChild(nameUkColumn);
                const btnDelete = document.createElement("button");
                btnDelete.className = "btn-delete-vocabulary-line";
                btnDelete.textContent = "Delete";
                vocLine.appendChild(btnDelete);
                setTimeout(() => {
                    body.appendChild(vocLine);
                }, cpt);
                cpt += 70;

            });
            container.appendChild(body);
            el.appendChild(container);
        }
    }
}