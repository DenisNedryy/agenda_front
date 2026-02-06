export class Depense_form {

    render() {
        const el = document.querySelector('.depense__main__forms');
        if (el) {
            console.log("view depense");
            el.innerHTML = "";
            el.innerHTML = `
                <form>
                     <div>
                        <label>Type de dépense</label>
                        <select name="categorie" id="category">
                            <option value="">-- Sélectionnez une catégorie --</option>
                            <option value="besoins">Besoins</option>
                            <option value="envies">Envies</option>
                        </select>
                     </div>
                <button type="button" class="category-btn btn2">Envoyer</button>
                </form>
            `;
        }
    }

    renderBesoin() {
        const el = document.querySelector('.depense__main__forms');
        if (el) {
            el.innerHTML = "";
            el.innerHTML = `
        <form>
            <input type="hidden" name="category" value="besoins">
            <div>
                <label>sous-catégorie</label>
                <select name="sub-category" id="sub-category">
                    <option value="">-- Sélectionnez une catégorie --</option>
                    <option value="logement">Logement</option>
                    <option value="factures_abonnements">Factures & Abonnements</option>
                    <option value="alimentation">Alimentation</option>
                    <option value="transport">Transport</option>
                    <option value="sante">Santé</option>
                    <option value="famille">Famille</option>
                    <option value="dette">Dette</option>
                    <option value="animaux">Animaux</option>
                </select>
            </div>
            <div>
                <label>Nom</label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label>DEPENSE en €uro</label>
                <input type="number" name="depense" placeholder="ex: 30" />
            </div>
            <div>
                <label>Répétition mensuelle</label>
                <input type="text"  name="is_automatique"/>
            </div>
            <button type="button" class="besoin-btn btn2">Envoyer</button>
        </form>
        `;
        }
        const input = document.querySelector('input[name="is_automatique"]');
        input.defaultValue = "false";
    }

    renderEnvie() {
        const el = document.querySelector('.depense__main__forms');
        if (el) {
            el.innerHTML = "";
            el.innerHTML = `
         <form>
         <input type="hidden" name="category" value="envies">
          <div>
                <label>Nom</label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label>DEPENSE en €uro</label>
                <input type="number" name="depense" placeholder="ex: 30" />
            </div>
            <button type="button" class="envie-btn btn2">Envoyer</button>
         </form>
            `;
        }
    }
}