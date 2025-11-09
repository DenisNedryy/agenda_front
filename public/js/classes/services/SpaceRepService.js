import { HOST } from "../../constants/host.js";

export class SpaceRepService {

    async updateSpaceRepetition(id) {
        try {
            const preRes = await fetch(`${HOST}/api/spaced_repetition/${id}`, {
                method: "PUT",
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

    async reviewTomorow(id) {
        try {
            const preRes = await fetch(`${HOST}/api/spaced_repetition/reviewTomorow/${id}`, {
                method: "PUT",
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


    async intervalRollback(id) {
        try {
            const preRes = await fetch(`${HOST}/api/spaced_repetition/intervalRollback/${id}`, {
                method: "PUT",
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


    async reset(id) {
        try {
            const preRes = await fetch(`${HOST}/api/spaced_repetition/reset/${id}`, {
                method: "PUT",
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

