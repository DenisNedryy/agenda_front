export class DepenseView {
  render(data) {
    const el = document.getElementById("root");
    if (!el) return;

    // ---- Helpers ----
    const toNumber = (v) => {
      if (v == null) return 0;
      if (typeof v === "string") {
        // Support "12,34" et "12.34"
        const cleaned = v.replace(/\s/g, "").replace(",", ".");
        const n = parseFloat(cleaned);
        return Number.isFinite(n) ? n : 0;
      }
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const money = (n) =>
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(toNumber(n));

    // ---- Data mapping (adapte si besoin) ----
    const salaire = toNumber(data?.salaire);

    // ⚠️ Corrige typo potentielle: needsTotal vs nedsTotal
    const needsBudget = toNumber(data?.needsTotal ?? data?.nedsTotal); // budget besoins
    const needsSpent = toNumber(data?.needsTotalDepense);              // dépensé besoins

    const wantsSpent = toNumber(data?.wantsTotalDepense);              // dépensé envies

    // Budget envies: si fourni par l’API -> on le prend, sinon fallback salaire - besoins
    const wantsBudgetFromApi = toNumber(data?.wantsTotal);
    const wantsBudget = wantsBudgetFromApi > 0 ? wantsBudgetFromApi : Math.max(0, salaire - needsBudget);

    // ---- Percent helpers ----
    const pctRaw = (spent, budget) => (budget > 0 ? (spent / budget) * 100 : 0);
    const clampPct = (p) => Math.max(0, Math.min(100, p));

    const needsPct = clampPct(pctRaw(needsSpent, needsBudget));
    const wantsPct = clampPct(pctRaw(wantsSpent, wantsBudget));

    // ---- Depenses list ----
    const depenses = Array.isArray(data?.depenses) ? data.depenses : [];
    const totalSpent = depenses.reduce((sum, d) => sum + toNumber(d?.price), 0);

    // total 
    let totalAfterSave = Number(needsBudget) + Number(wantsBudget);

    const depensesHtml = depenses.length
      ? depenses
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(
          (d) => `
        <li class="dep-item" data-id="${d.id}">
          <div class="dep-item__main">
            <div class="dep-item__top">
                  <img
                src="${d.category === "besoins"
              ? "/public/assets/images/icons/house.png"
              : "/public/assets/images/icons/baloon.png"
            }"
                alt="category"
              />
            </div>
            <div class="dep-item__meta">
                      <span class="dep-item__price">${money(d.price)}</span>
              <span class="dep-chip dep-chip--sub">${d.sub_category ?? "-"}</span>
              <span class="dep-chip capitale dep-chip--sub">${d.name ?? "-"}</span> 
              <span class="dep-item__date">${new Date(d.created_at).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>

          <div class="dep-item__actions">
            <button class="dep-btn dep-btn--delete" data-action="delete" data-id="${d.id}">
              Supprimer
            </button>
          </div>
        </li>
      `
        )
        .join("")
      : `<div class="dep-empty">Aucune dépense pour le moment.</div>`;

    // ---- Render ----
    el.innerHTML = `
      <div class="depense">
        <div class="depense__header box">
          <ul>
            <li class="salaire-btn">Add Salaire</li>
            <li class="depense-btn">Add Depense</li>
          </ul>
        </div>

        <div class="depense__main">
          <div class="depense__main__forms"></div>

          <div class="depense__main__graphics box">
            <h2>Budget : ${money(salaire)}</h2>

            <div class="budget-bars" aria-label="Budgets">
              <!-- Besoins -->
              <div class="budget-row">
                <div class="budget-left">
                  <span class="budget-icon">
                    <img src="/public/assets/images/icons/house.png" alt="Besoins" />
                  </span>
                  <span class="budget-label">Besoins</span>
                </div>

                <div class="budget-bar" role="progressbar"
                     aria-valuemin="0" aria-valuemax="100" aria-valuenow="${needsPct.toFixed(0)}">
                  <span class="budget-fill budget-fill--needs" style="width:${needsPct}%"></span>
                  <span
                  class="budget-fill budget-fill--needs"
                  style="
                    width: ${needsPct}%;
                    background-color: ${Number(needsPct) < 100 ? 'rgb(0, 95, 242)' : 'red'};
                  ">
                </span>
                </div>

                <div class="budget-amount">
                  ${money(needsSpent)}/${money(needsBudget)}
                  <span class="budget-percent budget-percent-needs">${needsPct.toFixed(0)}%</span>
                </div>
              </div>

              <!-- Envies -->
              <div class="budget-row">
                <div class="budget-left">
                  <span class="budget-icon">
                    <img src="/public/assets/images/icons/baloon.png" alt="Envies" />
                  </span>
                  <span class="budget-label">Envies</span>
                </div>

                <div class="budget-bar" role="progressbar"
                     aria-valuemin="0" aria-valuemax="100" aria-valuenow="${wantsPct.toFixed(0)}">
                  <span
                  class="budget-fill budget-fill--wants"
                  style="
                    width: ${wantsPct}%;
                    background-color: ${Number(wantsPct) < 100 ? 'rgb(0, 95, 242)' : 'red'};
                  ">
                </span>
                </div>

                <div class="budget-amount">
                  ${money(wantsSpent)}/${money(wantsBudget)}
                  <span class="budget-percent budget-percent--wants">${wantsPct.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="recap box">
            <div class="recap__header">
              <h2>Mes dépenses</h2>
            </div>
            <div class="recap__total">
              <span>Total: </span>
              <strong>${totalSpent} / ${totalAfterSave} €</strong>
            </div>

            <ul class="dep-list">
              ${depensesHtml}
            </ul>


          </div>
        </div>
      </div>
    `;
  }
}
