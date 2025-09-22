export class VocabularyModel {

    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
        this.vocabularyOptions = {
            index: 0,
            isVerso: false,
            isFrToUk: true
        }
        this.vocabularySession = []; // {uuid:string, success:false}
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-GB';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support speech synthesis.');
        }
    }

    start() {
        this.vocabularySession = [];
        this.resetIndex();
        this.closeTraduction();
    }

    next() {
        this.incrementIndex();
        this.vocabularyOptions.isVerso = false;
    }

    end() {
        this.vocabularySession = [];
        this.vocabularyOptions.index = 0;
        this.vocabularyOptions.isVerso = false;
        this.closeTraduction();
    }

    switchLanguage() {
        this.vocabularyOptions.isFrToUk = !this.vocabularyOptions.isFrToUk;
    }

    toggleTraduction() {
        this.vocabularyOptions.isVerso = !this.vocabularyOptions.isVerso;
    }

    openTraduction() {
        this.vocabularyOptions.isVerso = true;
    }

    closeTraduction() {
        this.vocabularyOptions.isVerso = false;
    }

    incrementIndex() {
        this.vocabularyOptions.index++;
    }
    resetIndex() {
        this.vocabularyOptions.index = 0;
    }

    switchLanguage() {
        this.vocabularyOptions.isFrToUk = !this.vocabularyOptions.isFrToUk;
    }
    pushVocabularySession(success, vocabulary) {
        this.vocabularySession.push({ uuid: vocabulary.uuid, success: success });
    }
    resetVocabularySession() {
        this.vocabularySession = [];
    }

    async getVocabulary() {
        const res = await this.vocabularyService.getVocabulary();
        return res.data.vocabulary;
    }

    async getOneVocabularyCategory(category) {
        const res = await this.vocabularyService.getOneVocabularyCategory(category);
        return res.data.vocabulary;
    }

    async getVocabularyByCategories() {
        const res = await this.vocabularyService.getVocabularyByCategories();
        return res.data.vocabulary;
    }
    async getVocabularyByFamily(family) {
        const res = await this.vocabularyService.getVocabularyByFamily(family);
        return res.data.vocabulary;
    }
    async getFamilies() {
        const res = await this.vocabularyService.getFamilies();
        return res.data.families;
    }

    async updateategoryPertencil(category) {
        const res = await this.vocabularyService.updateategoryPertencil(this.vocabularySession, category);
        console.log(res);
    }

    async getCategories() {
        const res = await this.vocabularyService.getCategories();
        return res.data.categories;
    }

    async getFamiliesPercentils(family) {
        const categories = await this.getCategories();
        const families = [
            { name: "maison et vie quotidienne", data: ["house", "bedroom", "kitchen", "tools", "clothing"] },
            { name: "nature et environnement", data: ["animals", "vegetation", "fruits", "vegetable", "weather"] },
            { name: "culture, arts et divertissements", data: ["arts", "cinema", "entertainment", "education", "sport"] },
            { name: "voyages et lieux", data: ["places", "city", "transport", "travel", "travelTerms"] },
            { name: "corps et émotions", data: ["bodyParts", "internalBodyParts", "emotions", "orientation", "connectives"] },
            { name: "langue et grammaire", data: ["irregularVerbs"] },
            { name: "travail et vie professionnelle", data: ["work", "informatique"] }
        ];

        const myFamily = families.filter((cell) => cell.name === family)[0];
        const familiesCategories = myFamily.data;
        const categoriesWithPourcentage = [];
        for (let i = 0; i < familiesCategories.length; i++) {
            categoriesWithPourcentage.push({ name: familiesCategories[i], pourcentage: 0 });
        }
        for (let i = 0; i < categories.length; i++) {
            if (familiesCategories.includes(categories[i].name)) {
                const searchedCategory = categoriesWithPourcentage.find((cell) => cell.name === categories[i].name);
                searchedCategory.pourcentage = categories[i].percentage;
            }
        }

        let cumul = 0;
        categoriesWithPourcentage.forEach((cell) => cumul += cell.pourcentage);
        const cumulLenght = categoriesWithPourcentage.length;
        const familyPourcentage = (cumul / (cumulLenght * 100)) * 100;
        return Math.round(familyPourcentage);

    }

    async getTotalFamilyPercentage() {
        const familiesArray = await this.getFamilies();
        let cumul = 0;
        const percentils = await Promise.all(
            familiesArray.map(cell => this.getFamiliesPercentils(cell) || 0)
        );
        percentils.forEach((cell)=>cumul+=cell);
        const pourcentageTotal = (cumul / (familiesArray.length * 100)) * 100;
        return Math.round(pourcentageTotal);
    }

}