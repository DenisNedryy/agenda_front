import { HomeCtrl } from "../classes/controllers/HomeCtrl.js";
import { HomeView } from "../classes/views/HomeView.js";
import { DayOffView } from "../classes/components/home/DayOffView.js";
import { ProjetsView } from "../classes/components/home/ProjetsView.js";
import { EnglishView } from "../classes/components/home/EnglishView.js";
import { HomeEventBinder } from "../classes/eventBinders/homeEventBinder.js";
import { DateModel } from "../classes/models/agenda/DateModel.js";
import { TaskModel } from "../classes/models/agenda/TaskModel.js";
import { TaskServices } from "../classes/services/TaskServices.js";
import { VocabularyModel } from "../classes/models/vocabulary/vocabularyModel.js";
import { VocabularyService } from "../classes/services/VocabularyService.js";
import { WeekEndService } from "../classes/services/WeekEndService.js";
import { WeekEndModel } from "../classes/models/agenda/WeekEndModel.js";

export function initHome(seoManager) {

    const dateModel = new DateModel();
    const dayOffView = new DayOffView(dateModel);
    const projetsView = new ProjetsView();
    const englishView = new EnglishView();
    const homeView = new HomeView();
    const taskServices = new TaskServices();
    const homeEventBinder = new HomeEventBinder();
    const vocabularyService = new VocabularyService();
    const vocabularyModel = new VocabularyModel(vocabularyService);
    const taskModel = new TaskModel(dateModel, taskServices);
    const weekEndService = new WeekEndService();
    const weekEndModel = new WeekEndModel(weekEndService);

    const homeViews = Object.freeze({
        homeView: homeView,
        dayOffView: dayOffView,
        projetsView: projetsView,
        englishView: englishView
    });

    const homeModels = Object.freeze({
        dateModel: dateModel,
        taskModel: taskModel,
        vocabularyModel: vocabularyModel,
        weekEndModel:weekEndModel
    });

    const homeCtrl = new HomeCtrl({ homeViews, homeModels }, seoManager, homeEventBinder, taskServices);

    return homeCtrl;

}