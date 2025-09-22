export class AgendaYearEventBinder {

    constructor() {
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
        if (e.target.classList.contains("numero")) {
            const dateStr = e.target.getAttribute("data-date");
            const date = new Date(dateStr);
            this.controller.dateNavigationModel.dateSelected = date.getTime(); 
            this.controller.show();
        }

        else if (e.target.classList.contains("agendaYearTurnLeft")) {
            this.controller.dateNavigationModel.previousWeek();
            const year = this.controller.dateNavigationModel.stateYear;
            const data = this.controller.calendarModel.getAgendaPerYear(year);
            this.controller.yearView.render(data);
        }

        else if (e.target.classList.contains("agendaYearTurnRight")) {
            this.controller.dateNavigationModel.nextWeek();
            const year = this.controller.dateNavigationModel.stateYear;
            const data = this.controller.calendarModel.getAgendaPerYear(year);
            this.controller.yearView.render(data);
        }

        else if (e.target.classList.contains("agendYear__console__today")) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const data = this.controller.calendarModel.getAgendaPerYear(currentYear);
            this.controller.yearView.render(data);
        }
    }


}