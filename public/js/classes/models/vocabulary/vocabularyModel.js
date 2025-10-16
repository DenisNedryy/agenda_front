export class VocabularyModel {

    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
        this.vocabularyOptions = {
            index: 0,
            isVerso: false,
            isFrToUk: true,
            isSounds: true
        }
        this.isNewFamily = false;
        this.isNewCategory = false;
        this.vocabularyAddOptions = {
            family: "",
            category: "",
            img: null
        }
        this.vocabularySession = []; // {uuid:string, success:false}
    }

    async isVocabulary() {
        const res = await this.vocabularyService.isVocabulary();
        return res.ok ? true : false;
    }

    async addVocabulary(options) {
        const formData = new FormData();
        formData.append("family", options.family);
        formData.append("category", options.category);
        if (options.img) formData.append("img_url", options.img);
        formData.append("uk_name", options.uk_name);
        formData.append("fr_name", options.fr_name);
        const res = await this.vocabularyService.addVocabulary(formData);
        console.log(res);
        return res.data.msg;
    }

    async getCategoryLength(category) {
        const categoryData = await this.getOneVocabularyCategory(category);
        if (categoryData) {
            return categoryData.length;
        } else {
            return 0;
        }
    }

    resetVocabularyAddOptions() {
        this.vocabularyAddOptions = {
            family: "",
            category: "",
            img: null
        }
    }

    setUpVocabularyAddOptions(options) {
        this.vocabularyAddOptions = {
            family: options.family,
            category: options.category,
            img: options.img
        }
    }

    async init(data) {
        const res = await this.vocabularyService.initService(data);
        console.log(res);
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

    toggleSounds() {
        this.vocabularyOptions.isSounds = !this.vocabularyOptions.isSounds;
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

    async getCategoriesNames(family = "corps et émotions") {
        const res = await this.vocabularyService.getVocabulary();
        const vocabulary = res.data.vocabulary;
        return vocabulary.reduce((acc, currV) => {
            if (!acc.includes(currV.category) && currV.family === family) {
                acc.push(currV.category);
            }
            return acc;
        }, []);
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

    }

    async getCategories() {
        const res = await this.vocabularyService.getCategories();
        return res.data.categories;
    }

    async getVocabularySortedByFamiliesAndCategories() {
        const vocabulary = await this.getVocabulary();
        return vocabulary.reduce((acc, currV) => {

            let existingFamily = acc.find((val) => val.name === currV.family);
            // ajout de la famille
            if (!existingFamily) {
                existingFamily = { name: currV.family, data: [] };
                acc.push(existingFamily);
            }

            // ajout des categories
            if (!existingFamily.data.includes(currV.category)) {
                existingFamily.data.push(currV.category);
            }

            return acc;

        }, []);
    }

    async getFamiliesPercentils(family) {
        const families = await this.getVocabularySortedByFamiliesAndCategories();
        const categories = await this.getCategories();

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

    async getCategory(category) {
        const res = await this.vocabularyService.getOneVocabularyCategory(category);
        return res.data.vocabulary;
    }

    async getCategoryLength(category) {
        const data = await this.getCategory(category);
        return data.length;
    }

    async getTotalFamilyPercentage() {
        // récupération du vocabulaire
        const vocabulary = await this.getVocabulary();
        // récupération d'un tableau des catégories
        const categories = vocabulary.reduce((acc, currV) => {
            if (!acc.includes(currV.category)) acc.push(currV.category);
            return acc;
        }, []);

        // assignation du vocabulaire.length par category
        const categoriesWithLength =
            await Promise.all(
                categories.map(async (cell) => {
                    const length = await this.getCategoryLength(cell);
                    return { name: cell, length: length };
                })
            );

        const categoriesWidthPercentages = await this.getCategories();

        // assignation du pourcentage par category
        const categoriesWithlengthAndPercentages = categoriesWithLength.map((cell) => {
            const sameCategory = categoriesWidthPercentages.find((cat) => cat.name === cell.name);
            if (sameCategory) {
                cell.percentage = sameCategory.percentage;
            } else {
                cell.percentage = 0;
            }
            return cell;
        });

        // récupération total voc
        let totalVocabulary = 0;
        categoriesWithlengthAndPercentages.forEach((cell) => totalVocabulary += cell.length);

        // calcul total voc appris
        let totalVocLearnt = 0;
        categoriesWithlengthAndPercentages.forEach((cell) => {
            if (cell.percentage > 0) {
                totalVocLearnt += Math.round((cell.percentage / 100) * cell.length);
            }
        });

        // pourcentage
        const result = Math.round((totalVocLearnt / totalVocabulary) * 100);
        return result;
    }

    async deleteCategory(family, category) {
        const res = await this.vocabularyService.deleteCategory(family, category);
        console.log(res.data.msg);
    }

    async deleteFamily(family) {
        const res = await this.vocabularyService.deleteFamily(family);
        console.log(res.data.msg);
    }

    async deleteVocabulary(vocabularyId) {
        const res = await this.vocabularyService.deleteVocabulary(vocabularyId);
        console.log(res.data.msg);
        return res.data.category;
    }

}