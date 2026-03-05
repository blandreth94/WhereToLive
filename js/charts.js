/* ============================================================
   WhereToLive — Chart Rendering
   ============================================================ */

// Registry of active Chart.js instances (for cleanup on tab switch)
const CHART_REGISTRY = {};

// City color map derived from CITY_DATA.meta
function getCityColors() {
  return Object.fromEntries(CITY_DATA.meta.cities.map(c => [c.key, c.color]));
}

// Ordered city keys
function getCityKeys() {
  return CITY_DATA.meta.cities.map(c => c.key);
}

// Ordered city labels
function getCityLabels() {
  return CITY_DATA.meta.cities.map(c => c.label);
}

/* ----------------------------------------------------------
   Format a value for tooltip / display
   ---------------------------------------------------------- */
function formatValue(value, metric) {
  if (value === null || value === undefined) return "N/A";
  switch (metric.format) {
    case "currency":
      return "$" + value.toLocaleString();
    case "percent":
      return value + "%";
    case "number":
      return value.toLocaleString() + (metric.unit ? " " + metric.unit : "");
    default:
      return String(value);
  }
}

/* ----------------------------------------------------------
   Destroy an existing chart if it exists
   ---------------------------------------------------------- */
function destroyChart(id) {
  if (CHART_REGISTRY[id]) {
    CHART_REGISTRY[id].destroy();
    delete CHART_REGISTRY[id];
  }
}

/* ----------------------------------------------------------
   Render a standard vertical bar chart
   ---------------------------------------------------------- */
function renderBarChart(canvasId, metric) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const keys    = getCityKeys();
  const labels  = getCityLabels();
  const colors  = getCityColors();

  const data = keys.map(k => metric.values[k]);
  const backgroundColors = keys.map(k => colors[k]);
  const hasData = data.some(v => v !== null && v !== undefined);

  const ctx = canvas.getContext("2d");
  CHART_REGISTRY[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: hasData ? data : labels.map(() => 0),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(c => c + "cc"),
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const val = data[ctx.dataIndex];
              return " " + (val !== null ? formatValue(val, metric) : "Data pending");
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 30,
            font: { size: 11 }
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#edf0f4" },
          ticks: {
            font: { size: 11 },
            callback: (val) => {
              if (metric.format === "currency") return "$" + val.toLocaleString();
              if (metric.format === "percent") return val + "%";
              return val.toLocaleString();
            }
          }
        }
      }
    }
  });
}

/* ----------------------------------------------------------
   Render a horizontal bar chart
   ---------------------------------------------------------- */
function renderHorizontalBarChart(canvasId, metric) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const keys    = getCityKeys();
  const labels  = getCityLabels();
  const colors  = getCityColors();

  const data = keys.map(k => metric.values[k]);
  const backgroundColors = keys.map(k => colors[k]);

  const ctx = canvas.getContext("2d");
  CHART_REGISTRY[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(c => c + "cc"),
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const val = data[ctx.dataIndex];
              return " " + (val !== null ? formatValue(val, metric) : "Data pending");
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "#edf0f4" },
          ticks: {
            font: { size: 11 },
            callback: (val) => {
              if (metric.format === "currency") return "$" + val.toLocaleString();
              if (metric.format === "percent") return val + "%";
              return val.toLocaleString();
            }
          }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

/* ----------------------------------------------------------
   Render a grouped bar chart (multiple datasets per city)
   datasets: [{ label, values: { roanoke, ... }, color }]
   ---------------------------------------------------------- */
function renderGroupedBarChart(canvasId, title, datasets, unitLabel, format) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const labels = getCityLabels();
  const keys   = getCityKeys();

  const chartDatasets = datasets.map(ds => ({
    label: ds.label,
    data: keys.map(k => ds.values[k]),
    backgroundColor: ds.color,
    borderColor: ds.color + "cc",
    borderWidth: 1,
    borderRadius: 3
  }));

  const ctx = canvas.getContext("2d");
  CHART_REGISTRY[canvasId] = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: { font: { size: 11 }, boxWidth: 12, padding: 12 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const val = ctx.parsed.y;
              let formatted = val !== null ? val.toLocaleString() : "N/A";
              if (format === "currency") formatted = "$" + formatted;
              if (format === "percent") formatted += "%";
              if (unitLabel) formatted += " " + unitLabel;
              return " " + ctx.dataset.label + ": " + formatted;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 30, font: { size: 11 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: "#edf0f4" },
          ticks: {
            font: { size: 11 },
            callback: (val) => {
              if (format === "currency") return "$" + val.toLocaleString();
              if (format === "percent") return val + "%";
              return val.toLocaleString() + (unitLabel ? " " + unitLabel : "");
            }
          }
        }
      }
    }
  });
}

