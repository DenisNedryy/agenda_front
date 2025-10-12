import { ProfilFormView } from "../classes/components/profil/ProfilFormView.js";
import { ProfilView } from "../classes/views/ProfilView.js";
import { ProfilCtrl } from "../classes/controllers/ProfilCtrl.js";
import { ProfilEventBinder } from "../classes/eventBinders/ProfilEventBinder.js";
import { MiseAJourAuth } from "../classes/components/MiseAJourAuth.js";
import { AuthServices } from "../classes/services/AuthServices.js";
import { UserServices } from "../classes/services/UserServices.js";
import { BirthDaysServices } from "../classes/services/BirthDaysServices.js";

export function initProfil(seoManager) {

    const birthDaysServices = new BirthDaysServices();
    const profilView = new ProfilView();
    const profilFormView = new ProfilFormView();
    const profilEventBinder = new ProfilEventBinder(profilView);
    const userServices = new UserServices();
    const authServices = new AuthServices(userServices);
    const miseAJourAuth = new MiseAJourAuth(authServices);
    const profilCtrl = new ProfilCtrl(profilView, seoManager, profilEventBinder, authServices, miseAJourAuth, profilFormView, birthDaysServices);

    return profilCtrl;
}