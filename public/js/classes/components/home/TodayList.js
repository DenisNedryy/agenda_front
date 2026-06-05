export class TodayList {

    render(data) {

        const el = document.querySelector(
            ".home__bodyContainer__left__todayTasks__body"
        );

        if (!el) return;

        el.innerHTML = "";

        const ul = document.createElement("ul");
        ul.className = "todayTasksList";

        data.forEach(task => {

            const li = document.createElement("li");
            li.className = "todayTasksList__item";
            li.dataset.id = task.id;

            const time = task.scheduled_time
                ? task.scheduled_time.slice(0, 5)
                : "--:--";

            li.innerHTML = `
                <span class="todayTasksList__time">${time}</span>
                <span class="todayTasksList__dot"></span>
                <span class="todayTasksList__name">${task.name}</span>
            `;

            ul.appendChild(li);
        });

        el.appendChild(ul);
    }

}