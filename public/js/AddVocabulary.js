import { HOST } from "./constants/host.js";

export class AddVocabulary {

    // A utiliser une seule fois
    async init(data) {

        // vérification si du vocabulaire a été ajouté
        const vocRes = await this.getVocabulary();
        const vocabulary = vocRes.data.vocabulary;
        if (vocabulary && vocabulary.length > 0) {
            // const res = await this.addService(data);
            // console.log(res);
            return;
        } else {
            // sinon on init
            const res = await this.initService(data);
            console.log(res);
        }



    }

    addAVocabularyFile(data) {

    }

    async initService(data) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/init`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    vocabulary: data
                }),
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async addService(data) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/add`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    vocabulary: data
                }),
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async getVocabulary() {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }
}