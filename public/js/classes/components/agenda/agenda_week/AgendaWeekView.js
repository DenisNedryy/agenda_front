export class AgendaWeekView {


    render() {
        const el = document.querySelector(".agendaContent");
        if (el) {
            el.innerHTML = `
            <div class="agendaContent__header"></div>
            <div class="agendaContent__body">
                <div class="agendaContent__body__left"></div>
                <div class="agendaContent__body__right"></div>
                <div class="agendaContent__body__mobileView">
                    <!-- calendar version mobile-->  
                </div>
            </div>
            <div class="agendaContent__footer"></div> 
            `;
        }
    }
}