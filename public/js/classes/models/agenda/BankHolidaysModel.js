export class BankHolidaysModel {

    constructor() {
        this.bankHolidays = true;
    }

    enable() {
        this.bankHolidays = true;
    }

    desable() {
        this.bankHolidays = false;
    }

    toggle() {
        this.bankHolidays = !this.bankHolidays;
    }

    ajouterJours(date, nbJours) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(date.getDate() + nbJours);
        return nouvelleDate;
    }

    calculerPaques(annee) {
        const a = annee % 19;
        const b = Math.floor(annee / 100);
        const c = annee % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mois = Math.floor((h + l - 7 * m + 114) / 31);
        const jour = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(annee, mois - 1, jour);
    }

    getbankHolidays(currentYear) {

        const paques = this.calculerPaques(currentYear);
        const lundiPaques = this.ajouterJours(paques, 1);
        const ascension = this.ajouterJours(paques, 39);
        const pentecote = this.ajouterJours(paques, 50);

        return [
            { type: 'jours férié', name: 'Jour de l’an', date: new Date(currentYear + 1, 0, 1), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Lundi de Pâques', date: lundiPaques, bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Fête du Travail', date: new Date(currentYear, 4, 1), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Victoire 1945', date: new Date(currentYear, 4, 8), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Ascension', date: ascension, bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Pentecôte', date: pentecote, bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Fête Nationale', date: new Date(currentYear, 6, 14), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Assomption', date: new Date(currentYear, 7, 15), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Toussaint', date: new Date(currentYear, 10, 1), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Armistice', date: new Date(currentYear, 10, 11), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Noël', date: new Date(currentYear, 11, 25), bg: 'bgBanksHollidays' },
            { type: 'jours férié', name: 'Pâques', date: paques, bg: 'bgBanksHollidays' }
        ];
    }

}