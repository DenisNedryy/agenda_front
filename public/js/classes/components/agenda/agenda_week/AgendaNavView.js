export class AgendaNavView {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    render(date) {
        const el = document.querySelector(".agendaContent__header");
        if (el) {
            el.innerHTML = `
                  <div class="btn btn-today">Today</div>
                  <div class="agendaContent__header--iconsContainer">
                    <i class="fa-solid fa-angle-left previousWeek"></i> <i class="fa-solid fa-angle-right nextWeek"></i>
                  </div>
                  <p>${this.dateModel.yearMonth[Number(date.month) - 1]} ${date.year}</p>
            `;
        }
    }

}