export class AgendaView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="agenda">
                <div class="agenda__left">
                    <div class="agenda__left__header">
                    <h2>Calendar</h2>
                    <p>Manage your schedule</p>
                    <button class="yearView btn">Year view</button>
                    </div>
                    <div class="agenda__left__miniCalendar"></div>
                    <div class="agenda__left__parameters">
                    <p>My calendars</p>
                    <div class="agenda__left__parameters__options"></div>
                    </div>
                </div>
                <div class="agenda__right">
                    <div class="agenda__right__header">
                        <button class="btn-today btn-current">Today</button
                        <div class="agenda__right__header__navigation">
                            <div class="agenda__right__header__navigation__arrows">
                            <div>
                                <i class="fa-solid fa-angle-left previousWeek"></i>
                            </div>
                            <div>
                                 <i class="fa-solid fa-angle-right nextWeek"></i>
                            </div>
                            </div>
                            <div class="agenda__right__header__navigation__date"></div>
                        
                        <div class="agenda__right__header__view"></div>
                    </div>
                    <div class="agenda__right__agenda"></div> 
                </div>                
            </div>
            `
        }
    }
}