export class PlanningModel {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    getTasksByType(tasks, type = "all") {
        if (type === "all") {
            return this.getPlanning(tasks);
        } else {
            return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === type));
        }
    }

    async getPlanning(tasks) {
        return this.dateModel.sortTasksByDate(tasks);
    }

    async getPlanningTasks(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "tasks"));
    }

    async getPlanningCourses(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "courses"));
    }

    async getPlanningRdvs(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "rdvs"));
    }

    async getPlanningEvents(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "events"));
    }

    async getPlanningProjets(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "projets"));
    }
    async getPlanningAlerts(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "alert"));
    }
    async getPlanningDayOff(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "dayOff"));
    }
    async getPlanningSpaceRepetition(tasks) {
        return this.dateModel.sortTasksByDate(tasks.filter((task) => task.type === "spaced_repetition"));
    }
}