import { HOST } from "../../constants/host.js";

export class DepenseService {

    async getSalary() {
    try {
      const preRes = await fetch(`${HOST}/api/depense/salary`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  async getAll() {
    try {
      const preRes = await fetch(`${HOST}/api/depense`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // GET /api/depense/by-month?year=2026&month=2  ou  ?month=2026-02
  async getByMonth({ year, month, monthStr } = {}) {
    try {
      const params = new URLSearchParams();

      if (monthStr) {
        params.set("month", monthStr); // ex: "2026-02"
      } else {
        if (year !== undefined) params.set("year", String(year));
        if (month !== undefined) params.set("month", String(month));
      }

      const preRes = await fetch(`${HOST}/api/depense/by-month?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // POST /api/depense
  async addDepense(payload) { 
    try {
      const preRes = await fetch(`${HOST}/api/depense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload), 
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // POST /api/depense/salaire
  async addSalaire(payload) {
    try {
      const preRes = await fetch(`${HOST}/api/depense/salaire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({montant_net: payload}),
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // PUT /api/depense/salaire
  async putSalaire(payload) {
    try {
      const preRes = await fetch(`${HOST}/api/depense/salaire`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // PUT /api/depense/:id
  async putDepense(id, payload) {
    try {
      const preRes = await fetch(`${HOST}/api/depense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // PATCH /api/depense/:id
  async patchDepense(id, payload) {
    try {
      const preRes = await fetch(`${HOST}/api/depense/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }

  // DELETE /api/depense/:id
  async deleteDepense(id) {
    try {
      const preRes = await fetch(`${HOST}/api/depense/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // si ton backend renvoie juste {msg: "..."} c'est OK
      const res = await preRes.json();
      return { status: preRes.status, ok: preRes.ok, data: res };
    } catch (err) {
      console.error(err);
    }
  }
}
