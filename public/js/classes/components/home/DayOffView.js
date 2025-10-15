export class DayOffView {

    constructor(dateModel) {
        this.dateModel = dateModel;
    }

    render(data) {
      
        const el = document.querySelector(".home__bodyContainer__left__dayOff__dateOff");
        if (el) {
            if (data.length === 0) return;
            el.innerHTML = data.length > 1 ? ( 
                `
                <div>
                 <p>Du ${this.dateModel.convertDateIntoBeautifulDate(data[0].date)}</p>
                 <p>Au ${this.dateModel.convertDateIntoBeautifulDate(data[data.length - 1].date)}.</p>  
                 </div>
                        <div>
                            <p>Dans ${this.dateModel.calculateNbDaysBewteen2Dates(data[0].date)} jours</p> 
                            <p>Pendant ${data.length} jours</p>
                        </div>
            `
            ) : (
                `
                 <p>${this.dateModel.convertDateIntoBeautifulDate(data[0].date)}.</p> 
                      <div>
                            <p>Dans ${this.dateModel.calculateNbDaysBewteen2Dates(data[0].date)} jours</p> 
                            <p>Pendant ${data.length} jours</p>
                        </div>
            `
            )

        }
    }
}