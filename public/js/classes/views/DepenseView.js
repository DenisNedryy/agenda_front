export class DepenseView {
  render(data) {
    const el = document.getElementById("root");
    if (!el) return;

    // ---- Helpers ----
    const toNumber = (v) => {
      if (v == null) return 0;
      const n = typeof v === "string" ? parseFloat(v) : Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    const money = (n) =>
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(toNumber(n));

    // ---- Data mapping (adapte si besoin) ----
    const salaire = toNumber(data.salaire);
    const needsBudget = toNumber(data.nedsTotal);            // ton budget besoins
    const needsSpent = toNumber(data.needsTotalDepense);     // dépensé besoins
    const wantsSpent = toNumber(data.wantsTotalDepense);
    // dépensé envies

    // Budget envies par défaut (si tu n’as pas déjà une valeur dédiée)
    const wantsBudget = Math.max(0, salaire - needsBudget);

    const pct = (spent, budget) => {
      if (budget <= 0) return 0;
      return Math.max(0, Math.min(100, (spent / budget) * 100));
    };

    const needsPct = pct(needsSpent, needsBudget);
    const wantsPct = pct(wantsSpent, wantsBudget);

    const depenses = Array.isArray(data.depenses) ? data.depenses : [];
    const totalSpent = depenses.reduce((sum, d) => sum + toNumber(d.price), 0);



    const depensesHtml = depenses.length
      ? depenses
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((d) => `
        <li class="dep-item" data-id="${d.id}">
          <div class="dep-item__main">
            <div class="dep-item__top">
              <span class="dep-item__name">${d.name ?? ""}</span>
              <span class="dep-item__price">${money(d.price)}</span>
            </div>
            <div class="dep-item__meta">
 <img src=${d.category==="besoins" ? "/public/assets/images/icons/house.png" : "/public/assets/images/icons/baloon.png"} alt="category" />
         
              <span class="dep-chip dep-chip--sub">${d.sub_category ?? "-"}</span>
              <span class="dep-item__date">${new Date(d.created_at).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>

          <div class="dep-item__actions">
         
            <button class="dep-btn dep-btn--delete" data-action="delete" data-id="${d.id}">Supprimer</button>
          </div>
        </li>
      `)
        .join("")
      : `<div class="dep-empty">Aucune dépense pour le moment.</div>`;


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
              <h2>Budget : ${salaire} €</h2>
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
                </div>

              <div class="budget-amount">
            ${data.needsTotalDepense}/${needsBudget.toFixed(0)}€ 
            <span class="budget-percent">${needsPct.toFixed(0)}%</span>
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
                  <span class="budget-fill budget-fill--wants" style="width:${wantsPct}%"></span>
                </div>

              <div class="budget-amount">
                ${data.wantsTotalDepense}/${data.wantsTotal.toFixed(0)}€ 
                <span class="budget-percent">${wantsPct.toFixed(0)}%</span>
            </div>
              </div>

            </div>
          </div>

                        <div class="recap box">
                            <div class="recap__header">
                              <h2>Mes dépenses</h2>
                            </div>

                            <ul class="dep-list">
                              ${depensesHtml}
                            </ul>

                            <div class="recap__total">
                              <span>Total</span>
                              <strong>${money(totalSpent)}</strong>
                            </div>
                        </div>


        </div>
      </div>
    `;
  }
}
