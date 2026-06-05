import { HomeCtrl } from "../classes/controllers/HomeCtrl.js";
import { HomeView } from "../classes/views/HomeView.js";
import { DayOffView } from "../classes/components/home/DayOffView.js";
import { ProjetsView } from "../classes/components/home/ProjetsView.js";
import { EnglishView } from "../classes/components/home/EnglishView.js";
import { HomeEventBinder } from "../classes/eventBinders/homeEventBinder.js";
import { DateModel } from "../classes/models/agenda/DateModel.js";
import { TaskModel } from "../classes/models/agenda/TaskModel.js";
import { TaskServices } from "../classes/services/TaskServices.js";
import { WeekEndService } from "../classes/services/WeekEndService.js";
import { WeekEndModel } from "../classes/models/agenda/WeekEndModel.js";
import { TodayList } from "../classes/components/home/TodayList.js";
import { MoviesList } from "../classes/components/home/MoviesList.js";
import { TasksManager } from "../classes/components/home/TasksManager.js";
import { DateNavigationModel } from "../classes/models/agenda/DateNavigationModel.js";

export function initHome(seoManager, actions = {}) {

    const dateModel = new DateModel();
    const dayOffView = new DayOffView(dateModel);
    const projetsView = new ProjetsView();
    const englishView = new EnglishView();
    const homeView = new HomeView();
    const taskServices = new TaskServices();
    const homeEventBinder = new HomeEventBinder();
    const taskModel = new TaskModel(dateModel, taskServices);
    const weekEndService = new WeekEndService();
    const weekEndModel = new WeekEndModel(weekEndService);
    const todayList = new TodayList();
    const moviesList = new MoviesList();
    const tasksManager = new TasksManager();
    const dateNavigationModel = new DateNavigationModel(dateModel);

    const homeViews = Object.freeze({
        homeView: homeView,
        dayOffView: dayOffView,
        projetsView: projetsView,
        englishView: englishView,
        todayList: todayList,
        moviesList: moviesList,
        tasksManager: tasksManager
    });

    const homeModels = Object.freeze({
        dateModel: dateModel,
        taskModel: taskModel,
        weekEndModel: weekEndModel,
        dateNavigationModel: dateNavigationModel
    });

    const homeCtrl = new HomeCtrl(
        { homeViews, homeModels },
        seoManager,
        homeEventBinder,
        taskServices
    );

    homeCtrl.actions = actions;

    return homeCtrl;

}