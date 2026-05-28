import { YEAR_MONTH } from "../../../../constants/schedule.js";

export class MiniCalendar {

    constructor() {
        this.yearMonth = YEAR_MONTH;
    }

    render(data) { // {year: year, month: monthNb, days:[]}
        const el = document.querySelector(".agenda__left__miniCalendar");
        if (el) {
            el.innerHTML = "";
            const myMonth = data[0].month - 1;
            const year = data[0].year;
            const monthBox = document.createElement("div");

            // header
            const monthBoxHeader = document.createElement("div");
            monthBoxHeader.classList = "agendaYear__monthBox__header";
            const monthBoxHeaderContent = document.createElement("p");
            monthBoxHeaderContent.textContent = `${this.yearMonth[myMonth]} ${data[0].year}`;
            monthBoxHeader.appendChild(monthBoxHeaderContent);

            const navigationByMonth = document.createElement('div');
            const iLeft = document.createElement("i");
            iLeft.className = "fa-solid fa-angle-left miniAgendaPreviousMonth";
            const iRight = document.createElement("i");
            iRight.className = "fa-solid fa-angle-right miniAgendaNextMonth";
            navigationByMonth.appendChild(iLeft);
            navigationByMonth.appendChild(iRight);
            monthBoxHeader.appendChild(navigationByMonth);

            monthBox.appendChild(monthBoxHeader);

            // table
            const table = document.createElement('table');
            // theader
            const thead = document.createElement('thead');
            const theadTr = document.createElement('tr');

            const lundi = document.createElement('th');
            lundi.setAttribute("data-letters", 'lundi');
            lundi.textContent = "L";
            const mardi = document.createElement('th');
            mardi.setAttribute("data-letters", 'mardi');
            mardi.textContent = "M";
            const mercredi = document.createElement('th');
            mercredi.setAttribute("data-letters", 'mercredi');
            mercredi.textContent = "M";
            const jeudi = document.createElement('th');
            jeudi.setAttribute("data-letters", 'jeudi');
            jeudi.textContent = "J";
            const vendredi = document.createElement('th');
            vendredi.setAttribute("data-letters", 'vendredi');
            vendredi.textContent = "V";
            const samedi = document.createElement('th');
            samedi.setAttribute("data-letters", 'samedi');
            samedi.textContent = "S";
            const dimanche = document.createElement('th');
            dimanche.setAttribute("data-letters", 'dimanche');
            dimanche.textContent = "D";

            theadTr.appendChild(lundi);
            theadTr.appendChild(mardi);
            theadTr.appendChild(mercredi);
            theadTr.appendChild(jeudi);
            theadTr.appendChild(vendredi);
            theadTr.appendChild(samedi);
            theadTr.appendChild(dimanche);
            thead.appendChild(theadTr);
            table.appendChild(thead);

            // tbody
            const tbody = document.createElement('tbody');
            // Obtenir le mois numérique (index + 1 car JS commence à 0 pour les mois)
            const firstDay = new Date(year, myMonth, 1);
            const lastDay = new Date(year, myMonth + 1, 0); // hack, day=0 => le dernier jour du mois précédent.
            const firstWeekday = (firstDay.getDay() + 6) % 7; // pour commencer lundi = 0 (on décale les colonnes)
            const totalDays = lastDay.getDate();

            let currentDay = 1;
            let weekRow = document.createElement('tr');

            // Remplir les cellules vides au début (si le mois ne commence pas un lundi)
            for (let i = 0; i < firstWeekday; i++) {
                const emptyCell = document.createElement('td');
                weekRow.appendChild(emptyCell);
            }

            // Remplir les jours du mois
            for (let day = 1; day <= totalDays; day++) {
                const cell = document.createElement('td');
                cell.textContent = day;
                const today = new Date();
                const isToday = today.getFullYear() === year && today.getMonth() === myMonth && today.getDate() === day;
                cell.className = isToday ? 'numero yearCurrentDay' : 'numero';
                cell.setAttribute('data-date', `${year}-${this.getFormatForNumbersWidhtZeroBefore(myMonth + 1)}-${this.getFormatForNumbersWidhtZeroBefore(day)}`);
                weekRow.appendChild(cell);

                // Si on arrive à dimanche (7 colonnes), on termine la ligne
                if ((firstWeekday + day) % 7 === 0) {
                    tbody.appendChild(weekRow);
                    weekRow = document.createElement('tr');
                }
            }

            // Compléter la dernière ligne si incomplète
            if (weekRow.children.length > 0) {
                while (weekRow.children.length < 7) {
                    const emptyCell = document.createElement('td');
                    weekRow.appendChild(emptyCell);
                }
                tbody.appendChild(weekRow);
            }

            table.appendChild(tbody);

            monthBox.appendChild(table);

            // fin
            el.appendChild(monthBox);

        }

    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }
}