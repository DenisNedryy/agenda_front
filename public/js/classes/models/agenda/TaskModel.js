export class TaskModel {

    constructor(dateModel, taskService) {
        this.dateModel = dateModel;
        this.taskService = taskService;
    }

    getTasks() {
        return this.taskService.getTasks();
    }

    async getTasksByAuth() {
        const res = await this.taskService.getTasksByAuth();
        return res.data.tasks;
    }

    async getAlerts() {
        const res = await this.taskService.getAlerts();
        return res.data.alerts;
    }

    getDaysOff(tasks) {
        if (tasks)
            return tasks.filter((task) => task.type === "dayOff");
    }

    getEvents(tasks) {
        if (tasks)
            return tasks.filter((task) => task.type === "events");
    }

    getProjects(tasks) {
        if (tasks)
            return tasks.filter((task) => task.type === "projets");
    }

    getRdvs(tasks) {
        return tasks.filter((task) => task.type === "rdvs");
    }

    async getTasksByTypeSorted(type) {
        const res = await this.taskService.readTasksByAuthAndType(type);
        return res.data.tasks;
    }

    resetIndexes(tasks) {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].sort_order = i + 1;
        }
        return tasks;
    }

    getNextEvent(events) {
        const currentDate = new Date();
        for (let i = 0; i < events.length; i++) {
            const eventDate = new Date(events[i].date);
            if (eventDate >= currentDate) {
                return events[i];
                break;
            }
        }
    }

    get3FirstRdvs(rdvs) {
        const arr = [];
        for (let i = 0; i < 3; i++) {
            if (rdvs[i]) arr.push(rdvs[i]);
        }
        return arr;
    }

    getweekEndFor2Weeks(weekend) {

        // récupération du weekend en propre
        const weekEndDays = [
            { day: "lundi", isWeekEnd: weekend.lundi, num: 1, date: this.getDateOfWeek("lundi") },
            { day: "mardi", isWeekEnd: weekend.mardi, num: 2, date: this.getDateOfWeek("mardi") },
            { day: "merdredi", isWeekEnd: weekend.merdredi, num: 3, date: this.getDateOfWeek("mercredi") },
            { day: "jeudi", isWeekEnd: weekend.jeudi, num: 4, date: this.getDateOfWeek("jeudi") },
            { day: "vendredi", isWeekEnd: weekend.vendredi, num: 5, date: this.getDateOfWeek("vendredi") },
            { day: "samedi", isWeekEnd: weekend.samedi, num: 6, date: this.getDateOfWeek("samedi") },
            { day: "dimanche", isWeekEnd: weekend.dimanche, num: 0, date: this.getDateOfWeek("dimanche") },
        ];

        const weekEndThisWeek = weekEndDays.filter((cell) => cell.isWeekEnd);
        const total = weekEndThisWeek;
        weekEndThisWeek.forEach((cell) => {
            total.push({ ...cell, date: this.getDateOfWeek(cell.day, true) });
        })
        return total;
    }

    cleanDayOff(dayOff) {
        const sorted = dayOff.filter((cell) => new Date(cell.date) >= new Date());
        return sorted || [];
    }

    getDateOfWeek(dayName, nextWeek = false) {
        const daysOfWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        const today = new Date();

        // Ajustement : lundi = 0, dimanche = 6
        const todayIndex = (today.getDay() + 6) % 7;
        const targetIndex = daysOfWeek.indexOf(dayName.toLowerCase());

        if (targetIndex === -1) {
            throw new Error("Nom de jour invalide : " + dayName);
        }

        // Trouver le lundi de cette semaine
        const monday = new Date(today);
        monday.setDate(today.getDate() - todayIndex);

        // Ajouter le décalage pour atteindre le jour voulu
        const targetDate = new Date(monday);
        targetDate.setDate(monday.getDate() + targetIndex + (nextWeek ? 7 : 0));

        return targetDate;
    }



    getNextConsecutiveDaysOff(arr) {
        console.log(arr);
        let isStarted = false;
        let previousDate = null;
        const nextConsecutiveDaysOff = [];
        const daysOff = arr.sort((a, b) => new Date(a.date) - new Date(b.date));
        for (let i = 0; i < daysOff.length; i++) {
            if (!isStarted && daysOff.length > 0) {
                const date = new Date(daysOff[i].date);
                nextConsecutiveDaysOff.push(daysOff[i]);
                isStarted = true;
                previousDate = date;
            } else if (isStarted) {
                const currentDate = new Date(daysOff[i].date);
                const diff = currentDate - previousDate;
                const dayDiff = diff / (1000 * 60 * 60 * 24);
                previousDate = currentDate;
                if (dayDiff > 1) {
                    break;
                } else {
                    previousDate = new Date(daysOff[i].date);
                    nextConsecutiveDaysOff.push(daysOff[i]);
                }
            }
        }
        return nextConsecutiveDaysOff;
    }

    async toggleCardToDelete(taskId) {
        const res = await this.taskService.toggleCardToDelete(taskId);
        if (res.ok) {
            return res.data.msg;
        } else {
            return res.data.msg;
        }
    }

    async reviewTomorow(taskId) {
        const res = await this.taskService.reviewTomorow(taskId);
        return res.data.msg;
    }

}