/* ----------------------------------------------------------
   Render stat cards (text/grade data — no chart)
   ---------------------------------------------------------- */
function renderStatCards(containerId, metric) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "stat-cards-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const val = metric.values[city.key];
    const card = document.createElement("div");
    card.className = "stat-card";

    let displayVal = val !== null && val !== undefined ? val : "—";
    let gradeClass = "";

    if (metric.format === "grade" && val) {
      const gradeMap = {
        "A+": "grade-a-plus", "A": "grade-a", "A-": "grade-a-minus",
        "B+": "grade-b-plus", "B": "grade-b", "B-": "grade-b-minus",
        "C+": "grade-c-plus", "C": "grade-c", "C-": "grade-c-minus",
        "D+": "grade-d",      "D": "grade-d", "F": "grade-f"
      };
      gradeClass = gradeMap[val] || "";
    }

    card.innerHTML = `
      <div class="stat-card-city">
        <span class="stat-card-city-dot" style="background:${colors[city.key]}"></span>
        ${city.label}
      </div>
      <div class="stat-card-value ${gradeClass}">${displayVal}</div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render a data table (for tabular comparisons like tax rates)
   rows: [{ label, values: { roanoke, ... }, format, highlightLow }]
   ---------------------------------------------------------- */
function renderTable(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const keys   = getCityKeys();
  const labels = getCityLabels();
  const colors = getCityColors();

  let html = `<div class="data-table-wrapper"><table class="data-table">
    <thead><tr>
      <th>Metric</th>
      ${labels.map((l, i) => `<th><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colors[keys[i]]};margin-right:4px;vertical-align:middle"></span>${l}</th>`).join("")}
    </tr></thead>
    <tbody>`;

  rows.forEach(row => {
    const vals = keys.map(k => row.values[k]);
    const numericVals = vals.filter(v => v !== null && typeof v === "number");
    const min  = row.highlightLow  && numericVals.length ? Math.min(...numericVals) : null;
    const max  = row.highlightHigh && numericVals.length ? Math.max(...numericVals) : null;

    html += `<tr><td>${row.label}</td>`;
    vals.forEach(v => {
      let cls = "";
      if (v === min && row.highlightLow)  cls = "highlight-good";
      if (v === max && row.highlightHigh) cls = "highlight-bad";
      let display = v !== null ? formatValue(v, row) : "N/A";
      html += `<td class="${cls}">${display}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

/* ----------------------------------------------------------
   Render a suburb/expanded comparison table
   Used for rent-by-suburb, school districts, tax comparisons, etc.
   suburbData: { title, source, columns, rows: [{area, city, col1, col2, ...}] }
   ---------------------------------------------------------- */
