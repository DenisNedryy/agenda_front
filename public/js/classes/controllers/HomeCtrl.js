export class HomeCtrl {

    constructor({ homeViews, homeModels }, seoManager, homeEventBinder, taskServices) {
        this.homeView = homeViews.homeView;
        this.dayOffView = homeViews.dayOffView;
        this.englishView = homeViews.englishView;
        this.projetsView = homeViews.projetsView;
        this.todayList = homeViews.todayList;
        this.moviesList = homeViews.moviesList;
        this.tasksManager = homeViews.tasksManager;

        this.dateModel = homeModels.dateModel;
        this.taskModel = homeModels.taskModel;
        this.vocabularyModel = homeModels.vocabularyModel;
        this.weekEndModel = homeModels.weekEndModel;
        this.dateNavigationModel = homeModels.dateNavigationModel;

        this.seoManager = seoManager;
        this.homeEventBinder = homeEventBinder;

        this.taskServices = taskServices;

        this.homeEventBinder.setController(this);
    }

    async show() {
        this.homeView.render();
        this.renderDayOff();
        this.renderProjets();
        this.renderTodayList();
        this.renderMoviesList();
        this.renderTasksManager();


        this.seoManager.setTitle('Schedule - Accueil');
        this.homeEventBinder.addEventListeners();
    }

    async renderDayOff() {
        const weekend = await this.weekEndModel.getWeekEnd();
        const myTasks = await this.taskModel.getTasksByAuth();
        const daysOff = this.taskModel.getDaysOff(myTasks);
        const weekEndFor2Weeks = this.taskModel.getweekEndFor2Weeks(weekend);
        weekEndFor2Weeks.forEach((cell) => {
            daysOff.push(cell);
        });
        // retirer les jours passés
        const currentDayOff = this.taskModel.cleanDayOff(daysOff);
        // retirer le weekend en commun avec le dayOff
        const currentDayOffClean = this.taskModel.reduceSameDate(currentDayOff);
        const nextConsecutiveDaysOff = this.taskModel.getNextConsecutiveDaysOff(currentDayOffClean);
        this.dayOffView.render(nextConsecutiveDaysOff);
    }

    async renderProjets() {
        const projects = await this.taskModel.getTasksByTypeSorted("projets");
        // const projectsWithNewIndexes = this.taskModel.resetIndexes(projects);
        this.projetsView.render(projects);
        this.homeEventBinder.initDragAndDrop();
    }

    async renderTodayList() {
        const todayTasks = await this.taskModel.getTasksForToday();
        this.todayList.render(todayTasks);
    }

    async renderMoviesList() {
        const movies = await this.taskModel.getMoviesList();
        this.moviesList.render(movies);
    }

    async renderTasksManager(filters = {
        search: "",
        type: "all",
        sort: "recent"
    }) {
        const tasks = await this.taskModel.getSearchTasks(filters);
        this.tasksManager.render(tasks);
    }


}