export class HomeEventBinder {
    constructor() {
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleInput = this.handleInput.bind(this);
        this.boundHandleChange = this.handleChange.bind(this);

        this.filters = {
            search: "",
            type: "all",
            sort: "recent"
        };
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);

        document.removeEventListener('input', this.boundHandleInput);
        document.addEventListener('input', this.boundHandleInput);

        document.removeEventListener('change', this.boundHandleChange);
        document.addEventListener('change', this.boundHandleChange);
    }

    async handleClickTask(e) {
        const btnSelect = e.target.closest(".btn-selectDate");
        if (btnSelect) {
            const el = e.target.closest(".findTasks__task");
            if (el) {
                const dateStr = el.getAttribute("data-date");
                const date = new Date(dateStr);
                this.controller.dateNavigationModel.dateSelected = date.getTime();
                await this.controller.actions.goToAgendaDate(date.getTime());
            }
            return;
        }

        const deleteTaskBtn = e.target.closest(".deleteTaskBtn");
        if (deleteTaskBtn) {
            const taskId = deleteTaskBtn.closest(".findTasks__task").getAttribute("data-id");
            await this.controller.taskModel.deleteTask(taskId);
            this.controller.show();
            return;
        }



    }

    async handleInput(e) {
        const searchInput = e.target.closest(".findTasksSearchInput");
        if (!searchInput) return;

        this.filters.search = searchInput.value.trim();

        await this.controller.renderTasksManager(this.filters);
    }

    async handleChange(e) {
        const tasksType = e.target.closest(".findTasksType");
        const tasksSort = e.target.closest(".findTasksSort");

        if (!tasksType && !tasksSort) return;

        if (tasksType) {
            this.filters.type = tasksType.value;
        }

        if (tasksSort) {
            this.filters.sort = tasksSort.value;
        }

        await this.controller.renderTasksManager(this.filters);
    }

    initDragAndDrop() {
        const el = document.getElementById("todo");
        if (!el) return;

        new Sortable(el, {
            animation: 150,
            ghostClass: "ghost",

            onEnd: (evt) => this.handleOnEndTask(evt),
        });
    }

    async handleOnEndTask(evt) {

        const order = [...evt.to.querySelectorAll("li")].map((li, index) => ({
            id: li.dataset.id,
            sort_order: index + 1,
        }));

        await this.updateOrder(order);

    }

    async updateOrder(order) {
        this.controller.taskServices.updateOrder(order)
    }


}

