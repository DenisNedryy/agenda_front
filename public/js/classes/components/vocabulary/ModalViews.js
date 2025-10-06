export class ModalViews {

    renderModalContainer() {
        const el = document.querySelector(".vocabulary__content");
        if (el) {
            el.innerHTML = `
            <div class="modalViewContainer">
                <div class="modalViewContainer__header"></div>
                <div class="modalViewContainer__body">
                    <div class="modalViewContainer__body__family"></div>
                </div>
                <div class="modalViewContainer__footer"></div>
            </div>
            `;
        }
    }

    renderBodyFamilyForm() {
        const el = document.querySelector(".modalViewContainer__body__family");
        if (el) {
            el.innerHTML = `
                    <form id="vocabularyAddModal">
                         <div class="vocabularyAddModal__family"></div>
                        <div class="vocabularyAddModal__category"></div>
                        <button type="submit">Submit</button>
                    </form>
            `;
        }
    }

    renderVocabularyForm(options, length = 0) {
        const el = document.querySelector(".modalViewContainer__body__family");
        if (el) {
            el.innerHTML = `
            <div class="modalViewContainer__body__family__keys">
                 <p>Family</p>
                 <p>Category</p> 
                 <p>Length</p>
            </div>
            <div class="modalViewContainer__body__family__values">
                 <p>${options.family}</p>
                 <p>${options.category}</p>
                 <p>${length}</p>
            </div>
            <div class="vocabulary-add-container">
                <p>Add a word</p>
                <form>
                      <div>
                         <label>Word in French</label>
                         <input type="text" name="name-fr"/>
                     </div>
                     <div>
                          <label>Word in English</label>
                          <input type="text" name="name-uk"/>
                      </div>
                      <div class="btn-container">
                        <button class="btn-vocabulary-add" type="button">Ajouter</button><button class="btn-vocabulary-close" type="button">Terminer</button>
                      </div>
                </form>
            </div>
            `;
        }
    }

    renderSelectFamilies(families, isNewFamily) {
        const el = document.querySelector(".vocabularyAddModal__family");
        if (el) {
            el.innerHTML = "";
            const fieldset = document.createElement("fieldset");
            fieldset.id = "fieldset-family";
            const familyLabel = document.createElement("label");
            familyLabel.textContent = "Family";
            fieldset.appendChild(familyLabel);
            if (!isNewFamily) {
                const familySelect = document.createElement("select");
                familySelect.id = "familySelect";
                familySelect.name = "family";
                families.forEach((family) => {
                    const option = document.createElement("option");
                    option.value = family;
                    option.textContent = family;
                    familySelect.appendChild(option);
                });
                fieldset.appendChild(familySelect);
            } else {
                const familyInput = document.createElement("input");
                familyInput.name = "family";
                familyInput.className = "familyInput";
                fieldset.appendChild(familyInput);
            }
            const familyLink = document.createElement("p");
            familyLink.className = "familyLink";
            familyLink.textContent = `${isNewFamily ? "+ Old families" : "+ New family"}`;
            fieldset.appendChild(familyLink);
            el.appendChild(fieldset);
        }
    }

    renderSelectCategories(categories, isNewCategory) {
        const el = document.querySelector(".vocabularyAddModal__category");
        if (el) {
            el.innerHTML = "";
            const fieldset = document.createElement("fieldset");
            fieldset.id = "fieldset-category";
            const categoryLabel = document.createElement("label");
            categoryLabel.textContent = "Category";
            fieldset.appendChild(categoryLabel);

            if (isNewCategory) {
                const cateoryDataList = document.createElement("datalist");
                cateoryDataList.id = "old-categories-dataList";
                categories.forEach((category) => {
                    const option = document.createElement("option");
                    option.value = category;
                    option.textContent = category;
                    cateoryDataList.appendChild(option);
                });
                fieldset.appendChild(cateoryDataList);

                const categoryInput = document.createElement("input");
                categoryInput.name = "category";
                categoryInput.setAttribute("list", "old-categories");
                fieldset.appendChild(categoryInput);
            } else {
                const cateorySelect = document.createElement("select");
                cateorySelect.id = "old-categories";
                cateorySelect.name = "category";
                categories.forEach((category) => {
                    const option = document.createElement("option");
                    option.value = category;
                    option.textContent = category;
                    cateorySelect.appendChild(option);
                });
                fieldset.appendChild(cateorySelect);
            }
            const categoryLink = document.createElement("p");
            categoryLink.className = "categoryLink";
            categoryLink.textContent = `${isNewCategory ? "+ Old Categories" : "+ New category"}`;
            fieldset.appendChild(categoryLink);


            if (isNewCategory) {
                const img = document.createElement("input");
                img.type = "file";
                img.name = "img";
                fieldset.appendChild(img);
            }

            el.appendChild(fieldset);

        }
    }

}