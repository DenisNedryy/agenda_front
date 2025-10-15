export class AgendaDayOffView {

    render(data) {
        console.log(data);
        const el = document.querySelector(".agendaContent");
        if (el) {
            el.innerHTML = "";

            const daysWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

            const ul = document.createElement("ul");
            ul.setAttribute("data-id", data.uuid);
            ul.className = "agendaContent__weekDays";
            
            daysWeek.forEach((day) => {
                const li = document.createElement("li");
                li.className = "agendaContent__weekDays__day";
                li.setAttribute("data-day", day);
                const box = document.createElement("div");
                box.className = "blueCheckBox";

                if (data[day] === 1) {
                    const icon = document.createElement("i");
                    icon.className = "fa-solid fa-check";
                    box.appendChild(icon);
                }

                const dayPara = document.createElement("p");
                dayPara.textContent = day;
                li.appendChild(box);
                li.appendChild(dayPara);
                ul.appendChild(li);
            });
            el.appendChild(ul);

        }
    }
}