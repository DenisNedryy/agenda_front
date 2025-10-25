export class FocusModalView {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    // render(task) {
    //     const el = document.querySelector(".modalFocus");
    //     if (el) {
    //         const date = new Date(task.date);
    //         const year = date.getFullYear();
    //         const month = date.getMonth() + 1;
    //         const day = date.getDate();
    //         const dayNum = date.getDay();
    //         el.innerHTML = `
    //             <div class="modalContent" data-id=${task.id}>
    //                 <div class="modalContent__header">
    //                     <i class="fa-solid fa-pencil task-update"></i>
    //                     <i class="fa-solid fa-trash-can task-delete"></i>
    //                     <i class="fa-solid fa-xmark task-leave"></i>
    //                 </div>
    //                 <div class="modalContent__body">
    //                 <div class="modalContent__body__name">
    //                         <div class="boxTitle"> </div>
    //                             <div>
    //                             <p class="type-title">${task.type}</p>
    //                               <p>${task.name}</p>
    //                               <p> ${day} ${this.dateModel.yearMonth[month - 1]} ${year}</p>             
    //                             </div>
    //                         </div>


    //               ${task.description ? `<div class="modalContent__body__description">
    //                                          <i class="fa-solid fa-bars"></i>
    //                                          <p>${task.description}</p>
    //                                     </div>` : ''}
    //                                       ${task.type === "spaced_repetition" ? '': `
    //                             <div>
    //                                 <button class="btn-mini btn-task-reviewTomorow">Review Tomorrow</button>
    //                             </div>
    //                             `}

    //                  <div class="modalContent__body__spaceRepetition"></div>
    //                 </div>
    //                 <div class="modalContent__footer hidden">
    //                     <form>
    //                         <div>
    //                             <label>Name</label>
    //                             <input type="text" name="name"/>
    //                         </div>
    //                         <div>
    //                             <label for="description">Description</label>
    //                             <textarea name="description" id="description"></textarea>
    //                         </div>
    //                         <div>
    //                           <label for="typeSelect">Type</label>
    //                          <select id="typeSelect" name="type">
    //                              <option value="tasks">Tasks</option>
    //                              <option value="courses">Courses</option>
    //                              <option value="rdvs">Rdvs</option>
    //                              <option value="events">Events</option>
    //                              <option value="projets">Projets</option>
    //                           </select>
    //                      </div>
    //                        <button type="submit" class="btn btn-updateTask">Update</button>
    //                     </form>
    //                 </div>
    //             </div>
    //           `;
    //     }
    //     if (task.type === "spaced_repetition") this.renderSpaceRepetition(task);
    // }

    renderMobile(task) {
        const el = document.querySelector(".modalFocus2");
        if (!el) return;

        // Nettoyage du contenu précédent
        el.innerHTML = "";

        const date = new Date(task.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const monthName = this.dateModel?.yearMonth?.[month - 1] || month;

        // === MODAL CONTENT ===
        const modalContent = document.createElement("div");
        modalContent.classList.add("modalContent");
        modalContent.dataset.id = task.id;

        // === HEADER ===
        const header = document.createElement("div");
        header.classList.add("modalContent__header");

        const iconUpdate = document.createElement("i");
        iconUpdate.classList.add("fa-solid", "fa-pencil", "task-update2");

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid", "fa-trash-can", "task-delete2");

        const iconLeave = document.createElement("i");
        iconLeave.classList.add("fa-solid", "fa-xmark", "task-leave2");

        header.append(iconUpdate, iconDelete, iconLeave);

        // === BODY ===
        const body = document.createElement("div");
        body.classList.add("modalContent__body");

        // -- bloc name --
        const nameBlock = document.createElement("div");
        nameBlock.classList.add("modalContent__body__name");

        const boxTitle = document.createElement("div");
        boxTitle.classList.add("boxTitle");

        const nameInner = document.createElement("div");

        const pType = document.createElement("p");
        pType.classList.add("type-title");
        pType.textContent = task.type;

        const pName = document.createElement("p");
        pName.classList.add("focusTask-title");
        pName.textContent = task.name;

        const pDate = document.createElement("p");
        pDate.textContent = `${day} ${monthName} ${year}`;

        nameInner.append(pType, pName, pDate);
        nameBlock.append(boxTitle, nameInner);
        body.appendChild(nameBlock);

        // -- description optionnelle --
        if (task.description) {
            const descWrap = document.createElement("div");
            descWrap.classList.add("modalContent__body__description");

            const descIcon = document.createElement("i");
            descIcon.classList.add("fa-solid", "fa-bars");

            const descTextContainer = document.createElement("div");

            const descTextArray = task.description.split("\n");
            descTextArray.forEach((cell) => {
                const descText = document.createElement("p");
                descText.textContent = cell;
                descTextContainer.appendChild(descText);
            })

            descWrap.append(descIcon, descTextContainer);
            body.appendChild(descWrap);
        }

        // -- bouton Review Tomorrow (si pas spaced_repetition) --
        if (task.type !== "spaced_repetition") {
            const btnContainer = document.createElement("div");
            const btn = document.createElement("button");
            btn.classList.add("btn-mini", "btn-task-reviewTomorow");
            btn.setAttribute("type", "button");
            btn.textContent = "Review Tomorrow";
            btnContainer.appendChild(btn);
            body.appendChild(btnContainer);
        }

        // -- espace répétition (vide pour l’instant) --
        const srContainer = document.createElement("div");
        srContainer.classList.add("modalContent__body__spaceRepetition");
        body.appendChild(srContainer);

        // === FOOTER ===
        const footer = document.createElement("div");
        footer.classList.add("modalContent__footer", "hidden");

        const form = document.createElement("form");

        // --- champ Name ---
        const divName = document.createElement("div");
        const labelName = document.createElement("label");
        labelName.textContent = "Name";
        const inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("name", "name");
        divName.append(labelName, inputName);

        // --- champ Description ---
        const divDesc = document.createElement("div");
        const labelDesc = document.createElement("label");
        labelDesc.setAttribute("for", "description");
        labelDesc.textContent = "Description";
        const textarea = document.createElement("textarea");
        textarea.setAttribute("name", "description");
        textarea.setAttribute("id", "description");
        divDesc.append(labelDesc, textarea);

        // --- champ Type ---
        const divType = document.createElement("div");
        const labelType = document.createElement("label");
        labelType.setAttribute("for", "typeSelect");
        labelType.textContent = "Type";
        const select = document.createElement("select");
        select.setAttribute("id", "typeSelect");
        select.setAttribute("name", "type");

        const options = [
            { value: "tasks", text: "Tasks" },
            { value: "courses", text: "Courses" },
            { value: "rdvs", text: "Rdvs" },
            { value: "events", text: "Events" },
            { value: "projets", text: "Projets" }
        ];
        options.forEach(opt => {
            const optionEl = document.createElement("option");
            optionEl.value = opt.value;
            optionEl.textContent = opt.text;
            select.appendChild(optionEl);
        });
        divType.append(labelType, select);

        // --- bouton Update ---
        const btnSubmit = document.createElement("button");
        btnSubmit.classList.add("btn", "btn-updateTask");
        btnSubmit.setAttribute("type", "submit");
        btnSubmit.textContent = "Update";

        form.append(divName, divDesc, divType, btnSubmit);
        footer.appendChild(form);

        // === ASSEMBLAGE FINAL ===
        modalContent.append(header, body, footer);
        el.appendChild(modalContent);

        // === si spaced_repetition ===
        if (task.type === "spaced_repetition") {
            this.renderSpaceRepetition(task);
        }
    }


    render(task) {
        const el = document.querySelector(".modalFocus");
        if (!el) return;

        const date = new Date(task.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Création de la modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modalContent');
        modalContent.dataset.id = task.id;

        // Header
        const header = document.createElement('div');
        header.classList.add('modalContent__header');
        ['fa-solid fa-pencil task-update', 'fa-solid fa-trash-can task-delete', 'fa-solid fa-xmark task-leave']
            .forEach(cls => {
                const icon = document.createElement('i');
                icon.className = cls;
                header.appendChild(icon);
            });
        modalContent.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.classList.add('modalContent__body');

        // Name section
        const bodyName = document.createElement('div');
        bodyName.classList.add('modalContent__body__name');

        const boxTitle = document.createElement('div');
        boxTitle.classList.add('boxTitle');
        bodyName.appendChild(boxTitle);

        const nameInfo = document.createElement('div');
        const typeTitle = document.createElement('p');
        typeTitle.classList.add('type-title');
        typeTitle.textContent = task.type;

        const taskName = document.createElement('p');
        taskName.className = "focusTask-title";
        taskName.textContent = task.name;

        const datePara = document.createElement('p');
        datePara.textContent = `${day} ${this.dateModel.yearMonth[month - 1]} ${year}`;

        nameInfo.append(typeTitle, taskName, datePara);
        bodyName.appendChild(nameInfo);
        body.appendChild(bodyName);

        // Description section
        if (task.description) {
            const descDiv = document.createElement('div');
            descDiv.classList.add('modalContent__body__description');

            const descIcon = document.createElement('i');
            descIcon.className = 'fa-solid fa-bars';

            const descText = document.createElement('div');
            // descText.textContent = task.description;

            const descriptionContentArray = task.description.split("\n");

            descriptionContentArray.forEach((cell) => {
                const descTextParas = document.createElement('p');
                descTextParas.textContent = cell;
                descText.appendChild(descTextParas);
            })

            descDiv.append(descIcon, descText);
            body.appendChild(descDiv);
        }

        // Bouton "Review Tomorrow"
        if (task.type !== 'spaced_repetition') {
            const btnWrapper = document.createElement('div');
            const reviewBtn = document.createElement('button');
            reviewBtn.className = 'btn-mini btn-task-reviewTomorow';
            reviewBtn.textContent = 'Review Tomorrow';
            btnWrapper.appendChild(reviewBtn);
            body.appendChild(btnWrapper);
        }

        // Space repetition
        const spaceRep = document.createElement('div');
        spaceRep.classList.add('modalContent__body__spaceRepetition');
        body.appendChild(spaceRep);

        modalContent.appendChild(body);

        // Footer (formulaire)
        const footer = document.createElement('div');
        footer.classList.add('modalContent__footer', 'hidden');

        const form = document.createElement('form');

        // Name input
        const nameDiv = document.createElement('div');
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameDiv.append(nameLabel, nameInput);

        // Description textarea
        const descDivForm = document.createElement('div');
        const descLabel = document.createElement('label');
        descLabel.setAttribute('for', 'description');
        descLabel.textContent = 'Description';
        const descTextarea = document.createElement('textarea');
        descTextarea.name = 'description';
        descTextarea.id = 'description';
        descDivForm.append(descLabel, descTextarea);

        // Type select
        const typeDiv = document.createElement('div');
        const typeLabel = document.createElement('label');
        typeLabel.setAttribute('for', 'typeSelect');
        typeLabel.textContent = 'Type';
        const typeSelect = document.createElement('select');
        typeSelect.id = 'typeSelect';
        typeSelect.name = 'type';
        ['tasks', 'courses', 'rdvs', 'events', 'projets'].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value.charAt(0).toUpperCase() + value.slice(1);
            typeSelect.appendChild(option);
        });
        typeDiv.append(typeLabel, typeSelect);

        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-updateTask';
        submitBtn.textContent = 'Update';

        form.append(nameDiv, descDivForm, typeDiv, submitBtn);
        footer.appendChild(form);
        modalContent.appendChild(footer);

        // Remplacement du contenu existant
        el.innerHTML = '';
        el.appendChild(modalContent);

        // Si spaced_repetition, appel de la méthode correspondante
        if (task.type === "spaced_repetition") this.renderSpaceRepetition(task);
    }



    renderSpaceRepetition(task) {
        const el = document.querySelector(".modalContent__body__spaceRepetition");
        el.innerHTML = `
            <button class="btn-mini btn-nextStep">Next Step (${this.dateModel.convertStep(task.step)} jours)</button>
            <button class="btn-mini btn-reviewTomorow">Review Tomorrow</button>
            <button class="btn-mini btn-resetCard">Reset</button> 
        `;
    }
}