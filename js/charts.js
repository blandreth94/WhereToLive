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

/* ----------------------------------------------------------
   CONNECTIVITY MATRIX
   ---------------------------------------------------------- */

const CONN_TYPE_META = {
  direct:     { icon: "✈",     label: "Direct",      cls: "conn-cell-direct" },
  upcoming:   { icon: "✈",     label: "Coming Soon", cls: "conn-cell-upcoming" },
  seasonal:   { icon: "✈",     label: "Seasonal",    cls: "conn-cell-seasonal" },
  connecting: { icon: "✈",     label: "Connecting",  cls: "conn-cell-connecting" },
  drive:      { icon: "🚗",    label: "Drive",       cls: "conn-cell-drive" },
  amtrak:     { icon: "🚆",    label: "Amtrak",      cls: "conn-cell-amtrak" },
  mixed:      { icon: "✈/🚆", label: "Multi",        cls: "conn-cell-mixed" },
  self:       { icon: "—",     label: "",            cls: "conn-cell-self" },
};

function renderConnectivityMatrix(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = getCityColors();
  const cities = CITY_DATA.meta.cities;

  // Build flat destination list; track which keys start a new group
  const groups = data.destinations;
  const flatDests = groups.flatMap(g => g.items);
  const groupStartKeys = new Set();
  let colIdx = 0;
  groups.forEach(g => {
    if (colIdx > 0) groupStartKeys.add(g.items[0].key);
    colIdx += g.items.length;
  });

  // ---- Build <table> ----
  const table = document.createElement("table");
  table.className = "conn-table";

  const thead = document.createElement("thead");

  // Row 1: group headers (with col spans)
  const groupRow = document.createElement("tr");
  groupRow.className = "conn-group-header";
  const corner = document.createElement("th");
  corner.rowSpan = 2;
  corner.style.cssText = "text-align:left;font-size:0.62rem;color:var(--text-muted);padding:6px 10px;";
  corner.textContent = "Origin ↓ / Destination →";
  groupRow.appendChild(corner);
  groups.forEach(g => {
    const th = document.createElement("th");
    th.colSpan = g.items.length;
    th.textContent = g.group;
    if (groupStartKeys.has(g.items[0].key)) th.classList.add("conn-group-start");
    groupRow.appendChild(th);
  });
  thead.appendChild(groupRow);

  // Row 2: individual destination labels
  const destRow = document.createElement("tr");
  destRow.className = "conn-dest-header";
  flatDests.forEach(dest => {
    const th = document.createElement("th");
    th.textContent = dest.label;
    if (groupStartKeys.has(dest.key)) th.classList.add("conn-group-start");
    destRow.appendChild(th);
  });
  thead.appendChild(destRow);
  table.appendChild(thead);

  // Body: one row per origin city
  const tbody = document.createElement("tbody");
  cities.forEach(city => {
    const tr = document.createElement("tr");

    // Sticky origin label
    const td0 = document.createElement("td");
    td0.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${colors[city.key]};margin-right:6px;vertical-align:middle;flex-shrink:0"></span>${city.label}`;
    tr.appendChild(td0);

    flatDests.forEach(dest => {
      const td = document.createElement("td");
      if (groupStartKeys.has(dest.key)) td.classList.add("conn-group-start");

      const cellData = (data.matrix[city.key] || {})[dest.key];
      const type = cellData ? cellData.type : "self";
      const meta = CONN_TYPE_META[type] || CONN_TYPE_META.connecting;

      if (!cellData || type === "self") {
        const selfDiv = document.createElement("div");
        selfDiv.className = "conn-cell conn-cell-self";
        selfDiv.innerHTML = `<span class="conn-cell-icon">—</span>`;
        td.appendChild(selfDiv);
        tr.appendChild(td);
        return;
      }

      const timeHtml = cellData.time
        ? `<span class="conn-cell-time">${cellData.time.replace(/^~/, "≈")}</span>`
        : "";

      const div = document.createElement("div");
      div.className = `conn-cell ${meta.cls}`;
      div.setAttribute("role", "button");
      div.setAttribute("tabindex", "0");
      div.setAttribute("aria-label", `${city.label} to ${dest.label}: ${meta.label}`);
      div.innerHTML = `
        <span class="conn-cell-icon">${meta.icon}</span>
        <span class="conn-cell-label">${meta.label}</span>
        ${timeHtml}
      `;

      div.addEventListener("click", () => showConnectivityModal(city, dest, cellData, colors));
      div.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showConnectivityModal(city, dest, cellData, colors);
        }
      });

      td.appendChild(div);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Scrollable wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "connectivity-table-wrapper";
  wrapper.appendChild(table);
  container.appendChild(wrapper);

  // Legend
  const legendDefs = [
    { key: "direct",     label: "Nonstop direct flight" },
    { key: "upcoming",   label: "Nonstop launching soon" },
    { key: "seasonal",   label: "Seasonal nonstop" },
    { key: "connecting", label: "Connecting flight(s)" },
    { key: "drive",      label: "Drive recommended" },
    { key: "amtrak",     label: "Amtrak rail" },
    { key: "mixed",      label: "Multiple options (fly + rail)" },
  ];
  const legend = document.createElement("div");
  legend.className = "conn-legend";
  legendDefs.forEach(lt => {
    const item = document.createElement("div");
    item.className = "conn-legend-item";
    item.innerHTML = `<span class="conn-legend-swatch conn-legend-swatch-${lt.key}"></span>${lt.label}`;
    legend.appendChild(item);
  });
  container.appendChild(legend);
}

/* ----------------------------------------------------------
   CONNECTIVITY MODAL
   ---------------------------------------------------------- */

function showConnectivityModal(originCity, destDef, cellData, colors) {
  // Remove any existing modal
  const existing = document.getElementById("conn-modal-overlay");
  if (existing) existing.remove();

  const TYPE_LABELS = {
    direct:     "Nonstop Direct",
    upcoming:   "Nonstop — Launching Soon",
    seasonal:   "Seasonal Nonstop",
    connecting: "Connecting Flight(s)",
    drive:      "Drive Recommended",
    amtrak:     "Amtrak Rail",
    mixed:      "Multiple Options",
  };
  const typeLabel = TYPE_LABELS[cellData.type] || cellData.type;

  const originDot = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colors[originCity.key]};margin-right:5px;vertical-align:middle;flex-shrink:0"></span>`;

  // Meta row
  let metaHtml = "";
  if (cellData.time) metaHtml += `<div class="conn-modal-meta-item"><span class="conn-modal-meta-label">Est. Time</span><span class="conn-modal-meta-value">${cellData.time}</span></div>`;
  if (cellData.fare) metaHtml += `<div class="conn-modal-meta-item"><span class="conn-modal-meta-label">Typical Fare</span><span class="conn-modal-meta-value">${cellData.fare}</span></div>`;
  if (cellData.note) metaHtml += `<div class="conn-modal-meta-item" style="flex-basis:100%"><span class="conn-modal-meta-label">Note</span><span class="conn-modal-meta-value" style="font-weight:400;font-size:0.78rem">${cellData.note}</span></div>`;

  const sourceHtml = cellData.source
    ? `<div class="conn-modal-source">Source: <a href="${cellData.source.url}" target="_blank" rel="noopener">${cellData.source.name}</a></div>`
    : "";

  const detailsHtml = cellData.details
    ? `<button class="conn-modal-details-toggle" aria-expanded="false">▸ Show full analysis</button>
       <div class="conn-modal-details-text" style="display:none">${cellData.details}</div>`
    : "";

  const overlay = document.createElement("div");
  overlay.id = "conn-modal-overlay";
  overlay.className = "conn-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="conn-modal" role="document">
      <div class="conn-modal-header">
        <div>
          <div class="conn-modal-title">${originDot}${originCity.label} → ${destDef.label}</div>
          <div class="conn-modal-subtitle">Connectivity Overview</div>
        </div>
        <button class="conn-modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="conn-modal-type-badge ${cellData.type}">${typeLabel}</div>
      ${metaHtml ? `<div class="conn-modal-meta">${metaHtml}</div>` : ""}
      <div class="conn-modal-body">
        <p class="conn-modal-summary">${cellData.summary || ""}</p>
        ${detailsHtml}
        ${sourceHtml}
      </div>
    </div>
  `;

  // Close on backdrop click
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });

  // Close button
  overlay.querySelector(".conn-modal-close").addEventListener("click", () => overlay.remove());

  // Details toggle
  const toggleBtn = overlay.querySelector(".conn-modal-details-toggle");
  if (toggleBtn) {
    const detailsEl = overlay.querySelector(".conn-modal-details-text");
    toggleBtn.addEventListener("click", () => {
      const isOpen = detailsEl.style.display !== "none";
      detailsEl.style.display = isOpen ? "none" : "block";
      toggleBtn.textContent = isOpen ? "▸ Show full analysis" : "▾ Hide full analysis";
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // Escape key closes modal
  const escHandler = e => {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);

  document.body.appendChild(overlay);

  // Focus the close button for accessibility
  const closeBtn = overlay.querySelector(".conn-modal-close");
  if (closeBtn) closeBtn.focus();
}

/* ----------------------------------------------------------
   HUB PROFILE CARDS
   ---------------------------------------------------------- */

function renderHubProfiles(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = getCityColors();
  const cities = CITY_DATA.meta.cities;

  const grid = document.createElement("div");
  grid.className = "hub-profiles-grid";

  cities.forEach(city => {
    const profile = data.hubProfiles[city.key];
    if (!profile) return;

    const card = document.createElement("div");
    card.className = "hub-profile-card";

    const fareValueHtml = profile.btsFare
      ? `<span class="hub-fare-value">$${profile.btsFare}</span>`
      : `<span class="hub-fare-value" style="font-size:0.78rem;font-weight:500;color:var(--text-muted)">N/A</span>`;

    const strengthsHtml = (profile.strengths || []).map(s => `<li>${s}</li>`).join("");
    const gapsHtml      = (profile.gaps || []).map(g => `<li>${g}</li>`).join("");

    card.innerHTML = `
      <div class="hub-profile-header">
        <div class="hub-profile-header-top">
          <span class="hub-city-dot" style="background:${colors[city.key]}"></span>
          <div>
            <div class="hub-airport-name">${profile.airportCode} — ${city.label}</div>
            <div class="hub-airport-sub">${profile.airportName}</div>
          </div>
        </div>
        <span class="hub-airport-badge">${profile.airportType}</span>
      </div>
      <div class="hub-fare-row">
        <span class="hub-fare-label">BTS Avg Fare</span>
        ${fareValueHtml}
        <span class="hub-fare-note">${profile.btsFareNote || ""}</span>
      </div>
      <div class="hub-lists">
        <div class="hub-list-col strengths-col">
          <div class="hub-list-title strengths">✓ Strengths</div>
          <ul>${strengthsHtml}</ul>
        </div>
        <div class="hub-list-col gaps-col">
          <div class="hub-list-title gaps">✗ Gaps</div>
          <ul>${gapsHtml}</ul>
        </div>
      </div>
      <div class="hub-toggle-bar">
        <button class="hub-toggle-btn active" data-panel="summary">Summary</button>
        <button class="hub-toggle-btn" data-panel="details">Full Analysis</button>
      </div>
      <div class="hub-toggle-content visible">${profile.summary || ""}</div>
      <div class="hub-toggle-content">${profile.details || ""}</div>
    `;

    // Toggle
    const btns   = card.querySelectorAll(".hub-toggle-btn");
    const panels = card.querySelectorAll(".hub-toggle-content");
    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("visible"));
        btn.classList.add("active");
        panels[i].classList.add("visible");
      });
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
