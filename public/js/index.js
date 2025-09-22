

// utils
import { Debouncer } from "./classes/models/utils/Debouncer.js";

// composants
import { AgendaWeekView } from "./classes/components/agenda/agenda_week/AgendaWeekView.js";
import { AgendaNavView } from "./classes/components/agenda/agenda_week/AgendaNavView.js";
import { AgendaParamsView } from "./classes/components/agenda/agenda_week/AgendaParamsView.js";
import { AgendaCalendarView } from "./classes/components/agenda/agenda_week/AgendaCalendarView.js";
import { YearView } from "./classes/components/agenda/agenda_year/YearView.js";
import { PlanningView } from "./classes/components/agenda/agenda_planning/PlanningView.js";
import { MiseAJourAuth } from "./classes/components/MiseAJourAuth.js";
import { ProfilFormView } from "./classes/components/ProfilFormView.js";
import { AddModelView } from "./classes/components/agenda/agenda_week/AddModelView.js";
import { FocusModalView } from "./classes/components/agenda/agenda_week/FocusModelView.js";
import { DayOffView } from "./classes/components/home/DayOffView.js";
import { ProjetsView } from "./classes/components/home/ProjetsView.js";
import { EnglishView } from "./classes/components/home/EnglishView.js";

// services
import { UserServices } from "./classes/services/UserServices.js";
import { TaskServices } from "./classes/services/TaskServices.js";
import { AuthServices } from "./classes/services/AuthServices.js";
import { BirthDaysServices } from "./classes/services/BirthDaysServices.js";
import { SpaceRepService } from "./classes/services/SpaceRepService.js";
import { VocabularyService } from "./classes/services/VocabularyService.js";

// core
import { NavHighLighter } from "./classes/core/NavHighLighter.js";
import { NavigationManager } from "./classes/core/NavigationManager.js";
import { NavigationEventBinder } from "./classes/core/NavigationEventBinder.js";
import { SEOManager } from "./classes/core/SEOManager.js";

// models
import { AuthModel } from "./classes/models/AuthModel.js";
import { PlanningModel } from "./classes/models/agenda/PlanningModel.js";
import { AgendaYear } from "./classes/models/AgendaYear.js";
import { TaskModel } from "./classes/models/agenda/TaskModel.js";
import { DateModel } from "./classes/models/agenda/DateModel.js";
import { BankHolidaysModel } from "./classes/models/agenda/BankHolidaysModel.js";
import { BirthDaysModel } from "./classes/models/agenda/BirthDaysModel.js";
import { CalendarModel } from "./classes/models/agenda/CalendarModel.js";
import { DateNavigationModel } from "./classes/models/agenda/DateNavigationModel.js";
import { UserModel } from "./classes/models/agenda/UserModel.js";
import { ModalModel } from "./classes/models/agenda/ModalModel.js";
import { VocabularyModel } from "./classes/models/vocabulary/vocabularyModel.js";

// views
import { HomeView } from "./classes/views/HomeView.js";
import { AuthView } from "./classes/views/AuthView.js";
import { AgendaView } from "./classes/views/AgendaView.js";
import { ProfilView } from "./classes/views/ProfilView.js";
import { VocabularyView } from "./classes/views/VocabularyView.js";

// ctrls
import { HomeCtrl } from "/public/js/classes/controllers/HomeCtrl.js";
import { AuthCtrl } from "./classes/controllers/AuthCtrl.js";
import { AgendaCtrl } from "./classes/controllers/AgendaCtrl.js";
import { HeaderCtrl } from "./classes/controllers/HeaderCtrl.js";
import { ProfilCtrl } from "./classes/controllers/ProfilCtrl.js";
import { VocabularyCtrl } from "./classes/controllers/VocabularyCtrl.js";

// eventBinder
import { HomeEventBinder } from "./classes/eventBinders/homeEventBinder.js";
import { AuthEventBinder } from "./classes/eventBinders/AuthEventBinder.js";
import { AgendaEventBinder } from "./classes/eventBinders/agenda/AgendaEventBinder.js";
import { AgendaWeekEventBinder } from "./classes/eventBinders/agenda/AgendaWeekEventBinder.js";
import { AgendaYearEventBinder } from "./classes/eventBinders/agenda/AgendaYearEventBinder.js";
import { AgendaPlanningEventBinder } from "./classes/eventBinders/agenda/AgendaPlanningEventBinder.js";
import { HeaderEventBinder } from "./classes/eventBinders/HeaderEventBinder.js";
import { ProfilEventBinder } from "./classes/eventBinders/ProfilEventBinder.js";
import { VocabularyEventBinder } from "./classes/eventBinders/vocabulary/VocabularyEventBinder.js";

// utils instance
const debouncer = new Debouncer(300);

// services instances
const seoManager = new SEOManager();
const userServices = new UserServices();
const authServices = new AuthServices(userServices);
const taskServices = new TaskServices();
const birthDaysServices = new BirthDaysServices();
const spaceRepService = new SpaceRepService();
const vocabularyService = new VocabularyService();

