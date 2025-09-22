export class VocabularyCtrl {

    constructor(view, { vocabularyEventBinders }, vocabularyService, vocabularyModel, seoManager,debouncer) {
        this.view = view;
        this.vocabularyService = vocabularyService;
        this.vocabularyModel = vocabularyModel;
        this.vocabularyEventBinder = vocabularyEventBinders.vocabularyEventBinder;
        this.seoManager = seoManager;
        this.debouncer = debouncer;

        this.vocabularyEventBinder.setController(this);
    }

    async show(family = "nature et environnement") {
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

        this.seoManager.setTitle('Ecorcerie Gestionnaire - Profil');
        this.vocabularyEventBinder.addEventListeners();
        this.vocabularyEventBinder.addEventListeners();
    }
}