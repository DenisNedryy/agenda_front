export class ModalView {


    renderAlertsLength(alerts) {

        const el = document.querySelector(".header__right__alerts--bells--status");
        if (el) {
            el.textContent = alerts.length === 0 ? "" : alerts.length;
            if (alerts.length > 0) {
                el.classList.add("ball-red");
            } else {
                el.classList.remove("ball-red");
            }
        }
    }

    open() {
        const el = document.querySelector(".popUp");
        if (el) {
            el.classList.remove("unvisible");
        }
    }

    close() {
        const el = document.querySelector(".popUp");
        if (el) {
            el.classList.add("unvisible");
        }
    }

    toggle() {
        const el = document.querySelector(".popUp");
        if (el) {
            el.classList.toggle("unvisible");
        }
    }

    renderAlertsModal(alerts) {
        console.log(alerts);
        const el = document.querySelector(".popUp");
        if (el) {
            this.toggle();
            el.innerHTML = `
            <div class="popUp__header">
            <div>
                 <i class="fa-solid fa-bell"></i>
                 <div class="popUp__header__length">${alerts.length}</div>
                 </div>
            </div>
            <div class="popUp__body">
                 <p class="popUp__body--title">Alerts</p>
                 <div class="popUp__body__alerts"></div>
            </div>
            <idv class="popUp__footer"></div>
            `;

            this.renderAlertsDiv(alerts);
        }
    }

    renderAlertsDiv(alerts) {
        const el = document.querySelector(".popUp__body__alerts");
        if (el) {
            alerts.forEach((cell) => {
                const date = new Date(cell.date);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const dateString = `${year}-${this.getFormatForNumbersWidhtZeroBefore(month)}-${this.getFormatForNumbersWidhtZeroBefore(day)}`
                const alert = document.createElement("div");
                alert.setAttribute("data-date", dateString);
                alert.className = "popUp__body__alerts__alert"
                const alertPara = document.createElement("p");
                alertPara.textContent = cell.name;
                alert.appendChild(alertPara);
                el.appendChild(alert);
            });
        }
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }
}