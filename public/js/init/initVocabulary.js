import { data } from "../data/vocabulary/vocabulary.js";
import { VocabularyAddView } from "../classes/components/vocabulary/add/VocabularyAddView.js";
import { Vocabulary404 } from "../classes/components/vocabulary/404/Vocabulary404.js";
import { VocabularyUpdate } from "../classes/components/vocabulary/update/VocabularyUpdate.js";
import { VocabularyCategory } from "../classes/components/vocabulary/category/VocabularyCategory.js";
import { VocabularyFamilyAndCategories } from "../classes/components/vocabulary/familyAndCategories/VocabularyFamilyAndCategories.js";
import { VocabularyFilters } from "../classes/components/vocabulary/filters/VocabularyFilters.js";
import { VocabularyEventBinder } from "../classes/eventBinders/vocabulary/VocabularyEventBinder.js";
import { VocabularyView } from "../classes/views/VocabularyView.js";
import { VocabularyService } from "../classes/services/VocabularyService.js";
import { VocabularyCtrl } from "../classes/controllers/VocabularyCtrl.js";
import { Debouncer } from "../classes/models/utils/Debouncer.js";
import { VocabularyModel } from "../classes/models/vocabulary/vocabularyModel.js";

export function initVocabulary(seoManager) {

    const vocabularyAddView = new VocabularyAddView();
    const vocabulary404 = new Vocabulary404();
    const vocabularyUpdate = new VocabularyUpdate();
    const vocabularyCategory = new VocabularyCategory();
    const vocabularyFamilyAndCategories = new VocabularyFamilyAndCategories();
    const vocabularyFilters = new VocabularyFilters();
    const vocabularyEventBinder = new VocabularyEventBinder();
    const vocabularyView = new VocabularyView();
    const vocabularyService = new VocabularyService();
    const vocabularyModel = new VocabularyModel(vocabularyService);
    const debouncer = new Debouncer(300);

    const vocabularyEventBinders = Object.freeze({
        vocabularyEventBinder: vocabularyEventBinder
    });

    const vocabularyViews = Object.freeze({
        vocabularyView: vocabularyView,
        vocabularyAddView: vocabularyAddView,
        vocabulary404: vocabulary404,
        vocabularyUpdate: vocabularyUpdate,
        vocabularyCategory: vocabularyCategory,
        vocabularyFamilyAndCategories: vocabularyFamilyAndCategories,
        vocabularyFilters: vocabularyFilters
    });

    const vocabularyCtrl = new VocabularyCtrl({ vocabularyViews }, { vocabularyEventBinders }, vocabularyService, vocabularyModel, seoManager, debouncer, data);

    return vocabularyCtrl;

}