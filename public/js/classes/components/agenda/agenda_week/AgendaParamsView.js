import { HOST } from "../../../../constants/host.js";

export class AgendaParamsView {

    render(params) {
        const el = document.querySelector(".agendaContent__body__left");
        if (el) {

            // options pour width 600px
            const option = document.createElement("div");
            option.className = "paramsOptions";
            const optionPara = document.createElement("p");
            optionPara.className = "paramsOptionsp";
            optionPara.textContent = "Options";
            const optionIco = document.createElement("i");
            optionIco.className = "fa-solid fa-align-justify paramsOptionsi";
            option.appendChild(optionPara);
            option.appendChild(optionIco);
            el.appendChild(option);

            const optionContainer = document.createElement("div");
            optionContainer.className = "optionsContainer hiddenOnMobile";

            const header = document.createElement("div");
            header.className = "optionsHeader hiddenOnDesktop";
            const leave = document.createElement("i");
            leave.className = "fa-solid fa-xmark exitOptions";
            header.appendChild(leave);
            optionContainer.appendChild(header);

            this.renderUsers(optionContainer, params);
            this.renderParameters(optionContainer, params);
            
            el.appendChild(optionContainer);
            // modal selector
            const modalContainer = document.createElement("div");
            modalContainer.className = "modalAddContainer";
            el.appendChild(modalContainer);
        }
    }


    renderUsers(container, params) {
        const userTitle = document.createElement("p");
        userTitle.className = "agendaContent__body__left--category";
        userTitle.textContent = "Users";

        const ul = document.createElement("ul");
        const users = params.filter((param) => param.name);
        for (let i = 0; i < users.length; i++) {
            const li = document.createElement("li");
            const check = document.createElement("div");
            check.className = "checkBox";
            check.setAttribute("data-userId", users[i].id)
            if (users[i].isSelected) {
                const i = document.createElement("i");
                i.className = "fa-solid fa-check checkBox__user";
                check.appendChild(i);
            }
            const name = document.createElement("p");
            name.textContent = users[i].name;
            const miniAvatar = document.createElement("img");
            miniAvatar.setAttribute("src", `${HOST}/api/images/avatars/${users[i].img_url}`)

            li.appendChild(check);
            li.appendChild(name);
            li.appendChild(miniAvatar);
            ul.appendChild(li);
        };

        container.appendChild(userTitle);
        container.appendChild(ul);
    }

    renderParameters(container, params) {
        const paramTitle = document.createElement("p");
        paramTitle.className = "agendaContent__body__left--category";
        paramTitle.textContent = "Params";

        const paramUl = document.createElement("ul");

        const bank = document.createElement("li");
        const bankBox = document.createElement("div");
        bankBox.className = "checkBoxParams box-bank";
        if (params.bankHolidays) {
            const i = document.createElement("i");
            i.className = "fa-solid fa-check checkBox__Bank";
            bankBox.appendChild(i);
        }
        const bankPara = document.createElement("p");
        bankPara.textContent = "Bank Holidays";
        bank.appendChild(bankBox);
        bank.appendChild(bankPara);
        paramUl.appendChild(bank);

        const birth = document.createElement("li");
        const birthBox = document.createElement("div");
        birthBox.className = "checkBoxParams box-birth";

        if (params.birthDays) {
            const i = document.createElement("i");
            i.className = "fa-solid fa-check checkBox__birthDay";
            birthBox.appendChild(i);
        }
        const birthPara = document.createElement("p");
        birthPara.textContent = "BirthDays";
        birth.appendChild(birthBox);
        birth.appendChild(birthPara);
        paramUl.appendChild(birth);

        container.appendChild(paramTitle);
        container.appendChild(paramUl);
    }

}