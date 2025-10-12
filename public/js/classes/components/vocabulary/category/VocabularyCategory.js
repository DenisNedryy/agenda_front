import { HOST } from "../../../../constants/host.js";

export class VocabularyCategory {


    // render le vocabulary de la category
    renderCategory(data, { options }) {
        const el = document.querySelector(".vocabulary__content");
        el.setAttribute("data-category", data[0].category);
        if (el) {
            el.innerHTML = "";
            // header
            const header = document.createElement("div");
            header.className = "category__header";
            // header - left
            const headerLeft = document.createElement("div");
            headerLeft.className = "category__header__left";
            const img = document.createElement("img");
            img.setAttribute("src", `${HOST}/api/images/categories/${data[0].img_url}`);
            headerLeft.appendChild(img);
            const category = document.createElement("p");
            category.textContent = data[0].category;
            headerLeft.appendChild(category);
            header.appendChild(headerLeft);
            // header right
            const headerRight = document.createElement("p");
            headerRight.textContent = `${options.index + 1}/${data.length}`;
            header.appendChild(headerRight)

            el.appendChild(header);
            // body
            const body = document.createElement("div");
            body.className = `category__body`;

            const name = document.createElement("p");
            name.className = "flashCard__title";
            name.textContent = options.isFrToUk ? data[options.index].frName : data[options.index].ukName;
            body.appendChild(name);

            if (options.isVerso) {
                const traduction = document.createElement("p");
                traduction.className = "flashCard__traduction";
                traduction.textContent = `${options.isFrToUk ? data[options.index].ukName : data[options.index].frName}*`;
                body.appendChild(traduction);
            }

            el.appendChild(body);
            // footer
            const footer = document.createElement("div");
            footer.className = "category__footer";

            const vocabularyMsg = document.createElement("p");
            vocabularyMsg.className = "category__footer__msg";
            vocabularyMsg.textContent = "Did you got the right answer ? ";
            footer.appendChild(vocabularyMsg);
            const btnContainer = document.createElement("div");
            btnContainer.className = "category__footer__buttons";
            const btnNo = document.createElement("button");
            btnNo.className = "btn btn-flashCard-no btn-flashCard";
            btnNo.textContent = "No";
            btnContainer.appendChild(btnNo);
            const btnYes = document.createElement("button");
            btnYes.className = "btn btn-flashCard-yes btn-flashCard";
            btnYes.textContent = "Yes";
            btnContainer.appendChild(btnYes);
            footer.appendChild(btnContainer);

            el.appendChild(footer);
        }
    }
}