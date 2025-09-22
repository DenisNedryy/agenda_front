export class BirthDaysModel {

    constructor(birthDaysServices) {
        this.birthDays = true;
        this.birthDaysServices = birthDaysServices;
        this.birthDaysTask = [];

        this.init();
    }

    async init() {
        this.birthDaysTask = await this.getBirthDaysByAuth();
    }

    enable() {
        this.birthDays = true;
    }

    disable() {
        this.birthDays = false;
    }

    toggle() {
        this.birthDays = !this.birthDays;
    }

    async getBirthDaysByAuth() {
        const res = await this.birthDaysServices.getBirthDaysByAuth();
        return res.data.birthDays;
    }

    async addBirthDay(data) {
        await this.birthDaysServices.addBirthDay(data);
    }

    async deleteBirthDay(id) {
        await this.birthDaysServices.deleteBirthDay(id);
    }
}