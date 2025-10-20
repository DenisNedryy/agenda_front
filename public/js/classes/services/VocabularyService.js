import { HOST } from "../../constants/host.js";

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

                },
                credentials: "include",
                body: data,
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

    async deleteFamily(family) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/families/${family}`, {
                method: "DELETE",
                headers: {

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

    async deleteCategory(family, category) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/families/${family}/categories/${category}`, {
                method: "DELETE",
                headers: {

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

    async updateategoryPertencil(vocabularySession, category) {
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

    async isVocabulary() {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/isVocabulary`, {
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


    async deleteVocabulary(vocabularyId) {
        try {
            const preRes = await fetch(`${HOST}/api/vocabulary/${vocabularyId}`, {
                method: "DELETE",
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