// models instances
const dateModel = new DateModel();
const taskModel = new TaskModel(dateModel, taskServices);
const bankHolidaysModel = new BankHolidaysModel();
const birthDaysModel = new BirthDaysModel(birthDaysServices);
const calendarModel = new CalendarModel(dateModel, authServices, bankHolidaysModel);
const dateNavigationModel = new DateNavigationModel(dateModel);
const userModel = new UserModel(userServices, dateModel);
const planningModel = new PlanningModel(dateModel);
const modalModel = new ModalModel();
const vocabularyModel = new VocabularyModel(vocabularyService);

// components instances

const addModelView = new AddModelView();
const focusModalView = new FocusModalView(dateModel);

const miseAJourAuth = new MiseAJourAuth(authServices);
miseAJourAuth.init();

const headerEventBinder = new HeaderEventBinder(userServices, miseAJourAuth);
const headerCtrl = new HeaderCtrl(headerEventBinder);
headerCtrl.init();

// home instance
const dayOffView = new DayOffView(dateModel);
const projetsView = new ProjetsView();
const englishView = new EnglishView();
const homeView = new HomeView();
const homeViews = Object.freeze({
    homeView: homeView,
    dayOffView: dayOffView,
    projetsView: projetsView,
    englishView: englishView
});
const homeModels = Object.freeze({
    dateModel: dateModel,
    taskModel: taskModel,
    vocabularyModel: vocabularyModel
})
const homeEventBinder = new HomeEventBinder();
const homeCtrl = new HomeCtrl({ homeViews, homeModels }, seoManager, homeEventBinder, taskServices);

const authView = new AuthView();
const authModel = new AuthModel(userServices);
const authEventBinder = new AuthEventBinder(authView);
const authCtrl = new AuthCtrl(authView, seoManager, authEventBinder, authModel, authServices, miseAJourAuth);

const agendaView = new AgendaView();
const agendaWeekView = new AgendaWeekView();
const agendaNavView = new AgendaNavView(dateModel);
const agendaParamsView = new AgendaParamsView();
const agendaCalendarView = new AgendaCalendarView(dateModel);


const yearView = new YearView();
const planningView = new PlanningView(dateModel);

// eventBinders instances
const agendaEventBinder = new AgendaEventBinder();
const agendaWeekEventBinder = new AgendaWeekEventBinder();
const agendaYearEventBinder = new AgendaYearEventBinder();
const agendaPlanningEventBinder = new AgendaPlanningEventBinder();
const vocabularyEventBinder = new VocabularyEventBinder();

// AGENDA CTRL
// création d'objets pour ne pas encombrer le constructeur
const agendaViews = Object.freeze({
    agendaView: agendaView,
    agendaWeekView: agendaWeekView,
    agendaNavView: agendaNavView,
    agendaParamsView: agendaParamsView,
    agendaCalendarView: agendaCalendarView,
    yearView: yearView,
    planningView: planningView,
    addModelView: addModelView,
    focusModalView: focusModalView
});

const agendaModels = Object.freeze({
    dateModel: dateModel,
    taskModel: taskModel,
    bankHolidaysModel: bankHolidaysModel,
    birthDaysModel: birthDaysModel,
    calendarModel: calendarModel,
    dateNavigationModel: dateNavigationModel,
    userModel: userModel,
    planningModel: planningModel,
    modalModel: modalModel
});

const agendaServices = Object.freeze({
    authServices: authServices,
    taskServices: taskServices,
    birthDaysServices: birthDaysServices,
    spaceRepService: spaceRepService
});

const agendaEventBinders = Object.freeze({
    agendaEventBinder: agendaEventBinder,
    agendaWeekEventBinder: agendaWeekEventBinder,
    agendaYearEventBinder: agendaYearEventBinder,
    agendaPlanningEventBinder: agendaPlanningEventBinder
})

const agendaCtrl = new AgendaCtrl(seoManager, { agendaViews, agendaModels, agendaServices, agendaEventBinders });

const profilView = new ProfilView();
const profilFormView = new ProfilFormView();
const profilEventBinder = new ProfilEventBinder(profilView);
const profilCtrl = new ProfilCtrl(profilView, seoManager, profilEventBinder, authServices, miseAJourAuth, profilFormView, birthDaysServices);

// petit programme pour ajouter du vocabulaire
import { data } from "./data/vocabulary/vocabulary.js"
import { AddVocabulary } from "./AddVocabulary.js";
const addVocabulary = new AddVocabulary();
addVocabulary.init(data);
// vocabulary instances
const vocabularyView = new VocabularyView();

const vocabularyEventBinders = Object.freeze({
    vocabularyEventBinder: vocabularyEventBinder
});
const vocabularyCtrl = new VocabularyCtrl(vocabularyView, { vocabularyEventBinders }, vocabularyService, vocabularyModel, seoManager, debouncer);


const routes = {
    "home": homeCtrl,
    "auth": authCtrl,
    "agenda": agendaCtrl,
    "vocabulary": vocabularyCtrl,
    "profil": profilCtrl,
};

const navHighLighter = new NavHighLighter();
const navigationManager = new NavigationManager(routes, navHighLighter);
navigationManager.init();

const navigationEventBinder = new NavigationEventBinder(navigationManager);
navigationEventBinder.bindClickLinks();



