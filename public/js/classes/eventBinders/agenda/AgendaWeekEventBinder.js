
// dateNavigationModel

export class AgendaWeekEventBinder {

    constructor() {
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleChangeTask = this.handleChangeTask.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
        document.removeEventListener('change', this.boundHandleChangeTask);
        document.addEventListener('change', this.boundHandleChangeTask);
    }

    async handleChangeTask(e) {
        // toggle subject
        const container = e.target.closest(".formTask-add");
        if (!container) return;
        const subContainer = document.querySelector(".subjectContainer");
        const subSelect = document.getElementById("subjectSelect");
        const typeSelect = document.getElementById("typeSelect");
        if (typeSelect.value === "spaced_repetition") {
            subContainer.classList.remove("hidden");
        } else {
            subContainer.classList.add("hidden");
        }
    }

    async handleClickTask(e) {

        // navigation
        if (e.target.classList.contains("btn-today")) {
            this.controller.dateNavigationModel.dateSelected = null;
            this.controller.show();
        }

        else if (e.target.classList.contains("previousWeek")) {
            this.controller.dateNavigationModel.agendaWeekTurnLeft();
            this.controller.show();
        }

        else if (e.target.classList.contains("nextWeek")) {
            this.controller.dateNavigationModel.agendaWeekTurnRight();
            this.controller.show();
        }

        // changement d'utilisateur
        else if (e.target.classList.contains('checkBox') || e.target.classList.contains("checkBox__user")) {
            const userId = e.target.closest(".checkBox").getAttribute("data-userId");
            const userRes = await this.controller.authServices.getUserById(userId);
            const user = userRes.data.user;
            this.controller.authServices.userIdSelected = user.id;
            this.controller.show();
        }

        // changement parameters
        else if (e.target.classList.contains('checkBox__Bank') || e.target.classList.contains("box-bank")) {
            this.controller.bankHolidaysModel.toggle();
            this.controller.show();
        }

        else if (e.target.classList.contains('checkBox__birthDay') || e.target.classList.contains("box-birth")) {
            this.controller.birthDaysModel.toggle();
            this.controller.show();
        }

        // toggle parameters
        else if (e.target.classList.contains('paramsOptions') || e.target.classList.contains("paramsOptionsp") || e.target.classList.contains("paramsOptionsi")) {
            const el = document.querySelector(".optionsContainer");
            el.classList.toggle("hiddenOnMobile");
        }
        else if (e.target.classList.contains('exitOptions')) {
            const el = document.querySelector(".optionsContainer");
            el.classList.add("hiddenOnMobile");
        }


        // modal addTask
        else if (e.target.classList.contains("weekNumber")) {
            const date = e.target.getAttribute("data-date");
            const modalContent = document.querySelector(".modalContent");
            modalContent?.setAttribute("data-selected-date", date);
            this.controller.modalModel.modalAddDate = date;
            const modal = document.querySelector(".modalAddContainer .modal");
            modal.classList.remove("hidden");
        }
        // modal addTask
        else if (e.target.classList.contains("addTask-mobile")) {
            const date = e.target.getAttribute("data-date");
            this.controller.modalModel.modalAddDate = date;
            const modal = document.querySelector(".modalAddContainer .modal");
            modal.classList.remove("hidden");
            const alerts = await this.controller.taskModel.getAlerts();
            this.controller.modalView.renderAlertsLength(alerts);
        }
        else if (e.target.classList.contains("leaveModal")) {
            const modal = document.querySelector(".modalAddContainer .modal");
            modal.classList.add("hidden");
        }
        else if (e.target.classList.contains("btn-submit-addTask")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const userIdSelected = this.controller.authServices.userIdSelected;
            const auth = await this.controller.authServices.getAuth();
            const task = this.controller.modalModel.getTaskObj(form, userIdSelected, auth);
            if (task) {

                await this.controller.taskServices.createTask(task);
            }
            this.controller.show();
            const alerts = await this.controller.taskModel.getAlerts();
            this.controller.modalView.renderAlertsLength(alerts);
        }
        else if (e.target.classList.contains("btn-submit-addTask2")) {
            e.preventDefault();
            const date = document.querySelector(".calendarMobileView__body").getAttribute("data-date");
            this.controller.modalModel.modalAddDate = date;
            const form = e.target.closest("form");
            const userIdSelected = this.controller.authServices.userIdSelected;
            const auth = await this.controller.authServices.getAuth();
            const task = this.controller.modalModel.getTaskObj(form, userIdSelected, auth);
            if (task) {
                await this.controller.taskServices.createTask(task);
            }
            this.controller.show();
            const alerts = await this.controller.taskModel.getAlerts();
            this.controller.modalView.renderAlertsLength(alerts);
        }

        // modal addTask VERSION MOBILE

        else if (e.target.classList.contains("leaveModal2")) {
            const modal = document.querySelector(".modalAddContainer .modal2");
            modal.classList.add("hidden");
        }
        else if (e.target.classList.contains("btn-submit-addTask2")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const userIdSelected = this.controller.authServices.userIdSelected;
            const auth = await this.controller.authServices.getAuth();
            const task = this.controller.modalModel.getTaskObj(form, userIdSelected, auth);
            if (task) {
                await this.controller.taskServices.createTask(task);
            }
            this.controller.show();
        }


        // focus modal 
        else if (e.target.classList.contains("task") || e.target.classList.contains("taskPara") || e.target.classList.contains("taskImg")) {
            const el = e.target.closest(".task");
            const taskId = el.getAttribute("data-id");
            if (taskId !== undefined && (!el.classList.contains("bgJaune") && !el.classList.contains("bgBlack")) && !el.classList.contains("bgBanksHollidays") && !el.classList.contains("birthDayBg")) {
                const taskRes = await this.controller.taskServices.readOneTask(taskId);
                const task = taskRes.data.tasks;
                this.controller.focusModalView.render(task);
                document.querySelector(".modalFocus").classList.remove("hidden");
            }
        }

        else if (e.target.classList.contains("task-leave")) {
            document.querySelector(".modalFocus").classList.add("hidden");
        }
        else if (e.target.classList.contains("task-leave2")) {
            document.querySelector(".modalFocus2").classList.add("hidden");
        }

        else if (e.target.classList.contains("task-delete")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            await this.controller.taskServices.deleteTask(taskId);
            this.controller.show();
            const alerts = await this.controller.taskModel.getAlerts();
            this.controller.modalView.renderAlertsLength(alerts);
        }
        else if (e.target.classList.contains("task-delete2")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            await this.controller.taskServices.deleteTask(taskId);
            this.controller.show();
            const alerts = await this.controller.taskModel.getAlerts();
            this.controller.modalView.renderAlertsLength(alerts);
        }

        else if (e.target.classList.contains("task-update")) {
            document.querySelector(".modalContent__footer").classList.remove("hidden");
        }
        else if (e.target.classList.contains("task-update2")) {
            document.querySelector(".modalContent__footer").classList.remove("hidden");
        }

        else if (e.target.classList.contains("btn-updateTask")) {
            e.preventDefault();
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            const form = e.target.closest("form");

            const data = {
                name: form.elements['name'].value || null,
                description: form.elements['description'].value || null,
                type: form.elements['type'].value || null
            }

            await this.controller.taskServices.updateTask(data, taskId);
            this.controller.show();
        }

        // focus modal 
        const taskEl = e.target.closest(".task");
        if (e.target.closest(".task")) {
            const taskId = taskEl.getAttribute("data-id");
            if (taskId !== undefined && (!taskEl.classList.contains("bgJaune") && !taskEl.classList.contains("bgBlack")) && !taskEl.classList.contains("bgBanksHollidays") && !taskEl.classList.contains("birthDayBg")) {
                const taskRes = await this.controller.taskServices.readOneTask(taskId);
                const task = taskRes.data.tasks;
                this.controller.focusModalView.render(task);
                document.querySelector(".modalFocus").classList.remove("hidden");
            }
        }
        const taskEl2 = e.target.closest(".task2");
        if (e.target.closest(".task2")) {
            const taskId = taskEl2.getAttribute("data-id");
            if (taskId !== undefined && (!taskEl2.classList.contains("bgJaune") && !taskEl2.classList.contains("bgBlack")) && !taskEl2.classList.contains("bgBanksHollidays") && !taskEl2.classList.contains("birthDayBg")) {
                const taskRes = await this.controller.taskServices.readOneTask(taskId);
                const task = taskRes.data.tasks;
                this.controller.focusModalView.renderMobile(task);
                document.querySelector(".modalFocus2").classList.remove("hidden");
            }
        }

        // task review Tomorow
        if (e.target.classList.contains("btn-task-reviewTomorow")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            const res = await this.controller.taskModel.reviewTomorow(taskId);
            this.controller.show();
        }

        // spaced_Repetition next step
        if (e.target.classList.contains("btn-nextStep")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            const res = await this.controller.spaceRepService.updateSpaceRepetition(taskId);
            this.controller.show();
        }

        // spaced_Repetition review Tomorow
        if (e.target.classList.contains("btn-reviewTomorow")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            const res = await this.controller.spaceRepService.reviewTomorow(taskId);
            this.controller.show();
        }

        // spaced_Repetition reset
        if (e.target.classList.contains("btn-resetCard")) {
            const taskId = e.target.closest(".modalContent").getAttribute("data-id");
            const res = await this.controller.spaceRepService.reset(taskId);
            this.controller.show();
        }

        // changer de jour sur la version mobile
        const myDay = e.target.closest(".calendarMobileView__header__day");
        if (myDay) {
            const days = document.querySelectorAll(".calendarMobileView__header__day");
            days.forEach((day) => {
                day.classList.remove("currentDay-mobile-on");
            });
            myDay.classList.add("currentDay-mobile-on");
            const date = myDay.querySelector(".mobileNumber").getAttribute("data-date");
            this.controller.show(date);
        }

    }


}