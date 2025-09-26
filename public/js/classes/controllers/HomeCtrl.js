export class HomeCtrl {

    constructor({ homeViews, homeModels }, seoManager, homeEventBinder, taskServices) {
        this.homeView = homeViews.homeView;
        this.dayOffView = homeViews.dayOffView;
        this.englishView = homeViews.englishView;
        this.projetsView = homeViews.projetsView;

        this.dateModel = homeModels.dateModel;
        this.taskModel = homeModels.taskModel;
        this.vocabularyModel = homeModels.vocabularyModel;

        this.seoManager = seoManager;
        this.homeEventBinder = homeEventBinder;



        this.taskServices = taskServices;

        this.homeEventBinder.setController(this);
    }

    async show() {
        this.homeView.render();
        this.renderDayOff();
        this.renderProjets();
        this.renderMap();
        
        this.seoManager.setTitle('Schedule - Accueil');
        this.homeEventBinder.addEventListeners();
    }

    async renderDayOff() {
        const myTasks = await this.taskModel.getTasksByAuth();
        const daysOff = this.taskModel.getDaysOff(myTasks);
        const nextConsecutiveDaysOff = this.taskModel.getNextConsecutiveDaysOff(daysOff);
        this.dayOffView.render(nextConsecutiveDaysOff);
    }

    async renderProjets() {
        const projects = await this.taskModel.getTasksByTypeSorted("projets");
        // const projectsWithNewIndexes = this.taskModel.resetIndexes(projects);
        this.projetsView.render(projects);
        this.homeEventBinder.initDragAndDrop(); 
    }

    async renderMap() {
        const pourcentageTotal = await this.vocabularyModel.getTotalFamilyPercentage();
        this.englishView.render(pourcentageTotal);
    }
}