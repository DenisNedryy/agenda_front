export class VocabularyView {

    // base principale
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
                        <div class="vocabulary__content__right__body"></div>
                    </div>   
            </div>
            `;
        }
    }


}

