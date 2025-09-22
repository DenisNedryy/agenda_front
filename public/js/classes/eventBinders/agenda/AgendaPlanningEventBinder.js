export class AgendaPlanningEventBinder {

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

        if (e.target.classList.contains("taskFilter--tasks")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningTasks(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "tasks");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--all")) {
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

        else if (e.target.classList.contains("taskFilter--courses")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningCourses(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "courses");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--rdvs")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningRdvs(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "rdvs");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--events")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningEvents(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "events");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--projects")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningProjets(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "projects");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--spacedRepetition")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningSpaceRepetition(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "spacedRepetition");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--alerts")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningAlerts(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "alerts");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--dayOff")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningDayOff(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "dayOff");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        // naviger vers agenda depuis planning task
        const taskContainerEl = e.target.closest(".tasksContent__container");
        if (taskContainerEl) {
            const dateStr = taskContainerEl.getAttribute("data-date");
            const date = new Date(dateStr);
            this.controller.dateNavigationModel.dateSelected = date.getTime();
            this.controller.show();
        }

    }


}