function renderSuburbTable(containerId, suburbData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();

  // Determine column count from first row
  const colKeys = suburbData.columns.map((_, i) => i === 0 ? "area" : `col${i}`);

  let html = `<div class="data-table-wrapper"><table class="data-table suburb-table">
    <thead><tr>
      ${suburbData.columns.map(col => `<th>${col}</th>`).join("")}
    </tr></thead>
    <tbody>`;

  suburbData.rows.forEach(row => {
    const isSuburb = row.area.startsWith("  ");
    const cityKey = row.city;
    const dotColor = colors[cityKey] || "#999";
    const rowClass = isSuburb ? "suburb-row" : "city-row";
    const label = row.area.trim();

    // Build ordered column values from the row
    // Convention: columns[0] = area (handled specially), columns[1..n] = col1, col2, ... OR twoBed/threeBed/notes for rent tables
    const colValues = suburbData.columns.map((_, i) => {
      if (i === 0) return null; // handled separately
      const colKey = `col${i}`;
      // Prefer explicit colN keys, then fall back to semantic names
      if (row[colKey] !== undefined) return row[colKey];
      // Legacy/semantic fallbacks for rent suburb tables
      if (i === 1 && row.twoBed !== undefined) return row.twoBed;
      if (i === 2 && row.threeBed !== undefined) return row.threeBed;
      if (i === suburbData.columns.length - 1 && row.notes !== undefined) return row.notes;
      return null;
    });

    html += `<tr class="${rowClass}">`;
    suburbData.columns.forEach((col, i) => {
      if (i === 0) {
        if (!isSuburb) {
          html += `<td><span class="suburb-city-dot" style="background:${dotColor}"></span><strong>${label}</strong></td>`;
        } else {
          html += `<td class="suburb-indent">${label}</td>`;
        }
      } else {
        let rawVal = colValues[i];
        let display = rawVal === null || rawVal === undefined ? "—" : rawVal;
        // Auto-format numbers: currency if > 500, otherwise numeric
        if (typeof display === "number" && display > 500) {
          display = "$" + display.toLocaleString();
        } else if (typeof display === "number") {
          display = display.toLocaleString();
        }
        html += `<td>${display}</td>`;
      }
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

/* ----------------------------------------------------------
   Render qualitative analysis block (after charts)
   metric.analysis: { roanoke: "...", waldorf: "...", ... }
   ---------------------------------------------------------- */
function renderAnalysisBlock(containerId, metric) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  const block = document.createElement("div");
  block.className = "analysis-block";

  CITY_DATA.meta.cities.forEach(city => {
    const text = metric.analysis && metric.analysis[city.key];
    if (!text) return;

    const item = document.createElement("div");
    item.className = "analysis-item";
    item.innerHTML = `
      <div class="analysis-city-label">
        <span class="analysis-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>
      <p class="analysis-text">${text}</p>
    `;
    block.appendChild(item);
  });

  container.appendChild(block);
}

/* ----------------------------------------------------------
   Render a vehicle costs context panel
   ---------------------------------------------------------- */
function renderVehicleCostsPanel(containerId, contextData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "vehicle-costs-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const d = contextData.values[city.key];
    if (!d) return;

    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.style.borderLeftColor = colors[city.key];
    card.innerHTML = `
      <div class="vehicle-card-header">
        <span class="vehicle-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>
      <div class="vehicle-card-costs">
        <div class="vehicle-cost-row">
          <span class="vehicle-cost-label">Initial Move-In Cost</span>
          <span class="vehicle-cost-value">${d.initialCost}</span>
        </div>
        <div class="vehicle-cost-row">
          <span class="vehicle-cost-label">Annual Recurring Cost</span>
          <span class="vehicle-cost-value">${d.annualCost}</span>
        </div>
      </div>
      <p class="vehicle-card-notes">${d.notes}</p>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render a politics/law panel (employment law or firearms)
   Each city gets a card with summary + expandable full text
   ---------------------------------------------------------- */
function renderPoliticsPanel(containerId, politicsData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "politics-panel-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const d = politicsData.values[city.key];
    if (!d) return;

    const card = document.createElement("div");
    card.className = "politics-card";
    card.style.borderLeftColor = colors[city.key];

    const detailsId = containerId + "-" + city.key + "-details";

    card.innerHTML = `
      <div class="politics-card-header">
        <span class="politics-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>
      <p class="politics-card-full">${d.details || d.summary}</p>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render an alcohol laws panel with Summary / Full Analysis toggle
   Each city card has a summary view and an expandable full details view
   ---------------------------------------------------------- */
function renderAlcoholLawsPanel(containerId, politicsData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  // Toggle bar
  const toggleBar = document.createElement("div");
  toggleBar.className = "lifestyle-toggle-bar";
  toggleBar.innerHTML = `
    <span class="lifestyle-toggle-label">View:</span>
    <button class="lifestyle-toggle-btn active" data-view="short">Summary</button>
    <button class="lifestyle-toggle-btn" data-view="long">Full Analysis</button>
  `;
  container.appendChild(toggleBar);

  toggleBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".lifestyle-toggle-btn");
    if (!btn) return;
    const view = btn.dataset.view;
    toggleBar.querySelectorAll(".lifestyle-toggle-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    container.querySelectorAll(".alcohol-view-short").forEach(el => el.style.display = view === "short" ? "" : "none");
    container.querySelectorAll(".alcohol-view-long").forEach(el => el.style.display = view === "long" ? "" : "none");
  });

  // City cards grid
  const grid = document.createElement("div");
  grid.className = "politics-panel-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const d = politicsData.values[city.key];
    if (!d) return;

    const card = document.createElement("div");
    card.className = "politics-card";
    card.style.borderLeftColor = colors[city.key];

    const header = `
      <div class="politics-card-header">
        <span class="politics-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>`;

    const shortView = document.createElement("div");
    shortView.className = "alcohol-view-short";
    shortView.innerHTML = header + `<p class="politics-card-full">${d.summary}</p>`;

    const longView = document.createElement("div");
    longView.className = "alcohol-view-long";
    longView.style.display = "none";
    longView.innerHTML = header + `<p class="politics-card-full">${d.details}</p>`;

    card.appendChild(shortView);
    card.appendChild(longView);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render a transit options panel with Summary / Full Analysis toggle.
   Summary = metric.values[city] (short descriptor string)
   Full Analysis = metric.analysis[city] (qualitative paragraph)
   ---------------------------------------------------------- */
function renderTransitPanel(containerId, metric) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  // Toggle bar
  const toggleBar = document.createElement("div");
  toggleBar.className = "lifestyle-toggle-bar";
  toggleBar.innerHTML = `
    <span class="lifestyle-toggle-label">View:</span>
    <button class="lifestyle-toggle-btn active" data-view="short">Summary</button>
    <button class="lifestyle-toggle-btn" data-view="long">Full Analysis</button>
  `;
  container.appendChild(toggleBar);

  toggleBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".lifestyle-toggle-btn");
    if (!btn) return;
    const view = btn.dataset.view;
    toggleBar.querySelectorAll(".lifestyle-toggle-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    container.querySelectorAll(".transit-view-short").forEach(el => el.style.display = view === "short" ? "" : "none");
    container.querySelectorAll(".transit-view-long").forEach(el => el.style.display = view === "long" ? "" : "none");
  });

  // City cards grid
  const grid = document.createElement("div");
  grid.className = "politics-panel-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const summary = metric.values[city.key];
    const details = metric.analysis && metric.analysis[city.key];
    if (!summary) return;

    const card = document.createElement("div");
    card.className = "politics-card";
    card.style.borderLeftColor = colors[city.key];

    const header = `
      <div class="politics-card-header">
        <span class="politics-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>`;

    const shortView = document.createElement("div");
    shortView.className = "transit-view-short";
    shortView.innerHTML = header + `<p class="politics-card-full">${summary}</p>`;

    const longView = document.createElement("div");
    longView.className = "transit-view-long";
    longView.style.display = "none";
    longView.innerHTML = header + `<p class="politics-card-full">${details || summary}</p>`;

    card.appendChild(shortView);
    card.appendChild(longView);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render destination accessibility panel (aviation / airport connectivity)
   Reads aviation / aviationFull from lifestyleHighlights context values.
   Summary / Full Analysis toggle — same pattern as renderAlcoholLawsPanel.
   ---------------------------------------------------------- */
function renderDestinationAccessibility(containerId, contextData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  // Toggle bar
  const toggleBar = document.createElement("div");
  toggleBar.className = "lifestyle-toggle-bar";
  toggleBar.innerHTML = `
    <span class="lifestyle-toggle-label">View:</span>
    <button class="lifestyle-toggle-btn active" data-view="short">Summary</button>
    <button class="lifestyle-toggle-btn" data-view="long">Full Analysis</button>
  `;
  container.appendChild(toggleBar);

  toggleBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".lifestyle-toggle-btn");
    if (!btn) return;
    const view = btn.dataset.view;
    toggleBar.querySelectorAll(".lifestyle-toggle-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    container.querySelectorAll(".dest-view-short").forEach(el => el.style.display = view === "short" ? "" : "none");
    container.querySelectorAll(".dest-view-long").forEach(el => el.style.display = view === "long" ? "" : "none");
  });

  // City cards grid
  const grid = document.createElement("div");
  grid.className = "politics-panel-grid";

  CITY_DATA.meta.cities.forEach(city => {
    const d = contextData.values[city.key];
    if (!d || !d.aviation) return;

    const card = document.createElement("div");
    card.className = "politics-card";
    card.style.borderLeftColor = colors[city.key];

    const header = `
      <div class="politics-card-header">
        <span class="politics-city-dot" style="background:${colors[city.key]}"></span>
        <strong>${city.label}</strong>
      </div>`;

    const shortView = document.createElement("div");
    shortView.className = "dest-view-short";
    shortView.innerHTML = header + `<p class="politics-card-full">${d.aviation}</p>`;

    const longView = document.createElement("div");
    longView.className = "dest-view-long";
    longView.style.display = "none";
    longView.innerHTML = header + `<p class="politics-card-full">${d.aviationFull || d.aviation}</p>`;

    card.appendChild(shortView);
    card.appendChild(longView);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* ----------------------------------------------------------
   Render lifestyle highlights panel
   Toggle between short (4-category grid) and long (full analysis
   with categories preserved as named sections)
   ---------------------------------------------------------- */
function renderLifestyleHighlights(containerId, contextData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = getCityColors();
  container.innerHTML = "";

  // Global short/long toggle — only shown once, above all cities
  const hasFullAnalysis = CITY_DATA.meta.cities.some(city => {
    const v = contextData.values[city.key];
    return v && (v.skiingFull || v.blmFull || v.motorcycleFull || v.socialFull);
  });
  if (hasFullAnalysis) {
    const toggleBar = document.createElement("div");
    toggleBar.className = "lifestyle-toggle-bar";
    toggleBar.innerHTML = `
      <span class="lifestyle-toggle-label">View:</span>
      <button class="lifestyle-toggle-btn active" data-view="short">Summary</button>
      <button class="lifestyle-toggle-btn" data-view="long">Full Analysis</button>
    `;
    container.appendChild(toggleBar);

    toggleBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".lifestyle-toggle-btn");
      if (!btn) return;
      const view = btn.dataset.view;
      toggleBar.querySelectorAll(".lifestyle-toggle-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
      container.querySelectorAll(".lifestyle-view-short").forEach(el => el.style.display = view === "short" ? "" : "none");
      container.querySelectorAll(".lifestyle-view-long").forEach(el => el.style.display = view === "long" ? "" : "none");
    });
  }

  CITY_DATA.meta.cities.forEach(city => {
    const d = contextData.values[city.key];
    if (!d) return;

    const section = document.createElement("div");
    section.className = "lifestyle-highlights-city";

    // Build categories array dynamically (aviation lives in Travel & Transit tab)
    const categories = [
      { label: "Skiing Access",      short: d.skiing,     full: d.skiingFull },
      { label: "BLM / Public Land",  short: d.blm,        full: d.blmFull },
      { label: "Motorcycle Culture", short: d.motorcycle, full: d.motorcycleFull }
    ];
    if (d.social) {
      categories.push({ label: "Social Scene & Networking", short: d.social, full: d.socialFull });
    }

    // Short view (dynamic category grid)
    const shortView = document.createElement("div");
    shortView.className = "lifestyle-view-short";
    const shortItemsHtml = categories.map(cat => `
      <div class="highlight-item">
        <div class="highlight-label">${cat.label}</div>
        <div class="highlight-text">${cat.short || ""}</div>
      </div>`).join("");
    shortView.innerHTML = `
      <div class="lifestyle-city-header" style="border-left-color:${colors[city.key]}">
        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${colors[city.key]};margin-right:8px;vertical-align:middle;flex-shrink:0"></span>
        <strong>${city.label}</strong>
      </div>
      <div class="lifestyle-highlights-grid">
        ${shortItemsHtml}
      </div>
    `;

    // Long view: each category shows its short summary + full paragraph beneath
    const longView = document.createElement("div");
    longView.className = "lifestyle-view-long";
    longView.style.display = "none";

    const catItemsHtml = categories.map(cat => `
      <div class="highlight-item highlight-item-full">
        <div class="highlight-label">${cat.label}</div>
        <div class="highlight-text">${cat.short}</div>
        ${cat.full ? `<p class="highlight-full-text">${cat.full}</p>` : ""}
      </div>
    `).join("");

    longView.innerHTML = `
      <div class="lifestyle-city-header" style="border-left-color:${colors[city.key]}">
        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${colors[city.key]};margin-right:8px;vertical-align:middle;flex-shrink:0"></span>
        <strong>${city.label}</strong>
      </div>
      <div class="lifestyle-highlights-grid lifestyle-highlights-grid-full">
        ${catItemsHtml}
      </div>
    `;

    section.appendChild(shortView);
    section.appendChild(longView);
    container.appendChild(section);
  });
}
