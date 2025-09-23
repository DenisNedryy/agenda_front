import { HOST } from "../../host.js";

export class VocabularyView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = ` 
            <div class="vocabulary">
                <div class="vocabulary__content box">
                    <div class="vocabulary__content__left">
                    <div class="circleProgressBar">
                    
                    </div>
                    </div>
                </div>
                         <div class="vocabulary__content__right box">
                        <div class="vocabulary__content__right__header">
                            <p class="">Filter</p> 
                            <p class="">Display</p>
                        </div>
                        <div class="vocabulary__content__right__body"></div>
                    </div>   
            </div>
            `; 
        }
    }

    renderFilter(data, options) {
        const el = document.querySelector(".vocabulary__content__right__body");
        if (el) {
            el.innerHTML = "";
            // tags
            const tags = document.createElement("div");
            tags.className = "vocabulary__tags";
            const titleTags = document.createElement("p");
            titleTags.textContent = "tags";
            tags.appendChild(titleTags);
            // tags-swap-lg
            const frToUk = document.createElement("button");
            frToUk.className = "btn-mini switch-lg";
            frToUk.textContent = `${options.isFrToUk ? 'fr to uk' : 'uk to fr'}`;
            tags.appendChild(frToUk);
            // tags-sounds
            const btnSound = document.createElement("button");
            btnSound.className="btn-mini toggle-sounds";
            btnSound.textContent = `${options.isSounds ? 'sounds-on' : 'sounds-off'}`;
            tags.appendChild(btnSound);
            el.appendChild(tags);
            // families
            const families = document.createElement("div");
            families.className = "vocabulary__families";
            const titleFamilies = document.createElement("p");
            titleFamilies.textContent = "families";
            families.appendChild(titleFamilies);
            for (let i = 0; i < data.length; i++) {
                const btn = document.createElement("button");
                btn.className = "btn-mini";
                btn.setAttribute("data-name", data[i]);
                btn.textContent = data[i];
                families.appendChild(btn);
            }

            el.appendChild(families);
        }
    }


    // render uniquement les familles
    renderVocabulary(data, categories, familyPercentil) {

        const el = document.querySelector(".vocabulary__content__left");
        if (el) {
            let cpt = 0;
            const keys = Object.keys(data);
            //header
            const vocHeader = document.createElement("div");
            vocHeader.className = "vocabulary__content__left__header";
            const title = document.createElement("p");
            title.textContent = data[keys[0]][0].family;
            vocHeader.appendChild(title);
            el.appendChild(vocHeader);
            //body
            const vocBody = document.createElement("div");
            vocBody.className = "vocabulary__content__left__body";

            const vocBodyLeft = document.createElement("div");
            vocBodyLeft.className = "vocabulary__content__left__body__left";

            // progress circle bar
            const progressCircle = document.createElement("div");
            progressCircle.className = "progress-circle";
            const circle = document.createElement("div");
            circle.className = "circle";
            circle.style.background = `conic-gradient(rgb(0, 95, 242) 0 ${familyPercentil}%, #e0e0e0 ${familyPercentil}%)`;
            const insideCircle = document.createElement("div");
            insideCircle.className = "inside-circle";
            insideCircle.textContent = `${familyPercentil} %`;
            circle.appendChild(insideCircle);
            progressCircle.appendChild(circle);
            vocBodyLeft.appendChild(progressCircle);

            const cpbComment = document.createElement("p");
            cpbComment.textContent = "Words learnt";
            vocBodyLeft.appendChild(cpbComment);

            vocBody.appendChild(vocBodyLeft);

            const vocBodyRight = document.createElement("div");
            vocBodyRight.className = "vocabulary__content__left__body__right";

            for (let i = 0; i < keys.length; i++) {
                const fiche = document.createElement("div");
                fiche.setAttribute("data-name", keys[i]);
                fiche.className = "vocFiche fade-in";
                const ficheTop = document.createElement("div");
                ficheTop.className = "vocFiche__top";
                const leftContainer = document.createElement("div");
                const img = document.createElement("img");
                img.setAttribute("src", `${HOST}/api/images/categories/${data[keys[i]][0].img_url}`);
                leftContainer.appendChild(img);

                const category = document.createElement("p");
                category.textContent = keys[i];
                const percentage = document.createElement("p");
                const percentilsData = categories.filter((cell) => cell.name === keys[i])[0];
                const pct = percentilsData?.percentage ?? 0;
                percentage.textContent = `${pct}%`;
                leftContainer.appendChild(category);
                ficheTop.appendChild(leftContainer);
                ficheTop.appendChild(percentage);
                fiche.appendChild(ficheTop);

                const ficheBottom = document.createElement("div");
                ficheBottom.className = "vocFiche__bottom";
                const progressBar = document.createElement("div");
                progressBar.className = "progress-bar";
                const rectangle = document.createElement("div");
                rectangle.className = "rectangle";

                rectangle.style.width = `${pct}%`;
                progressBar.appendChild(rectangle);
                ficheBottom.appendChild(progressBar);

                fiche.appendChild(ficheBottom);


                setTimeout(() => {
                    vocBodyRight.appendChild(fiche);
                }, cpt);
                cpt+=200;


            }

            vocBody.appendChild(vocBodyRight);

            el.appendChild(vocBody);

        }
    }

    renderCategory(data, { options }) {
        // console.log(data);
        // console.log(options);
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

