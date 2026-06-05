export class TasksManager {
    constructor() {
        this.tasks = [];
    }

    render(data = []) {
        const el = document.querySelector(".home__bodyContainer__right__findTasks__body__content");
        if (!el) return;

        this.tasks = Array.isArray(data) ? data : [data];

        this.bindFilters();
        this.displayTasks(this.tasks);
    }

    displayTasks(tasks = []) {

        const el = document.querySelector(".home__bodyContainer__right__findTasks__body__content");

        if (!el) return;

        if (!tasks.length) {
            el.innerHTML = `
                <p class="findTasks__empty">
                    No task found
                </p>
            `;
            return;
        }

        el.innerHTML = tasks.map(task => `
            <div
                class="findTasks__task"
                data-id="${task.id}"
                data-date="${task.date ? new Date(task.date).toLocaleDateString("fr-CA") : ""}"
            >

                <div class="findTasks__task__left">

                    <p class="findTasks__task__name">
                        ${task.name || "Sans titre"}
                    </p>

                </div>

                <div class="findTasks__task__right">

                    <span class="findTasks__task__type type-${task.type}">
                        ${this.formatType(task.type)}
                    </span>

                    <span class="findTasks__task__date">
                        ${this.formatDate(task.date)}
                    </span>

                    <div class="findTasks__task__actions">

                        <button
                            class="findTasks__task__btn openTaskBtn"
                            data-id="${task.id}"
                        >
                            <i class="fa-solid fa-arrow-up-right-from-square btn-selectDate"></i>
                        </button>

                        <button
                            class="findTasks__task__btn deleteTaskBtn"
                            data-id="${task.id}"
                        >
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

                    </div>

                </div>

            </div>
        `).join("");
    }

    bindFilters() {
        const searchInput = document.querySelector(".findTasksSearchInput");
        const typeSelect = document.querySelector(".findTasksType");
        const sortSelect = document.querySelector(".findTasksSort");

        if (searchInput) {
            searchInput.oninput = () => this.applyFilters();
        }

        if (typeSelect) {
            typeSelect.onchange = () => this.applyFilters();
        }

        if (sortSelect) {
            sortSelect.onchange = () => this.applyFilters();
        }
    }

    applyFilters() {
        const searchValue =
            document.querySelector(".findTasksSearchInput")
                ?.value
                .toLowerCase()
                .trim() || "";

        const typeValue =
            document.querySelector(".findTasksType")
                ?.value || "all";

        const sortValue =
            document.querySelector(".findTasksSort")
                ?.value || "recent";

        let filteredTasks = [...this.tasks];

        if (searchValue) {
            filteredTasks = filteredTasks.filter(task =>
                task.name?.toLowerCase().includes(searchValue) ||
                task.description?.toLowerCase().includes(searchValue)
            );
        }

        if (typeValue !== "all") {
            filteredTasks = filteredTasks.filter(
                task => task.type === typeValue
            );
        }

        filteredTasks.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return sortValue === "oldest"
                ? dateA - dateB
                : dateB - dateA;
        });

        this.displayTasks(filteredTasks);
    }

    formatDate(date) {
        if (!date) return "Aucune date";

        return new Date(date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    formatTime(time) {
        return time ? time.slice(0, 5) : "";
    }

    formatType(type) {
        const types = {
            tasks: "Tâche",
            movies: "Film",
            spaced_repetition: "Révision",
            courses: "Cours",
            rdvs: "RDV",
            events: "Évènement",
            projets: "Projet",
            alert: "Alerte",
            dayOff: "Repos"
        };

        return types[type] || "Tâche";
    }
}