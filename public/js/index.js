// core
import { NavHighLighter } from "./classes/core/NavHighLighter.js";
import { NavigationManager } from "./classes/core/NavigationManager.js";
import { NavigationEventBinder } from "./classes/core/NavigationEventBinder.js";
import { SEOManager } from "./classes/core/SEOManager.js";
import { initHome } from "./init/initHome.js";
import { initAuth } from "./init/initAuth.js";
import { initAgenda } from "./init/initAgenda.js";
import { initVocabulary } from "./init/initVocabulary.js";
import { initProfil } from "./init/initProfil.js";
import { initDepense } from "./init/initDepense.js";

import { HeaderEventBinder } from "./classes/eventBinders/HeaderEventBinder.js";
import { HeaderCtrl } from "./classes/controllers/HeaderCtrl.js";
import { UserServices } from "./classes/services/UserServices.js";
import { MiseAJourAuth } from "./classes/components/MiseAJourAuth.js";
import { AuthServices } from "./classes/services/AuthServices.js";
import { TaskModel } from "./classes/models/agenda/TaskModel.js";
import { DateModel } from "./classes/models/agenda/DateModel.js";
import { TaskServices } from "./classes/services/TaskServices.js";
import { ModalView } from "./classes/views/ModalView.js";

const seoManager = new SEOManager();

// header instance
const dateModel = new DateModel();
const taskServices = new TaskServices();
const modalView = new ModalView();
const taskModel = new TaskModel(dateModel, taskServices);
const userServices = new UserServices();
const authServices = new AuthServices(userServices);
const miseAJourAuth = new MiseAJourAuth(authServices);
const headerEventBinder = new HeaderEventBinder(userServices, miseAJourAuth);
const agendaCtrl = initAgenda();
const headerCtrl = new HeaderCtrl(headerEventBinder, taskModel, modalView, agendaCtrl);
headerCtrl.init();

const routes = {
    "home": initHome(seoManager),
    "auth": initAuth(seoManager),
    "agenda": initAgenda(seoManager),
    "vocabulary": initVocabulary(seoManager),
    "profil": initProfil(seoManager),
    "depense": initDepense(seoManager)
};

const navHighLighter = new NavHighLighter();
const navigationManager = new NavigationManager(routes, navHighLighter);
navigationManager.init();

const navigationEventBinder = new NavigationEventBinder(navigationManager);
navigationEventBinder.bindClickLinks();



