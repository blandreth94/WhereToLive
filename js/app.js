/* ============================================================
   WhereToLive — App Logic
   Tab switching, DOM rendering, city legend, source attribution
   ============================================================ */

/* ----------------------------------------------------------
   Build the city color legend
   ---------------------------------------------------------- */
function buildCityLegend() {
  const container = document.getElementById("cityLegend");
  if (!container) return;

  CITY_DATA.meta.cities.forEach(city => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `
      <span class="legend-dot" style="background:${city.color}"></span>
      <span>${city.label}${city.current ? ' <em style="font-weight:400;opacity:0.65;">(current)</em>' : ""}</span>
    `;
    container.appendChild(item);
  });
}

/* ----------------------------------------------------------
   Collect unique sources from a category object
   Returns array of { name, url } (deduped by url)
   ---------------------------------------------------------- */
function collectSources(categoryObj) {
  const seen = new Set();
  const sources = [];
  Object.values(categoryObj).forEach(metric => {
    if (metric && metric.source && !seen.has(metric.source.url)) {
      seen.add(metric.source.url);
      sources.push({ name: metric.source.name, url: metric.source.url });
    }
    // Also collect suburbData source
    if (metric && metric.suburbData && metric.suburbData.source && !seen.has(metric.suburbData.source.url)) {
      seen.add(metric.suburbData.source.url);
      sources.push({ name: metric.suburbData.source.name, url: metric.suburbData.source.url });
    }
  });
  return sources;
}

/* ----------------------------------------------------------
   Render sources list for a tab
   ---------------------------------------------------------- */
function renderSources(listId, sources) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = sources.map(s =>
    `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a></li>`
  ).join("");
}

/* ----------------------------------------------------------
   Build a chart card element and append to a container
   Returns the canvas element ID for chart rendering
   ---------------------------------------------------------- */
function buildChartCard(containerId, { id, title, sourceName, sourceUrl, tall = false, fullWidth = false }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const card = document.createElement("div");
  card.className = "chart-card" + (fullWidth ? " full-width" : "");
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div class="chart-wrapper${tall ? " tall" : ""}">
      <canvas id="${id}"></canvas>
    </div>
  `;
  container.appendChild(card);
  return id;
}

/* ----------------------------------------------------------
   Build a chart card WITH an analysis section below the chart
   Returns { canvasId, analysisId }
   ---------------------------------------------------------- */
function buildChartCardWithAnalysis(containerId, { id, title, sourceName, sourceUrl, tall = false, fullWidth = false }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const analysisId = id + "-analysis";

  const card = document.createElement("div");
  card.className = "chart-card" + (fullWidth ? " full-width" : "");
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div class="chart-wrapper${tall ? " tall" : ""}">
      <canvas id="${id}"></canvas>
    </div>
    <details class="analysis-details">
      <summary>Analysis &amp; Context</summary>
      <div id="${analysisId}"></div>
    </details>
  `;
  container.appendChild(card);
  return { canvasId: id, analysisId };
}

/* ----------------------------------------------------------
   Build a stat card container with optional analysis
   Returns { containerId, analysisId }
   ---------------------------------------------------------- */
function buildStatCardContainerWithAnalysis(containerId, { id, title, sourceName, sourceUrl, fullWidth = false }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const analysisId = id + "-analysis";

  const card = document.createElement("div");
  card.className = "chart-card" + (fullWidth ? " full-width" : "");
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div id="${id}"></div>
    <details class="analysis-details">
      <summary>Analysis &amp; Context</summary>
      <div id="${analysisId}"></div>
    </details>
  `;
  container.appendChild(card);
  return { containerId: id, analysisId };
}

/* ----------------------------------------------------------
   Build a table card and append to charts container
   ---------------------------------------------------------- */
function buildTableCard(containerId, { id, title, sourceName, sourceUrl, fullWidth = true }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const card = document.createElement("div");
  card.className = "chart-card" + (fullWidth ? " full-width" : "");
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div id="${id}"></div>
  `;
  container.appendChild(card);
  return id;
}

