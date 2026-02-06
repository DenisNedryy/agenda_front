import { DepenseCtrl } from "../../js/classes/controllers/DepenseCtrl.js";
import { DepenseEventBinder } from "../classes/eventBinders/depense/DepenseEventBinder.js";
import { DepenseView } from "../classes/views/DepenseView.js";
import { Depense_form } from "../classes/components/depenses/forms/Depense_form.js";
import { Salaire_form } from "../classes/components/depenses/forms/Salaire_form.js";
import { DepenseService } from "../classes/services/DepenseService.js";



export function initDepense(seoManager) {

    const depenseEventBinder = new DepenseEventBinder();
    const depenseView = new DepenseView();
    const depense_form = new Depense_form();
    const salaire_form = new Salaire_form();
    const depenseService = new DepenseService();

    const eventBinders = Object.freeze({
        baseEB: depenseEventBinder
    });

    const views = Object.freeze({
        depenseView: depenseView,
        salaireForm: salaire_form,
        depenseForm: depense_form
    });

    const services = Object.freeze({
        depenseService: depenseService
    })

    const homeCtrl = new DepenseCtrl({ eventBinders, views, services }, seoManager);

    return homeCtrl;

}