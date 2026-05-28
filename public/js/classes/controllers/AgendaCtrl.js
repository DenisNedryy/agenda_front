export class AgendaCtrl {

    constructor(seoManager, modalView, { agendaViews, agendaModels, agendaServices, agendaEventBinders }) {
        this.seoManager = seoManager;
        this.modalView = modalView;

        this.agendaView = agendaViews.agendaView;
        this.agendaWeekView = agendaViews.agendaWeekView;
        this.agendaNavView = agendaViews.agendaNavView;
        this.agendaParamsView = agendaViews.agendaParamsView;
        this.agendaCalendarView = agendaViews.agendaCalendarView;
        this.yearView = agendaViews.yearView;
        this.planningView = agendaViews.planningView;
        this.addModelView = agendaViews.addModelView;
        this.focusModalView = agendaViews.focusModalView;
        this.agendaDayOffView = agendaViews.agendaDayOffView;
        this.miniCalendarView = agendaViews.miniCalendarView;

        this.dateModel = agendaModels.dateModel;
        this.taskModel = agendaModels.taskModel;
        this.bankHolidaysModel = agendaModels.bankHolidaysModel;
        this.birthDaysModel = agendaModels.birthDaysModel;
        this.calendarModel = agendaModels.calendarModel;
        this.dateNavigationModel = agendaModels.dateNavigationModel;
        this.userModel = agendaModels.userModel;
        this.planningModel = agendaModels.planningModel;
        this.modalModel = agendaModels.modalModel;
        this.weekEndModel = agendaModels.weekEndModel;

        this.authServices = agendaServices.authServices;
        this.taskServices = agendaServices.taskServices;
        this.birthDaysServices = agendaServices.birthDaysServices;
        this.spaceRepService = agendaServices.spaceRepService;
        this.weekEndService = agendaServices.weekEndService;

        this.agendaEventBinder = agendaEventBinders.agendaEventBinder;
        this.agendaWeekEventBinder = agendaEventBinders.agendaWeekEventBinder;
        this.agendaYearEventBinder = agendaEventBinders.agendaYearEventBinder;
        this.agendaPlanningEventBinder = agendaEventBinders.agendaPlanningEventBinder;
        this.agendaDayOffEventBinder = agendaEventBinders.agendaDayOffEventBinder;

        this.agendaEventBinder.setController(this);
        this.agendaWeekEventBinder.setController(this);
        this.agendaYearEventBinder.setController(this);
        this.agendaPlanningEventBinder.setController(this);
        this.agendaDayOffEventBinder.setController(this);

    };

    async show(dateSelected = null, month = null) {
        await this.authServices.init();
        this.dateNavigationModel.setCurrentDateSelected();
        const auth = await this.authServices.getAuth();
        const userSelectedRes = await this.authServices.getUserById(this.authServices.userIdSelected);
        const userSelected = userSelectedRes.data.user;
        const tasksRes = await this.taskModel.getTasks();
        const tasks = tasksRes.data.tasks;
        const tasksFiltered = await this.userModel.getUserSelectedTasks(auth, userSelected, tasks);

        if (this.birthDaysModel.birthDays) {
            const allBirthDaysRes = await this.birthDaysServices.getBirthDaysByAuth();
            const allBirthDays = allBirthDaysRes.data.birthDays || [];
            this.birthDaysModel.birthDaysTask = allBirthDays;
        }

        const date = new Date(this.dateNavigationModel.dateSelected);
        const weekParams = {
            isBankHolidays: this.bankHolidaysModel.bankHolidays,
            isBirthDays: this.birthDaysModel.birthDays,
            birthDaysTasks: this.birthDaysModel.birthDaysTask
        }
        const weekend = await this.weekEndModel.getWeekEnd();
        const weekData = await this.calendarModel.getAgendaPerWeek({ weekParams }, tasksFiltered, date, weekend);
        const params = await this.authServices.getUsersStatus();
        params.bankHolidays = this.bankHolidaysModel.bankHolidays;
        params.birthDays = this.birthDaysModel.birthDays;

        this.agendaView.render();
        this.agendaWeekView.render();
        this.agendaNavView.render(weekData.dateSelected);
        this.agendaParamsView.render(params);
        this.agendaCalendarView.render(weekData.weeklySchedule);
        // this.agendaCalendarView.renderMobileView(weekData.weeklySchedule, dateSelected);

        const selectedDate = new Date(this.dateNavigationModel.dateSelected);
        const selectedYear = selectedDate.getFullYear();
        const data = this.calendarModel.getAgendaPerYear(selectedYear);

        const monthSelected = month !== null
            ? month
            : dateSelected !== null
                ? new Date(dateSelected).getMonth()
                : new Date().getMonth();


        const dataMonth = data.filter((cell) => cell.month === monthSelected + 1);

        if (!dataMonth.length) {
            console.error("Aucun mois trouvé pour :", monthSelected, data);
            return;
        }

        this.miniCalendarView.render(dataMonth);

        this.addModelView.renderModel();
        this.addModelView.renderModelMobile();
        this.seoManager.setTitle('Schedule - Agenda');

        this.agendaEventBinder.addEventListeners();
        this.agendaWeekEventBinder.addEventListeners();
        this.agendaYearEventBinder.addEventListeners();
        this.agendaPlanningEventBinder.addEventListeners();
        this.agendaDayOffEventBinder.addEventListeners();
    }
}