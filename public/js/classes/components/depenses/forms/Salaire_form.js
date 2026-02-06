export class Salaire_form{

        render(){
        const el = document.querySelector('.depense__main__forms');
        if(el){
            el.innerHTML = "";
            el.innerHTML = `
                <form>
                <label>SALAIRE TTC</label>
                <input type="number" name="salary" placeholder="ex: 2000"/>
                <button type="button" class="salaire-btn btn2">Envoyer</button>
                </form>
            `;
        }
    }
}