export class VocabularyCtrl {

    constructor({vocabularyViews}, { vocabularyEventBinders }, vocabularyService, vocabularyModel, seoManager, debouncer,data) {
        this.view = vocabularyViews.vocabularyView;
        this.modalViews = vocabularyViews.modalViews;
        this.vocabularyService = vocabularyService;
        this.vocabularyModel = vocabularyModel;
        this.vocabularyEventBinder = vocabularyEventBinders.vocabularyEventBinder;
        this.seoManager = seoManager;
        this.debouncer = debouncer;
        this.data = data;

        this.vocabularyEventBinder.setController(this);
    }

    async show(family = "nature et environnement") {
        // si pas de vocabulaire, affichage réduit
        const isVocabulary = await this.vocabularyModel.isVocabulary();
        if (!isVocabulary) {
            this.view.render();
            this.view.render404();
            this.view.renderFilter404();
            this.seoManager.setTitle('Schedule - Vocabulary');
            this.vocabularyEventBinder.addEventListeners();
            return;
        }

        // main
        const vocabulary = await this.vocabularyModel.getVocabulary();
        const vocabularyByCategories = await this.vocabularyModel.getVocabularyByCategories();
        const vocabularyByFamily = await this.vocabularyModel.getVocabularyByFamily(family);
        const families = await this.vocabularyModel.getFamilies();

        const categories = await this.vocabularyModel.getCategories();
        const familyPercentil = await this.vocabularyModel.getFamiliesPercentils(family);
        this.view.render();
        this.view.renderVocabulary(vocabularyByFamily, categories, familyPercentil);
        const options = this.vocabularyModel.vocabularyOptions;
        this.view.renderFilter(families, options);

        this.seoManager.setTitle('Schedule - Vocabulary');
        this.vocabularyEventBinder.addEventListeners();
    }
}