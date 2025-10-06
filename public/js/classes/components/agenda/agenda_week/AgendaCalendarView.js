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

                        const task = document.createElement("div");
                        task.className = "agendaTask";
                        const taskHeader = document.createElement("div");
                        taskHeader.className = "agendaTask__header";

                        // author
                        if (data[index].tasksByDay[i].author_id) {
                            const headerAvatar = document.createElement("img");
                            headerAvatar.className = "agendaTask__header__avatar"
                            headerAvatar.setAttribute("src", `${HOST}/api/images/avatars/${data[index].tasksByDay[i].author_img_url}`);
                            taskHeader.appendChild(headerAvatar);
                        }

                        // subject
                        if (data[index].tasksByDay[i].subject !== "unspecified" && data[index].tasksByDay[i].subject !== undefined) {
                            const headerSubject = document.createElement("img");
                            headerSubject.className = "agendaTask__header__headerSubject";
                            headerSubject.src = `/public/assets/images/subjects/${data[index].tasksByDay[i].subject}.png`;
                            taskHeader.appendChild(headerSubject);
                        }

                        const taskBody = document.createElement("div");
                        taskBody.className = "agendaTask__body";

                        // birthday
                        if (data[index].tasksByDay[i].type === "birthDays") {
                            // calcul de l'age + affichage
                            const date = data[index].tasksByDay[i].date;
                            const age = this.dateModel.calculAge(date, cell.dayInfo.year);
                            taskBody.innerHTML = `<p>Anniversaire</br>🎈🎈🍾🍾🎈🎈</br> ${data[index].tasksByDay[i].name} ${data[index].tasksByDay[i].last_name}</br> ${age} ans</p>`;
                            li.className = `birthDayBg task`;
                        } else {
                            taskBody.textContent = data[index].tasksByDay[i].name;
                        }

                        const taskFooter = document.createElement("div");
                        taskFooter.className = "agendaTask__footer";

                        task.appendChild(taskHeader);
                        task.appendChild(taskBody);
                        task.appendChild(taskFooter);
                        li.appendChild(task);

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

    renderMobileView(data, dateSelected = null) {
        const el = document.querySelector(".agendaContent__body__mobileView");
        if (el) {
            el.innerHTML = "";
            const header = document.createElement("div");
            header.className = "calendarMobileView__header";
            const body = document.createElement("div");
            body.className = "calendarMobileView__body";

            data.forEach((cell, index) => {
                const year = cell.dayInfo.year;
                const month = cell.dayInfo.month;
                const currentDay = cell.dayInfo.dayDateNum;

                const day = document.createElement("div");
                const containerWidth = document.querySelector(".agendaContent__body__mobileView").offsetWidth;
            
               day.className = `${
  (dateSelected && dateSelected === `${year}-${month}-${currentDay}`) ||
  (!dateSelected && cell.dayInfo.isCurrentDay)
    ? "calendarMobileView__header__day currentDay-mobile-on" 
    : "calendarMobileView__header__day"
}`;
                day.style.width = `${((containerWidth-(60)) / 7)}px`;
                const date = `${cell.dayInfo.year}-${cell.dayInfo.month}-${cell.dayInfo.dayDateNum}`;
                day.innerHTML = `
                 <p class="mobileDay">${this.dateModel.weekDays[index].slice(0, 3)}</p>
                <p data-date='${date}' class="${cell.dayInfo.isCurrentDay ? 'mobileNumber currentDay' : 'mobileNumber'}">
                ${cell.dayInfo.dayDateNum}
                </p>
                 ${cell.tasksByDay.length > 0
                        ? `<p class="mobileDayLenght">${cell.tasksByDay.length}</p>`
                        : ''
                    }
                `;
                header.appendChild(day);

                if ((dateSelected && (dateSelected === `${year}-${month}-${currentDay}`)) || (cell.dayInfo.isCurrentDay && !dateSelected)) {
                    body.setAttribute("data-date", `${year}-${month}-${currentDay}`);
                    const ul = document.createElement("ul");
                    for (let i = 0; i < cell.tasksByDay.length; i++) {
                        const li = document.createElement("li");
                        if (data[index].tasksByDay[i]) {
                            li.className = `${data[index].tasksByDay[i].bg} task2`;
                            li.setAttribute("data-id", data[index].tasksByDay[i].id);

                            const task = document.createElement("div");
                            task.className = "agendaTask";
                            const taskHeader = document.createElement("div");
                            taskHeader.className = "agendaTask__header";

                            // author
                            if (data[index].tasksByDay[i].author_id) {
                                const headerAvatar = document.createElement("img");
                                headerAvatar.className = "agendaTask__header__avatar"
                                headerAvatar.setAttribute("src", `${HOST}/api/images/avatars/${data[index].tasksByDay[i].author_img_url}`);
                                taskHeader.appendChild(headerAvatar);
                            }

                            // subject
                            if (data[index].tasksByDay[i].subject !== "unspecified" && data[index].tasksByDay[i].subject !== undefined) {
                                const headerSubject = document.createElement("img");
                                headerSubject.className = "agendaTask__header__headerSubject";
                                headerSubject.src = `/public/assets/images/subjects/${data[index].tasksByDay[i].subject}.png`;
                                taskHeader.appendChild(headerSubject);
                            }

                            const taskBody = document.createElement("div");
                            taskBody.className = "agendaTask__body";

                            // birthday
                            if (data[index].tasksByDay[i].type === "birthDays") {
                                // calcul de l'age + affichage
                                const date = data[index].tasksByDay[i].date;
                                const age = this.dateModel.calculAge(date, cell.dayInfo.year);
                                taskBody.innerHTML = `<p>Anniversaire</br>🎈🎈🍾🍾🎈🎈</br> ${data[index].tasksByDay[i].name} ${data[index].tasksByDay[i].last_name}</br> ${age} ans</p>`;
                                li.className = `birthDayBg task`;
                            } else {
                                taskBody.textContent = data[index].tasksByDay[i].name;
                            }

                            const taskFooter = document.createElement("div");
                            taskFooter.className = "agendaTask__footer";

                            task.appendChild(taskHeader);
                            task.appendChild(taskBody);
                            task.appendChild(taskFooter);
                            li.appendChild(task);

                        }
                        ul.appendChild(li);
                    }
                    const buttonAdd = document.createElement("div");
                    buttonAdd.className = "addTask-mobile btn-mini";
                    buttonAdd.textContent = "Add Task";
                    body.appendChild(buttonAdd);
                    body.appendChild(ul);

                }
            });
            el.appendChild(header);
            el.appendChild(body);

            const modalFocus = document.createElement("div");
            modalFocus.className = "modalFocus2 hidden";
            el.appendChild(modalFocus)
        }
    }



}