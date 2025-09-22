export class HomeEventBinder {
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

