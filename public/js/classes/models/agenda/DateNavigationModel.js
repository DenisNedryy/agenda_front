export class DateNavigationModel {

    constructor(dateModel) {
        this.dateModel = dateModel;
        this.dateSelected = null;
        this.stateYear = null;
    }

    // agenda
    agendaWeekTurnLeft() {
        this.dateSelected -= 60 * 60 * 24 * 7 * 1000;
        const date = new Date(this.dateSelected);
        return `${date.getFullYear()}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getMonth())}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
    }

    agendaWeekTurnRight() {
        this.dateSelected += 60 * 60 * 24 * 7 * 1000;
        const date = new Date(this.dateSelected);
        return `${date.getFullYear()}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getMonth())}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
    }

    setCurrentDateSelected() {
        if (this.dateSelected === null) {
            const currentDate = new Date();
            this.dateSelected = currentDate.getTime();
        }
    }

    previousWeek() {
        this.stateYear--;
        return this.stateYear;
    }

    nextWeek() {
        this.stateYear++;
        return this.stateYear;
    }


    // mini agenda
    miniAgendaNextMonth() {
        this.setCurrentDateSelected();
        const date = new Date(this.dateSelected);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        this.dateSelected = date.getTime();

        return `${date.getFullYear()}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getMonth() + 1)}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
    }

    miniAgendaPreviousMonth() {
        this.setCurrentDateSelected();
        const date = new Date(this.dateSelected);
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        this.dateSelected = date.getTime();
        return `${date.getFullYear()}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getMonth() + 1)}-${this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getDate())}`;
    }

}