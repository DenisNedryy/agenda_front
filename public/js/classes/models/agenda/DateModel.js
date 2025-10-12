import { YEAR_MONTH, WEEK_DAYS } from "../../../constants/schedule.js";

export class DateModel {

    constructor() {
        this.yearMonth = YEAR_MONTH;
        this.weekDays = WEEK_DAYS;

    }

    calculAge(date, year) {
        const birthDate = new Date(date);
        const day = birthDate.getDate();
        const month = birthDate.getMonth();
        const today = new Date(year, month, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }

    ajouterJours(date, nbJours) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(date.getDate() + nbJours);
        return nouvelleDate;
    }

    sortTasksByDate(tasks) {
        return tasks.sort((a, b) => a.date.localeCompare(b.date));
    }

    getDaysInFebruary(year) {
        if (year === null) throw new Error("Year not set");
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    // convertie une date en string avec format 00-00-00
    convertDateToSTring(date = false) {
        if (date === false) {
            date = new Date();
        }
        date = new Date(date);
        const year = date.getFullYear();
        const month = this.getFormatForNumbersWidhtZeroBefore(date.getMonth());
        const day = this.getFormatForNumbersWidhtZeroBefore(date.getDate());
        return `${year}-${month}-${day}`;
    }

    convertDateIntoBeautifulDate(date) {
        const newDate = new Date(date);
        const dayLetter = this.weekDays[newDate.getDay() === 0 ? 6 : newDate.getDay() - 1];
        const day = newDate.getDate();
        const month = this.yearMonth[newDate.getMonth()];
        const year = newDate.getFullYear();
        return `${dayLetter} ${day} ${month} ${year}`;
    }

    // changer le nom et ne marche probablement plus car un peu diff (month+1 ou month+2)
    async fetchTasksFromApi(tasks, userIdSelected, auth) {
        tasks = tasks.filter((task) => task.user_id === (userIdSelected ? userIdSelected : auth.id));
        tasks = tasks.map((task) => {
            const myDate = new Date(task.date);
            return {
                ...task,
                date: this.convertDateToSTring(myDate)
            }
        });
    }

    checkIfTask(year, month, day, tasks) {
        const matchedTasks = tasks.filter(task => {
            const [taskYear, taskMonth, taskDay] = task.date.split("-").map(Number);
            return taskYear === year && taskMonth === month && taskDay === day;
        });
        return matchedTasks.length ? matchedTasks : null;
    }

    calculateNbDaysBewteen2Dates(a) {
        const dateDayOff = new Date(a);
        const currentDate = new Date();
        const diff = dateDayOff - currentDate;
        const dayDiff = diff / (1000 * 60 * 60 * 24);
        return Math.ceil(dayDiff);
    }

    convertStep(step) {
        switch (step) {
            case 0:
                return 1;
                break;

            case 1:
                return 3;
                break;

            case 2:
                return 7;
                break;

            case 3:
                return 15;
                break;

            case 4:
                return 30;
                break;

            case 5:
                return 90;
                break;

            case 6:
                return 180;
                break;

            case 7:
                return 365;
                break;

        }
    }

}
