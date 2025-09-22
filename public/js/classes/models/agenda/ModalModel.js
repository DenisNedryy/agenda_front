export class ModalModel {

    constructor() {
        this.modalAddDate = null;
    }

    getTaskObj(form, userIdSelected, auth) {
        let date = null;
        const modalContainer = form.closest(".modalContent");
        if (modalContainer.getAttribute("data-selected-date")) date = modalContainer.getAttribute("data-selected-date");
        if (!modalContainer.getAttribute("data-selected-date")) date = this.modalAddDate;

        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        const type = form.elements['type'].value;
        const subject = form.elements['subject'].value;
        form.reset();
        const task = {
            name: name || null,
            description: description || null,
            type: type || null,
            subject: subject || null,
            date: date,
            owner_id: userIdSelected
        };
        // check if auth!==current 
        if (auth.id !== userIdSelected) {
            task.author_id = auth.id;
            task.author_img_url = auth.img_url
        }

        // check if null values
        if (!task.name) return;
        return task;
    }
}
