export class HeaderEventBinder {

    constructor(userServices, miseAJourAuth) {
        this.userServices = userServices;
        this.miseAJourAuth = miseAJourAuth;

        this.boundHandleClickTask = this.handleClickTask.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
    }

    async handleClickTask(e) {
        const logOut = e.target.closest(".log-out");
        if (logOut) {
            console.log("coucou");
            // créer une déconection des cookies https-only
            await this.userServices.logOut();
            await this.miseAJourAuth.init();
        }


        const alertsBells = e.target.closest(".header__right__alerts--bells");
        if (alertsBells) {
            if (alertsBells.querySelector(".ball-red")) {
                const alerts = await this.controller.taskModel.getAlerts();
                this.controller.modalView.renderAlertsModal(alerts);
            }
        }

        const navigateToAlert = e.target.closest(".popUp__body__alerts__alert");
        if (navigateToAlert) {
            const dateStr = navigateToAlert.getAttribute("data-date");
            console.log(dateStr);
            const date = new Date(dateStr);
            console.log(date);
            this.controller.agendaCtrl.dateNavigationModel.dateSelected = date.getTime();
            this.controller.agendaCtrl.show(this.controller.agendaCtrl.dateNavigationModel.dateSelected);
            this.controller.modalView.close();
        }
    }

}