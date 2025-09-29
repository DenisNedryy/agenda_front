export class ModalViews{

    renderModalContainer(){
        const el = document.querySelector(".vocabulary__content__left");
        if(el){
            el.innerHTML = `
            <div class="modalViewContainer">
                <div class="modalViewContainer__header"></div>
                <div class="modalViewContainer__body"></div>
                <div class="modalViewContainer__footer"></div>
            </div>
            `;
        }
    }
    
}