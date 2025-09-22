import { HOST } from "../../host.js";

export class VocabularyService {

    async init(data) {
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

    async addVocabulary(data) {
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


    async getVocabularyByCategories() {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/byCategories`, {
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

    async getOneVocabularyCategory(category) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/oneCategory/${category}`, {
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

    async getVocabularyByFamily(family) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/byFamily/${family}`, {
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

    async getFamilies() {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/families`, {
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

    async updateategoryPertencil(vocabularySession,category) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/updateCategory/${category}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    vocabularySession: vocabularySession
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


    async getCategories() {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/categories`, {
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