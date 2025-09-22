import { HOST } from "../../../../host.js";

export class AgendaCalendarView {

   constructor(dateModel) {
        this.dateModel = dateModel;
    }

    render(data) {
        const el = document.querySelector(".agendaContent__body__right");
        if (el) {

            data.forEach((cell, index) => {
                const containerSupreme = document.createElement("div");
                containerSupreme.className = "dayFiche";
                let isDayOff = false;
                const tasksCheck = cell.tasksByDay;
                for (let i = 0; i < tasksCheck.length; i++) {
                    if (tasksCheck[i].type === "dayOff") isDayOff = true;
                }
                if (isDayOff) containerSupreme.className = "dayFiche dayOff";

                const titleContainer = document.createElement("div");
                titleContainer.className = "dayFiche--title";
                const day = document.createElement("p");
                day.className = "dayAll";
                day.textContent = this.dateModel.weekDays[index];
                const dayMini = document.createElement("p");
                dayMini.className = "dayMini";
                dayMini.textContent = this.dateModel.weekDays[index].split("")[0];
                const number = document.createElement("p");
                number.className = cell.dayInfo.isCurrentDay ? "weekNumber currentDay" : "weekNumber";
                number.textContent = cell.dayInfo.dayDateNum;
                const date = `${cell.dayInfo.year}-${cell.dayInfo.month}-${cell.dayInfo.dayDateNum}`;
                number.setAttribute("data-date", date);
                titleContainer.appendChild(day);
                titleContainer.appendChild(dayMini);
                titleContainer.appendChild(number);
                containerSupreme.appendChild(titleContainer);

                const ul = document.createElement("ul");
                for (let i = 0; i < 20; i++) {
                    const li = document.createElement("li");
                    if (data[index].tasksByDay[i]) {
                        li.className = `${data[index].tasksByDay[i].bg} task`;
                        li.setAttribute("data-id", data[index].tasksByDay[i].id);
                        const para = document.createElement("p");
                        para.className = "taskPara";
                        para.textContent = data[index].tasksByDay[i].name;
                        if (data[index].tasksByDay[i].type === "birthDays") {
                            // calcul de l'age + affichage
                            const date = data[index].tasksByDay[i].date;
                            const age = this.dateModel.calculAge(date, cell.dayInfo.year);
                            para.innerHTML = `<p>Anniversaire</br>🥳🎂🎈🍾</br> ${data[index].tasksByDay[i].name} ${data[index].tasksByDay[i].last_name}</br> ${age} ans</p>`;
                            li.className = `birthDayBg task`;
                        }
                        if (data[index].tasksByDay[i].author_id) {
                            const img = document.createElement("img");
                            img.className = "taskImg"
                            img.setAttribute("src", `${HOST}/api/images/avatars/${data[index].tasksByDay[i].author_img_url}`);
                            li.appendChild(img);
                        }
                        li.appendChild(para);
                    }
                    ul.appendChild(li);
                }
                containerSupreme.appendChild(ul);
                el.appendChild(containerSupreme);
            });

            const modalFocus = document.createElement("div");
            modalFocus.className = "modalFocus hidden";
            el.appendChild(modalFocus);
        }
    }



}