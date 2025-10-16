export class HomeCtrl {

    constructor({ homeViews, homeModels }, seoManager, homeEventBinder, taskServices) {
        this.homeView = homeViews.homeView;
        this.dayOffView = homeViews.dayOffView;
        this.englishView = homeViews.englishView;
        this.projetsView = homeViews.projetsView;

        this.dateModel = homeModels.dateModel;
        this.taskModel = homeModels.taskModel;
        this.vocabularyModel = homeModels.vocabularyModel;
        this.weekEndModel = homeModels.weekEndModel;

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
        const weekend = await this.weekEndModel.getWeekEnd();
        const myTasks = await this.taskModel.getTasksByAuth();
        const daysOff = this.taskModel.getDaysOff(myTasks);
        const weekEndFor2Weeks = this.taskModel.getweekEndFor2Weeks(weekend);
        weekEndFor2Weeks.forEach((cell)=>{
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

    async renderMap() {
        // vérification si vocabulaire 
        const isVocabulary = await this.vocabularyModel.isVocabulary();
        if (!isVocabulary) {
            this.englishView.render404();
            return;
        }

        // affichage de la view english
        const pourcentageTotal = await this.vocabularyModel.getTotalFamilyPercentage();
        this.englishView.render(pourcentageTotal);
    }
}