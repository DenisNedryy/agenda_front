export class WeekEndModel {

    constructor(weekEndService) {
        this.weekEndService = weekEndService;
    }

    async getWeekEnd() {
        const res = await this.weekEndService.getWeekEnd();
        return res.data.weekEnd;
    }

    async createWeekEnd() {
        const res = await this.weekEndService.getWeekEnd();
        return res.data.msg;
    }

    async updateWeekEnd(weekEndId, day) {
        const res = await this.weekEndService.updateWeekEnd(weekEndId, day); 
        return res.data.msg;
    }
}