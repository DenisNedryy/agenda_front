

export class DepenseEventBinder {

    constructor() {
        this.boundHandleClick = this.handleClick.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClick);
        document.addEventListener('click', this.boundHandleClick);
    }

    async handleClick(e) {
        const btnSalaire = e.target.closest('.salaire-btn');
        if (btnSalaire) {
            this.controller.salaireForm.render();
            const el = document.querySelector('.depense__main__forms');
            if (el) {
                el.classList.add('box');
            }
        }
        const btnDepense = e.target.closest('.depense-btn');
        if (btnDepense) {
            this.controller.depenseForm.render();
            const el = document.querySelector('.depense__main__forms');
            if (el) {
                el.classList.add('box');
            }
        }
        const categoryBtn = e.target.closest('.category-btn');
        if (categoryBtn) {
            const form = categoryBtn.closest('form');
            const category = form.elements['categorie'].value;

            if (category) {
                switch (category) {
                    case 'besoins':
                        this.controller.depenseForm.renderBesoin();
                        break;

                    case 'envies':
                        this.controller.depenseForm.renderEnvie();
                        break;
                }
            }
        }

        const salaireBtn = e.target.closest('.salaire-btn');
        if (salaireBtn) {
            const form = salaireBtn.closest('form');
            if (form) {
                const salaire = form.elements['salary'].value;
                if (!salaire) {
                    alert('champ manquant');
                    return;
                }
                const res = await this.controller.depenseService.addSalaire(salaire);
                console.log(res);
                this.controller.show();
            }
        }

        const besoinBtn = e.target.closest('.besoin-btn');
        if (besoinBtn) {
            const form = besoinBtn.closest('form');
            if (form) {
                const category = form.elements['category'].value;
                const subCategory = form.elements['sub-category'].value;
                const name = form.elements['name'].value;
                const depense = form.elements['depense'].value;
                const is_automatique = form.elements['depense'].value;

                if (!category || !subCategory || !name || !depense) {
                    alert('champs manquants');
                    return;
                }

                const data = {
                    category: category,
                    sub_category: subCategory,
                    name: name,
                    price: depense,
                    is_automatique: is_automatique
                }

                const res = await this.controller.depenseService.addDepense(data);
                console.log(res);
                this.controller.show();
            }
        }


        const envieBtn = e.target.closest('.envie-btn');
        if (envieBtn) {
            const form = envieBtn.closest('form');
            if (form) {
                const category = form.elements['category'].value;
                const name = form.elements['name'].value;
                const depense = form.elements['depense'].value;

                if (!category || !name || !depense) {
                    alert('champs manquants');
                    return;
                }

                const data = {
                    category: category,
                    name: name,
                    price: depense
                }

                const res = await this.controller.depenseService.addDepense(data);
                console.log(res);
                this.controller.show();
            }
        }

        const deleteBtn = e.target.closest('.dep-btn--delete');
        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            if (id) {
                const res = await this.controller.depenseService.deleteDepense(id);
                console.log(res);
                this.controller.show();
            }
        }
    }


}