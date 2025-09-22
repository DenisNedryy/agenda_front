export class VocabularyEventBinder {

    constructor() {

        this.boundHandleClick = this.handleClick.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClick);
        document.addEventListener('click', this.boundHandleClick);
    }

    async handleClick(e) {

        // family
        const familyContainer = e.target.closest(".vocabulary__families");
        if (familyContainer && e.target.classList.contains("btn-mini")) {
            const family = e.target.getAttribute("data-name");
            this.controller.vocabularyModel.end();
            this.controller.show(family);
        }

        // category
        const fiche = e.target.closest(".vocFiche");
        if (fiche) {
            this.controller.vocabularyModel.end();
            const category = fiche.getAttribute("data-name");
            const oneVocabularyCategory = await this.controller.vocabularyModel.getOneVocabularyCategory(category);
            const options = this.controller.vocabularyModel.vocabularyOptions;
            this.controller.view.renderCategory(oneVocabularyCategory, { options });
        }

        // traduction
        const flashCard = e.target.closest(".category__body");
        if (flashCard) {
            this.controller.vocabularyModel.openTraduction();
            const category = e.target.closest(".vocabulary__content").getAttribute("data-category");
            const oneVocabularyCategory = await this.controller.vocabularyModel.getOneVocabularyCategory(category);
            const options = this.controller.vocabularyModel.vocabularyOptions;
            this.controller.view.renderCategory(oneVocabularyCategory, { options });
            const isEnglishMode = this.controller.vocabularyModel.vocabularyOptions.isFrToUk;
            if (isEnglishMode) {
                const text = oneVocabularyCategory[this.controller.vocabularyModel.vocabularyOptions.index].ukName;
                this.controller.debouncer.execute(() => {
                    this.controller.vocabularyModel.speak(text);
                })

            }
        }

        // next
        const btnFlashCard = e.target.closest(".btn-flashCard");
        if (btnFlashCard) {
            const category = e.target.closest(".vocabulary__content").getAttribute("data-category");
            const oneVocabularyCategory = await this.controller.vocabularyModel.getOneVocabularyCategory(category);
            const index = this.controller.vocabularyModel.vocabularyOptions.index;
            if (index + 1 === oneVocabularyCategory.length) {
                const answer = btnFlashCard.classList.contains("btn-flashCard-yes") ? true : false;
                this.controller.vocabularyModel.pushVocabularySession(answer, oneVocabularyCategory[index]);
                this.controller.vocabularyModel.next();
                await this.controller.vocabularyModel.updateategoryPertencil(category);
                this.controller.vocabularyModel.end();
                this.controller.show();
                return;
            }
            const answer = btnFlashCard.classList.contains("btn-flashCard-yes") ? true : false;
            this.controller.vocabularyModel.pushVocabularySession(answer, oneVocabularyCategory[index]);
            this.controller.vocabularyModel.next();
            const options = this.controller.vocabularyModel.vocabularyOptions;
            this.controller.view.renderCategory(oneVocabularyCategory, { options });
        }

        // switch language
        const btnLg = e.target.classList.contains("switch-lg");
        if (btnLg) {
            this.controller.vocabularyModel.switchLanguage();
            const families = await this.controller.vocabularyModel.getFamilies();
            const options = this.controller.vocabularyModel.vocabularyOptions;
            this.controller.view.renderFilter(families, options);
            const category = document.querySelector(".vocabulary__content").getAttribute("data-category");
            const oneVocabularyCategory = await this.controller.vocabularyModel.getOneVocabularyCategory(category);
            this.controller.view.renderCategory(oneVocabularyCategory, { options });
        }

    }

}