export class UserModel {

    constructor(userService, dateModel) {
        this.userService = userService;
        this.dateModel = dateModel;

        this.userIdSelected = null;
    }

    

    async getUserSelectedTasks(auth, userSelected, tasks) {
        const selectedUserId = userSelected?.id ?? auth.id;
        const myTasksProvisoire = tasks.filter((task) => task.user_id === selectedUserId);
        let myTasks = myTasksProvisoire.map((task) => {

            const myDate = new Date(task.date);
            const year = myDate.getFullYear();
            const month = this.dateModel.getFormatForNumbersWidhtZeroBefore(myDate.getMonth() + 1);
            const date = this.dateModel.getFormatForNumbersWidhtZeroBefore(myDate.getDate());
            return {
                ...task,
                date: `${year}-${month}-${date}`
            }
        });
        return myTasks;
    }
}