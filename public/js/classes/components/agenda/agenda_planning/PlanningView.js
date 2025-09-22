export class PlanningView {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }


    render(tasks, type = "all") {
        const el = document.querySelector(".agendaContent");
        if (el) {
            el.innerHTML = `
            <div class="tasksFilters">
                <p class="taskFilter--all ${type === "all" ? 'taskFilter--active' : ''}">All</p>
                <p class="taskFilter--tasks ${type === "tasks" ? 'taskFilter--active' : ''}">Tasks</p>
                <p class="taskFilter--courses ${type === "courses" ? 'taskFilter--active' : ''}">Courses</p>
                <p class="taskFilter--rdvs ${type === "rdvs" ? 'taskFilter--active' : ''}">Rdvs</p>
                <p class="taskFilter--events ${type === "events" ? 'taskFilter--active' : ''}">Events</p>
                <p class="taskFilter--projects ${type === "projects" ? 'taskFilter--active' : ''}">Projects</p> 
                <p class="taskFilter--spacedRepetition ${type === "spacedRepetition" ? 'taskFilter--active' : ''}">Spaced repetition</p> 
                <p class="taskFilter--alerts ${type === "alerts" ? 'taskFilter--active' : ''}">Alerts</p> 
                <p class="taskFilter--dayOff ${type === "dayOff" ? 'taskFilter--active' : ''}">Days off</p> 
            </div>
            <div class="tasksKeys">
                  <p class="tasksKeys--type">Type</p>
                  <p class="tasksKeys--name">Name</p>
                  <p class="tasksKeys--status">Status</p>
                  <p class="tasksKeys--date">Date</p>
            </div>
            <div class="tasksContent"></div>
            `;
        }

    }



    renderAll(tasks) {
        const el = document.querySelector(".tasksContent");
        if (el) {
            let cpt = 0;
            for (let i = 0; i < tasks.length; i++) {
                const taskContainer = document.createElement("div");
                taskContainer.className = "tasksContent__container fade-in";
                taskContainer.setAttribute("data-date", tasks[i].date);

                const taskType = document.createElement("p");
                taskType.className = "task--type";
                taskType.textContent = tasks[i].type;
                taskContainer.appendChild(taskType);

                const taskName = document.createElement("p");
                taskName.className = "task--name";
                taskName.textContent = tasks[i].name;
                taskContainer.appendChild(taskName);

                const taskStatus = document.createElement("div");
                taskStatus.className = `task--status`;
                const para = document.createElement("p");
                para.textContent = tasks[i].status === 0 ? "To do" : "Late";
                para.className = `${tasks[i].status === 0 ? "border--green" : "border--red"}`;
                taskStatus.appendChild(para);
                taskContainer.appendChild(taskStatus);

                const taskDate = document.createElement("p");
                taskDate.className = "task--date";
                taskDate.textContent =this.dateModel.convertDateIntoBeautifulDate(tasks[i].date);
                taskContainer.appendChild(taskDate);
                
                setTimeout(() => {
                    el.appendChild(taskContainer);
                }, cpt);

                cpt += 100;
            }
        }

    }
}