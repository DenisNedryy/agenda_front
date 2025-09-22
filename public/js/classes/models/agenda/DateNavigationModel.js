export class DateNavigationModel {

    constructor(dateModel) {
        this.dateModel = dateModel;
        this.dateSelected = null;
        this.stateYear = null;
    }

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

}