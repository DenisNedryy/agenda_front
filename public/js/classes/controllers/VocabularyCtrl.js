export class VocabularyCtrl {

    constructor({ vocabularyViews }, { vocabularyEventBinders }, vocabularyService, vocabularyModel, seoManager, debouncer, data) {
        this.view = vocabularyViews.vocabularyView;
        this.vocabularyAddView = vocabularyViews.vocabularyAddView;
        this.vocabulary404 = vocabularyViews.vocabulary404;
        this.vocabularyUpdate = vocabularyViews.vocabularyUpdate; 
        this.vocabularyCategory = vocabularyViews.vocabularyCategory;
        this.vocabularyFamilyAndCategories = vocabularyViews.vocabularyFamilyAndCategories;
        this.vocabularyFilters = vocabularyViews.vocabularyFilters;
        this.vocabularyService = vocabularyService;
        this.vocabularyModel = vocabularyModel;
        this.vocabularyEventBinder = vocabularyEventBinders.vocabularyEventBinder;
        this.seoManager = seoManager;
        this.debouncer = debouncer; 
        this.data = data;

        this.vocabularyEventBinder.setController(this);
    }

    async show(family = null) {
        // si pas de vocabulaire, affichage réduit
        const isVocabulary = await this.vocabularyModel.isVocabulary();
        if (!isVocabulary) {
            this.view.render();
            this.vocabulary404.render404();
            this.vocabulary404.renderFilter404();
            this.seoManager.setTitle('Schedule - Vocabulary');
            this.vocabularyEventBinder.addEventListeners();
            return;
        }

        // main
        if (!family) {
            // mettre la première de la liste
            const families = await this.vocabularyModel.getFamilies();
            family = families[0];
        }
        const vocabulary = await this.vocabularyModel.getVocabulary();
        const vocabularyByCategories = await this.vocabularyModel.getVocabularyByCategories();
        const vocabularyByFamily = await this.vocabularyModel.getVocabularyByFamily(family);
        const families = await this.vocabularyModel.getFamilies();

        const categories = await this.vocabularyModel.getCategories();
        const familyPercentil = await this.vocabularyModel.getFamiliesPercentils(family);
        this.view.render();
        this.vocabularyFamilyAndCategories.renderVocabulary(vocabularyByFamily, categories, familyPercentil);
        const options = this.vocabularyModel.vocabularyOptions;
        this.vocabularyFilters.renderFilter(families, options);

        this.seoManager.setTitle('Schedule - Vocabulary');
        this.vocabularyEventBinder.addEventListeners();
    }
}