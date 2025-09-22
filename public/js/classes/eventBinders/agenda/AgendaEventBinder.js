export class AgendaEventBinder {

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
        if (e.target.classList.contains("weekView") || e.target.classList.contains("weekViewi") || e.target.classList.contains("weekViewPara")) {
            this.controller.show();
        }

        else if (e.target.classList.contains("yearView") || e.target.classList.contains("yearViewi") || e.target.classList.contains("yearViewPara")) {
            const dateMs = this.controller.dateNavigationModel.dateSelected;
            const date = new Date(dateMs);
            const year = date.getFullYear(); 
            this.controller.dateNavigationModel.stateYear = year;
            const data = this.controller.calendarModel.getAgendaPerYear(year);
            this.controller.yearView.render(data);
        }

        else if (e.target.classList.contains("planningView") || e.target.classList.contains("planningViewi") || e.target.classList.contains("planningViewPara")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks; 
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanning(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted);
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

    }


}