/* ----------------------------------------------------------
   Build a suburb table card (full-width, with expand/collapse)
   ---------------------------------------------------------- */
function buildSuburbTableCard(containerId, { id, title, sourceName, sourceUrl }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const card = document.createElement("div");
  card.className = "chart-card full-width";
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div id="${id}"></div>
  `;
  container.appendChild(card);
  return id;
}

/* ----------------------------------------------------------
   Build a context panel card (vehicle costs, lifestyle highlights, etc.)
   ---------------------------------------------------------- */
function buildContextCard(containerId, { id, title, sourceName, sourceUrl, fullWidth = true }) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const card = document.createElement("div");
  card.className = "chart-card" + (fullWidth ? " full-width" : "");
  card.innerHTML = `
    <div class="chart-card-header">
      <div class="chart-card-title">${title}</div>
      <div class="chart-card-source">
        Source: <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a>
      </div>
    </div>
    <div id="${id}"></div>
  `;
  container.appendChild(card);
  return id;
}

/* ----------------------------------------------------------
   Build a section divider label within the grid
   ---------------------------------------------------------- */
function buildSectionDivider(containerId, label) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const divider = document.createElement("div");
  divider.className = "section-divider full-width";
  divider.innerHTML = `<h3>${label}</h3>`;
  container.appendChild(divider);
}

/* ----------------------------------------------------------
   RENDER: Cost of Living Tab
   ---------------------------------------------------------- */
function renderCostTab() {
  const d = CITY_DATA.costOfLiving;
  const grid = "charts-cost";

  // Median Home Price
  const homeIds = buildChartCardWithAnalysis(grid, {
    id: "chart-home-price",
    title: d.medianHomePrice.label,
    sourceName: d.medianHomePrice.source.name,
    sourceUrl:  d.medianHomePrice.source.url
  });
  renderBarChart(homeIds.canvasId, d.medianHomePrice);
  renderAnalysisBlock(homeIds.analysisId, d.medianHomePrice);

  // Median Rent
  const rentIds = buildChartCardWithAnalysis(grid, {
    id: "chart-rent",
    title: d.medianGrossRent.label,
    sourceName: d.medianGrossRent.source.name,
    sourceUrl:  d.medianGrossRent.source.url
  });
  renderBarChart(rentIds.canvasId, d.medianGrossRent);
  renderAnalysisBlock(rentIds.analysisId, d.medianGrossRent);

  // Rent with suburbs table
  if (d.medianGrossRent.suburbData) {
    const rentSuburbId = buildSuburbTableCard(grid, {
      id: "table-rent-suburbs",
      title: d.medianGrossRent.suburbData.title,
      sourceName: d.medianGrossRent.suburbData.source.name,
      sourceUrl:  d.medianGrossRent.suburbData.source.url
    });
    renderSuburbTable(rentSuburbId, d.medianGrossRent.suburbData);
  }

  // Median Household Income
  const incomeIds = buildChartCardWithAnalysis(grid, {
    id: "chart-income",
    title: d.medianHouseholdIncome.label,
    sourceName: d.medianHouseholdIncome.source.name,
    sourceUrl:  d.medianHouseholdIncome.source.url
  });
  renderBarChart(incomeIds.canvasId, d.medianHouseholdIncome);
  renderAnalysisBlock(incomeIds.analysisId, d.medianHouseholdIncome);

  // State Income Tax
  const taxIds = buildChartCardWithAnalysis(grid, {
    id: "chart-income-tax",
    title: d.stateIncomeTaxRate.label,
    sourceName: d.stateIncomeTaxRate.source.name,
    sourceUrl:  d.stateIncomeTaxRate.source.url
  });
  renderBarChart(taxIds.canvasId, d.stateIncomeTaxRate);
  renderAnalysisBlock(taxIds.analysisId, d.stateIncomeTaxRate);

  // Property Tax Rate
  const propTaxIds = buildChartCardWithAnalysis(grid, {
    id: "chart-property-tax",
    title: d.effectivePropertyTaxRate.label,
    sourceName: d.effectivePropertyTaxRate.source.name,
    sourceUrl:  d.effectivePropertyTaxRate.source.url
  });
  renderBarChart(propTaxIds.canvasId, d.effectivePropertyTaxRate);
  renderAnalysisBlock(propTaxIds.analysisId, d.effectivePropertyTaxRate);

  // Sales Tax
  const salesTaxIds = buildChartCardWithAnalysis(grid, {
    id: "chart-sales-tax",
    title: d.salesTax.label,
    sourceName: d.salesTax.source.name,
    sourceUrl:  d.salesTax.source.url
  });
  renderBarChart(salesTaxIds.canvasId, d.salesTax);
  renderAnalysisBlock(salesTaxIds.analysisId, d.salesTax);

  // Tax comparison table (full width)
  if (d.effectivePropertyTaxRate.suburbData) {
    const taxTableId = buildSuburbTableCard(grid, {
      id: "table-tax-comparison",
      title: d.effectivePropertyTaxRate.suburbData.title,
      sourceName: d.effectivePropertyTaxRate.suburbData.source.name,
      sourceUrl:  d.effectivePropertyTaxRate.suburbData.source.url
    });
    renderSuburbTable(taxTableId, d.effectivePropertyTaxRate.suburbData);
  }

  // State income tax summary table
  const incomeTaxTableId = buildTableCard(grid, {
    id: "table-income-tax",
    title: "State Income Tax — Summary Comparison",
    sourceName: d.stateIncomeTaxRate.source.name,
    sourceUrl:  d.stateIncomeTaxRate.source.url,
    fullWidth: true
  });
  renderTable(incomeTaxTableId, [
    {
      label: "Top Marginal Rate",
      values: d.stateIncomeTaxRate.values,
      format: "percent",
      unit: "%",
      highlightLow: true,
      highlightHigh: true
    }
  ]);

  // Sources
  const allSources = collectSources(d);
  renderSources("sources-list-cost", allSources);
}

/* ----------------------------------------------------------
   RENDER: Ongoing Expenses Tab
   (Utilities, Auto Insurance, Vehicle Registration)
   ---------------------------------------------------------- */
function renderExpensesTab() {
  const d = CITY_DATA.lifestyle;  // utilities & insurance live here in data.js
  const ctx = CITY_DATA.context;
  const grid = "charts-expenses";

  // Monthly Utilities chart
  const utilCard = buildChartCardWithAnalysis(grid, {
    id: "chart-utilities",
    title: d.monthlyUtilities.label,
    sourceName: d.monthlyUtilities.source.name,
    sourceUrl:  d.monthlyUtilities.source.url
  });
  renderBarChart(utilCard.canvasId, d.monthlyUtilities);
  renderAnalysisBlock(utilCard.analysisId, d.monthlyUtilities);

  // Utilities breakdown table
  if (d.monthlyUtilities.suburbData) {
    const utilTableId = buildSuburbTableCard(grid, {
      id: "table-utilities-breakdown",
      title: d.monthlyUtilities.suburbData.title,
      sourceName: d.monthlyUtilities.suburbData.source.name,
      sourceUrl:  d.monthlyUtilities.suburbData.source.url
    });
    renderSuburbTable(utilTableId, d.monthlyUtilities.suburbData);
  }

  // Auto Insurance chart
  const insuranceCard = buildChartCardWithAnalysis(grid, {
    id: "chart-auto-insurance",
    title: d.annualAutoInsurance.label,
    sourceName: d.annualAutoInsurance.source.name,
    sourceUrl:  d.annualAutoInsurance.source.url
  });
  renderBarChart(insuranceCard.canvasId, d.annualAutoInsurance);
  renderAnalysisBlock(insuranceCard.analysisId, d.annualAutoInsurance);

  // Vehicle Registration Costs panel
  if (ctx && ctx.vehicleCosts) {
    const vehicleId = buildContextCard(grid, {
      id: "panel-vehicle-costs",
      title: ctx.vehicleCosts.label + " (Two Adults, Two $25k Vehicles)",
      sourceName: ctx.vehicleCosts.source.name,
      sourceUrl:  ctx.vehicleCosts.source.url,
      fullWidth: true
    });
    renderVehicleCostsPanel(vehicleId, ctx.vehicleCosts);
  }

  // Sources
  const expSources = collectSources({
    monthlyUtilities: d.monthlyUtilities,
    annualAutoInsurance: d.annualAutoInsurance
  });
  if (ctx && ctx.vehicleCosts) {
    expSources.push({ name: ctx.vehicleCosts.source.name, url: ctx.vehicleCosts.source.url });
  }
  renderSources("sources-list-expenses", expSources);
}

/* ----------------------------------------------------------
   RENDER: Climate & Environment Tab
   (Weather + Natural Disaster Risk — no crime)
   ---------------------------------------------------------- */
function renderClimateTab() {
  const climate  = CITY_DATA.climate;
  const disaster = CITY_DATA.disasterRisk;
  const grid     = "charts-climate";

  // Temperature grouped chart (summer high / winter low)
  buildChartCard(grid, {
    id: "chart-temperature",
    title: "Temperature Ranges (July Avg High / January Avg Low)",
    sourceName: climate.avgHighJuly.source.name,
    sourceUrl:  climate.avgHighJuly.source.url,
    tall: true
  });
  renderGroupedBarChart("chart-temperature", "Temperature", [
    { label: "July Avg High (°F)", values: climate.avgHighJuly.values, color: "#e15759" },
    { label: "January Avg Low (°F)", values: climate.avgLowJanuary.values, color: "#76b7b2" }
  ], "°F", "number");

  // July High analysis
  const julyAnalysisCard = buildChartCardWithAnalysis(grid, {
    id: "chart-july-high",
    title: climate.avgHighJuly.label,
    sourceName: climate.avgHighJuly.source.name,
    sourceUrl:  climate.avgHighJuly.source.url
  });
  renderBarChart(julyAnalysisCard.canvasId, climate.avgHighJuly);
  renderAnalysisBlock(julyAnalysisCard.analysisId, climate.avgHighJuly);

  // January Low analysis
  const janLowCard = buildChartCardWithAnalysis(grid, {
    id: "chart-jan-low",
    title: climate.avgLowJanuary.label,
    sourceName: climate.avgLowJanuary.source.name,
    sourceUrl:  climate.avgLowJanuary.source.url
  });
  renderBarChart(janLowCard.canvasId, climate.avgLowJanuary);
  renderAnalysisBlock(janLowCard.analysisId, climate.avgLowJanuary);

  // Precipitation / Snowfall grouped
  buildChartCard(grid, {
    id: "chart-precip",
    title: "Annual Precipitation &amp; Snowfall",
    sourceName: climate.annualPrecipitationInches.source.name,
    sourceUrl:  climate.annualPrecipitationInches.source.url,
    tall: true
  });
  renderGroupedBarChart("chart-precip", "Precipitation", [
    { label: "Annual Precipitation (in)", values: climate.annualPrecipitationInches.values, color: "#4e79a7" },
    { label: "Annual Snowfall (in)", values: climate.annualSnowfallInches.values, color: "#9ec8e6" }
  ], "in", "number");

  // Precipitation analysis
  const precipCard = buildChartCardWithAnalysis(grid, {
    id: "chart-precip-detail",
    title: climate.annualPrecipitationInches.label,
    sourceName: climate.annualPrecipitationInches.source.name,
    sourceUrl:  climate.annualPrecipitationInches.source.url
  });
  renderBarChart(precipCard.canvasId, climate.annualPrecipitationInches);
  renderAnalysisBlock(precipCard.analysisId, climate.annualPrecipitationInches);

  // Snowfall analysis
  const snowCard = buildChartCardWithAnalysis(grid, {
    id: "chart-snow-detail",
    title: climate.annualSnowfallInches.label,
    sourceName: climate.annualSnowfallInches.source.name,
    sourceUrl:  climate.annualSnowfallInches.source.url
  });
  renderBarChart(snowCard.canvasId, climate.annualSnowfallInches);
  renderAnalysisBlock(snowCard.analysisId, climate.annualSnowfallInches);

  // Sunny Days
  const sunnyCard = buildChartCardWithAnalysis(grid, {
    id: "chart-sunny",
    title: climate.sunnyDaysPerYear.label,
    sourceName: climate.sunnyDaysPerYear.source.name,
    sourceUrl:  climate.sunnyDaysPerYear.source.url
  });
  renderBarChart(sunnyCard.canvasId, climate.sunnyDaysPerYear);
  renderAnalysisBlock(sunnyCard.analysisId, climate.sunnyDaysPerYear);

  // Natural Disaster Risk (grouped overview)
  buildChartCard(grid, {
    id: "chart-disaster",
    title: "Natural Disaster Risk Overview (FEMA NRI Score, higher = greater risk)",
    sourceName: disaster.tornadoRisk.source.name,
    sourceUrl:  disaster.tornadoRisk.source.url,
    tall: true,
    fullWidth: true
  });
  renderGroupedBarChart("chart-disaster", "Disaster Risk", [
    { label: "Tornado Risk",  values: disaster.tornadoRisk.values,   color: "#e15759" },
    { label: "Flood Risk",    values: disaster.floodRisk.values,     color: "#4e79a7" },
    { label: "Wildfire Risk", values: disaster.wildfireRisk.values,  color: "#f28e2b" }
  ], "", "number");

  // Tornado Risk individual
  const tornadoCard = buildChartCardWithAnalysis(grid, {
    id: "chart-tornado",
    title: disaster.tornadoRisk.label,
    sourceName: disaster.tornadoRisk.source.name,
    sourceUrl:  disaster.tornadoRisk.source.url
  });
  renderBarChart(tornadoCard.canvasId, disaster.tornadoRisk);
  renderAnalysisBlock(tornadoCard.analysisId, disaster.tornadoRisk);

  // Flood Risk individual
  const floodCard = buildChartCardWithAnalysis(grid, {
    id: "chart-flood",
    title: disaster.floodRisk.label,
    sourceName: disaster.floodRisk.source.name,
    sourceUrl:  disaster.floodRisk.source.url
  });
  renderBarChart(floodCard.canvasId, disaster.floodRisk);
  renderAnalysisBlock(floodCard.analysisId, disaster.floodRisk);

  // Wildfire Risk individual
  const wildfireCard = buildChartCardWithAnalysis(grid, {
    id: "chart-wildfire",
    title: disaster.wildfireRisk.label,
    sourceName: disaster.wildfireRisk.source.name,
    sourceUrl:  disaster.wildfireRisk.source.url
  });
  renderBarChart(wildfireCard.canvasId, disaster.wildfireRisk);
  renderAnalysisBlock(wildfireCard.analysisId, disaster.wildfireRisk);

  // Sources (climate + disaster only — crime is in Lifestyle tab)
  const allSources = collectSources({ ...climate, ...disaster });
  renderSources("sources-list-climate", allSources);
}

/* ----------------------------------------------------------
   RENDER: Lifestyle & Recreation Tab
   (Commute, Transit, Parks, Crime, Lifestyle Highlights)
   ---------------------------------------------------------- */
function renderLifestyleTab() {
  const d      = CITY_DATA.lifestyle;
  const safety = CITY_DATA.safety;
  const ctx    = CITY_DATA.context;
  const grid   = "charts-lifestyle";

  // Commute Time
  const commuteCard = buildChartCardWithAnalysis(grid, {
    id: "chart-commute",
    title: d.avgCommuteMinutes.label,
    sourceName: d.avgCommuteMinutes.source.name,
    sourceUrl:  d.avgCommuteMinutes.source.url,
    tall: true
  });
  renderHorizontalBarChart(commuteCard.canvasId, d.avgCommuteMinutes);
  renderAnalysisBlock(commuteCard.analysisId, d.avgCommuteMinutes);

  // Transit Options (stat cards)
  const transitIds = buildStatCardContainerWithAnalysis(grid, {
    id: "statcards-transit",
    title: d.transitDescription.label,
    sourceName: d.transitDescription.source.name,
    sourceUrl:  d.transitDescription.source.url,
    fullWidth: true
  });
  renderStatCards(transitIds.containerId, d.transitDescription);
  renderAnalysisBlock(transitIds.analysisId, d.transitDescription);

  // Park Land %
  const parksCard = buildChartCardWithAnalysis(grid, {
    id: "chart-parks",
    title: d.parkLandPercent.label,
    sourceName: d.parkLandPercent.source.name,
    sourceUrl:  d.parkLandPercent.source.url
  });
  renderBarChart(parksCard.canvasId, d.parkLandPercent);
  renderAnalysisBlock(parksCard.analysisId, d.parkLandPercent);

  // Lifestyle Highlights (skiing, BLM, aviation, motorcycle)
  if (ctx && ctx.lifestyleHighlights) {
    const highlightId = buildContextCard(grid, {
      id: "panel-lifestyle-highlights",
      title: ctx.lifestyleHighlights.label,
      sourceName: ctx.lifestyleHighlights.source.name,
      sourceUrl:  ctx.lifestyleHighlights.source.url,
      fullWidth: true
    });
    renderLifestyleHighlights(highlightId, ctx.lifestyleHighlights);
  }

  // Sources
  const allSources = collectSources(d);
  renderSources("sources-list-lifestyle", allSources);
}

/* ----------------------------------------------------------
   RENDER: Childcare & Education Tab
   ---------------------------------------------------------- */
function renderChildcareTab() {
  const d = CITY_DATA.childcare;
  const grid = "charts-childcare";

  // Childcare costs grouped overview
  buildChartCard(grid, {
    id: "chart-childcare-costs",
    title: "Annual Center-Based Childcare Costs by Age",
    sourceName: d.annualInfantCenterCost.source.name,
    sourceUrl:  d.annualInfantCenterCost.source.url,
    tall: true,
    fullWidth: true
  });
  renderGroupedBarChart("chart-childcare-costs", "Childcare Costs", [
    { label: "Infant",   values: d.annualInfantCenterCost.values,   color: "#e15759" },
    { label: "Toddler",  values: d.annualToddlerCenterCost.values,  color: "#f28e2b" },
    { label: "PreK",     values: d.annualPreKCenterCost.values,     color: "#59a14f" }
  ], "/yr", "currency");

  // Infant Care detail
  const infantCard = buildChartCardWithAnalysis(grid, {
    id: "chart-infant-care",
    title: d.annualInfantCenterCost.label,
    sourceName: d.annualInfantCenterCost.source.name,
    sourceUrl:  d.annualInfantCenterCost.source.url
  });
  renderBarChart(infantCard.canvasId, d.annualInfantCenterCost);
  renderAnalysisBlock(infantCard.analysisId, d.annualInfantCenterCost);

  // Toddler Care detail
  const toddlerCard = buildChartCardWithAnalysis(grid, {
    id: "chart-toddler-care",
    title: d.annualToddlerCenterCost.label,
    sourceName: d.annualToddlerCenterCost.source.name,
    sourceUrl:  d.annualToddlerCenterCost.source.url
  });
  renderBarChart(toddlerCard.canvasId, d.annualToddlerCenterCost);
  renderAnalysisBlock(toddlerCard.analysisId, d.annualToddlerCenterCost);

  // PreK Care detail
  const preKCostCard = buildChartCardWithAnalysis(grid, {
    id: "chart-prek-cost",
    title: d.annualPreKCenterCost.label,
    sourceName: d.annualPreKCenterCost.source.name,
    sourceUrl:  d.annualPreKCenterCost.source.url
  });
  renderBarChart(preKCostCard.canvasId, d.annualPreKCenterCost);
  renderAnalysisBlock(preKCostCard.analysisId, d.annualPreKCenterCost);

  // PreK Enrollment Rate
  const preKEnrollCard = buildChartCardWithAnalysis(grid, {
    id: "chart-prek-enrollment",
    title: d.preKEnrollmentRate4YearOlds.label,
    sourceName: d.preKEnrollmentRate4YearOlds.source.name,
    sourceUrl:  d.preKEnrollmentRate4YearOlds.source.url
  });
  renderBarChart(preKEnrollCard.canvasId, d.preKEnrollmentRate4YearOlds);
  renderAnalysisBlock(preKEnrollCard.analysisId, d.preKEnrollmentRate4YearOlds);

  // School District Grades (stat cards)
  const gradeIds = buildStatCardContainerWithAnalysis(grid, {
    id: "statcards-grades",
    title: d.schoolDistrictGrade.label,
    sourceName: d.schoolDistrictGrade.source.name,
    sourceUrl:  d.schoolDistrictGrade.source.url,
    fullWidth: true
  });
  renderStatCards(gradeIds.containerId, d.schoolDistrictGrade);
  renderAnalysisBlock(gradeIds.analysisId, d.schoolDistrictGrade);

  // School districts by suburb table
  if (d.schoolDistrictGrade.suburbData) {
    const schoolSuburbId = buildSuburbTableCard(grid, {
      id: "table-school-suburbs",
      title: d.schoolDistrictGrade.suburbData.title,
      sourceName: d.schoolDistrictGrade.suburbData.source.name,
      sourceUrl:  d.schoolDistrictGrade.suburbData.source.url
    });
    renderSuburbTable(schoolSuburbId, d.schoolDistrictGrade.suburbData);
  }

  // Sources
  const allSources = collectSources(d);
  renderSources("sources-list-childcare", allSources);
}

/* ----------------------------------------------------------
   Helper: append a section heading + inner grid to a parent container
   Returns the inner grid element ID for appending cards into
   ---------------------------------------------------------- */
function buildPoliticsSection(parentId, label) {
  const parent = document.getElementById(parentId);
  if (!parent) return null;

  const section = document.createElement("div");
  section.className = "politics-section";

  const heading = document.createElement("div");
  heading.className = "politics-section-heading";
  heading.textContent = label;

  const innerGrid = document.createElement("div");
  innerGrid.className = "politics-inner-grid";
  const innerId = "politics-inner-" + label.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  innerGrid.id = innerId;

  section.appendChild(heading);
  section.appendChild(innerGrid);
  parent.appendChild(section);
  return innerId;
}

/* ----------------------------------------------------------
   RENDER: Politics, Law & Regulatory Environment Tab
   (Crime, Employment Law, Firearms)
   ---------------------------------------------------------- */
function renderPoliticsTab() {
  const p      = CITY_DATA.politics;
  const safety = CITY_DATA.safety;
  const outerGrid = "charts-politics";

  // --- Crime & Public Safety ---
  const crimeGrid = buildPoliticsSection(outerGrid, "Crime & Public Safety");

  const violentCard = buildChartCardWithAnalysis(crimeGrid, {
    id: "chart-violent-crime",
    title: safety.violentCrimeRate.label,
    sourceName: safety.violentCrimeRate.source.name,
    sourceUrl:  safety.violentCrimeRate.source.url
  });
  renderBarChart(violentCard.canvasId, safety.violentCrimeRate);
  renderAnalysisBlock(violentCard.analysisId, safety.violentCrimeRate);

  const propCrimeCard = buildChartCardWithAnalysis(crimeGrid, {
    id: "chart-property-crime",
    title: safety.propertyCrimeRate.label,
    sourceName: safety.propertyCrimeRate.source.name,
    sourceUrl:  safety.propertyCrimeRate.source.url
  });
  renderBarChart(propCrimeCard.canvasId, safety.propertyCrimeRate);
  renderAnalysisBlock(propCrimeCard.analysisId, safety.propertyCrimeRate);

  // --- Alcohol Laws ---
  if (p && p.alcoholLaws) {
    const alcoholGrid = buildPoliticsSection(outerGrid, "Alcohol Laws & Hospitality Ecosystem");
    const alcoholId = buildContextCard(alcoholGrid, {
      id: "panel-alcohol-laws",
      title: p.alcoholLaws.label,
      sourceName: p.alcoholLaws.source.name,
      sourceUrl:  p.alcoholLaws.source.url,
      fullWidth: true
    });
    renderAlcoholLawsPanel(alcoholId, p.alcoholLaws);
  }

  // --- Employment Law ---
  if (p && p.employmentLaw) {
    const empGrid = buildPoliticsSection(outerGrid, "Employment Law & Worker Protections");
    const empLawId = buildContextCard(empGrid, {
      id: "panel-employment-law",
      title: p.employmentLaw.label,
      sourceName: p.employmentLaw.source.name,
      sourceUrl:  p.employmentLaw.source.url,
      fullWidth: true
    });
    renderPoliticsPanel(empLawId, p.employmentLaw);
  }

  // --- Firearms Law ---
  if (p && p.firearmsLaw) {
    const firearmsGrid = buildPoliticsSection(outerGrid, "Firearms Laws & 2nd Amendment Environment");
    const firearmsId = buildContextCard(firearmsGrid, {
      id: "panel-firearms-law",
      title: p.firearmsLaw.label,
      sourceName: p.firearmsLaw.source.name,
      sourceUrl:  p.firearmsLaw.source.url,
      fullWidth: true
    });
    renderPoliticsPanel(firearmsId, p.firearmsLaw);
  }

  // Sources
  const allSources = collectSources(safety);
  if (p && p.alcoholLaws)   allSources.push({ name: p.alcoholLaws.source.name,   url: p.alcoholLaws.source.url });
  if (p && p.employmentLaw) allSources.push({ name: p.employmentLaw.source.name, url: p.employmentLaw.source.url });
  if (p && p.firearmsLaw)   allSources.push({ name: p.firearmsLaw.source.name,   url: p.firearmsLaw.source.url });
  renderSources("sources-list-politics", allSources);
}

/* ----------------------------------------------------------
   Tab switching logic
   ---------------------------------------------------------- */
const TAB_RENDERERS = {
  cost:      { fn: renderCostTab,      rendered: false },
  expenses:  { fn: renderExpensesTab,  rendered: false },
  climate:   { fn: renderClimateTab,   rendered: false },
  lifestyle: { fn: renderLifestyleTab, rendered: false },
  childcare: { fn: renderChildcareTab, rendered: false },
  politics:  { fn: renderPoliticsTab,  rendered: false }
};

function switchTab(tabKey) {
  // Update buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    const isActive = btn.dataset.tab === tabKey;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Update panels
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === "tab-" + tabKey);
  });

  // Render tab content (only once per tab)
  const renderer = TAB_RENDERERS[tabKey];
  if (renderer && !renderer.rendered) {
    renderer.fn();
    renderer.rendered = true;
  }
}

/* ----------------------------------------------------------
   Init
   ---------------------------------------------------------- */
function init() {
  // Set last updated year
  const luEl = document.getElementById("lastUpdated");
  if (luEl) luEl.textContent = CITY_DATA.meta.lastUpdated;

  // Build city legend
  buildCityLegend();

  // Wire up tab buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Render initial tab (cost of living)
  switchTab("cost");
}

document.addEventListener("DOMContentLoaded", init);
