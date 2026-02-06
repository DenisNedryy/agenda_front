export class DepenseCtrl {
    constructor({ eventBinders, views, services }, seoManager) {
        this.baseEB = eventBinders.baseEB;
        this.depenseView = views.depenseView;
        this.depenseForm = views.depenseForm;
        this.salaireForm = views.salaireForm;
        this.depenseService = services.depenseService;
        this.seoManager = seoManager;
        this.baseEB.setController(this);
    }

    async init() {
        this.baseEB.addEventListeners();
    }

    async show() {
        // calcul du 60/20/20
        const { salaire, depenses } = await this.getSalaireAndDepenses();
        const data = await this.get802020(salaire, depenses);
        this.depenseView.render(data);
        this.seoManager.setTitle('Schedule - Depense');
        this.baseEB.addEventListeners();
    };

    async getSalaireAndDepenses() {
        const salaireRes = await this.depenseService.getSalary();
        const salaire = salaireRes.data.data.montant_net;
        const depensesRes = await this.depenseService.getAll();
        const depenses = depensesRes.data.depenses;
        return { salaire, depenses };
    }

    async get802020(salaire, depenses) {
        const depensesDuMois = depenses.filter(dep => {
            const d = new Date(dep.created_at);
            const now = new Date();

            if (dep.is_automatique === 1) {
                return dep;
            } else {
                return (
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                );
            }
        });

        const needs = depensesDuMois.filter((cell) => cell.category === "besoins");
        const wants = depensesDuMois.filter((cell) => cell.category === "envies");

        const needsPer = salaire * 0.60;
        const wantsPer = salaire * 0.20;

        const needsTotalDepense = needs.reduce((acc, currV) => {
            return acc += Number(currV.price);
        }, 0);

        const wantsTotalDepense = wants.reduce((acc, currV) => {
            return acc += Number(currV.price);
        }, 0);

        const data = {
            salaire: salaire,
            nedsTotal: needsPer,
            wantsTotal: wantsPer,
            needsTotalDepense: needsTotalDepense,
            wantsTotalDepense: wantsTotalDepense,
            depenses: depensesDuMois
        }
        return data;
    }
}