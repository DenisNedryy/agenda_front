import { AgendaView } from "../classes/views/AgendaView.js";
import { AgendaWeekView } from "../classes/components/agenda/agenda_week/AgendaWeekView.js";
import { AgendaNavView } from "../classes/components/agenda/agenda_week/AgendaNavView.js";
import { AgendaParamsView } from "../classes/components/agenda/agenda_week/AgendaParamsView.js";
import { AgendaCalendarView } from "../classes/components/agenda/agenda_week/AgendaCalendarView.js";
import { YearView } from "../classes/components/agenda/agenda_year/YearView.js";
import { PlanningView } from "../classes/components/agenda/agenda_planning/PlanningView.js";
import { CalendarModel } from "../classes/models/agenda/CalendarModel.js";
import { AgendaDayOffView } from "../classes/components/agenda/agenda_dayOff/AgendaDayOffView.js";
import { DateModel } from "../classes/models/agenda/DateModel.js";
import { AuthServices } from "../classes/services/AuthServices.js";
import { UserServices } from "../classes/services/UserServices.js";
import { BankHolidaysModel } from "../classes/models/agenda/BankHolidaysModel.js";
import { AddModelView } from "../classes/components/agenda/agenda_week/AddModelView.js";
import { FocusModalView } from "../classes/components/agenda/agenda_week/FocusModelView.js";
import { TaskModel } from "../classes/models/agenda/TaskModel.js";
import { TaskServices } from "../classes/services/TaskServices.js";
import { BirthDaysModel } from "../classes/models/agenda/BirthDaysModel.js";
import { BirthDaysServices } from "../classes/services/BirthDaysServices.js";
import { DateNavigationModel } from "../classes/models/agenda/DateNavigationModel.js";
import { UserModel } from "../classes/models/agenda/UserModel.js";
import { ModalModel } from "../classes/models/agenda/ModalModel.js";
import { PlanningModel } from "../classes/models/agenda/PlanningModel.js";
import { AgendaEventBinder } from "../classes/eventBinders/agenda/AgendaEventBinder.js";
import { AgendaWeekEventBinder } from "../classes/eventBinders/agenda/AgendaWeekEventBinder.js";
import { AgendaYearEventBinder } from "../classes/eventBinders/agenda/AgendaYearEventBinder.js";
import { AgendaPlanningEventBinder } from "../classes/eventBinders/agenda/AgendaPlanningEventBinder.js";
import { AgendaDayOffEventBinder } from "../classes/eventBinders/agenda/AgendaDayOffEventBinder.js";
import { AgendaCtrl } from "../classes/controllers/AgendaCtrl.js";
import { SpaceRepService } from "../classes/services/SpaceRepService.js";
import { WeekEndService } from "../classes/services/WeekEndService.js";
import { WeekEndModel } from "../classes/models/agenda/WeekEndModel.js";
import { ModalView } from "../classes/views/ModalView.js";


export function initAgenda(seoManager) {

    const weekEndService = new WeekEndService();
    const weekEndModel = new WeekEndModel(weekEndService);
    const userServices = new UserServices();
    const authServices = new AuthServices(userServices);
    const agendaView = new AgendaView();
    const agendaWeekView = new AgendaWeekView();
    const dateModel = new DateModel();
    const agendaNavView = new AgendaNavView(dateModel);
    const agendaParamsView = new AgendaParamsView();
    const agendaCalendarView = new AgendaCalendarView(dateModel);
    const agendaDayOffView = new AgendaDayOffView();
    const yearView = new YearView();
    const planningView = new PlanningView(dateModel);
    const bankHolidaysModel = new BankHolidaysModel();
    const calendarModel = new CalendarModel(dateModel, authServices, bankHolidaysModel);
    const addModelView = new AddModelView();
    const focusModalView = new FocusModalView(dateModel);
    const taskServices = new TaskServices();
    const taskModel = new TaskModel(dateModel, taskServices);
    const birthDaysServices = new BirthDaysServices();
    const birthDaysModel = new BirthDaysModel(birthDaysServices);
    const dateNavigationModel = new DateNavigationModel(dateModel);
    const userModel = new UserModel(userServices, dateModel);
    const planningModel = new PlanningModel(dateModel);
    const modalModel = new ModalModel();
    const agendaEventBinder = new AgendaEventBinder();
    const agendaWeekEventBinder = new AgendaWeekEventBinder();
    const agendaYearEventBinder = new AgendaYearEventBinder();
    const agendaPlanningEventBinder = new AgendaPlanningEventBinder();
    const agendaDayOffEventBinder = new AgendaDayOffEventBinder();
    const spaceRepService = new SpaceRepService();
    const modalView = new ModalView();


    const agendaViews = Object.freeze({
        agendaView: agendaView,
        agendaWeekView: agendaWeekView,
        agendaNavView: agendaNavView,
        agendaParamsView: agendaParamsView,
        agendaCalendarView: agendaCalendarView,
        yearView: yearView,
        planningView: planningView,
        addModelView: addModelView,
        focusModalView: focusModalView,
        agendaDayOffView: agendaDayOffView
    });

    const agendaModels = Object.freeze({
        dateModel: dateModel,
        taskModel: taskModel,
        bankHolidaysModel: bankHolidaysModel,
        birthDaysModel: birthDaysModel,
        calendarModel: calendarModel,
        dateNavigationModel: dateNavigationModel,
        userModel: userModel,
        planningModel: planningModel,
        modalModel: modalModel,
        weekEndModel: weekEndModel
    });
    const agendaServices = Object.freeze({
        authServices: authServices,
        taskServices: taskServices,
        birthDaysServices: birthDaysServices,
        spaceRepService: spaceRepService,
        weekEndService: weekEndService
    });

    const agendaEventBinders = Object.freeze({
        agendaEventBinder: agendaEventBinder,
        agendaWeekEventBinder: agendaWeekEventBinder,
        agendaYearEventBinder: agendaYearEventBinder,
        agendaPlanningEventBinder: agendaPlanningEventBinder,
        agendaDayOffEventBinder: agendaDayOffEventBinder
    })

    const agendaCtrl = new AgendaCtrl(seoManager, modalView, { agendaViews, agendaModels, agendaServices, agendaEventBinders });

    return agendaCtrl;
}