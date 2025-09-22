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

    async getTasksByTypeSorted(type){
        const res = await this.taskService.readTasksByAuthAndType(type);
        return res.data.tasks;
    }

    resetIndexes(tasks){
        for(let i=0;i<tasks.length;i++){
            tasks[i].sort_order = i+1;
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

    getNextConsecutiveDaysOff(arr) {
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

}