

export class AgendaDayOffEventBinder {

    constructor() {
        this.boundHandleClick = this.handleClick.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClick);
        document.addEventListener('click', this.boundHandleClick);
    }

    async handleClick(e) {
        const dayOffBtn = e.target.closest(".dayOff-manager");
        if (dayOffBtn) {
            // chercher dans la bdd le weekEnd et l'envoyer dans le render
            const data = await this.controller.weekEndModel.getWeekEnd();
            await this.controller.agendaDayOffView.render(data);
        }

        const weekEndDay = e.target.closest(".agendaContent__weekDays__day");
        if (weekEndDay) {
            const day = weekEndDay.getAttribute("data-day");
            const weekEndId = weekEndDay.parentElement.getAttribute("data-id");
            const res = await this.controller.weekEndModel.updateWeekEnd(weekEndId, day);
            const data = await this.controller.weekEndModel.getWeekEnd();
            await this.controller.agendaDayOffView.render(data);
        }

        //  // chercher dans la bdd le weekEnd et l'envoyer dans le render
        // const weekEndId = "123";
        // const day = "mardi";
        // const res = await this.controller.weekEndModel.updateWeekEnd(weekEndId, day);

    }


}