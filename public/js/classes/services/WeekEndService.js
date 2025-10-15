import { HOST } from "../../constants/host.js";

export class WeekEndService {

    async getWeekEnd(data) {
        try {
            const preRes = await fetch(`${HOST}/api/weekEnd`, {
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

    async createWeekEnd(data) {
        try {
            const preRes = await fetch(`${HOST}/api/weekEnd`, {
                method: "POST",
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

    async updateWeekEnd(weekEndId,day) {
        try {
            const preRes = await fetch(`${HOST}/api/weekEnd/${weekEndId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    day: day
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


}