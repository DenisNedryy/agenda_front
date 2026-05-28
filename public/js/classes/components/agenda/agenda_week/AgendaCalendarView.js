import { HOST } from "../../../../constants/host.js";

export class AgendaCalendarView {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    render(data) {
        const el = document.querySelector(".agenda__right__agenda");
        el.innerHTML = "";

        // period_of_the_day
        const periodOfTheDay = document.createElement('div');
        periodOfTheDay.className = "periodOfTheDay";

        const morning = document.createElement('div');
        morning.className = "periodOfTheDay__morning";
        const morningTitle = document.createElement('p');
        morningTitle.innerHTML = `Matin <br> <p class="periodOfTheDay__evening__horraire">00:00 - 12:00</p>`;
        morning.appendChild(morningTitle);

        const noon = document.createElement('div');
        noon.className = "periodOfTheDay__noon";
        const noonTitle = document.createElement('p');
        noonTitle.innerHTML = `Midi <br> <p class="periodOfTheDay__evening__horraire">12:01 - 18:00</p>`;
        noon.appendChild(noonTitle);

        const evening = document.createElement('div');
        evening.className = "periodOfTheDay__evening";
        const eveningTitle = document.createElement('p');
        eveningTitle.innerHTML = `Soir <br> <p class="periodOfTheDay__evening__horraire">18:01 - 24:00</p>`;
        evening.appendChild(eveningTitle);

        periodOfTheDay.appendChild(morning);
        periodOfTheDay.appendChild(noon);
        periodOfTheDay.appendChild(evening);
        el.appendChild(periodOfTheDay);

        // container des dayFiches
        const dayFicheContainer = document.createElement("div");
        dayFicheContainer.className = "dayFicheContainer";
        el.appendChild(dayFicheContainer);

        if (el) {

            data.forEach((cell, index) => {

                const containerSupreme = document.createElement("div");
                containerSupreme.className = "dayFiche";

                let isDayOff = false;

                const tasksCheck = cell.tasksByDay;

                for (let i = 0; i < tasksCheck.length; i++) {
                    if (tasksCheck[i].type === "dayOff" || cell.dayInfo.isWeekEnd) {
                        isDayOff = true;
                    }
                }

                if (cell.dayInfo.isWeekEnd) isDayOff = true;

                if (isDayOff) {
                    containerSupreme.className = "dayFiche dayOff";
                }

                // HEADER
                const titleContainer = document.createElement("div");
                titleContainer.className = "dayFiche--title";

                const day = document.createElement("p");
                day.className = "dayAll";
                day.textContent = this.dateModel.weekDays[index];

                const dayMini = document.createElement("p");
                dayMini.className = "dayMini";
                dayMini.textContent = this.dateModel.weekDays[index].split("")[0];

                const number = document.createElement("p");
                number.className = cell.dayInfo.isCurrentDay
                    ? "weekNumber currentDay"
                    : "weekNumber";

                number.textContent = cell.dayInfo.dayDateNum;

                const date = `${cell.dayInfo.year}-${cell.dayInfo.month}-${cell.dayInfo.dayDateNum}`;

                number.setAttribute("data-date", date);

                titleContainer.appendChild(day);
                titleContainer.appendChild(dayMini);
                titleContainer.appendChild(number);

                containerSupreme.appendChild(titleContainer);

                // TRI TASKS
                const tasksSorted = data[index].tasksByDay.sort((a, b) => {

                    if (!a.scheduled_time) return 1;
                    if (!b.scheduled_time) return -1;

                    return a.scheduled_time.localeCompare(b.scheduled_time);
                });

                // CREATION LIST
                const creationList = (typeList) => {

                    let tasksByList = [];

                    if (typeList === "morning") {

                        tasksByList = tasksSorted.filter((task) => {

                            if (
                                task.type === "birthDays" ||
                                task.type === "dayOff"
                            ) {
                                return true;
                            }

                            if (!task.scheduled_time) {
                                return true;
                            }

                            const hour = Number(task.scheduled_time.split(":")[0]);

                            return hour >= 0 && hour < 12;
                        });
                    }

                    if (typeList === "noon") {

                        tasksByList = tasksSorted.filter((task) => {

                            if (!task.scheduled_time) return false;

                            const hour = Number(task.scheduled_time.split(":")[0]);

                            return hour >= 12 && hour < 18;
                        });
                    }

                    if (typeList === "evening") {

                        tasksByList = tasksSorted.filter((task) => {

                            if (!task.scheduled_time) return false;

                            const hour = Number(task.scheduled_time.split(":")[0]);

                            return hour >= 18;
                        });
                    }

                    const ul = document.createElement("ul");
                    ul.className = `${typeList} typeList`;

                    for (let i = 0; i < tasksByList.length; i++) {

                        const li = document.createElement("li");

                        if (tasksByList[i]) {

                            li.className = `${tasksByList[i].bg} task`;
                            li.setAttribute("data-id", tasksByList[i].id);

                            const task = document.createElement("div");
                            task.className = "agendaTask";

                            const taskHeader = document.createElement("div");
                            taskHeader.className = "agendaTask__header";

                            if (tasksByList[i].scheduled_time) {
                                const horraire = tasksByList[i].scheduled_time.slice(0, 5);
                                taskHeader.textContent = `${horraire}`;
                            } else {
                                taskHeader.textContent = ``;
                            }

                            // author
                            if (tasksByList[i].author_id) {

                                const headerAvatar = document.createElement("img");

                                headerAvatar.className = "agendaTask__header__avatar";

                                headerAvatar.setAttribute(
                                    "src",
                                    `${HOST}/api/images/avatars/${tasksByList[i].author_img_url}`
                                );

                                taskHeader.appendChild(headerAvatar);
                            }

                            // subject
                            if (
                                tasksByList[i].subject !== "unspecified" &&
                                tasksByList[i].subject !== undefined
                            ) {

                                const headerSubject = document.createElement("img");

                                headerSubject.className = "agendaTask__header__headerSubject";

                                headerSubject.src =
                                    `/public/assets/images/subjects/${tasksByList[i].subject}.png`;

                                taskHeader.appendChild(headerSubject);
                            }

                            const taskBody = document.createElement("div");
                            taskBody.className = "agendaTask__body";

                            // birthday
                            if (tasksByList[i].type === "birthDays") {

                                const date = tasksByList[i].date;

                                const age = this.dateModel.calculAge(
                                    date,
                                    cell.dayInfo.year
                                );

                                taskBody.innerHTML = `
                                    <p>
                                       <br>Anniversaire
                                        <br>
                                        ${tasksByList[i].name}
                                        ${tasksByList[i].last_name}<br>
                                        ${age} ans
                                    </p>
                                `;

                                li.className = `birthDayBg task`;

                            } else {
                                taskBody.textContent = `${tasksByList[i].name}`;
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
                };

                creationList("morning");
                creationList("noon");
                creationList("evening");

                dayFicheContainer.appendChild(containerSupreme);
            });

            const modalFocus = document.createElement("div");
            modalFocus.className = "modalFocus hidden";

            el.appendChild(modalFocus);
        }
    }
}