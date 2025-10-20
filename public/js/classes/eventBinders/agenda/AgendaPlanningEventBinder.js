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

        else if (e.target.classList.contains("taskFilter--projets")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningProjets(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "projets");
            this.controller.planningView.renderAll(tasksByUserSorted);
            this.addEventListeners();
        }

        else if (e.target.classList.contains("taskFilter--spaced_repetition")) {
            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksByUserSorted = await this.controller.planningModel.getPlanningSpaceRepetition(tasksByUser);
            this.controller.planningView.render(tasksByUserSorted, "spaced_repetition");
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
        if (taskContainerEl && !e.target.classList.contains("planning__checkBoxContainer") && !e.target.classList.contains("fa-solid")) {
            const dateStr = taskContainerEl.getAttribute("data-date");
            const date = new Date(dateStr);
            this.controller.dateNavigationModel.dateSelected = date.getTime();
            this.controller.show();
        }

        // click > case checkbox
        // toggle checkBox to_delete
        const checkBoxEl = e.target.closest(".planning__checkBoxContainer");
        if (checkBoxEl) {
            const taskId = e.target.closest(".tasksContent__container ").getAttribute("data-id");
            const jsonRes = await this.controller.taskModel.toggleCardToDelete(taskId);
 
            // récupération du type
            const activeTaskEl = document.querySelector(".taskFilter--active").className;
            const firstClass = activeTaskEl.split(" ")[0];
            const type = firstClass.split("--")[1];

            const auth = await this.controller.authServices.getAuth();
            const userSelectedRes = await this.controller.authServices.getUserById(this.controller.authServices.userIdSelected);
            const userSelected = userSelectedRes.data.user;
            const tasksRes = await this.controller.taskServices.getTasks();
            const tasks = tasksRes.data.tasks;
            const tasksByUser = await this.controller.userModel.getUserSelectedTasks(auth, userSelected, tasks);
            const tasksSortedByType = await this.controller.planningModel.getTasksByType(tasksByUser, type);


            this.controller.planningView.render(tasksSortedByType, type);
            this.controller.planningView.renderAll(tasksSortedByType);
            this.addEventListeners();


        }

    }


}