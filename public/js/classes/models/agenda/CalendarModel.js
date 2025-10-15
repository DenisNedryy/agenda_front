export class CalendarModel {

    constructor(dateModel, authService, bankHolidays) {
        this.dateModel = dateModel;
        this.authService = authService;
        this.bankHolidays = bankHolidays;
    }

    async getAgendaPerWeek({ weekParams }, tasks, date = false, weekend) {
        date = date ? date : new Date();

        // calcul du lundiMs
        let currentWeekDayNumber = date.getDay();
        //On remappe dimanche (0) à 7 pour avoir une numérotation 1=lundi … 7=dimanche.
        currentWeekDayNumber = (currentWeekDayNumber === 0) ? 7 : currentWeekDayNumber;
        // Si on est lundi → 1 - 1 = 0 jour à soustraire, Si on est mercredi → 3 - 1 = 2 jours à soustraire.
        const lundiMs = date.getTime() - ((currentWeekDayNumber - 1) * 24 * 60 * 60 * 1000);
        // indication de la date lors de la navigation
        const currentYear = date.getFullYear();
        const currentMonth = this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getMonth() + 1);
        const currentDay = this.dateModel.getFormatForNumbersWidhtZeroBefore(date.getDate());

        const joursFeries = this.bankHolidays.getbankHolidays(currentYear);
        const weeklySchedule = []; // agenda pour la semaine 

        // récupération des weekends
        const weekendArray = [weekend.lundi, weekend.mardi, weekend.mercredi, weekend.jeudi, weekend.vendredi, weekend.samedi, weekend.dimanche];

        for (let i = 0; i < 7; i++) {

            // calcul du des jours de la semaine format [dd/mm/yy] à partir du lundi
            const dayDateMs = lundiMs + (i * 24 * 60 * 60 * 1000);
            const dayDate = new Date(dayDateMs);
            const dayYear = dayDate.getFullYear();
            const dayMonth = this.dateModel.getFormatForNumbersWidhtZeroBefore(dayDate.getMonth() + 1);
            const dayDateNum = this.dateModel.getFormatForNumbersWidhtZeroBefore(dayDate.getDate());
            const dayDay = dayDate.getDay(); // numéro associé au jour (ex: dimanche=0, lundi=1)

            const tasksByDay = [];

            function stripTime(date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            }

            if (weekParams.isBankHolidays) {
                for (let jf of joursFeries) {
                    if (stripTime(dayDate) === stripTime(jf.date)) {
                        tasksByDay.push(jf);
                    }
                }
            }

            if (weekParams.isBirthDays) {
                for (let bd of weekParams.birthDaysTasks) {
                    if (stripTime(dayDate) === stripTime(new Date(bd.date))) { }
                    if (dayDate.getMonth() === new Date(bd.date).getMonth() && dayDate.getDate() === new Date(bd.date).getDate()) {
                        tasksByDay.push(bd);
                    }
                }
            }

            // determine le jour itéré est le jour de la semaine actuel
            function isSameDay(d1, d2) {
                return (
                    d1.getFullYear() === d2.getFullYear() &&
                    d1.getMonth() === d2.getMonth() &&
                    d1.getDate() === d2.getDate()
                );
            }

            // infos général sur le jour
            const dayInfo = {
                dayNumber: dayDate.getDay(),
                year: dayYear,
                month: dayMonth,
                dayDateNum,
                bankHolidays: this.bankHolidays,
                isCurrentDay: (isSameDay(dayDate, new Date())),
                isWeekEnd: weekendArray[i] === 1 ? true : false
            };

            for (let task of tasks) {
                let myDate = this.dateModel.convertDateToSTring(task.date);
                const [taskYear, taskMonth, taskDay] = myDate.split('-').map(Number);

                if (
                    Number(taskYear) === Number(dayYear) &&
                    Number(taskMonth + 1) === Number(dayMonth) &&
                    Number(taskDay) === Number(dayDateNum)
                ) {

                    tasksByDay.push({
                        id: task.id,
                        author_id: task.author_id || null,
                        owner_id: task.owner_id || null,
                        type: task.type,
                        subject: task.subject,
                        name: task.name,
                        description: task.description,
                        date,
                        year: dayYear,
                        month: taskMonth,
                        dateNum: taskDay,
                        dayLetter: dayDay,
                        bg: this.getBgColor(task.type),
                        author_img_url: null
                    });
                }

            }

            const tasksFromOthersUsers = tasksByDay.filter((task) => task.author_id && (task.author_id !== task.owner_id));
            if (tasksFromOthersUsers.length !== 0) {
                await Promise.all(
                    tasksFromOthersUsers.map(async (cell) => {
                        const url = await this.getAuthorImgUrl(cell.author_id);
                        cell.author_img_url = url ?? null;
                    })
                );
            }


            weeklySchedule.push({ tasksByDay, dayInfo });
        }

        return {
            dateSelected: { year: currentYear, month: currentMonth, dateDate: currentDay },
            weeklySchedule: weeklySchedule
        };
    }

    async getAuthorImgUrl(authorId) {
        if (!authorId) return null;
        try {
            const res = await this.authService.getUserById(authorId);
            const user = res?.data?.user ?? res?.data?.users ?? res?.data?.users?.[0] ?? null;
            return user?.img_url ?? null;
        } catch {
            return null;
        }
    }


    getAgendaPerYear(year = false) {
        if (!year) year = new Date().getFullYear();
        const daysPerMonths = [31, this.dateModel.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        this.stateDateMs = currentDate;

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return daysPerMonths.map((days, index) => ({
            year,
            month: index + 1,
            days: Array.from({ length: days }, (_, i) => {
                const day = i + 1;
                return {
                    isCurrentDay: year === currentYear && index === currentMonth && day === currentDay,
                    day,

                };
            })
        }));
    }

    getBgColor(type) {
        switch (type) {
            case 'spaced_repetition':
                return 'bgTasks';
                break;

            case 'tasks':
                return 'bgTasks';
                break;

            case 'events':
                return 'bgEvents';
                break;

            case 'rdvs':
                return 'bgRdvs';
                break;

            case 'projets':
                return 'bgProjects';
                break;

            case 'courses':
                return 'bgCourses';
                break;
        }
    }
}



