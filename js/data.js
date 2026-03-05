/* ============================================================
   WhereToLive — City Data
   All values sourced from official/authoritative sources.
   Each metric includes: label, unit, chartType, source (name + url), values per city,
   optional suburbValues for expanded suburb tables, and qualitative analysis per city.
   ============================================================ */

const CITY_DATA = {

  meta: {
    lastUpdated: "2025–2026",
    cities: [
      { key: "roanoke", label: "Roanoke, VA",       color: "#4e79a7", current: true },
      { key: "waldorf", label: "Waldorf, MD",        color: "#f28e2b", current: true },
      { key: "denver",  label: "Denver, CO",          color: "#e15759", current: false },
      { key: "slc",     label: "Salt Lake City, UT",  color: "#76b7b2", current: false },
      { key: "raleigh", label: "Raleigh, NC",         color: "#59a14f", current: false },
      { key: "dfw",     label: "DFW, TX",             color: "#b07aa1", current: false }
    ]
  },

  /* ----------------------------------------------------------
     COST OF LIVING & TAXES
     ---------------------------------------------------------- */
  costOfLiving: {

    medianHomePrice: {
      label: "Median Home Value",
      unit: "$",
      format: "currency",
      chartType: "bar",
      description: "Owner-occupied median home value. Roanoke, Denver, SLC, Raleigh, Dallas from ACS 2024 1-year estimates via Census Reporter. Charles County (Waldorf) from ACS 2024 1-year estimates.",
      source: {
        name: "U.S. Census Bureau, American Community Survey 1-Year Estimates (2024)",
        url: "https://censusreporter.org"
      },
      values: {
        roanoke: 214800,   // Roanoke city, VA — Census Reporter ACS 2024 1-yr
        waldorf:  462100,  // Charles County, MD — Census Reporter ACS 2024 1-yr
        denver:   636400,  // Denver city & county, CO — Census Reporter ACS 2024 1-yr
        slc:      620100,  // Salt Lake City, UT — Census Reporter ACS 2024 1-yr
        raleigh:  450300,  // Raleigh city, NC — Census Reporter ACS 2024 1-yr
        dfw:      340400   // Dallas city, TX — Census Reporter ACS 2024 1-yr
      },
      analysis: {
        roanoke:  "Roanoke is exceptionally affordable — median home prices are approximately 22% below the national average, making it one of the most accessible markets for first-time buyers in the Eastern U.S. Market velocity is moderate, with homes typically spending 23–48 days on market, reflecting steady but non-frenzied demand.",
        waldorf:  "Waldorf's home values are entirely driven by Washington D.C. proximity. The high barrier to entry locks many residents into long-term renting, perpetuating wealth accumulation disadvantage. Homes typically spend 56–69 days on market, reflecting the niche buyer pool for this commuter suburb.",
        denver:   "Denver's entry cost is punitive for median wage earners. Recent cooling has not fundamentally changed affordability dynamics, and appreciation cycles tend to be steep when activity resumes. In competitive submarkets like Boulder, homes average just ~19 days on market despite median prices near $1M.",
        slc:      "Salt Lake City has experienced immense appreciation over the last decade, but remains slightly more accessible than Denver. The broader Utah market continues to outpace income growth.",
        raleigh:  "Raleigh maintains resilient values despite national corrections, fueled by continuous Research Triangle tech and pharma demand. A relatively balanced yet highly competitive market compared to Mountain West peers.",
        dfw:      "DFW relies on high construction volumes to manage costs. Despite massive population growth, Dallas proper remains well below national median — one of the best values among large metros. Market velocity varies sharply by suburb: Plano averages ~25 days on market while Frisco runs closer to 81 days, reflecting different phases of their development cycles."
      }
    },

    medianGrossRent: {
      label: "Median Gross Rent (Monthly)",
      unit: "$/mo",
      format: "currency",
      chartType: "bar",
      description: "Median monthly gross rent (contract rent + utilities) for renter-occupied units. Values from ACS 2023 5-year estimates.",
      source: {
        name: "U.S. Census Bureau, American Community Survey 5-Year Estimates (2023)",
        url: "https://data.census.gov/table/ACSDT5Y2023.B25064"
      },
      values: {
        roanoke: 964,    // Roanoke city, VA — ACS 2023 5-yr
        waldorf:  1949,  // Waldorf CDP, MD — ACS 2023 5-yr
        denver:   1665,  // Denver city, CO — ACS 5-yr
        slc:      1343,  // Salt Lake City, UT — ACS 2023 5-yr
        raleigh:  1468,  // Raleigh city, NC — ACS 2023 5-yr
        dfw:      1403   // Dallas city, TX — ACS 2023 5-yr
      },
      analysis: {
        roanoke:  "Roanoke's rental market is among the most affordable in the Eastern U.S. Two-bedroom units average $1,316 and three-bedrooms ~$1,634 — well insulated from coastal inflation.",
        waldorf:  "Waldorf rents are ~13% above the national average. Half of all rentals exceed $2,000/mo, and the market skews heavily toward upper-quartile pricing with virtually no sub-$1,000 inventory. Sustaining a 30% rent-to-income ratio requires $73,500+ annually.",
        denver:   "Denver rents remain elevated despite a 3.7% YoY decrease in early 2026. The disparity between apartment and single-family rents is stark — three-bedroom townhomes average ~$4,003/mo versus $2,872 for apartments.",
        slc:      "SLC offers a measurable discount versus Denver, though it is no longer the affordable haven of a decade ago. A sizable 48% of inventory falls in the $1,001–$1,500 range, offering relative opportunity for budget-conscious renters.",
        raleigh:  "Raleigh occupies an optimal middle ground: high-quality suburban lifestyle without the restrictive costs of Mountain West or D.C. suburbs. Highly competitive market due to continuous professional in-migration.",
        dfw:      "DFW leverages constant new construction to moderate costs. 48% of rentals fall in the $1,001–$1,500 range. Transportation and grocery costs also run below national averages, compounding the value proposition."
      },
      suburbData: {
        title: "2-Bedroom & 3-Bedroom Market Rents by City & Suburb",
        source: { name: "Apartments.com Market Trends (2025–2026)", url: "https://www.apartments.com/rent-market-trends/" },
        columns: ["Area", "2-Bedroom Avg", "3-Bedroom Avg", "Notes"],
        rows: [
          { area: "Roanoke, VA",      city: "roanoke", twoBed: 1316,  threeBed: 1634,  notes: "Current — most affordable primary market evaluated" },
          { area: "Waldorf, MD",      city: "waldorf", twoBed: 2140,  threeBed: 2713,  notes: "Current — 50% of inventory above $2,000/mo" },
          { area: "  Sheffield Links, MD", city: "waldorf", twoBed: 2773,  threeBed: null,  notes: "Most expensive Waldorf neighborhood" },
          { area: "  St. Charles, MD",     city: "waldorf", twoBed: 2280,  threeBed: null,  notes: "Master-planned community, walking trails" },
          { area: "  Dorchester, MD",      city: "waldorf", twoBed: 1916,  threeBed: null,  notes: "More affordable Waldorf entry point" },
          { area: "Denver, CO",       city: "denver",  twoBed: 2113,  threeBed: 2872,  notes: "3.7% YoY decrease; SFH rents much higher" },
          { area: "  Boulder, CO",         city: "denver",  twoBed: 2303,  threeBed: 3571,  notes: "Elite mountain-town lifestyle; steep premium" },
          { area: "  Lakewood, CO",        city: "denver",  twoBed: 1958,  threeBed: 2337,  notes: "Affordable foothills access; 20-min commute" },
          { area: "  Aurora, CO",          city: "denver",  twoBed: 1748,  threeBed: 2521,  notes: "Highest affordability in immediate metro" },
          { area: "Salt Lake City, UT",city: "slc",    twoBed: 1831,  threeBed: 2212,  notes: "48% of inventory in $1,001–$1,500 range" },
          { area: "  Ogden, UT",           city: "slc",    twoBed: 1534,  threeBed: 1891,  notes: "Significant savings; 45-60 min to SLC" },
          { area: "  Provo, UT",           city: "slc",    twoBed: 1725,  threeBed: 2577,  notes: "BYU-influenced; strong family community" },
          { area: "  Draper, UT",          city: "slc",    twoBed: 1786,  threeBed: 2242,  notes: "Silicon Slopes access; Cottonwood Canyons nearby" },
          { area: "  Sandy, UT",           city: "slc",    twoBed: 1674,  threeBed: 2041,  notes: "Balanced suburban option; <30 min to ski resorts" },
          { area: "Raleigh, NC",      city: "raleigh", twoBed: 1605,  threeBed: 1882,  notes: "Optimal balance of cost and quality of life" },
          { area: "  Cary, NC",            city: "raleigh", twoBed: 1719,  threeBed: 2031,  notes: "Polished suburb; top school districts" },
          { area: "  Durham, NC",          city: "raleigh", twoBed: 1462,  threeBed: null,  notes: "Culturally dense; most affordable Research Triangle option" },
          { area: "  Fuquay-Varina, NC",   city: "raleigh", twoBed: 1595,  threeBed: 2021,  notes: "Booming exurb; small-town feel with Wake County schools" },
          { area: "DFW, TX",          city: "dfw",     twoBed: 1850,  threeBed: 2365,  notes: "Sprawling metro; 48% of rents in $1,001–$1,500 range" },
          { area: "  Plano, TX",           city: "dfw",     twoBed: 1896,  threeBed: 2384,  notes: "Premium north suburb; elite corporate campuses" },
          { area: "  Frisco, TX",          city: "dfw",     twoBed: 2061,  threeBed: 2744,  notes: "Master-planned; legendary school district (Frisco ISD)" },
          { area: "  Arlington, TX",       city: "dfw",     twoBed: 1472,  threeBed: 1845,  notes: "Most affordable DFW option; high tourism density" }
        ]
      }
    },

    medianHouseholdIncome: {
      label: "Median Household Income",
      unit: "$",
      format: "currency",
      chartType: "bar",
      description: "Median household income in the past 12 months (2024 inflation-adjusted dollars).",
      source: {
        name: "U.S. Census Bureau, American Community Survey 1-Year Estimates (2024)",
        url: "https://censusreporter.org"
      },
      values: {
        roanoke: 60456,    // Roanoke city, VA — Census Reporter ACS 2024 1-yr
        waldorf:  128311,  // Charles County, MD — Census Reporter ACS 2024 1-yr
        denver:   92504,   // Denver city & county, CO — Census Reporter ACS 2024 1-yr
        slc:      77186,   // Salt Lake City, UT — Census Reporter ACS 2024 1-yr
        raleigh:  85060,   // Raleigh city, NC — Census Reporter ACS 2024 1-yr
        dfw:      74323    // Dallas city, TX — Census Reporter ACS 2024 1-yr
      },
      analysis: {
        roanoke:  "Despite strong housing affordability, Roanoke's median income is the lowest in this comparison. High fixed costs like childcare consume a disproportionate share of household income relative to higher-wage metros.",
        waldorf:  "Charles County income reflects D.C. metro labor market wages — the highest of any locale evaluated. However, the high cost structure of Waldorf substantially erodes this income advantage.",
        denver:   "Denver's income supports its housing market to a degree, but affordability ratios remain stretched. High childcare and cost-of-living expenses make disposable income thinner than the headline figure suggests.",
        slc:      "SLC incomes are solid but below Denver. Utah's lower childcare costs and utility expenses help close the gap, making effective purchasing power more competitive than raw income implies.",
        raleigh:  "Raleigh's median income reflects strong tech, pharma, and research sector employment. The income-to-cost ratio is favorable relative to Mountain West peers, supporting strong household balance sheets.",
        dfw:      "Dallas incomes are moderate but the absence of state income tax provides meaningful uplift. Effective take-home pay is substantially higher than states with 4–6% income tax rates at equivalent salary levels."
      }
    },

    stateIncomeTaxRate: {
      label: "State Income Tax (Top Marginal Rate)",
      unit: "%",
      format: "percent",
      chartType: "bar",
      description: "Top marginal state income tax rate. Texas has no state income tax. Maryland residents also pay an additional county-level local income tax.",
      source: {
        name: "Tax Foundation, State Individual Income Tax Rates and Brackets (2025)",
        url: "https://taxfoundation.org/data/all/state/state-income-tax-rates/"
      },
      values: {
        roanoke: 5.75,   // Virginia: 2%–5.75% graduated
        waldorf:  5.75,  // Maryland: up to 5.75% state (+ local county tax)
        denver:   4.40,  // Colorado: 4.4% flat
        slc:      4.55,  // Utah: 4.55% flat
        raleigh:  4.25,  // North Carolina: 4.25% flat (2025 rate)
        dfw:      0      // Texas: no state income tax
      },
      analysis: {
        roanoke:  "Virginia uses a graduated structure (2%–5.75%). Middle-income earners face moderate rates, but higher earners are impacted by the top bracket, which kicks in at relatively low thresholds.",
        waldorf:  "Maryland compounds the 5.75% state rate with a mandatory county-level local income tax, pushing effective rates significantly higher than the headline figure for Charles County residents.",
        denver:   "Colorado's flat 4.4% rate provides excellent predictability for high earners. No bracket creep, no cliff effects — a structural advantage for high-income relocators.",
        slc:      "Utah's flat 4.55% mirrors Colorado's predictability advantage. The simplicity of the flat tax is a meaningful draw for those with complex income structures.",
        raleigh:  "North Carolina has actively reduced its flat rate (currently 4.25%) and continues phasing it down toward 3.99%. The trajectory is favorable for residents expecting long-term state tax reduction.",
        dfw:      "Texas has zero state income tax — a landmark financial advantage. A household earning $150,000 retains approximately $6,000–$8,000 more annually compared to Maryland or Virginia peers, before accounting for higher property taxes."
      }
    },

    effectivePropertyTaxRate: {
      label: "Effective Property Tax Rate",
      unit: "%",
      format: "percent",
      chartType: "horizontalBar",
      description: "Effective property tax rate as a percentage of home market value. Note: Texas suburbs (Plano, Frisco) can exceed 2.2% when combining county, city, and school district levies.",
      source: {
        name: "Tax Foundation / County Assessor Data (2024)",
        url: "https://taxfoundation.org/data/all/state/property-taxes-by-state-county-2024/"
      },
      values: {
        roanoke: 1.01,  // Roanoke city, VA
        waldorf:  0.75,  // Charles County, MD
        denver:   0.48,  // Denver city & county, CO
        slc:      0.47,  // Salt Lake County, UT
        raleigh:  0.89,  // Wake County, NC
        dfw:      1.74   // Dallas County, TX (state avg 1.36%; Dallas County higher)
      },
      analysis: {
        roanoke:  "Roanoke's effective rate is moderate. However, the city also assesses a personal property tax on vehicles — a significant recurring cost unique to Virginia localities that new residents often underestimate.",
        waldorf:  "Charles County's rate is below the state average for Maryland. Combined with the high home values, absolute tax bills are substantial, but the rate itself is more competitive than many D.C. suburb counties.",
        denver:   "Denver's effective property tax rate is among the lowest nationally, a major structural advantage for real estate owners. On a $636k home, annual taxes are roughly $3,054 versus $10,714 in DFW.",
        slc:      "Utah has one of the lowest effective property tax rates in the nation. This dramatically improves the economic efficiency of holding real estate in Salt Lake City, particularly as values appreciate.",
        raleigh:  "Wake County's rate is moderate and predictable. The 'Tag & Tax Together' system bundles vehicle and registration taxes into a single annual bill, creating a large payment event but consolidating complexity.",
        dfw:      "Texas uses property taxes to replace income tax revenue. Dallas County rates are elevated, and suburban municipalities like Plano and Frisco easily push combined rates above 2.2% when school district levies are included."
      },
      suburbData: {
        title: "Effective Property Tax Rates by Locale & Suburb",
        source: { name: "Tax Foundation / County Assessor Data (2024)", url: "https://taxfoundation.org/data/all/state/property-taxes-by-state-county-2024/" },
        columns: ["Area", "State Income Tax", "Effective Property Tax", "Avg. Combined Sales Tax", "Notes"],
        rows: [
          { area: "Roanoke, VA",       city: "roanoke", col1: "2.00%–5.75%", col2: "1.01%",  col3: "5.75%",  notes: "+ Vehicle personal property tax" },
          { area: "Waldorf, MD",       city: "waldorf", col1: "Up to 5.75% + local", col2: "1.05%", col3: "6.00%",  notes: "County income tax surcharge adds ~3.2%" },
          { area: "Denver, CO",        city: "denver",  col1: "4.40% flat",  col2: "0.519%", col3: "7.86%",  notes: "Vehicle Specific Ownership Tax applies" },
          { area: "  Boulder, CO",          city: "denver",  col1: "4.40% flat",  col2: "Varies", col3: "8.00%+", notes: "Higher local sales tax than Denver proper" },
          { area: "Salt Lake City, UT",city: "slc",     col1: "4.55% flat",  col2: "0.47%",  col3: "7.19%",  notes: "$6 title fee; low admin friction" },
          { area: "  Ogden/Provo/Suburbs",  city: "slc",     col1: "4.55% flat",  col2: "Varies", col3: "~7.25%", notes: "Minimal local variation" },
          { area: "Raleigh, NC",       city: "raleigh", col1: "4.25% flat",  col2: "0.85%",  col3: "7.00%",  notes: "Tag & Tax Together bundles vehicle/reg" },
          { area: "  Cary/Wake County",     city: "raleigh", col1: "4.25% flat",  col2: "~0.87%", col3: "~7.25%", notes: "Slight premium over county baseline" },
          { area: "DFW, TX",           city: "dfw",     col1: "0.00%",       col2: "1.36%",  col3: "8.20%",  notes: "Statewide avg; Dallas County higher" },
          { area: "  Plano/Frisco (Collin Co)", city: "dfw", col1: "0.00%",  col2: "2.00%+", col3: "~8.25%", notes: "ISD levies push rates to 2.2%+" }
        ]
      }
    },

    salesTax: {
      label: "Average Combined Sales Tax Rate",
      unit: "%",
      format: "percent",
      chartType: "bar",
      description: "Average combined state + local sales tax rate. Texas and DFW suburbs carry among the highest combined rates, partially offsetting the zero income tax advantage.",
      source: {
        name: "Tax Foundation, State and Local Sales Tax Rates (2025)",
        url: "https://taxfoundation.org/data/all/state/2025-sales-taxes/"
      },
      values: {
        roanoke: 5.75,
        waldorf:  6.00,
        denver:   7.86,
        slc:      7.19,
        raleigh:  7.00,
        dfw:      8.20
      },
      analysis: {
        roanoke:  "Virginia's combined rate is among the lowest evaluated, providing a meaningful cost advantage on everyday purchases and large consumer goods.",
        waldorf:  "Maryland's 6% rate is moderate. Combined with high income taxes and housing costs, the total tax burden in Waldorf is among the highest in this comparison.",
        denver:   "Colorado's combined rate of ~7.86% is elevated. Boulder and other municipalities add local levies, pushing rates above 8% — a meaningful drag on consumer purchasing power.",
        slc:      "Utah's combined rate is moderate at 7.19%, with minimal variation across suburbs. Predictable and consistent across the metro.",
        raleigh:  "North Carolina's 7% rate is competitive. Wake County adds 2.25% on top of the 4.75% state rate, resulting in a very consistent burden across the Raleigh metro.",
        dfw:      "Texas's combined sales tax is the highest evaluated at 8.20%. DFW suburbs can reach 8.25%. This is the mechanism by which Texas recaptures some income tax revenue — a notable offset to the zero income tax benefit."
      }
    }

  },

  /* ----------------------------------------------------------
     CLIMATE
     ---------------------------------------------------------- */
  climate: {

    avgHighJuly: {
      label: "Average High Temperature (July)",
      unit: "°F",
      format: "number",
      chartType: "bar",
      description: "Average daily high temperature in July, representing summer heat. From NOAA 1991–2020 Climate Normals and supplemental sources.",
      source: {
        name: "NOAA National Centers for Environmental Information, Climate Normals 1991–2020",
        url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
      },
      values: {
        roanoke: 88,    // Roanoke, VA — NOAA normals
        waldorf:  89,   // Waldorf/D.C. area — NOAA/est.
        denver:   89,   // Denver, CO — NOAA normals (avg daily high July)
        slc:      100,  // Salt Lake City, UT — NOAA normals
        raleigh:  91,   // Raleigh, NC — NOAA normals
        dfw:      97    // Dallas-Fort Worth, TX — NOAA normals
      },
      analysis: {
        roanoke:  "Roanoke summers are warm but manageable, moderated by Blue Ridge Mountain elevation. Heat spikes occur but the temperate base climate prevents the sustained extreme heat of Texas or Utah.",
        waldorf:  "Waldorf's D.C. metro summers combine heat and oppressive humidity — effectively the most uncomfortable summer climate in this analysis despite similar peak temperatures to Roanoke.",
        denver:   "Denver's July highs are hot but the low humidity makes the heat very tolerable. Afternoon thunderstorms are common and quickly drop temperatures, a major quality-of-life advantage over humid cities.",
        slc:      "Salt Lake City has the highest summer temperatures evaluated. Dry desert heat is manageable but sustained 100°F+ weeks require robust air conditioning. The Wasatch Mountains provide cool refuge within 30 minutes.",
        raleigh:  "Raleigh summers are hot and humid — the combination of 91°F highs with consistent Southern humidity makes outdoor activity challenging from June through August. Not as extreme as DFW, but notable.",
        dfw:      "DFW summer heat is the most extreme in this comparison. Sustained 95–100°F+ periods are common from June through September, with high humidity in the eastern metro adding to the discomfort index."
      }
    },

    avgLowJanuary: {
      label: "Average Low Temperature (January)",
      unit: "°F",
      format: "number",
      chartType: "bar",
      description: "Average daily low temperature in January, representing winter cold. From NOAA 1991–2020 Climate Normals.",
      source: {
        name: "NOAA National Centers for Environmental Information, Climate Normals 1991–2020",
        url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
      },
      values: {
        roanoke: 27,   // Roanoke, VA — NOAA normals
        waldorf:  26,  // Waldorf/D.C. area — NOAA/est.
        denver:   16,  // Denver, CO — NOAA normals
        slc:      22,  // Salt Lake City, UT — NOAA normals
        raleigh:  31,  // Raleigh, NC — NOAA normals
        dfw:      35   // Dallas-Fort Worth, TX — NOAA normals
      },
      analysis: {
        roanoke:  "Roanoke winters are cold with occasional ice and snow events. The Blue Ridge location means weather can be unpredictable, but sustained deep-freeze conditions are rare.",
        waldorf:  "Waldorf winters mirror Roanoke closely. D.C. area infrastructure struggles with even modest snow events, making winter commutes particularly disruptive for the already-long Charles County commuters.",
        denver:   "Denver winters are cold and snowy but the abundant sunshine (300+ days/year) makes them psychologically easier. The city bounces between warm Chinook wind events and rapid blizzard conditions.",
        slc:      "SLC winters are cold and snowy — by design. The world-famous 'Greatest Snow on Earth' falls in the Wasatch canyons while the valley floor sees more moderate accumulation. A feature, not a bug, for outdoor enthusiasts.",
        raleigh:  "Raleigh has the mildest winters in this comparison among non-Texas cities. Snowfall is rare and short-lived, though the region's lack of preparation for ice events causes disproportionate disruption.",
        dfw:      "DFW winters are generally mild, but the 2021 Winter Storm Uri exposed catastrophic infrastructure vulnerability. Extreme freezes remain rare but devastating when they occur, given the non-winterized power grid."
      }
    },

    annualPrecipitationInches: {
      label: "Annual Precipitation",
      unit: "in",
      format: "number",
      chartType: "bar",
      description: "Average annual precipitation (rain + liquid equivalent of snow) in inches. From NOAA 1991–2020 Climate Normals.",
      source: {
        name: "NOAA National Centers for Environmental Information, Climate Normals 1991–2020",
        url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
      },
      values: {
        roanoke: 42.8,  // Roanoke, VA — NOAA normals
        waldorf:  41.0, // Waldorf/D.C. area — NOAA/est.
        denver:   14.3, // Denver, CO — NOAA normals
        slc:      16.1, // Salt Lake City, UT — NOAA normals
        raleigh:  46.0, // Raleigh, NC — NOAA normals
        dfw:      37.0  // Dallas-Fort Worth, TX — NOAA normals
      },
      analysis: {
        roanoke:  "Roanoke receives well-distributed precipitation year-round, supporting lush Blue Ridge vegetation. Flooding can occur in low-lying areas but severe weather is moderated by inland mountain positioning.",
        waldorf:  "Similar to Roanoke in total precipitation, with the D.C. area adding occasional nor'easters. Summer thunderstorms are frequent and intense.",
        denver:   "Denver's precipitation is strikingly low — less than 15 inches annually. The semi-arid climate means lawns and landscaping require irrigation. Low humidity is a quality-of-life benefit but a water scarcity concern.",
        slc:      "SLC's precipitation is also low, but the Wasatch Mountains receive massive snowfall totals (300–500 inches at Alta), which sustains water supply through snowmelt. The valley floor sees limited rainfall.",
        raleigh:  "Raleigh's 46-inch annual rainfall is the highest evaluated, spread across the year. Tropical storm remnants and persistent summer humidity make it the wettest primary location in this comparison.",
        dfw:      "DFW receives moderate precipitation but is highly variable — extended droughts alternate with severe storm and flooding events. Hail storms are a significant property insurance driver in the region."
      }
    },

    annualSnowfallInches: {
      label: "Annual Snowfall",
      unit: "in",
      format: "number",
      chartType: "bar",
      description: "Average annual snowfall in inches. From NOAA 1991–2020 Climate Normals.",
      source: {
        name: "NOAA National Centers for Environmental Information, Climate Normals 1991–2020",
        url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
      },
      values: {
        roanoke: 16,   // Roanoke, VA — NOAA normals
        waldorf:  14,  // Waldorf/D.C. area — NOAA/est.
        denver:   57,  // Denver, CO — NOAA normals
        slc:      56,  // Salt Lake City, UT — NOAA normals (valley floor; mountains much more)
        raleigh:  6,   // Raleigh, NC — NOAA normals
        dfw:      1    // Dallas-Fort Worth, TX — NOAA normals
      },
      analysis: {
        roanoke:  "Roanoke receives modest snowfall — enough to experience a genuine winter, but well below the Mountain West. Blue Ridge proximity means occasional heavy events, typically short-lived.",
        waldorf:  "Similar to Roanoke. D.C. area snowfall is memorable when it occurs, but relatively infrequent. Infrastructure is poorly equipped for snow, causing major disruptions even at moderate accumulations.",
        denver:   "Denver averages 57 inches of snowfall on the valley floor, with significantly more in nearby mountain corridors. The city handles snow efficiently, and abundant sunshine quickly melts accumulation.",
        slc:      "The Wasatch Mountains surrounding SLC receive legendary snowfall — Alta and Snowbird record 500+ inches annually. Valley floor accumulation is more moderate. The snow is dry and light (high water ratio), ideal for skiing.",
        raleigh:  "Raleigh's snowfall is minimal and typically short-lived. When snow does occur, the regional lack of infrastructure and preparedness causes disproportionate disruption to transportation.",
        dfw:      "DFW is functionally a snow-free metro in most years. The rare occurrence of ice or snow creates severe disruption given zero infrastructure preparedness — as dramatically demonstrated in 2021."
      }
    },

    sunnyDaysPerYear: {
      label: "Sunny Days Per Year",
      unit: "days",
      format: "number",
      chartType: "bar",
      description: "Average number of sunny or mostly sunny days per year. Denver's famous 300+ days of sunshine is a significant quality-of-life differentiator.",
      source: {
        name: "NOAA National Centers for Environmental Information, Climate Normals 1991–2020",
        url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals"
      },
      values: {
        roanoke: 206,  // Roanoke, VA — NOAA/est.
        waldorf:  197, // Waldorf/D.C. area — NOAA/est.
        denver:   300, // Denver, CO — NOAA normals (famous 300 days)
        slc:      222, // Salt Lake City, UT — NOAA normals
        raleigh:  213, // Raleigh, NC — NOAA/est.
        dfw:      234  // Dallas-Fort Worth, TX — NOAA normals
      },
      analysis: {
        roanoke:  "Roanoke is typical of Mid-Atlantic cities: adequate sunshine punctuated by seasonal cloud cover. Gray winter stretches are common from November through March.",
        waldorf:  "The D.C. area has slightly fewer sunny days than Roanoke due to coastal weather patterns and nor'easter influence. Not a drastic difference, but winter gray periods are notable.",
        denver:   "Denver's 300 days of sunshine is a legitimate quality-of-life superpower and its most famous attribute. Even heavy snowstorms are often followed by brilliant blue skies within 24 hours.",
        slc:      "SLC gets solid sunshine, though winter inversions can trap pollution in the valley for multi-day periods — a notable air quality concern not reflected in sunshine data alone.",
        raleigh:  "Raleigh's sunshine profile is better than D.C. and Roanoke but does not approach the Mountain West. Summer haziness from humidity reduces effective sky quality versus the arid West.",
        dfw:      "DFW gets substantial sunshine, driven by its southern latitude and arid western influence. Summer overcast periods are minimal, though the heat makes outdoor enjoyment of that sunshine challenging."
      }
    }

  },

  /* ----------------------------------------------------------
     NATURAL DISASTER RISK (FEMA National Risk Index)
     Score: 0–100, higher = greater risk relative to national average
     ---------------------------------------------------------- */
  disasterRisk: {

    tornadoRisk: {
      label: "Tornado Risk Score",
      unit: "",
      format: "number",
      chartType: "bar",
      description: "FEMA National Risk Index score for tornado risk (0–100, relative to national average). DFW sits at the edge of Tornado Alley.",
      source: {
        name: "FEMA National Risk Index (2023)",
        url: "https://hazards.fema.gov/nri/"
      },
      values: {
        roanoke: 8,    // Roanoke city, VA — low risk; Blue Ridge provides some shelter
        waldorf:  12,  // Charles County, MD — modest risk; mid-Atlantic
        denver:   18,  // Denver, CO — moderate; eastern plains tornadoes don't typically reach urban core
        slc:      3,   // Salt Lake City, UT — very low; mountain geography shields valley
        raleigh:  22,  // Raleigh, NC — moderate; Carolinas see occasional significant tornadoes
        dfw:      72   // Dallas-Fort Worth, TX — high; edge of Tornado Alley
      },
      analysis: {
        roanoke:  "The Blue Ridge Mountains provide meaningful geographic shelter. Tornado risk is low, with events being relatively rare and typically weaker than those in the Midwest or South.",
        waldorf:  "The Mid-Atlantic sees occasional tornadoes, primarily from tropical storm remnants. Risk is modest but not negligible, particularly during active Atlantic hurricane seasons.",
        denver:   "Denver's urban core is largely protected by geography. Significant tornadoes tend to track along the eastern plains, well east of the metro area, though late May through June requires awareness.",
        slc:      "Utah's mountain basin geography makes tornado formation extremely rare. This is one of the lowest tornado risk metros in the continental United States.",
        raleigh:  "North Carolina experiences tornadoes primarily from tropical systems and traditional frontal activity. Risk is moderate — higher than most Mountain West cities but lower than the Southern Plains.",
        dfw:      "DFW sits at the edge of Tornado Alley. Significant tornado outbreaks are a regular feature of spring weather. The 2024 tornado outbreak caused hundreds of millions in damage across the metro. Shelter planning is essential."
      }
    },

    floodRisk: {
      label: "Flood Risk Score",
      unit: "",
      format: "number",
      chartType: "bar",
      description: "FEMA National Risk Index score for flood risk (0–100). Raleigh and DFW see significant flash flooding; SLC faces unique urban flooding from rapid snowmelt.",
      source: {
        name: "FEMA National Risk Index (2023)",
        url: "https://hazards.fema.gov/nri/"
      },
      values: {
        roanoke: 28,   // Roanoke, VA — Roanoke River flood history
        waldorf:  32,  // Charles County, MD — lower Potomac drainage
        denver:   20,  // Denver, CO — flash flood risk from mountain runoff
        slc:      22,  // Salt Lake City, UT — snowmelt and Great Salt Lake adjacency
        raleigh:  38,  // Raleigh, NC — high; flat terrain; hurricane remnant flooding
        dfw:      45   // Dallas-Fort Worth, TX — highest; Trinity River corridor; flash flooding
      },
      analysis: {
        roanoke:  "The Roanoke River valley has a documented flood history. Flood events, while not frequent, can be severe when they occur. Neighborhood elevation selection is important.",
        waldorf:  "Charles County's lower Chesapeake watershed position creates moderate flood exposure. Proximity to the Potomac and its tributaries warrants consideration during extreme precipitation events.",
        denver:   "Denver's primary flood risk comes from rapid mountain runoff and summer thunderstorm flash flooding. The urban drainage system has been substantially improved but significant events still occur.",
        slc:      "Utah's flood risk is distinctive — driven by rapid spring snowmelt from the Wasatch Mountains. When heavy snowpack meets warm temperatures, urban flooding can develop quickly in low-lying areas.",
        raleigh:  "Raleigh's flat terrain, high annual precipitation, and vulnerability to tropical storm remnants create meaningful flood risk. The 2016 Hurricane Matthew flooding was a significant reminder of this exposure.",
        dfw:      "DFW has the highest flood risk evaluated. The Trinity River Corridor and the region's clay soils create severe drainage challenges. Flash flooding is a near-annual event affecting freeways, neighborhoods, and infrastructure."
      }
    },

    wildfireRisk: {
      label: "Wildfire Risk Score",
      unit: "",
      format: "number",
      chartType: "bar",
      description: "FEMA National Risk Index score for wildfire risk (0–100). Colorado and Utah face significant wildfire exposure, with growing insurance market implications.",
      source: {
        name: "FEMA National Risk Index (2023)",
        url: "https://hazards.fema.gov/nri/"
      },
      values: {
        roanoke: 12,   // Roanoke, VA — low; Eastern forest; managed fire regime
        waldorf:  5,   // Charles County, MD — very low; suburban/agricultural
        denver:   55,  // Denver, CO — high; WUI communities; Marshall Fire precedent
        slc:      48,  // Salt Lake City, UT — significant; Wasatch foothills interface
        raleigh:  10,  // Raleigh, NC — low; humid climate suppresses wildfire
        dfw:      22   // Dallas-Fort Worth, TX — moderate; drought years elevate risk
      },
      analysis: {
        roanoke:  "Wildfire risk is low. Eastern deciduous forests with higher moisture content and managed prescribed burns keep risk manageable. Not a significant factor in relocation analysis.",
        waldorf:  "Minimal wildfire risk. Suburban development density and Eastern humidity make wildland fire essentially negligible as a concern.",
        denver:   "Denver's wildfire risk is a serious and growing concern. The December 2021 Marshall Fire destroyed nearly 1,100 homes in Boulder County in a suburban neighborhood. Colorado is experiencing an insurance crisis driven partly by this risk, with many carriers exiting the state.",
        slc:      "The Wasatch foothills interface creates meaningful wildfire risk, particularly during dry summer periods. Utah homeowners in foothill communities face growing insurance pressure similar to Colorado.",
        raleigh:  "The humid Southeast climate dramatically suppresses wildfire risk. North Carolina's active prescribed burn program further reduces risk. Not a meaningful factor in this comparison.",
        dfw:      "DFW sees elevated wildfire risk during drought years, particularly in western and northern suburbs. The February 2024 panhandle fires were a reminder of Texas's exposure during dry conditions, though urban DFW is less exposed than rural areas."
      }
    }

  },

  /* ----------------------------------------------------------
     SAFETY / CRIME
     ---------------------------------------------------------- */
  safety: {

    violentCrimeRate: {
      label: "Violent Crime Rate",
      unit: "per 100k",
      format: "number",
      chartType: "bar",
      description: "Violent crime offenses per 100,000 residents (includes murder, rape, robbery, aggravated assault). Nationally, violent crime fell 3% in 2025 with homicides down 21% from 2024.",
      source: {
        name: "FBI Crime Data Explorer / Council on Criminal Justice (2024–2025)",
        url: "https://cde.ucr.cjis.gov/"
      },
      values: {
        roanoke: 498,   // Roanoke, VA — city-level; elevated vs. county average
        waldorf:  220,  // Charles County, MD — suburban; relatively low
        denver:   680,  // Denver, CO — improved 41% homicide reduction 2024→2025; still elevated overall
        slc:      580,  // Salt Lake City, UT — historically lower; modest recent increases
        raleigh:  340,  // Raleigh, NC — consistently rated safe for its size
        dfw:      450   // Dallas city, TX — varies sharply by neighborhood/suburb
      },
      analysis: {
        roanoke:  "Roanoke's city-level violent crime rate is elevated relative to its size. The downtown core drives the city average higher, while the surrounding suburban rings are substantially safer. Neighborhood selection within the metro is important.",
        waldorf:  "Charles County's suburban nature insulates it from D.C.'s crime dynamics. Violent crime rates are low relative to peers, though property crimes tied to commuter corridors are more common.",
        denver:   "Denver posted a remarkable 41% homicide reduction from 2024 to 2025 — one of the most dramatic improvements nationally. However, urban core property crime, retail theft, and auto theft remain elevated in transit-adjacent areas. Safety is highly neighborhood-specific.",
        slc:      "SLC has historically maintained lower violent crime than similarly sized metros, though rapid population growth has brought modest increases in property crime. The suburban ring (Draper, Sandy) offers significantly lower crime environments.",
        raleigh:  "Raleigh consistently ranks among the safest large cities. The Research Triangle demographic — dominated by highly educated professionals — tends to correlate with lower crime metrics. Cary is universally recognized as one of the safest mid-sized cities in America.",
        dfw:      "DFW's crime landscape is entirely a function of municipal selection. Plano, Frisco, and Southlake rank among the safest cities in the United States. Dallas proper's crime rate is higher, particularly in certain urban sectors, making zip code selection critical."
      }
    },

    propertyCrimeRate: {
      label: "Property Crime Rate",
      unit: "per 100k",
      format: "number",
      chartType: "bar",
      description: "Property crime offenses per 100,000 residents (includes burglary, larceny-theft, motor vehicle theft). National property crime fell 2% in 2025; motor vehicle theft fell 25%.",
      source: {
        name: "FBI Crime Data Explorer / Council on Criminal Justice (2024–2025)",
        url: "https://cde.ucr.cjis.gov/"
      },
      values: {
        roanoke: 2650,  // Roanoke, VA — moderate; typical mid-sized city
        waldorf:  1800, // Charles County, MD — suburban; lower than metro peers
        denver:   3200, // Denver, CO — historically high auto theft; improving
        slc:      3800, // Salt Lake City, UT — auto theft has been particularly elevated
        raleigh:  2400, // Raleigh, NC — competitive; better than national average
        dfw:      2900  // Dallas city, TX — moderate; varies significantly by suburb
      },
      analysis: {
        roanoke:  "Property crime in Roanoke is moderate and typical of mid-sized Appalachian cities. Vehicle theft has seen national improvement, reflected locally as well.",
        waldorf:  "Waldorf's suburban character keeps property crime rates below peer averages. Commuter corridor density does create above-average vehicle-related property incidents, but overall metrics are favorable.",
        denver:   "Denver historically ranked among the worst cities for auto theft nationally, though the 25% national decline in motor vehicle theft is reflected in recent Denver data. Urban core property crime still warrants situational awareness, particularly near transit stations.",
        slc:      "Salt Lake City has grappled with elevated property crime rates, particularly auto theft, in recent years — driven partly by prescription drug and homelessness challenges in the urban core. Suburban communities like Draper and Sandy see dramatically lower rates.",
        raleigh:  "Raleigh's property crime rate is better than the national average for its size. Cary's rates are among the lowest in the country, while Durham's are meaningfully higher — an important distinction for suburban selection.",
        dfw:      "DFW property crime rates are moderate at the metro level but highly variable. Northern suburbs (Plano, Frisco, Southlake) post some of the lowest property crime rates in the country. Arlington's rates are elevated due to entertainment district density."
      }
    }

  },

  /* ----------------------------------------------------------
     LIFESTYLE & SERVICES
     ---------------------------------------------------------- */
  lifestyle: {

    avgCommuteMinutes: {
      label: "Average Commute Time",
      unit: "min",
      format: "number",
      chartType: "horizontalBar",
      description: "Mean travel time to work in minutes for workers 16 years and over. Waldorf's Charles County commute is the longest by a wide margin due to D.C. commuter traffic.",
      source: {
        name: "U.S. Census Bureau, American Community Survey 1-Year Estimates (2024)",
        url: "https://censusreporter.org"
      },
      values: {
        roanoke: 19.0,   // Roanoke city, VA — Census Reporter ACS 2024 1-yr
        waldorf:  42.8,  // Charles County, MD — Census Reporter ACS 2024 1-yr
        denver:   24.9,  // Denver city & county, CO — Census Reporter ACS 2024 1-yr
        slc:      19.6,  // Salt Lake City, UT — Census Reporter ACS 2024 1-yr
        raleigh:  23.0,  // Raleigh city, NC — Census Reporter ACS 2024 1-yr
        dfw:      25.7   // Dallas city, TX — Census Reporter ACS 2024 1-yr
      },
      analysis: {
        roanoke:  "Roanoke's sub-20-minute average commute is a significant lifestyle advantage. The compact city scale means most destinations are within a short drive, reducing daily time and fuel costs substantially.",
        waldorf:  "Charles County's nearly 43-minute average commute is the highest evaluated and reflects a structural quality-of-life penalty. I-95 and US-301 are chronically congested, and the Washington D.C. commuter rail is the primary relief valve. Daily commute time exceeds 1.5 hours round-trip.",
        denver:   "Denver's commute is moderate. The RTD light rail and bus rapid transit network provides alternatives to highway driving, though Boulder-to-Denver commutes can reach 45–60 minutes during peak hours.",
        slc:      "SLC's compact, grid-based city layout and efficient UTA TRAX light rail network contribute to a commute profile similar to Roanoke — excellent for a metro of its size and economic activity.",
        raleigh:  "Raleigh's commute reflects its Sun Belt sprawl pattern. Cary to RTP is frictionless (15–20 min), but Fuquay-Varina to downtown can turn a 15-mile drive into 35–45 minutes during peak hours on US-401.",
        dfw:      "DFW commutes are shaped by the metro's massive geographic footprint. The DART rail network helps northern suburb commuters, but driving from Frisco via the Dallas North Tollway can reach 40–60 minutes in peak traffic."
      },
      suburbData: {
        title: "Commute Time Context by Suburb",
        source: { name: "U.S. Census ACS 2024 / Local estimates", url: "https://censusreporter.org" },
        columns: ["Route / Area", "Typical Commute", "Primary Mode", "Notes"],
        rows: [
          { area: "Roanoke city center", city: "roanoke", col1: "~15–20 min", col2: "Car", col3: "Compact city; minimal congestion" },
          { area: "Waldorf → D.C. (driving)", city: "waldorf", col1: "60–90 min", col2: "Car (I-95/US-301)", col3: "Chronically congested; highly variable" },
          { area: "Waldorf → D.C. (MARC train)", city: "waldorf", col1: "55–65 min", col2: "MARC commuter rail", col3: "Reliable; limited schedule flexibility" },
          { area: "Boulder → Denver", city: "denver", col1: "45–60 min", col2: "Car (US-36)", col3: "Notoriously congested; US-36 express lanes help" },
          { area: "Lakewood → Denver", city: "denver", col1: "20–25 min", col2: "Car / RTD light rail", col3: "Smooth; light rail W Line serves corridor" },
          { area: "Ogden → SLC", city: "slc", col1: "45–60 min", col2: "Car (I-15) / FrontRunner", col3: "FrontRunner commuter rail is viable option" },
          { area: "Draper/Sandy → SLC or Lehi", city: "slc", col1: "20–30 min", col2: "Car / TRAX", col3: "Best suburban commute option in SLC metro" },
          { area: "Cary → RTP", city: "raleigh", col1: "15–20 min", col2: "Car", col3: "Frictionless; optimal Research Triangle position" },
          { area: "Fuquay-Varina → Raleigh", city: "raleigh", col1: "35–45 min", col2: "Car (US-401)", col3: "Two-lane road creates severe peak congestion" },
          { area: "Plano → Dallas (DART)", city: "dfw", col1: "35–45 min", col2: "DART Red Line", col3: "Bypass highway stress; reliable schedule" },
          { area: "Frisco → Dallas (driving)", city: "dfw", col1: "40–60 min", col2: "Car (Dallas North Tollway)", col3: "Toll costs add up; highly variable traffic" }
        ]
      }
    },

    parkLandPercent: {
      label: "Park Land as % of City Area",
      unit: "%",
      format: "percent",
      chartType: "bar",
      description: "Percentage of city area designated as parkland per the Trust for Public Land ParkScore Index (2024).",
      source: {
        name: "Trust for Public Land, ParkScore Index (2024)",
        url: "https://www.tpl.org/parkscore"
      },
      values: {
        roanoke: 16.5,  // Roanoke, VA — extensive greenway/park system for its size
        waldorf:  8.2,  // Charles County, MD — suburban/exurban; limited formal parkland
        denver:   15.0, // Denver, CO — extensive park system; Cherry Creek, City Park, etc.
        slc:      14.0, // Salt Lake City, UT — strong park system; proximity to nat'l forests
        raleigh:  12.5, // Raleigh, NC — Dorothea Dix (308 acres) major addition; growing
        dfw:      8.5   // Dallas city, TX — improving; better in suburbs than city proper
      },
      analysis: {
        roanoke:  "Roanoke punches well above its weight in parkland. The Roanoke Valley Greenway, Mill Mountain (with Star), and the Blue Ridge Parkway proximity provide exceptional outdoor recreation for a city its size.",
        waldorf:  "Charles County's suburban development pattern means formal parkland is limited. Residents primarily access recreation via Cedarville State Forest or drive to D.C. metro parks.",
        denver:   "Denver's park system is well-regarded and heavily used. City Park, Cheesman Park, and the Cherry Creek Trail system provide significant urban green space. Access to national forests and BLM lands vastly extends the effective recreation footprint.",
        slc:      "Salt Lake City's park system is solid, and the proximity to Wasatch-Cache National Forest and the Wasatch Mountains effectively extends the recreational landscape infinitely for outdoor enthusiasts. Among the best outdoor access of any major U.S. city.",
        raleigh:  "Raleigh's park system is growing rapidly. Dorothea Dix Park — a 308-acre former psychiatric hospital property — is being converted to a world-class urban park. The tree canopy and greenway system are standout assets.",
        dfw:      "Dallas has historically underinvested in parkland relative to its size. The Trinity River Corridor Greenway is a major ongoing improvement project. Northern suburbs (Plano, Frisco) have significantly better per-capita park access than Dallas proper."
      }
    },

    transitDescription: {
      label: "Public Transit Options",
      unit: "",
      format: "text",
      chartType: "statCards",
      description: "Summary of public transit infrastructure. Western cities have significantly more rail infrastructure than their Southern counterparts.",
      source: {
        name: "American Public Transportation Association (APTA)",
        url: "https://www.apta.com/research-technical-resources/transit-statistics/"
      },
      values: {
        roanoke: "Valley Metro Bus only; no rail; limited coverage",
        waldorf:  "WMATA bus + MARC commuter rail to D.C.; dense network",
        denver:   "RTD Light Rail, Bus Rapid Transit, commuter rail (A, B, G lines)",
        slc:      "UTA TRAX Light Rail + FrontRunner commuter rail + buses",
        raleigh:  "GoRaleigh bus + GoTriangle regional; no rail; BRT proposed",
        dfw:      "DART light rail (13 lines) + TRE commuter rail; limited in suburbs"
      },
      analysis: {
        roanoke:  "Roanoke's transit is limited to Valley Metro bus service. Car dependency is essentially total. This is mitigated by the city's compact scale and low parking costs.",
        waldorf:  "Waldorf's primary transit advantage is the MARC Penn Line to D.C. Union Station, which provides a viable commute alternative. WMATA bus routes extend into the county but are optimized for D.C. destinations.",
        denver:   "Denver has the most developed transit network among the evaluated cities, with an extensive light rail and commuter rail system (RTD). The FasTracks expansion has significantly improved suburban connectivity, though gaps remain. The city is also executing multi-billion dollar infrastructure mega-projects — Cherry Creek West, Santa Fe Yards, and the River Mile development — that are reshaping transit corridors and the urban skyline for the next decade.",
        slc:      "UTA's TRAX light rail is a genuine urban transit success story. Combined with the FrontRunner commuter rail linking Salt Lake City to Ogden (north) and Provo (south), the network provides real car-free or car-light commuting options.",
        raleigh:  "Raleigh lacks rail transit, relying entirely on buses. The GoRaleigh/GoTriangle network is functional but cannot compete with Western rail systems. A Bus Rapid Transit proposal has faced repeated delays. Car dependency is high.",
        dfw:      "DART's 13 light rail lines make it one of the largest light rail networks in the U.S. by route miles, but suburban density makes walking to stations impractical in much of the metro. Plano and nearby Collin County suburbs have meaningful DART access. Ongoing economic investment is massive: the $500M Goldman Sachs campus anchoring the NorthEnd mixed-use development and the RedBird Mall redevelopment signal continued long-term growth in key suburban corridors."
      }
    },

    monthlyUtilities: {
      label: "Estimated Total Monthly Utilities",
      unit: "$/mo",
      format: "currency",
      chartType: "bar",
      description: "Estimated average monthly cost of electricity, natural gas, and internet combined. Summer peaks in DFW and winter gas bills in Denver are significant variables.",
      source: {
        name: "Utility provider averages & regional cost data (2025)",
        url: "https://www.eia.gov/electricity/state/"
      },
      values: {
        roanoke: 290,  // VA: $135 elec + $85 gas + $70 internet
        waldorf:  320, // MD: $150 elec + $95 gas + $75 internet
        denver:   315, // CO: $110 elec + $130 gas (winter spikes) + $75 internet
        slc:      230, // UT: $85 elec (Rocky Mountain Power, lowest) + $75 gas + $70 internet
        raleigh:  260, // NC: $125 elec + $65 gas + $70 internet
        dfw:      295  // TX: $165 elec (summer spikes) + $55 gas + $75 internet
      },
      analysis: {
        roanoke:  "Roanoke utilities are moderate. Appalachian Power provides electricity; natural gas heating in winter keeps bills steady but predictable. No extreme seasonal spikes.",
        waldorf:  "Waldorf's D.C. metro utility costs are driven by year-round HVAC demands — humid, hot summers and cold winters. SMECO (Southern Maryland Electric Cooperative) rates are above the Roanoke baseline.",
        denver:   "Denver's natural gas bills spike significantly in winter due to cold temperatures. Electricity is relatively affordable. Boulder-area and higher-elevation homes see increased heating costs.",
        slc:      "Salt Lake City has the lowest utility costs evaluated by a significant margin. Rocky Mountain Power (owned by Berkshire Hathaway Energy) provides among the cheapest electricity rates in the nation. A meaningful monthly cost advantage.",
        raleigh:  "Raleigh's utility burden is driven by summer air conditioning (Duke Energy). HVAC runs near-constantly from May through September. Gas bills are low given mild winters.",
        dfw:      "DFW's deregulated ERCOT electricity market means you choose your provider. Summer cooling demands are extreme, and July–August bills can run 30–40% above the annual average. Budget for seasonal spikes."
      },
      suburbData: {
        title: "Monthly Utility Cost Breakdown",
        source: { name: "Utility provider averages & regional cost data (2025)", url: "https://www.eia.gov/electricity/state/" },
        columns: ["Locale", "Avg Monthly Electricity", "Avg Monthly Natural Gas", "Avg Monthly Internet", "Est. Total"],
        rows: [
          { area: "Roanoke, VA",       city: "roanoke", col1: "$135", col2: "$85",             col3: "$70", col4: "$290" },
          { area: "Waldorf, MD",       city: "waldorf", col1: "$150", col2: "$95",             col3: "$75", col4: "$320" },
          { area: "Denver, CO",        city: "denver",  col1: "$110", col2: "$130 (winter↑)",  col3: "$75", col4: "$315" },
          { area: "  Boulder/Higher Elevation", city: "denver", col1: "$115", col2: "$145 (winter↑)", col3: "$75", col4: "$335" },
          { area: "Salt Lake City, UT",city: "slc",     col1: "$85",  col2: "$75",             col3: "$70", col4: "$230" },
          { area: "  Ogden/Sandy/Draper",       city: "slc",  col1: "$85",  col2: "$70",             col3: "$70", col4: "$225" },
          { area: "Raleigh, NC",       city: "raleigh", col1: "$125", col2: "$65",             col3: "$70", col4: "$260" },
          { area: "Dallas-Fort Worth", city: "dfw",     col1: "$165 (summer↑↑)", col2: "$55", col3: "$75", col4: "$295" }
        ]
      }
    },

    annualAutoInsurance: {
      label: "Average Annual Auto Insurance",
      unit: "$/yr",
      format: "currency",
      chartType: "bar",
      description: "Estimated average annual full-coverage auto insurance premium. Texas and Colorado face elevated rates due to weather events, auto theft, and uninsured motorist rates.",
      source: {
        name: "Insurance industry rate data & state comparisons (2025)",
        url: "https://www.naic.org/cipr_topics/topic_auto_insurance.htm"
      },
      values: {
        roanoke: 1450,  // VA — favorable; lower traffic density
        waldorf:  2100, // MD — D.C. metro proximity; high traffic density
        denver:   2350, // CO — insurance crisis; hail, wildfire, high auto theft
        slc:      1650, // UT — moderate; favorable auto rates
        raleigh:  1350, // NC — rate bureau system keeps rates stable; lowest evaluated
        dfw:      2400  // TX — highest; uninsured motorists, sprawl, severe weather
      },
      analysis: {
        roanoke:  "Virginia's auto insurance environment is favorable. Lower traffic density keeps premiums below the national average, and the state's reasonable liability requirements don't artificially inflate base rates.",
        waldorf:  "Proximity to the D.C. metro drives Maryland auto premiums significantly higher. Traffic density, state liability requirements, and urban driving patterns push costs well above the Roanoke baseline.",
        denver:   "Colorado is experiencing a genuine insurance crisis. Extreme hail storms (I-70 corridor hail 'Hail Alley'), wildfire risk, and historically high auto theft rates have driven carriers out of the market and rates steeply upward. Budget accordingly.",
        slc:      "Utah maintains a moderate auto insurance environment. Drivers generally see favorable rates, and the lower frequency of catastrophic weather events keeps the risk pool stable.",
        raleigh:  "North Carolina's unique rate bureau system regulates insurance pricing in a way that keeps premiums stable and below most neighboring states. Raleigh residents benefit from the lowest estimated auto insurance rates in this comparison.",
        dfw:      "Texas has among the highest auto insurance costs nationally. Factors include a high proportion of uninsured motorists, massive urban sprawl (more miles driven), severe hail storms, and periodic extreme weather events. Property insurance in Texas is similarly elevated."
      }
    }

  },

  /* ----------------------------------------------------------
     CHILDCARE & EDUCATION
     ---------------------------------------------------------- */
  childcare: {

    annualInfantCenterCost: {
      label: "Annual Infant Care (Center-Based)",
      unit: "$/yr",
      format: "currency",
      chartType: "bar",
      description: "Average annual cost of full-time, center-based infant care. In 2025, the average annual cost of raising a child under five in the U.S. reached $27,743.",
      source: {
        name: "Child Care Aware of America / World Population Review (2025–2026)",
        url: "https://worldpopulationreview.com/state-rankings/child-care-costs-by-state"
      },
      values: {
        roanoke: 14063,  // Virginia state average
        waldorf:  15335, // Maryland state average
        denver:   21840, // Colorado state average
        slc:      9945,  // Utah state average
        raleigh:  9480,  // North Carolina state average
        dfw:      10706  // Texas state average
      },
      analysis: {
        roanoke:  "Virginia is a notably expensive state for infant childcare despite Roanoke's lower overall cost of living. The $14,063 annual burden consumes a disproportionate percentage of Roanoke's lower median household income — a structural challenge for young families.",
        waldorf:  "Maryland infant care costs are second-highest evaluated. Washington D.C. proper reaches $24,243 annually (the highest in the nation), and this cost pressure spills significantly into Charles County. Childcare can rival rent as a household expense.",
        denver:   "Colorado ranks among the costlier states in the West for childcare. Denver's highly corporatized childcare market and high commercial real estate costs push prices further above the state average. Securing placements at quality centers requires significant advance planning.",
        slc:      "Utah's structural demographic advantages are a genuine economic differentiator. The youngest median population in the nation, strong community-based family networks, and cultural emphasis on family reduce commercial childcare demand and costs significantly. The $9,945 annual figure is among the most favorable nationally.",
        raleigh:  "North Carolina aligns with Southern regional averages on childcare — the lowest evaluated alongside Utah. A steady pipeline of qualified early education professionals from Research Triangle universities maintains quality while keeping costs competitive.",
        dfw:      "Texas provides favorable childcare economics relative to its size and cost structure. While $10,706 remains significant, it represents a meaningful savings over the Mid-Atlantic and Colorado alternatives, supporting dual-income continuity."
      }
    },

    annualToddlerCenterCost: {
      label: "Annual Toddler Care (Center-Based)",
      unit: "$/yr",
      format: "currency",
      chartType: "bar",
      description: "Average annual cost of full-time, center-based toddler care (ages 1–3). Costs generally run 10–15% below infant care rates.",
      source: {
        name: "Child Care Aware of America / World Population Review (2025–2026)",
        url: "https://worldpopulationreview.com/state-rankings/child-care-costs-by-state"
      },
      values: {
        roanoke: 12780,  // Virginia — estimated from state data
        waldorf:  10254, // Maryland — state average (NB: MD toddler < infant due to ratio rules)
        denver:   15992, // Colorado — state average
        slc:      8200,  // Utah — estimated
        raleigh:  8500,  // North Carolina — estimated
        dfw:      9664   // Texas — state average
      },
      analysis: {
        roanoke:  "Virginia toddler care remains expensive on a percentage-of-income basis relative to Roanoke wages. Families often rely on informal networks or family care to bridge cost gaps.",
        waldorf:  "Maryland toddler care is lower than infant care due to state licensing ratio rules. Still a significant fixed expense compounding the overall Waldorf cost burden.",
        denver:   "Colorado toddler care costs remain the highest evaluated. Aurora and Lakewood families can sometimes access more affordable home-based care networks compared to Denver proper.",
        slc:      "Community-based care networks in Utah's suburbs (Draper, Sandy, Provo) can dramatically reduce reliance on expensive center-based toddler care.",
        raleigh:  "North Carolina toddler care is competitive. Cary's premium centers run above the state average; Fuquay-Varina provides a more affordable entry to Wake County school access.",
        dfw:      "Texas toddler care is reasonably competitive. Plano and Frisco feature excellent facilities, though premium suburban centers charge above the state average."
      }
    },

    annualPreKCenterCost: {
      label: "Annual Preschool/PreK Care (Center-Based)",
      unit: "$/yr",
      format: "currency",
      chartType: "bar",
      description: "Average annual cost of full-time, center-based preschool/PreK care (ages 3–5). Costs typically decrease as child-to-teacher ratios are more favorable.",
      source: {
        name: "Child Care Aware of America / World Population Review (2025–2026)",
        url: "https://worldpopulationreview.com/state-rankings/child-care-costs-by-state"
      },
      values: {
        roanoke: 10400,  // Virginia — estimated
        waldorf:  12100, // Maryland — estimated; D.C. influence
        denver:   13200, // Colorado — estimated
        slc:      7500,  // Utah — estimated
        raleigh:  7800,  // North Carolina — estimated
        dfw:      8500   // Texas — estimated
      },
      analysis: {
        roanoke:  "PreK costs in Virginia remain above national averages. Public pre-K programs can offset private center costs for qualifying families.",
        waldorf:  "D.C. area PreK costs are elevated. Maryland's public pre-K program (Maryland EXCELS) has expanded eligibility, providing partial relief for income-qualifying households.",
        denver:   "Colorado's Colorado Preschool Program (CPP) provides some access to subsidized pre-K, reducing private center reliance. Denver has an expanding publicly funded pre-K program for 4-year-olds.",
        slc:      "Utah's low PreK costs remain a standout advantage. Strong community networks and lower commercial overhead keep rates well below national averages.",
        raleigh:  "NC Pre-K is one of the most studied and well-regarded state pre-K programs nationally. The program has expanded eligibility substantially, providing high-quality subsidized options for many families.",
        dfw:      "Texas's pre-K program provides free, half-day pre-K to qualifying four-year-olds. This significantly reduces the private center burden for eligible families in DFW."
      }
    },

    preKEnrollmentRate4YearOlds: {
      label: "PreK Enrollment Rate (4-Year-Olds)",
      unit: "%",
      format: "percent",
      chartType: "bar",
      description: "Percentage of 4-year-olds enrolled in state-funded preschool programs. High enrollment reflects greater public pre-K availability and family access.",
      source: {
        name: "National Institute for Early Education Research (NIEER), State of Preschool Yearbook (2023)",
        url: "https://nieer.org/state-preschool-yearbooks"
      },
      values: {
        roanoke: 23,   // Virginia — NIEER 2023
        waldorf:  36,  // Maryland — NIEER 2023; strong public pre-K
        denver:   31,  // Colorado — NIEER 2023
        slc:      8,   // Utah — NIEER 2023; very low; community/home-based care dominant
        raleigh:  29,  // North Carolina — NIEER 2023; NC Pre-K well-regarded
        dfw:      22   // Texas — NIEER 2023; half-day program limits enrollment count
      },
      analysis: {
        roanoke:  "Virginia's public pre-K enrollment is below the national median. Virginia Preschool Initiative (VPI) targets at-risk 4-year-olds; middle-class families often rely on private centers.",
        waldorf:  "Maryland has among the stronger public pre-K enrollment rates, reflecting the state's investment in early education. D.C. adjacency drives awareness and program quality.",
        denver:   "Colorado's Denver Preschool Program (DPP) provides tuition credits for all Denver 4-year-olds regardless of income — a meaningful differentiator. Enrollment rates reflect this accessibility.",
        slc:      "Utah's very low public pre-K enrollment rate reflects the state's philosophical preference for family-based care and limited government-funded early education programs. Not a program deficiency — a deliberate policy stance aligned with community norms.",
        raleigh:  "NC Pre-K is nationally recognized for quality. The program targets at-risk children with high-quality standards, and Wake County has strong implementation. A genuine competitive advantage for qualifying families.",
        dfw:      "Texas's public pre-K is limited to half-day programming for qualifying students, depressing the enrollment percentage. Full-day programs are expanding but still limited. Private center reliance remains high for working families."
      }
    },

    schoolDistrictGrade: {
      label: "School District Overall Grade",
      unit: "",
      format: "grade",
      chartType: "statCards",
      description: "Overall letter grade for the primary school district serving each area (Niche 2024). Suburb school districts often significantly outperform city district averages.",
      source: {
        name: "Niche, K-12 School District Rankings (2024)",
        url: "https://www.niche.com/k12/search/best-school-districts/"
      },
      values: {
        roanoke: "C+",   // Roanoke City Public Schools
        waldorf:  "B",   // Charles County Public Schools
        denver:   "C+",  // Denver Public Schools
        slc:      "B-",  // Salt Lake City School District
        raleigh:  "A-",  // Wake County Public School System
        dfw:      "B-"   // Dallas ISD (city); suburbs much higher
      },
      analysis: {
        roanoke:  "Roanoke City Public Schools earn a C+ grade, typical of independent city school systems serving diverse socioeconomic populations. Suburban Roanoke County schools (which are separate) grade significantly higher at A-.",
        waldorf:  "Charles County Public Schools earn a solid B — better than many comparable suburban systems. The district benefits from the high household incomes in the county and a relatively stable tax base.",
        denver:   "Denver Public Schools grade at C+, reflecting the challenges of a large urban district. Affluent neighborhoods within DPS boundaries access significantly better schools; private and charter school options are plentiful.",
        slc:      "Salt Lake City School District earns a B- — solid for a primary urban district. The Utah tradition of community involvement in schools tends to benefit district performance relative to national peers.",
        raleigh:  "Wake County Public School System is the standout in this comparison at A-. It consistently ranks among the best large school districts nationally. Cary schools within Wake County grade even higher individually.",
        dfw:      "Dallas ISD grades at B- for the city district, but this number is highly misleading. Frisco ISD grades at A+, Plano ISD at A, and several Collin County districts are among the best in the nation. Suburb selection drives educational outcome dramatically in DFW."
      },
      suburbData: {
        title: "School District Grades by City & Key Suburb",
        source: { name: "Niche, K-12 School District Rankings (2024)", url: "https://www.niche.com/k12/search/best-school-districts/" },
        columns: ["School District / Area", "Niche Grade", "Notes"],
        rows: [
          { area: "Roanoke City Public Schools",  city: "roanoke", col1: "C+", col2: "Independent city district; serves diverse population" },
          { area: "  Roanoke County Schools",          city: "roanoke", col1: "A-", col2: "Suburban county district; significantly higher-rated" },
          { area: "Charles County Public Schools",city: "waldorf", col1: "B",  col2: "Solid suburban district; benefits from high household incomes" },
          { area: "Denver Public Schools",        city: "denver",  col1: "C+", col2: "Large urban district; highly variable by neighborhood" },
          { area: "  Cherry Creek School District",    city: "denver",  col1: "A-", col2: "Top suburban district; southeast Denver metro" },
          { area: "  Jefferson County Schools (Lakewood)", city: "denver", col1: "B", col2: "Covers Lakewood, Wheat Ridge, Arvada" },
          { area: "  Boulder Valley School District",  city: "denver",  col1: "A-", col2: "High-performing; serves Boulder" },
          { area: "  Aurora Public Schools",           city: "denver",  col1: "C",  col2: "Requires careful neighborhood selection" },
          { area: "Salt Lake City School District",city: "slc",    col1: "B-", col2: "Solid urban district; strong community support" },
          { area: "  Canyons School District (Draper/Sandy)", city: "slc", col1: "B+", col2: "Covers south SLC suburbs; highly regarded" },
          { area: "  Alpine School District (Lehi/Provo)", city: "slc", col1: "A-", col2: "One of Utah's largest and best-rated" },
          { area: "Wake County Public Schools (Raleigh)", city: "raleigh", col1: "A-", col2: "Best large district evaluated; national recognition" },
          { area: "  Cary schools (within Wake)",     city: "raleigh", col1: "A",  col2: "Individual Cary schools grade at top of Wake County" },
          { area: "  Durham Public Schools",           city: "raleigh", col1: "C+", col2: "Significantly lower than Wake; neighborhood-specific" },
          { area: "Dallas ISD",                   city: "dfw",     col1: "B-", col2: "City district; highly variable within" },
          { area: "  Frisco ISD",                      city: "dfw",     col1: "A+", col2: "Legendary; facilities rival private schools" },
          { area: "  Plano ISD",                       city: "dfw",     col1: "A",  col2: "Elite Collin County district; strong STEM programs" },
          { area: "  Arlington ISD",                   city: "dfw",     col1: "B-", col2: "More varied; requires neighborhood selection" }
        ]
      }
    }

  },

  /* ----------------------------------------------------------
     POLITICS, LAW & REGULATORY ENVIRONMENT
     Employment law, firearms legislation, worker protections
     ---------------------------------------------------------- */
  politics: {

    employmentLaw: {
      label: "Employment Law & Worker Protections",
      description: "Overview of state-level employment law, at-will doctrine, non-compete rules, minimum wage, and notable pro-worker or pro-employer legislative posture.",
      source: {
        name: "Employment Law Worldview / EPI.org / Paycor (2025–2026)",
        url: "https://www.employmentlawworldview.com/us-state-law-roundup/"
      },
      values: {
        roanoke: {
          summary: "Strong & improving worker protections. Non-competes banned as of July 2025.",
          details: "Virginia has actively strengthened worker protections in recent years. Effective July 1, 2025, Virginia passed sweeping legislation (S.B. 1218) completely prohibiting employers from entering into or enforcing non-compete agreements with any employee, regardless of salary threshold — a massive expansion from the prior law that only protected low-wage workers. The state uses a graduated income tax but does not impose extreme regulatory friction on businesses. Virginia sits at a moderate position: more protective than the Deep South, less restrictive than Maryland."
        },
        waldorf: {
          summary: "Strong worker protections. High minimum wage, wage theft enforcement, progressive labor standards.",
          details: "Maryland features strong employee protections, higher minimum wages consistently above the federal floor, and progressive labor standard enforcement that actively prosecutes wage theft and worker misclassification. All 23 Maryland counties impose a local income tax surcharge on top of the state rate, and Charles County residents face this combined burden. The state's regulatory environment is explicitly pro-worker and among the most protective in the Mid-Atlantic. The D.C. adjacency also means workers benefit from D.C. labor market wage norms."
        },
        denver: {
          summary: "Vanguard for employee rights in the Mountain West. Pay transparency laws, strong public policy exemptions.",
          details: "Colorado operates under employment-at-will doctrine but strictly enforces public policy exemptions, implied contract exceptions, and covenants of good faith — providing workers significantly more legal recourse than Texas or North Carolina. Most notably, Colorado was the first state to enact aggressive pay transparency laws, requiring employers to disclose salary ranges and total compensation packages in all job postings, including remote roles. This creates a highly transparent, equitable labor market that favors job seekers negotiating compensation. Colorado's regulatory environment balances business-friendliness with meaningful worker protections."
        },
        slc: {
          summary: "Pro-business, moderate worker protections. Attracts tech investment but lower regulatory friction.",
          details: "Utah balances a generally pro-business environment with moderate worker protections. The state defaults to the federal minimum wage ($7.25/hr) but does enforce implied contract exceptions and covenants of good faith, providing some buffer against arbitrary termination. Regulatory friction on businesses is kept intentionally low to attract continuous corporate investment into the 'Silicon Slopes' tech corridor between Salt Lake City and Lehi. Utah is a Right to Work state, meaning union dues cannot be compelled. Overall, workers have fewer statutory protections than Colorado or the Mid-Atlantic, but the strong job market in tech and logistics partially compensates."
        },
        raleigh: {
          summary: "Pro-employer. Right to Work. Federal minimum wage only. Strict at-will employment.",
          details: "Relocating to North Carolina places an employee in a staunchly pro-employer regulatory environment. NC defaults to the federal minimum wage of $7.25 per hour and is a constitutionally entrenched Right to Work state. The state maintains a strict at-will employment doctrine with fewer public policy exemptions than coastal states, and does not recognize the covenant of good faith in employment termination. Cary, Morrisville, and RTP exist as massive corporate havens precisely because of this low regulatory friction, attracting significant corporate relocations. While this benefits employers, it shifts the burden of job security and wage negotiation entirely onto the individual worker, requiring highly specialized skill sets to command premium compensation."
        },
        dfw: {
          summary: "Most pro-employer evaluated. Strict at-will, federal minimum wage, Right to Work state.",
          details: "Texas represents the most pro-employer regulatory environment among the evaluated locales. The state defaults to the federal minimum wage of $7.25 per hour, is a Right to Work state, and enforces strict at-will employment with few public policy exceptions. There is no state-level pay transparency requirement and no covenant of good faith protection. DFW's northern suburbs (Plano, Frisco, Southlake) are legendary corporate relocation destinations precisely due to the minimal regulatory burden. Workers in Texas must rely primarily on federal protections and their own negotiating power — the corporate-friendly framework that attracts employers can disadvantage individual employees, particularly in lower-wage sectors."
        }
      }
    },

    alcoholLaws: {
      label: "Alcohol Laws & Hospitality Ecosystem",
      description: "State and county-level alcohol regulations affecting retail availability, on-premise consumption, operating hours, and the social hospitality landscape.",
      source: {
        name: "State ABC Authorities & Alcohol Policy Information System (2025–2026)",
        url: "https://www.alcoholpolicy.niaaa.nih.gov/"
      },
      values: {
        roanoke: {
          summary: "ABC control state for spirits; private beer & wine in grocery stores (6 AM–12 AM). Mixed beverage licenses require 45% food revenue — no traditional dive bars. Cocktails-to-go permanently legalized. Happy hour advertising now permitted.",
          details: "Virginia operates as an Alcoholic Beverage Control (ABC) state, maintaining a government monopoly on retail distilled spirits via state-run ABC stores (Mon–Sat 10 AM–9 PM; Sun 10 AM–6 PM), while allowing private grocery and convenience stores to sell beer and wine from 6:00 AM to 12:00 AM daily. The most impactful regulation for the social scene is the 45% food ratio requirement for mixed beverage restaurant licenses — establishments must derive at least 45% of gross receipts from food sales, effectively prohibiting traditional dive bars or neighborhood pubs without commercial kitchens and forcing nightlife into a restaurant-centric format. Recent legislative wins include permanently legalizing cocktails-to-go via licensed third-party delivery, permitting canned cocktails (up to 16 oz / 15% ABV) to be served in their entirety to single patrons, and allowing happy hour advertising for the first time. Keg registration (for kegs ≥ 4 gallons) is required as an anti-underage-access mechanism. Direct-to-consumer wine shipping is permitted — up to 2 cases/person/month from permitted out-of-state wineries."
        },
        waldorf: {
          summary: "Highly localized Charles County licensing. No alcohol in grocery or chain stores statewide — dedicated liquor stores required for all off-premise purchases. On-premise service until 2 AM. Suburban geography prevents any walkable nightlife corridor.",
          details: "Maryland's alcohol laws are highly fragmented by county, with Charles County governed by its own five-member Board of License Commissioners. The most commercially disruptive statewide regulation is the blanket prohibition on alcohol sales in grocery stores, big-box retailers, and chain stores — a rule with roots predating 1978 that legislation has repeatedly failed to repeal. All beer, wine, and spirits must be purchased at dedicated private liquor stores, adding daily consumer friction uncommon in most other states. On-premise licenses allow service from 6:00 AM to 2:00 AM (Mon–Sat) and 8:00 AM to 2:00 AM (Sundays) for Class B establishments, providing a robust late-night window. However, Waldorf's sprawling suburban layout means no walkable nightlife corridors exist — socializing invariably requires destination driving. Direct-to-consumer wine shipping is permitted from licensed out-of-state wineries, offering some convenience for subscription-based consumers."
        },
        denver: {
          summary: "Most liberalized alcohol ecosystem in this comparison. Full-strength beer & wine in grocery stores (8 AM–12 AM). Taprooms operate with no food requirement, creating an organic community gathering culture. Bars and restaurants serve until 2 AM. Direct wine shipping fully permitted.",
          details: "Colorado has spent the last decade aggressively dismantling Prohibition-era alcohol laws, creating one of the most progressive hospitality ecosystems in the nation. Full-strength beer and wine are available in grocery and convenience stores from 8:00 AM to 12:00 AM daily. Distilled spirits are sold in private licensed liquor stores under the same hours. Bars, breweries, and restaurants may serve until 2:00 AM. The defining advantage for Denver's social scene is that microbrewery taprooms — concentrated in neighborhoods like RiNo (River North Art District) and heavily represented in Boulder — face minimal food-service requirements, allowing them to function as pure community gathering spaces rather than restaurant extensions. This creates an organic, casual networking culture ideal for young professionals. Boulder exemplifies the model: outdoor recreation integrates seamlessly with craft brewing, where hiking to taproom is a standard social rhythm. Suburbs like Lone Tree incorporate sprawling mixed-use hospitality zones optimized for affluent young professional demographics. Direct-to-consumer wine shipping is fully permitted via common carriers."
        },
        slc: {
          summary: "Nation's most restrictive framework. DABS state stores (closed Sundays) for anything >5% ABV. Restaurants require food with alcohol, one drink at a time, max 2.5 oz spirits per drink, and ≤30% alcohol revenue. Strictest DUI threshold in the US at 0.05% BAC. No home wine delivery.",
          details: "Utah maintains the most stringent and complex alcohol regulatory framework in the United States, deeply shaped by the cultural and political dominance of the LDS Church. The state operates a strict control system through the Department of Alcoholic Beverage Services (DABS). Grocery and convenience stores may only sell beer with ABV ≤ 5%, from 10:00 AM to 10:00 PM daily. Any beverage exceeding 5% ABV — including most craft beers, all wines, and spirits — must be purchased exclusively at state DABS stores, which are entirely closed on Sundays and typically operate from 11:00 AM to 7:00 PM or 10:00 PM. On-premise consumption is equally regulated: restaurant licenses require alcohol be ordered with food; drinks may only be purchased one at a time (no pitchers or rounds); bartenders are legally capped at 2.5 oz of hard liquor per mixed drink; and alcohol sales must remain below 30% of a restaurant's total revenue. Bar licenses (21+ only) mandate digital ID scanning at the door for all patrons regardless of apparent age. Utah enforces the strictest DUI threshold in the nation at 0.05% BAC — applicable to both motor vehicles and bicycles — and recent legislation (HB437) temporarily bars 'extreme DUI' convicts from purchasing alcohol. Direct-to-consumer wine shipping to home addresses is prohibited; shipments must be picked up at a DABS store or package agency."
        },
        raleigh: {
          summary: "Control state for spirits via local ABC boards. Beer & wine in grocery stores (7 AM–2 AM weekdays). Happy hour specials strictly illegal — prices must be constant all day. Craft distillery tasting rooms now fully permitted. Sunday ABC store hours expanding via local approval.",
          details: "North Carolina is a control state with a unique decentralized structure: the state ABC Commission sets regulations, but local ABC boards operate individual retail liquor stores, resulting in community-level governance over spirit distribution. Beer and unfortified wine are available in grocery and convenience stores from 7:00 AM to 2:00 AM (Mon–Sat), with Sunday sales beginning at 10:00 AM–12:00 PM depending on local ordinance. Distilled spirits are exclusively sold at local ABC stores. A landmark shift via House Bill 921 now permits ABC stores to open on Sundays (10:00 AM or 12:00 PM) contingent on explicit local government approval. Bars and restaurants may serve until 2:00 AM. The most impactful restriction for social culture is the strict prohibition on happy hour pricing: establishments cannot offer two-for-one drinks, unlimited drinks for a set price, or vary drink prices throughout the day — a drink must maintain the same price from open to close, eliminating the post-work discount culture common in most other states. Only one drink may be served per customer at a time. On the positive side, recent legislation permits craft distilleries to operate as full-service tasting rooms and bars on-site, catalyzing a boom in Raleigh-area craft spirits venues that have become popular social anchors for young professionals. Direct-to-consumer wine shipping to home is permitted with applicable volume limits."
        },
        dfw: {
          summary: "Complex wet/dry/partially wet county patchwork — access entirely determined by suburb zoning. Liquor stores closed Sundays and major holidays. Beer & wine in grocery stores (7 AM–midnight). Alcohol-to-go permanently codified. Wine shipping up to 9 gal/person/month.",
          details: "Texas utilizes a complex licensing system built around 'wet,' 'dry,' and 'partially wet' county and precinct designations determined purely by local option elections. Texas contains 59 completely wet counties, 190 partially wet, and 5 completely dry counties — meaning a DFW resident's access to alcohol is entirely determined by the zoning laws of their chosen suburb. Grocery and convenience stores in wet jurisdictions sell beer and wine from 7:00 AM to 12:00 AM (Mon–Fri), until 1:00 AM on Saturday, and from 10:00 AM to 12:00 AM on Sunday. Package liquor stores operate Mon–Sat from 10:00 AM to 9:00 PM and are mandatorily closed on Sundays, Thanksgiving, Christmas, and New Year's Day. Bars and restaurants in major DFW markets may serve until 2:00 AM. A significant modernization permanently codified alcohol-to-go: sealed beverages sold alongside qualifying food orders for delivery or takeout, provided tamper-proof packaging is used. The impact of dry zoning is illustrated by Garland — historically dry — which required specific state legislation (SB 2633) just to enable local elections on alcohol sales. Direct-to-consumer wine shipping is permitted at up to 9 gallons per person per month (36 gallons annually)."
        }
      }
    },

    firearmsLaw: {
      label: "Firearms Laws & 2nd Amendment Environment",
      description: "State-level firearms regulations: concealed carry, magazine capacity limits, assault weapon bans, NFA item ownership, and legislative trajectory.",
      source: {
        name: "NRA-ILA / USCCA / State Legislature Sources (2025–2026)",
        url: "https://www.nraila.org"
      },
      values: {
        roanoke: {
          summary: "Shall-issue CCW. Worsening: SB749 advancing mag confiscation (10-round limit, no grandfathering).",
          details: "Virginia has historically been a permissive state but its legislative environment is rapidly shifting. Currently a 'shall-issue' state for concealed carry permits. However, in 2026 the General Assembly advanced a substitute version of SB749, a bill designed to aggressively confiscate standard-capacity magazines. The legislation classifies magazines holding more than 10 rounds as 'large capacity ammunition feeding devices,' rendering possession, sale, or transfer a Class 1 misdemeanor (up to one year in prison) with absolutely no grandfathering provisions for currently owned, legally acquired items. This is not a future sales ban — it is a retroactive confiscation order. If signed into law, residents would face criminal liability for possessing magazines they legally purchased. NFA items (suppressors, SBRs, SBSs, machine guns) remain legal under federal compliance."
        },
        waldorf: {
          summary: "Among the strictest in the nation. AWB, 10-round mag ban, ghost gun ban, arduous CCW process.",
          details: "Maryland possesses some of the strictest firearms laws in the nation. The state completely bans the possession, sale, or transfer of 'assault weapons' — explicitly including standard AR-15 and AK-47 style rifles — and outlaws any magazine holding more than 10 rounds. The state further enforces strict bans on unregistered short-barreled rifles and shotguns, machine guns, and 'ghost guns.' While federal jurisprudence has forced Maryland toward a 'shall-issue' framework for concealed carry, the process remains arduous, geographically restricted, and costly. Firearm owners relocating from permissive states must surrender or permanently transfer out-of-state all prohibited items before establishing Maryland residency, or face felony exposure. Maryland represents the most restrictive jurisdiction in this comparison."
        },
        denver: {
          summary: "15-round mag limit. SB3 bans most semi-auto rifles effective Aug 2026. Shall-issue CCW.",
          details: "Colorado strictly regulates firearms, actively modeling policies after coastal frameworks. The state enforces a hard 15-round limit on all magazines. Most significantly, Governor Polis signed SB3 into law — effective August 1, 2026, this bans the manufacture, sale, and purchase of most semiautomatic firearms that accept detachable magazines, including AR-15 and AK-47 variants. The sole exception requires subjective vetting by the county sheriff, completion of up to 12 hours of training, and use of permanently affixed (welded or epoxied) magazines — conditions that functionally eliminate practical use. Colorado is a shall-issue state for concealed carry and requires universal background checks on all private transfers. Boulder has historically attempted to enact restrictions even stricter than the state level."
        },
        slc: {
          summary: "Constitutional carry. No mag limits. No AWB. NFA legal. Most permissive Mountain West jurisdiction.",
          details: "Utah operates under robust constitutional carry laws, allowing law-abiding citizens to carry firearms openly or concealed without a permit. The state imposes no magazine capacity limits, enforces no assault weapon bans, and requires no background checks for private sales. All NFA items — suppressors, short-barreled rifles and shotguns, machine guns — are fully legal under standard federal ATF compliance and tax stamps. Utah represents a high-freedom, zero-friction jurisdiction for Second Amendment advocates. The state's political trajectory is stable and shows no signs of moving toward restrictive legislation. Relocating from Maryland or Virginia (if SB749 passes) would represent a dramatic expansion of legal rights."
        },
        raleigh: {
          summary: "Permit-to-carry, transitioning toward permitless. No mag limits. NFA legal. Pro-2A trajectory.",
          details: "North Carolina represents a transitional environment trending toward deregulation. Currently the state requires a permit to carry a concealed handgun and enforces a permit-to-purchase system for handguns. However, the 2025 General Assembly introduced H5v2, legislation explicitly aimed at establishing constitutional (permitless) carry for citizens 18 and older, eliminating the statutory requirement for concealed carry permits. North Carolina imposes no magazine capacity limits — standard and high-capacity magazines are fully legal. NFA items (suppressors, SBRs, SBSs, machine guns) are entirely legal and subject only to standard federal ATF compliance. No assault weapon ban exists at the state level. The legislative trajectory is actively pro-2A and moving further toward deregulation."
        },
        dfw: {
          summary: "Permitless carry (21+). No mag limits. No AWB. NFA legal. Castle Doctrine + Stand Your Ground.",
          details: "Texas represents the most permissive, legally protective environment among the evaluated locales. Since September 2021, Texas has authorized permitless concealed and open carry for anyone 21 or older. Texas possesses no magazine capacity limits, does not ban assault-style weapons, does not require background checks for private sales, and legally protects the ownership of all NFA items subject only to federal oversight. Furthermore, Texas enforces robust Castle Doctrine and Stand Your Ground laws, legally removing the duty to retreat in self-defense scenarios and providing significant civil liability protection when lethal force is employed in defense of property or life. Texas's Second Amendment environment is the most favorable in this comparison — and is constitutionally protected at the state level through the Texas Constitution."
        }
      }
    }

  },

  /* ----------------------------------------------------------
     ADDITIONAL CONTEXT (Qualitative Only — no charts)
     Used for the "Context" sections rendered as info panels
     ---------------------------------------------------------- */
  context: {

    vehicleCosts: {
      label: "Vehicle Registration & Annual Costs",
      description: "Estimated initial DMV transition costs and recurring annual vehicle burdens for two adults with two vehicles each valued at $25,000 (~3 years old, previously taxed out-of-state).",
      source: {
        name: "State DMV fee schedules (2024–2025)",
        url: "https://www.usa.gov/motor-vehicle-services"
      },
      values: {
        roanoke: {
          initialCost: "~$144",
          annualCost:  "~$1,085",
          notes:       "Low initial cost. High recurring: Roanoke personal property tax (~$3.45/$100 assessed value) applies to vehicles. After ~42% city relief, two $25k vehicles cost ~$1,005/yr in property tax alone plus ~$80 registration."
        },
        waldorf: {
          initialCost: "~$528",
          annualCost:  "~$312",
          notes:       "High initial cost: weight-based titles, Excise Tax Credit fee (~$100/car within 60 days). No annual vehicle property tax; annual registration ($120.50–$191.50/vehicle) is the only recurring cost."
        },
        denver: {
          initialCost: "~$79",
          annualCost:  "~$610",
          notes:       "Very low initial cost. Moderate recurring: Colorado's Specific Ownership Tax (SOT) — 1.20% of 85% of MSRP for a 3-yr-old vehicle. ~$255/car annually, decreasing each year as the vehicle ages."
        },
        slc: {
          initialCost: "~$116",
          annualCost:  "~$334",
          notes:       "Low initial and recurring costs. Utah charges a uniform age-based fee ($110 for a 3-yr-old vehicle) plus ~$56.75 registration per car. Title fee is just $6.00. Most favorable vehicle cost environment evaluated."
        },
        raleigh: {
          initialCost: "~$224",
          annualCost:  "~$529",
          notes:       "Moderate initial (title fees; Highway Use Tax generally capped for relocators). Recurring: Wake County + Raleigh property tax (~$0.87/$100) on vehicle value + $46.25 registration via 'Tag & Tax Together' program."
        },
        dfw: {
          initialCost: "~$312",
          annualCost:  "~$125",
          notes:       "Moderate initial: $90 New Resident Tax per vehicle plus title/license fees. The lowest recurring cost by far — just $50.75 base + ~$11.50 local county fee per vehicle. No annual vehicle property tax."
        }
      }
    },

    lifestyleHighlights: {
      label: "Lifestyle & Recreation Highlights",
      description: "Key differentiators for outdoor recreation, skiing, BLM land access, aviation connectivity, motorcycle culture, and social scene.",
      source: {
        name: "Various — BLM.gov, local tourism & civic authorities",
        url: "https://www.blm.gov/visit"
      },
      values: {
        roanoke: {
          skiing:       "Wintergreen (3,514 ft) and Massanutten (2,881 ft) within 2–3 hours. East Coast skiing with artificial snowmaking.",
          skiingFull:   "East Coast skiing is available at Wintergreen (3,514 ft elevation, 26 trails) and Massanutten, both accessible within 2–3 hours. These are respectable regional options but they operate entirely on artificial snowmaking, have dramatically shorter vertical drops than any Rocky Mountain resort, and are subject to rain and ice events that routinely close runs mid-season. For serious skiers, this market requires flying — DEN or SLC are the nearest world-class alternatives, adding significant cost and planning overhead to any ski trip.",
          blm:          "No BLM land in Virginia. Blue Ridge Parkway and George Washington National Forest provide regulated recreation.",
          blmFull:      "Virginia has no BLM land. The George Washington & Jefferson National Forests provide approximately 1.8 million acres of regulated backcountry recreation — hiking, dispersed camping in designated areas, and some OHV trails — but these are Forest Service lands with permit requirements and use restrictions, not the free-access dispersed camping that characterizes western BLM lands. The Blue Ridge Parkway, a 469-mile National Parkway, runs along the city's western edge and is among the most scenic driving and cycling corridors on the continent, though commercial vehicle use and camping are prohibited on the Parkway itself.",
          aviation:     "ROA airport has limited direct routes; connections through Charlotte (CLT) or D.C. hubs for West Coast travel.",
          aviationFull: "Roanoke Regional Airport (ROA) is a small regional facility with limited direct routes, primarily servicing Charlotte (CLT), Atlanta (ATL), and Washington D.C. hubs. West Coast travel consistently requires 1–2 connections, adding significant time and cost to any long-haul trip. Residents requiring frequent travel to Southern California or the Mountain West bear a meaningful aviation penalty compared to DFW, DEN, or SLC residents. The D.C. airports (DCA, IAD, BWI) are a practical alternative for major travel but require a 3–3.5 hour drive that compounds rather than solves the accessibility problem.",
          motorcycle:   "Premium Blue Ridge Parkway and Appalachian access. Blue Ridge staging point for East Coast riding culture. Tail of the Dragon reachable in ~3 hours.",
          motorcycleFull: "Roanoke is among the best motorcycle staging cities in the Eastern U.S. The Blue Ridge Parkway begins effectively at the city's doorstep — 469 miles of sweeping, technically engaging mountain roads with no commercial traffic. Skyline Drive through Shenandoah National Park adds another 105 miles of ridge-line riding. The Tail of the Dragon (US-129 at Deals Gap, 318 curves in 11 miles) is approximately 3 hours southwest and remains one of the most famous motorcycle roads in the country. Roanoke's central Appalachian position also makes it a natural staging point for East Coast rally circuits, including Laconia Motorcycle Week (New Hampshire). The riding season is approximately 8–9 months, limited by winter mountain conditions.",
          social:       "Outdoor-recreation-driven scene anchored by the annual GO Fest (October). Grandin Village and downtown serve distinct young professional niches. Carilion Clinic anchors a steady influx of young medical and technical professionals.",
          socialFull:   "Roanoke's civic identity has successfully transitioned from railroad hub to outdoor recreation and healthcare economy, primarily driven by Carilion Clinic and associated medical schools — which create a steady demographic of young medical and technical professionals anchoring the local social scene. Neighborhoods cater to distinct lifestyle phases: Grandin Village offers high walkability, the historic Grandin Theatre, independent coffee shops, and a strong sense of neighborhood pride — ideal for young professionals without children or early-stage families. Downtown Roanoke caters to singles and urban-lifestyle couples with breweries, lofts, and the Roanoke City Market. The region's premier community event is the annual Roanoke GO Outside Festival (GO Fest) every October — a massive three-day event in Elmwood Park combining camping, live music, craft beer, and outdoor gear with Timberworks lumberjack shows, BMX demonstrations, and highline slackline exhibitions. GO Fest functions as both a community builder and a deliberate talent attraction mechanism for the region. Suburbs like Cave Spring (families/schools) and Salem (scenic, tight-knit) offer traditional suburban environments, with nightlife requiring a commute into Roanoke proper."
        },
        waldorf: {
          skiing:       "Same East Coast options as Roanoke. D.C. hubs provide flight access to Western ski destinations.",
          skiingFull:   "Waldorf has the same limited East Coast ski options as Roanoke — Wisp (MD), Whitetail (PA), and Massanutten (VA) are all within 2–3 hours, all relying on snowmaking and offering modest vertical. The meaningful advantage Waldorf has over Roanoke is airport access: DCA, IAD, and BWI all provide direct flights to DEN and SLC, making a Western ski trip a same-day proposition. For households that ski frequently enough to justify the flight cost, Waldorf's proximity to three major airports is a legitimate advantage over Roanoke's single-connection hub dependency.",
          blm:          "No BLM land in Maryland. Shenandoah National Park and Delaware Water Gap within driving range.",
          blmFull:      "Maryland has no BLM land. The primary public recreation lands within driving distance are Shenandoah National Park (~2 hours west), Great Falls National Park (~1 hour north via the C&O Canal), and the Delaware Water Gap (~3 hours north). These are all fee-based National Park Service or Forest Service lands with strict use regulations — dispersed camping, OHV use, and the informal free-access ethos of western BLM lands do not exist in this region. The Chesapeake Bay and Potomac River do provide a distinct recreational niche — boating, kayaking, and fishing culture that is genuinely unavailable in the Mountain West or DFW.",
          aviation:     "Exceptional: DCA, IAD, and BWI provide dense flight options. Severe traffic to reach airports from Charles County.",
          aviationFull: "Waldorf sits within notional range of three major airports — Reagan National (DCA, ~35 miles), Dulles International (IAD, ~55 miles), and Baltimore/Washington (BWI, ~45 miles) — providing unmatched domestic and international flight frequency in this comparison. The catch is significant: all three airports are accessed via I-95, I-495 (the Beltway), or US-50, corridors that rank among the most chronically congested in the United States. A 35-mile drive to DCA can routinely take 75–90 minutes during peak hours, and weather events can double that. Residents must budget 90–120 minutes of travel time before their flight departs, which effectively cancels much of the scheduling flexibility that multi-airport access theoretically provides.",
          motorcycle:   "Same Appalachian routes as Roanoke but much more painful logistics due to D.C. traffic corridor.",
          motorcycleFull: "Waldorf shares access to the same Appalachian riding routes as Roanoke — the Blue Ridge Parkway, Shenandoah, and the Tail of the Dragon are all reachable — but the logistical friction of escaping the D.C. metropolitan area significantly degrades the experience. To reach the Blue Ridge from Waldorf, a rider must first navigate I-495, US-301, or I-270 through some of the densest suburban traffic in the country, adding 60–90 minutes of congestion before reaching open roads. Weekend and holiday departures are particularly punishing. Once through the traffic corridor, the riding quality is identical to Roanoke, but the exit cost is substantially higher.",
          social:       "Commuter suburb with limited organic social infrastructure. The Charles County Chamber YPG is the primary professional networking anchor. Social life centered on activity-based venues and periodic meetup groups, with heavy reliance on the broader DMV corridor.",
          socialFull:   "Waldorf functions primarily as a high-density commuter suburb for the Washington D.C. metro, meaning its organic local social infrastructure is less developed than a traditional urban core and requires intentional effort to navigate. The defining professional networking organization is the Charles County Chamber of Commerce Young Professionals Group (YPG), which hosts monthly events, panel discussions, and mentorship programs for professionals under 40. Local recreational socializing revolves around activity-based venues rather than walkable bar districts: popular options include the Smash Pit (a recreational 'rage room'), Scary Strokes (blacklight mini-golf and arcade games), and county-organized Community Cafes. The wider Southern Maryland and DMV area provides supplemental social infrastructure via meetup groups — cycling clubs (Ridin' 30), the Waldorf Investing Meetup, and singles mixers in nearby Alexandria — but all require significant vehicular transit. The Southern Maryland Young Professionals Forum uses human-centered design workshops to address young adult community needs. For residents prioritizing social capital, Waldorf demands intentional effort to build community in ways that more walkable, urban cities facilitate organically."
        },
        denver: {
          skiing:       "Breckenridge (2,908 acres, 187 trails), Vail, Keystone — 60–90 min via I-70. World-class, but I-70 weekend traffic is severe (90 min can become 3+ hours).",
          skiingFull:   "World-class skiing at Breckenridge (2,908 skiable acres, 187 trails, 3,398 ft vertical), Vail, Keystone, Arapahoe Basin, and Loveland is nominally 60–90 minutes via I-70 West. In practice, weekend ski traffic has become one of Colorado's most documented quality-of-life problems — the drive routinely stretches to 3–5 hours during peak weekends. Mitigation strategies include the Ski Train from Union Station to Winter Park (bypasses the highway entirely), scheduling mid-week days, or renting at the mountain. The snow quality — once you arrive — is genuinely exceptional: Colorado's high-altitude, low-humidity snowpack produces some of the lightest powder outside of Utah.",
          blm:          "Vast BLM access. Hardscrabble SRMA near Florence offers OHV/ATV zones. Millions of acres for dispersed camping throughout Colorado.",
          blmFull:      "Colorado contains millions of acres of BLM land and is one of the premier states for dispersed camping and OHV recreation. The Hardscrabble Special Recreation Management Area (near Florence, ~2 hours south) offers distinct designated zones for ATV/OHV use, single-track mountain biking, and free dispersed camping. The San Luis Valley, Gunnison country, and the Western Slope contain enormous swaths of BLM land accessible with a standard 4WD or high-clearance vehicle. The Rocky Mountain Arsenal National Wildlife Refuge sits effectively within the Denver metro footprint. Colorado's BLM access, combined with four National Forests and two National Parks, creates one of the highest public land densities per capita of any state in the contiguous U.S.",
          aviation:     "DEN is a United/Southwest/Frontier hub. Daily non-stop to LAX, SAN, SNA, ONT, BUR. Excellent SoCal connectivity.",
          aviationFull: "Denver International Airport (DEN) is the fifth-busiest airport in the United States and the primary hub for United Airlines, with major Southwest and Frontier operations. It provides daily non-stop service to every major Southern California airport: LAX, SAN, SNA (Orange County), ONT (Ontario), and BUR (Burbank). Flight times to SoCal are approximately 2.5 hours, and competition between United, Southwest, and Frontier frequently drives fares below $100. The A-Line commuter rail connects downtown Denver to the airport in ~37 minutes, eliminating parking and rideshare cost variability.",
          motorcycle:   "Four Corners Rally access. Million Dollar Highway (US-550). Incredible mountain riding with a short season due to altitude/weather.",
          motorcycleFull: "Colorado offers some of the most spectacular motorcycle roads in North America, anchored by the Million Dollar Highway (US-550 between Ouray and Silverton) — a genuine engineering marvel carved into the San Juan Mountains with sheer cliff faces, no guardrails in sections, and sustained technical elevation changes. The Four Corners Rally (held annually near Durango) is an internationally recognized event drawing riders from across the country. The state's riding infrastructure also includes the Alpine Loop, Red Mountain Pass, and extensive routes through the San Juan and White River National Forests. The primary constraint is season length: high-altitude passes above 10,000 feet are typically only rideable from late May through early October, and afternoon thunderstorms during monsoon season (July–August) require careful planning.",
          social:       "Premier young professional destination. Neighborhood-specific ecosystems (LoDo, Highlands, Wash Park, Capitol Hill) match every lifestyle phase. Mile High Young Professionals intramural leagues, WorldDenver globally-minded networking, and an extraordinarily active outdoor + brewery community.",
          socialFull:   "Denver represents a tier-one young professional destination, offering a diversified economy and unmatched Rocky Mountain access that shapes a distinctly health-conscious, outdoor-centric social culture. Neighborhoods are purpose-built for different lifestyle phases: LoDo (Lower Downtown) offers high-energy polished urban living near Union Station and major employers, though at a significant financial premium. Capitol Hill provides a more affordable, eclectic environment with historic apartments and access to Cheesman Park. For the established early-thirties crowd, the Highlands (West Highlands and Sunnyside) and Washington Park offer boutique retail, safe walkability, and expansive green spaces — consistently among Denver's most desirable addresses. The surrounding suburbs are independent social ecosystems: Boulder boasts an extraordinarily educated populace (up to 39.1% bachelor's degrees in surrounding enclaves) where tech professionalism blends seamlessly with outdoor lifestyle, anchored by community venues like the Mountain Sun Pub & Brewery and extensive access to Boulder Mountain Park. Lone Tree serves as a premium suburban destination for professionals transitioning out of downtown, with large-lot homes, high safety, and upscale retail. Formal networking is robust: Mile High Young Professionals host massive intramural volleyball and kickball leagues as a primary post-collegiate socializing mechanism. WorldDenver Young Professionals caters to globally-minded cohorts with scavenger hunts, panels, and networking happy hours. Grassroots platforms support highly niche communities including the Nerdy 30s Ladies of Denver, Millennial trivia nights, board game cafes, and roller-skating socials."
        },
        slc: {
          skiing:       "Best ski access in North America. Alta, Snowbird, Park City, Deer Valley — under 45 min from downtown. Sandy/Draper residents reach resorts in <30 min. World-famous light powder.",
          skiingFull:   "Salt Lake City's ski access is the most frictionless of any major U.S. city. Alta, Snowbird, Park City Mountain Resort, and Deer Valley are all within 35–45 minutes of downtown SLC. For residents of Sandy or Draper, the drive to Snowbird's tram base shrinks to under 25 minutes — arriving at a world-class resort before the I-70 Denver skier has left their neighborhood. The snow quality is legitimately world-famous: Alta and Snowbird average 500+ inches of ultra-light, low-moisture powder annually. Snowbird's 3,240 ft vertical, Alta's steep terrain, and Park City's 7,300 acres of skiable terrain collectively offer more variety than any single Colorado resort. The Cottonwood Canyon access roads can experience closures during heavy snowfall, but delays are brief compared to I-70.",
          blm:          "Legendary BLM access. Millions of acres of Utah desert, canyonlands, and alpine terrain for dispersed camping and OHV just 1–2 hours south and west.",
          blmFull:      "Utah contains over 22 million acres of BLM land — approximately 42% of the entire state — encompassing desert canyon country, alpine terrain, slot canyons, and world-class OHV areas. Within 1–2 hours of SLC: Moab's famous slickrock OHV trails and world-class mountain biking, Goblin Valley, the San Rafael Swell (a massive geologic anticline with hundreds of miles of dirt roads), and the Bonneville Salt Flats. Within 3–4 hours: the Grand Staircase-Escalante, Bears Ears National Monument, and the canyon country surrounding Lake Powell. Dispersed camping — drive-in, free, no reservation, no permit — is available across vast swaths of this landscape. This level of informal public land access is genuinely alien to eastern states.",
          aviation:     "SLC is a Delta fortress hub. Daily non-stop to LAX, SNA, SAN. One of the most efficiently rebuilt modern airport terminals in the U.S.",
          aviationFull: "Salt Lake City International Airport (SLC) is Delta Air Lines' Mountain West fortress hub, providing daily non-stop service to LAX, SNA (Orange County), SAN (San Diego), and extensive domestic and international connections. Delta's hub dominance means frequency is high but fares can be elevated compared to multi-carrier markets — SLC residents occasionally drive to Las Vegas (LAS, ~4.5 hours) for better Southwest fares to SoCal. The airport completed a $4.1 billion terminal overhaul in 2024, producing one of the most efficiently designed, modern airport facilities in the country. Total drive time from downtown SLC is approximately 15–20 minutes.",
          motorcycle:   "Year-round potential (valley floor); world-class mountain roads in summer. Canyon roads to ski resorts are exceptional for sport riding. BLM lands offer dirt/adventure riding.",
          motorcycleFull: "SLC's motorcycle proposition has two entirely distinct characters. The Wasatch Front valley floor is rideable virtually year-round — winter days above 40°F are common, and the valley's dry climate means road salt is applied sparingly. In summer, the canyon roads leading to ski resorts transform into exceptional sport riding routes: Little Cottonwood Canyon (SR-210) and Big Cottonwood Canyon (SR-190) are technically demanding, visually stunning elevation climbs. The BLM desert to the south and west opens a completely different discipline — adventure touring and dual-sport routes through canyon country that can run for hundreds of miles without a paved surface. Utah has no universal motorcycle helmet law for adults 21+.",
          social:       "Distinct LDS/non-LDS social dichotomy requires proactive networking. Activity-based groups dominate (volleyball, rock climbing, ski caravans). Sugarhouse is the progressive young professional hub. Draper anchors Silicon Slopes tech culture.",
          socialFull:   "Salt Lake City presents a highly specific socio-cultural duality. The broader state is deeply influenced by LDS Church cultural practices, but Salt Lake City proper and tech-centric suburbs attract a growing, diverse non-LDS professional class drawn by the booming Silicon Slopes economy and world-class winter sports. For non-LDS professionals, the social scene requires proactive engagement — the restrictive state alcohol laws suppress organic neighborhood bar culture outside the immediate downtown core, pushing socializing into private gatherings, dinner groups, and activity-based recreation. The backbone of social life is activity-based networking: 'Sand Bar' volleyball leagues, indoor rock climbing groups, winter ski caravans, and creative hobby groups like SLC Knitters who Drink (meeting at local taprooms) serve as the primary peer-meeting mechanisms. Within the city, Sugarhouse is the universally recognized progressive hub for young professionals, with walkability, localized retail, and proximity to large parks. In the suburban ring, Draper is the critical nexus for Silicon Slopes professionals, hosting major tech employers including Pluralsight and Adobe, with direct access to Corner Canyon trails and Point of the Mountain paragliding. Farmington and Bountiful offer more affordable, family-oriented environments with high safety ratings, low unemployment, and the Lagoon amusement park — ideal for thirty-somethings transitioning to homeownership and family life."
        },
        raleigh: {
          skiing:       "Sugar Mountain, NC (~3 hours). Virginia ski resorts ~4 hours. No world-class skiing; requires flights to access Western mountains.",
          skiingFull:   "Raleigh has no practical alpine skiing within reasonable driving distance. Sugar Mountain in Banner Elk, NC is approximately 3 hours, offering modest terrain at low elevation with heavy snowmaking dependency. Appalachian Ski Mountain and Beech Mountain are comparable alternatives in the same corridor. Virginia resorts (Wintergreen, Massanutten) add another hour. None of these facilities compete meaningfully with Mountain West alternatives. For serious skiing, Raleigh residents must fly — RDU's connections to DEN and SLC make this practical for occasional trips, but the ongoing cost of flying to ski is a genuine lifestyle trade-off compared to Denver or SLC.",
          blm:          "No BLM land in North Carolina. National Forests (Pisgah, Nantahala) and State Parks provide regulated recreation.",
          blmFull:      "North Carolina has no BLM land. Public land recreation is provided by the Pisgah and Nantahala National Forests in the western mountains (~3 hours from Raleigh), the Blue Ridge Parkway, and an extensive State Parks system. These are well-managed, highly scenic resources, but they operate under Forest Service and State Parks regulations: permit-required camping at designated sites, limited OHV access, and no dispersed vehicle camping. For off-road vehicle recreation, Uwharrie National Forest (2 hours west) contains designated OHV trails. The lack of free-access BLM-style dispersed camping is the most significant public land gap for Raleigh compared to the Mountain West cities.",
          aviation:     "RDU has direct flights to LAX (American, Delta). Secondary SoCal airports (SNA, BUR) typically require a layover via DFW, ATL, or CLT.",
          aviationFull: "Raleigh-Durham International Airport (RDU) punches above its weight for a mid-sized city. American Airlines and Delta both operate direct service to LAX, with multiple daily departures. However, coverage thins considerably for secondary SoCal markets: reaching SNA (Orange County), BUR (Burbank), or ONT (Ontario) from RDU typically requires a connection through DFW, ATL, or CLT, adding 2–4 hours to total travel time. International connectivity is improving but still limited compared to DFW or DEN. The airport itself is well-designed, uncongested, and easy to navigate — significantly less stressful than major hub airports.",
          motorcycle:   "Blue Ridge Parkway and Tail of the Dragon are accessible (3+ hours). NC hosts significant moto culture. Year-round riding season is excellent.",
          motorcycleFull: "North Carolina's riding culture is among the most active in the Eastern U.S., and the riding season is one of the longest outside of Texas and Florida — virtually 11 months in the Raleigh area. The Blue Ridge Parkway and the Tail of the Dragon (US-129, 318 curves in 11 miles at Deals Gap) are the marquee destinations, approximately 3–3.5 hours from Raleigh. US-276 through Pisgah National Forest, the Cherohala Skyway, and NC-181 through Morganton are additional world-class sport touring routes accessible as day trips. North Carolina's moto event calendar includes the Blue Ridge Motorcycle Festival in Maggie Valley and regular Tail of the Dragon weekends. The topography around Raleigh itself is rolling Piedmont — pleasant suburban riding — with the mountain character arriving progressively as you move west toward Asheville.",
          social:       "One of the fastest-growing young professional markets in the US. First Friday monthly downtown events anchor the social calendar. TRI SPORTS NC recreational leagues across the Triangle. Cary and Apex consistently rank among the nation's best places to live.",
          socialFull:   "The Raleigh-Durham 'Triangle' is one of the fastest-growing regions in the United States, structurally built around Research Triangle Park (RTP) and the talent pipeline of three major tier-one universities (UNC, Duke, NC State). The demographic skew is ideally suited for early-thirties professionals seeking community. The downtown social calendar centers on First Friday Raleigh — occurring on the first Friday of every month, activating the downtown core with art gallery openings, live music, and vendor markets. Theme nights like 'Feminist First Friday' (featuring women-owned business markets, professional headshot stations, and job networking) demonstrate the deep integration of professional development into social leisure. Recreational leagues are abundant and highly organized: TRI SPORTS NC dominates with volleyball, kickball, soccer, flag football, and softball leagues spanning Raleigh, Durham, and Chapel Hill. Career development organizations including EO Raleigh Durham, CreativeMornings, and The Women's Social Club host mixer-style workshops and community dinners. Casual social groups like the 'Triangle 30s/40s Social Meetup Group' organize dining, game nights, and local hikes. The suburban ecosystem is exceptional: Cary functions as a hyper-educated, family-friendly satellite of 180,000+ residents with immediate RTP proximity, nationally recognized schools, and the newly developed state-of-the-art Downtown Cary Park. Apex ('The Peak of Good Living') offers a historic, walkable downtown with boutiques and coffee shops — small-town charm anchored by modern economic security."
        },
        dfw: {
          skiing:       "Zero alpine skiing in Texas. Requires flying to DEN or SLC for winter sports.",
          skiingFull:   "Texas has zero alpine skiing infrastructure. Accessing Mountain West resorts requires flying — from DFW International, direct flights to DEN take approximately 2.5 hours, and SLC is ~2.75 hours, making a ski weekend logistically practical if expensive. DFW's aviation dominance means ski flights are frequent and competitively priced. However, the total cost of a ski trip (flights, lodging, lift tickets) from DFW substantially exceeds the marginal cost for Denver or SLC residents who can simply drive. For households who ski more than a few times per year, this difference compounds meaningfully over a season.",
          blm:          "Minimal BLM land in Texas (primarily far west Texas near Big Bend). No meaningful dispersed camping near DFW.",
          blmFull:      "Texas has minimal BLM land — approximately 12 million acres concentrated almost entirely in the far west Texas Trans-Pecos region near Big Bend, roughly 7–8 hours from DFW. For practical purposes, dispersed BLM camping does not exist within the DFW regional day-trip radius. The Texas Hill Country (2 hours south via I-35) provides the best natural terrain near DFW for camping and recreation, primarily through a mix of State Parks, private hunting ranch access (often requiring fees), and the Guadalupe, Pedernales, and Colorado river systems. The Hill Country's rolling limestone terrain and live oak canopy provide a genuinely beautiful environment, though it operates under very different access rules than western BLM lands.",
          aviation:     "DFW is an American Airlines global hub — best international and domestic connectivity evaluated. DAL (Love Field) is a Southwest hub for SAN, BUR, LAX. Unmatched SoCal frequency.",
          aviationFull: "DFW International Airport is the American Airlines global hub and one of the three busiest airports in the world, providing direct service to every domestic market and most international ones with unmatched frequency. For Southern California specifically, American operates dozens of daily direct flights to LAX, SAN, SNA, and ONT. Dallas Love Field (DAL), 10 minutes from downtown, serves as a Southwest Airlines hub with direct service to SAN, BUR, and LAX. DFW metro residents effectively have two major airport options for SoCal travel — the best aviation positioning in this comparison by a significant margin, and the only city where a day trip to SoCal is logistically practical. Flight times to LAX are approximately 3 hours.",
          motorcycle:   "12-month riding season is a major advantage. DFW terrain is flat; Hill Country (2 hours south) provides the best Texas riding. No helmet law adds to the riding freedom calculus.",
          motorcycleFull: "Texas's 12-month riding season is the most significant practical motorcycle advantage in this comparison — there is no meaningful weather-forced off-season in the DFW area. The flat DFW topography makes urban and suburban riding practical and low-stress. For touring character, the Texas Hill Country (2 hours south via I-35 toward Austin and San Antonio) provides rolling limestone terrain, FM road networks through live oak and cedar country, and classic Texas BBQ destinations that form their own touring culture. The Four Corners Rally, Colorado mountain routes, and Appalachian riding all require travel, but the 12-month season means more total riding days per year than any other city in this comparison. Texas has no universal motorcycle helmet law for adults 21+.",
          social:       "Scale requires intentional neighborhood selection. Knox-Henderson and Addison are the premier social hubs for 30s professionals. Plano and Frisco dominate for master-planned suburban family lifestyle. DFW Young & Social and Meridian Young Professionals provide structured networking.",
          socialFull:   "The sheer geographic and economic scale of the DFW Metroplex necessitates highly insular, localized social ecosystems — the metro is simply too large for any single social scene to dominate. Within Dallas proper, Knox-Henderson is the premier destination for singles and couples in their thirties: a sophisticated, walkable environment that feels distinct from the younger energy of Deep Ellum. Addison, an inner-ring northern suburb, offers a uniquely dense concentration of restaurants and bars forming a self-contained social scene with an excellent commute for those working in the northern tech and finance corridors. The defining regional trend is the massive northward migration of wealth and talent to Plano and Frisco, which have evolved far beyond traditional 'bedroom communities' into massive mixed-use lifestyle hubs with elite dining, high-end retail, major corporate headquarters, and legendary school districts. While inherently less urban, they represent the dominant destination for thirty-somethings prioritizing top schools, new construction, and proximity to corporate campuses. Formal networking organizations fill the community gap left by suburban sprawl: DFW Young & Social provides structured, pressure-free community through dance classes, fitness groups, and workshops with no membership fees. The World Affairs Council's Meridian Young Professionals offers high-level career development, foreign affairs discussions, and civic engagement for globally-minded leaders. The absence of a compact, walkable urban core means intentional effort is required to build the social networks that denser cities facilitate organically."
        }
      }
    }

  },

  /* ----------------------------------------------------------
     DESTINATION & ROUTE CONNECTIVITY
     Matrix (6 cities × 16 destinations) + Hub Profiles
     ---------------------------------------------------------- */
  connectivity: {

    source: {
      name: "Bureau of Transportation Statistics, FlightsFrom.com, FlightConnections, Amtrak, Wanderu (2024–2026)",
      url:  "https://www.transtats.bts.gov/averagefare/"
    },

    // Column groups for the matrix display
    destinations: [
      { group: "Subject Cities", items: [
        { key: "roanoke", label: "Roanoke" },
        { key: "waldorf", label: "Waldorf" },
        { key: "denver",  label: "Denver" },
        { key: "slc",     label: "SLC" },
        { key: "raleigh", label: "Raleigh" },
        { key: "dfw",     label: "DFW" }
      ]},
      { group: "NE Corridor", items: [
        { key: "dc",       label: "Washington D.C." },
        { key: "richmond", label: "Richmond" },
        { key: "nyc",      label: "New York City" }
      ]},
      { group: "Sunbelt & Leisure", items: [
        { key: "sna", label: "Orange County" },
        { key: "mco", label: "Orlando" },
        { key: "crp", label: "Corpus Christi" }
      ]},
      { group: "West Coast", items: [
        { key: "sfo", label: "San Francisco" }
      ]},
      { group: "Alaska", items: [
        { key: "anc", label: "Anchorage" },
        { key: "fai", label: "Fairbanks" }
      ]},
      { group: "International", items: [
        { key: "tokyo", label: "Tokyo" },
        { key: "rome",  label: "Rome" }
      ]}
    ],

    // matrix[origin][destination]
    // type: "direct" | "upcoming" | "seasonal" | "connecting" | "drive" | "amtrak" | "mixed" | "self"
    matrix: {
      roanoke: {
        roanoke:  { type: "self" },
        waldorf:  { type: "amtrak",     time: "~5h via Amtrak", fare: "from $21",      summary: "Amtrak NE Regional to Union Station; or drive via I-81/US-29.",               details: "Amtrak operates the Northeast Regional line directly from Roanoke station (RNK) with service into Washington D.C.'s Union Station, continuing north through Richmond. Travel time to the Waldorf/Charles County area is approximately 5 hours from Roanoke, with fares starting around $21. Alternatively, driving south on I-81 to I-66 or US-29/US-17 covers roughly 100 miles in 1.5–2 hours depending on D.C.-area traffic.",                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "Wanderu / Amtrak Northeast Regional",                               url: "https://www.wanderu.com/en-us/train/us-va/roanoke/us-dc/washington/" } },
        denver:   { type: "connecting", time: "~4h 53m",         fare: "~$250",         summary: "Connecting flights required — via CLT, ATL, or ORD. ~4h 53m, ~$250.",           details: "Traveling from Roanoke to Denver currently relies entirely on connecting flights through eastern hubs such as Charlotte (CLT), Atlanta (ATL), or Chicago (ORD). A flight via Delta or United requires a layover and consumes an average of 4 hours and 53 minutes of total transit time at a typical cost of approximately $250. This connection penalty is the most significant logistical disadvantage of originating at a regional spoke for westward travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "Expedia / FlightsFrom.com (2026)",                                  url: "https://www.expedia.com/lp/flights/roa/den/roanoke-to-denver" } },
        slc:      { type: "connecting", time: "~5h 52m (1 stop)", fare: "$289–$373 RT",   summary: "Connecting flights required via major eastern hubs.",                             details: "Salt Lake City from Roanoke requires navigating a layover through major eastern hubs — typically Charlotte (CLT), Atlanta (ATL), or Chicago (ORD) — before connecting westward to SLC. No direct service exists. Total transit times typically range from 5–8 hours depending on connection quality.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        source: { name: "Google Flights (2026)",                                             url: "https://www.google.com/travel/flights" } },
        raleigh:  { type: "drive",      time: "2h 47m, 116 mi",                         summary: "Personal auto is best — 116 miles south, ~2h 47m.",                             details: "Raleigh is close enough to Roanoke that surface transport via a 116-mile drive taking roughly 2 hours and 47 minutes is the most efficient methodology. Flight options from ROA to RDU involve at least one connection and typically add 3+ hours of total transit time versus the direct drive, making the personal auto the unambiguous optimal choice.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    source: { name: "Google Flights / Rome2Rio (2026)",                                  url: "https://www.rome2rio.com" } },
        dfw:      { type: "upcoming",   time: "~3h 16m",         fare: "~$349",          note: "Starting June 2026",  summary: "AA nonstop starts June 2026 — 3h 16m, from ~$349.",  details: "The most significant upcoming enhancement to Roanoke's network is the introduction of a direct, nonstop flight to Dallas-Fort Worth (DFW) operated by American Airlines, scheduled to commence in June 2026. This new 1,009-mile nonstop route will drastically reduce the friction of westbound travel, taking approximately 3 hours and 16 minutes with base economy fares starting around $349. Prior to June 2026, DFW requires connecting through eastern hubs.",                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "Roanoke-Blacksburg Regional Airport / American Airlines",           url: "https://flyroa.com/american-airlines-announces-new-nonstop-service-roa-dallas-fort-worth" } },
        dc:       { type: "amtrak",     time: "5h 5m",           fare: "from $21",      summary: "Amtrak NE Regional — 5h 5m, from $21. Highly practical surface option.",         details: "Amtrak operates the Northeast Regional line directly out of the Roanoke station (RNK), providing a one-seat ride into Washington D.C.'s Union Station over a 194-mile journey taking roughly 5 hours and 5 minutes, with baseline fares as low as $21. This makes Roanoke one of few cities in this comparison with a practical, low-cost rail link to the nation's capital. Connecting flights also exist via IAD, but the Amtrak option is often competitive on total trip time once airport friction is factored in.",                                                                                                                                                                                                                                                                                                                                                                                   source: { name: "Wanderu / Amtrak (2026)",                                           url: "https://www.wanderu.com/en-us/train/us-va/roanoke/us-dc/washington/" } },
        richmond: { type: "amtrak",                                                      summary: "Amtrak NE Regional stops in Richmond en route to D.C.",                         details: "The Amtrak Northeast Regional departing Roanoke station (RNK) stops at Richmond's Staples Mill Road and Main Street stations before continuing north to D.C. Richmond is approximately 3 hours by Amtrak from Roanoke, or about 2.5 hours by personal auto via I-81 to I-64 East.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "Amtrak Northeast Regional",                                         url: "https://www.amtrak.com/northeast-regional-train" } },
        nyc:      { type: "mixed",                                                       summary: "Nonstop to LGA (AA, Delta); Amtrak to Penn Station ~12.5h total.",               details: "For aviation, Roanoke provides direct, nonstop flights to New York City via LaGuardia Airport (LGA) on American and Delta, averaging 53 scheduled departures per month. Flight time is approximately 1.5–2 hours. The Amtrak Northeast Regional also connects Roanoke to NYC's Moynihan Train Hall at Penn Station, though the total journey stretches to roughly 12.5 hours, making it far less time-competitive for NYC than for D.C. For NYC travel, the nonstop flight is typically preferred.",                                                                                                                                                                                                                                                                                                                                                                                                 source: { name: "FlightsFrom.com (ROA) / Amtrak (2026)",                             url: "https://www.flightsfrom.com/ROA" } },
        sna:      { type: "connecting", time: "~6h 27m (1 stop)", fare: "$287–$417 RT",   summary: "Connecting flights required via major legacy hubs.",                             details: "Accessing John Wayne Airport (SNA) in Orange County from Roanoke requires navigating transcontinental connections via United or American through hubs like Charlotte, Atlanta, or Chicago. No direct service exists. Total transit times typically run 6–9+ hours.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            source: { name: "United Airlines (2026)",                                            url: "https://www.united.com/en-us/flights-from-roanoke-to-orange-county" } },
        mco:      { type: "mixed",  time: "~26h (Amtrak via Richmond)", fare: "~$147 OW (Amtrak) / ~$218 (flight)", note: "Allegiant SFB nonstop ends Aug 2026",  summary: "Allegiant nonstop to Orlando Sanford (SFB) through Aug 2026; Amtrak ~26h via Richmond (~$147 OW); connecting flights to MCO (~$218).", details: "Roanoke offers a direct, nonstop flight to Orlando Sanford (SFB) via Allegiant Air, though scheduled data indicates this route may terminate in August 2026. Standard connecting flights to the primary Orlando International Airport (MCO) average $218 one-way. For surface transit, Amtrak operates a routing from Roanoke to Orlando that consumes 27 hours and 50 minutes at a cost of $199.",                                                                                                                                                                                                                                                                                                                                                                                                                                              source: { name: "FlightsFrom.com (ROA) / Expedia (2026)",                            url: "https://www.expedia.com/lp/flights/roa/mco/roanoke-to-orlando" } },
        crp:      { type: "connecting", time: "~6h 3m (1 stop)", fare: "$379–$439 RT",   summary: "Connecting flights required via DFW or IAH.",                                   details: "Corpus Christi (CRP) from Roanoke requires routing through DFW or Houston Intercontinental (IAH) on American or United. No direct service exists. The upcoming June 2026 ROA→DFW nonstop will improve this connection by eliminating one hop for Corpus Christi-bound travelers.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "American Airlines (2026)",                                          url: "https://www.aa.com/en-us/flights-to-corpus-christi" } },
        sfo:      { type: "connecting",                           fare: "$244 OW · $314+ RT",     summary: "Connecting flights required — typically via United hubs (ORD or IAD).",          details: "Reaching San Francisco from Roanoke requires a layover, typically through United's hubs in Chicago (ORD) or Dulles (IAD), or via American Airlines. Fares exhibit high variability but baseline around $244 to $314 for economy. Total transit times typically run 6–9 hours.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "Expedia / United Airlines (2026)",                                  url: "https://www.expedia.com/lp/flights/roa/sfo/roanoke-to-san-francisco" } },
        anc:      { type: "connecting", time: "~10h 30m (1 stop)", fare: "$599–$695 RT",  summary: "Complex multi-hub routing required — 11 to 20+ hours.",                          details: "Traveling from Roanoke to Anchorage (ANC) involves complex, multi-hub routing across Delta, American, or United/Alaska codeshares. Total travel times range from a highly optimized 11 hours to grueling 20+ hour journeys involving two or three stops.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "FlightConnections (2026)",                                          url: "https://www.flightconnections.com/flights-from-roanoke-roa" } },
        fai:      { type: "connecting", time: "11–33h",           fare: "~$213",         summary: "Highly complex routing — 11 to 33+ hours via 2–3 connections, ~$213.",           details: "Traveling from Roanoke to Fairbanks (FAI) requires complex, multi-hub routing across Delta, American, or United/Alaska codeshares. Total travel times range from a highly optimized 11 hours to grueling 33-hour journeys involving two or three stops, with base pricing around $213 one-way. This routing typifies the most severe logistical penalty of originating at a regional spoke.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "FlightConnections / Trip.com (2026)",                               url: "https://www.flightconnections.com/flights-from-roanoke-roa" } },
        tokyo:    { type: "connecting", time: "15h 52m–19h",      fare: "~$1,167 RT",   summary: "Connecting via ORD, LGA, or DFW — 15 to 19 hours total, ~$1,167 RT.",           details: "International travel from Roanoke to Japan (NRT or HND) forces a connection through LGA, ORD, or DFW. Total travel time stretches from a highly optimized 15 hours and 52 minutes to upwards of 19 hours, with base return airfares commonly logging around $1,167 to $1,223. This is the clearest illustration of the structural cost of originating at a regional spoke for intercontinental travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "FlightConnections (ROA→NRT) (2026)",                                url: "https://www.flightconnections.com/flights-from-roa-to-nrt" } },
        rome:     { type: "connecting", time: "~15–19h (1 stop)", fare: "$457–$660 RT",   summary: "Connecting flights required via major East Coast international gateways.",       details: "Traveling from Roanoke to Rome Fiumicino (FCO) requires a transatlantic connection via an eastern seaboard gateway — typically JFK, EWR, or IAD — before the transatlantic leg. No direct service exists from ROA to any European city.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 source: { name: "Expedia (2026)",                                                    url: "https://www.expedia.com/lp/flights/roa/tyo/roanoke-to-tokyo" } }
      },
      waldorf: {
        roanoke:  { type: "amtrak",     time: "~6h 15m (bus + Amtrak)", fare: "from $21", summary: "Amtrak NE Regional from Union Station; or drive via I-81/US-29.",               details: "From Waldorf, reaching Roanoke is most efficiently done by driving the I-81 or US-29 corridors (approximately 100 miles, 1.5–2 hours in off-peak traffic), or via the Amtrak Northeast Regional departing from Union Station in D.C. (requires bus or taxi to Union Station first — 1h 10m, $4–$7 via MTA bus).",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            source: { name: "Amtrak / Rome2Rio (2026)",                                          url: "https://www.amtrak.com/northeast-regional-train" } },
        waldorf:  { type: "self" },
        denver:   { type: "direct",    time: "~3h 21m (IAD)",                            summary: "Nonstop via United, Frontier, and Southwest from DCA/IAD/BWI.",                 details: "Once Waldorf residents navigate ground transport to DCA, IAD, or BWI, direct nonstop flights to Denver operate on United, Frontier, and Southwest. Multi-carrier competition keeps fares competitive. Ground access from Waldorf to airports typically requires 60–120 minutes via MTA bus + Metro ($4–7 to DCA) or black car service ($158–$240 depending on airport).",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "FlightsFrom.com (DCA) (2026)",                                      url: "https://www.flightsfrom.com/DCA" } },
        slc:      { type: "direct",                                                      summary: "Nonstop via Delta from DCA and IAD.",                                           details: "Direct, nonstop flights to Salt Lake City operate via Delta Air Lines from DCA and IAD. The D.C. airport triad's strong Delta presence ensures reliable frequency for SLC travel, though the ground access friction from Waldorf remains the primary planning variable.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "FlightsFrom.com (DCA) (2026)",                                      url: "https://www.flightsfrom.com/DCA" } },
        raleigh:  { type: "direct",    time: "~1h 18m",          fare: "$153–$191 RT",   summary: "Nonstop via AA, Delta, Southwest, United — highly competitive.",                 details: "Direct, nonstop flights to Raleigh-Durham are available via American, Delta, Southwest, and United from the D.C. airport triad. Intense multi-carrier competition keeps fares low. The drive from Waldorf to RDU is also feasible at approximately 3.5–4 hours, bypassing airport friction for those who prefer it.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "FlightsFrom.com (DCA) (2026)",                                      url: "https://www.flightsfrom.com/DCA" } },
        dfw:      { type: "direct",                                                      summary: "Nonstop via AA, Delta, and Southwest to DFW/DAL.",                              details: "Direct, nonstop service to Dallas is available via American, Delta, and Southwest to both DFW and Dallas Love Field (DAL) from the D.C. airport triad. The multi-carrier environment ensures continuous daily service with competitive pricing.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "FlightsFrom.com (DCA) (2026)",                                      url: "https://www.flightsfrom.com/DCA" } },
        dc:       { type: "amtrak",     time: "1h 10m",           fare: "$4–$7",         summary: "MTA bus to Union Station — 1h 10m, $4. Or taxi 37 min, $70–$90.",               details: "Reaching downtown Washington D.C. (Union Station) from Waldorf can be accomplished via the Maryland Transit (MTA) bus from the St. Charles Mall or US 301 Park & Ride, taking 1 hour and 10 minutes at a cost of $4 to $5. Private taxis execute the 24-mile drive in 37 minutes at $70 to $90. This is one of the more functional ground transit connections in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "Rome2Rio / MTA Maryland (2026)",                                    url: "https://www.rome2rio.com/s/Waldorf/Union-Station-DC-USA" } },
        richmond: { type: "drive",      time: "2h 52m, 129 mi",                         summary: "Personal auto — 129 miles via I-95 South, ~2h 52m.",                           details: "Driving south from Waldorf to Richmond covers 129 miles via I-95 South and takes approximately 2 hours and 52 minutes in moderate traffic. Amtrak options from D.C.'s Union Station to Richmond are also available via the Northeast Regional for those who prefer rail travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "Rome2Rio (2026)",                                                   url: "https://www.rome2rio.com/s/Waldorf/Richmond-VA-USA" } },
        nyc:      { type: "mixed",                                                       summary: "Nonstop to JFK/EWR/LGA from DCA/IAD/BWI; Amtrak Acela ~3h from D.C.",          details: "From the D.C. airport triad, direct nonstop flights to New York City serve JFK, EWR, and LGA across multiple carriers. Waldorf residents can also leverage the Amtrak Acela high-speed service from Union Station (accessible via MTA bus) to Penn Station, providing a ~3-hour city-center-to-city-center alternative for those who prefer to skip airport friction.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   source: { name: "FlightsFrom.com (DCA) / Amtrak (2026)",                             url: "https://www.flightsfrom.com/DCA" } },
        sna:      { type: "connecting", fare: "~$106 OW (DCA)",                          summary: "Connecting via DCA; ~$106 one-way.",                        details: "Waldorf residents have access to direct, nonstop flights to Orange County via Southwest Airlines from Baltimore/Washington (BWI). Legacy flight options to SNA often require connections or use Dulles (IAD) with varying availability. BWI, despite being the most distant of the three airports, offers cost-competitive fares due to Southwest's dominance.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              source: { name: "Southwest Airlines / FlightsFrom.com (BWI) (2026)",                 url: "https://www.southwest.com/en/flights/flights-from-baltimore" } },
        mco:      { type: "direct",                                                      summary: "Nonstop from DCA, IAD, and BWI — extensive options.",                           details: "Direct, nonstop flights to Orlando International (MCO) saturate the market from all three D.C. airports — DCA, IAD, and BWI. Multiple carriers and high frequency ensure competitive pricing and scheduling flexibility for Orlando travel from the Waldorf area.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "FlightsFrom.com (DCA) (2026)",                                      url: "https://www.flightsfrom.com/DCA" } },
        crp:      { type: "connecting",                                                  summary: "Connecting flights required — via DFW or IAH.",                                 details: "Reaching Corpus Christi from Waldorf/D.C. requires routing through Houston (IAH) or Dallas (DFW) hubs on United, American, or Southwest. No direct D.C.-to-CRP service exists.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "FlightConnections (2026)",                                          url: "https://www.flightconnections.com/flights-to-corpus-christi-crp" } },
        sfo:      { type: "direct",     time: "6h 20m (DCA)",                           summary: "Nonstop via Alaska (DCA, 6h 20m) and United (IAD).",                            details: "DCA operates unique perimeter-rule-exempt direct nonstop flights to SFO via Alaska Airlines, bridging the 2,436 miles in approximately 6 hours and 20 minutes. IAD serves as a massive transcontinental fortress for United Airlines, offering heavy direct nonstop frequency to SFO as well. Waldorf residents have two nonstop options to San Francisco.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "FlightConnections (IAD/DCA) (2026)",                                url: "https://www.flightconnections.com/flights-from-washington-dca" } },
        anc:      { type: "seasonal",   time: "7h 38m",                                 summary: "United seasonal nonstop from IAD — 7h 38m (3,346 miles).",                      details: "United Airlines operates a seasonal direct, nonstop flight from Dulles (IAD) to Anchorage (ANC), traversing the 3,346-mile distance in a highly efficient 7 hours and 38 minutes. Without this direct link during off-season periods, Waldorf/D.C. residents must endure connecting flights averaging over 9 hours.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "FlightConnections (IAD→ANC) (2026)",                                url: "https://www.flightconnections.com/flights-from-iad-to-anc" } },
        fai:      { type: "connecting", time: "~9h 8m–9h 40m (1 stop)", fare: "$400–$501 RT",  summary: "Connecting flights required — via Seattle (SEA) or Chicago (ORD).",             details: "Fairbanks (FAI) is not accessible directly from any D.C. area airport. Passengers must connect through Seattle or Chicago, pushing travel times past 9 hours minimum.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "United Airlines (2026)",                                            url: "https://www.united.com/en-us/flights-from-washington-to-anchorage" } },
        tokyo:    { type: "direct",                                                      summary: "Nonstop to Tokyo Haneda (HND) via United and ANA from IAD.",                    details: "Dulles International Airport (IAD) provides Waldorf residents with supreme intercontinental access. IAD boasts direct, nonstop service to Tokyo Haneda (HND) via United Airlines and ANA, circumventing the need for West Coast layovers. This nonstop route is one of the most operationally significant intercontinental links in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    source: { name: "Dulles Airport Nonstop Destinations (2026)",                         url: "https://www.flydulles.com/nonstop-destinations" } },
        rome:     { type: "direct",                                                      summary: "Nonstop to Rome Fiumicino (FCO) via United and ITA Airways from IAD.",          details: "United and ITA Airways operate direct, nonstop flights linking IAD directly into Rome Fiumicino (FCO). Combined with the Tokyo nonstop, Waldorf/IAD residents have two of the most desirable intercontinental routes in this comparison available without a connection.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "Dulles Airport — Explore Europe (2026)",                             url: "https://www.flydulles.com/explore-europe" } }
      },
      denver: {
        roanoke:  { type: "connecting", time: "~5h 22m (1 stop)", fare: "$254–$471 RT",   summary: "Connecting flights via ORD or IAD required.",                                   details: "From Denver, accessing the regional spoke of Roanoke requires navigating a layover through a major eastern hub — typically Chicago (ORD) or Dulles (IAD). No direct service exists. The upcoming June 2026 AA nonstop is DFW→ROA, not DEN→ROA.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "Expedia (DEN→ROA) (2026)",                                          url: "https://www.expedia.com/lp/flights/roa/den/roanoke-to-denver" } },
        waldorf:  { type: "direct",                                                      summary: "Nonstop to IAD and DCA via United and Frontier.",                               details: "Direct, nonstop flights operate continuously from Denver to Washington D.C. via United to IAD and Frontier to DCA. Multiple daily departures ensure scheduling flexibility for D.C.-area business or personal travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "Google Flights (DEN) (2026)",                                       url: "https://www.google.com/travel/flights/flights-from-denver.html" } },
        denver:   { type: "self" },
        slc:      { type: "direct",     time: "~1h 30m",                                summary: "Nonstop via Southwest, Delta, Frontier, United — ~1h 30m.",                     details: "As a centrally located mega-hub, Denver provides effortless direct connectivity to Salt Lake City via Southwest, Delta, Frontier, and United. The 1.5-hour flight is one of the most competitive routes in the Mountain West corridor, with intense LCC saturation driving fares to extraordinary lows.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   source: { name: "FlightsFrom.com (DEN) (2026)",                                      url: "https://www.flightsfrom.com/DEN" } },
        raleigh:  { type: "direct",     time: "~4h 10m",                                summary: "Nonstop via Frontier, United, Southwest — ~4h 10m.",                            details: "Direct, nonstop service to Raleigh from Denver operates on Frontier, United, and Southwest, taking roughly 4 hours and 10 minutes. The multi-carrier environment provides competitive pricing for this transcontinental corridor.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        source: { name: "Google Flights (DEN→RDU) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-raleigh.html" } },
        dfw:      { type: "direct",     time: "~2h 10m",                                summary: "Nonstop to DFW and DAL via AA, Frontier, United, Southwest — ~2h 10m.",         details: "Flights to Dallas from Denver operate directly to both DFW and DAL via American, Frontier, United, and Southwest, ensuring a continuous bridge to the Texas market with average flight times near 2 hours and 10 minutes.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "Denver International Airport Nonstop Routes (2026)",                url: "https://www.flydenver.com/nonstop-routes/" } },
        dc:       { type: "direct",                                                      summary: "Nonstop to IAD and DCA via United and Frontier.",                               details: "Denver provides direct, nonstop connectivity to Washington D.C. via United Airlines to IAD and Frontier to DCA. High frequency ensures availability for business travel into the capital region.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      source: { name: "Google Flights (DEN) (2026)",                                       url: "https://www.google.com/travel/flights/flights-from-denver.html" } },
        richmond: { type: "direct",    time: "~3h 10m",          fare: "$190–$248 RT",   summary: "Nonstop flights available to Richmond (RIC).",                                  details: "Denver provides direct, nonstop flights to Richmond International Airport (RIC) via legacy carriers. This provides convenient point-to-point access to the Richmond metro without routing through D.C.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "Denver International Airport Nonstop Routes (2026)",                url: "https://www.flydenver.com/nonstop-routes/" } },
        nyc:      { type: "direct",                                                      summary: "Nonstop to LGA, EWR, and JFK — intensely competitive pricing.",                 details: "Access to New York City from Denver is intensely competitive, with direct, nonstop service to JFK, LGA, and EWR. The multi-carrier LCC environment from DEN ensures some of the lowest transcontinental fares for New York travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "FlightsFrom.com (DEN) (2026)",                                      url: "https://www.flightsfrom.com/DEN" } },
        sna:      { type: "direct",                                                      summary: "Nonstop to Orange County (SNA) — bypasses LAX congestion.",                    details: "Denver provides vital direct, nonstop flights into Orange County (SNA), bypassing the congestion of LAX. SoCal connectivity from DEN is strong across multiple carriers and price points.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              source: { name: "FlightsFrom.com (DEN) (2026)",                                      url: "https://www.flightsfrom.com/DEN" } },
        mco:      { type: "direct",                               fare: "$97–$217 RT",   summary: "Nonstop via Frontier, Southwest, United — aggressively priced at $97–$217 RT.", details: "Denver's low-cost carrier dominance ensures the Orlando market is violently competitive. Direct, nonstop flights on Frontier, Southwest, and United drive round-trip prices to an astonishing $97 to $217 — among the lowest Orlando fares from any city in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              source: { name: "United Airlines / Skyscanner (DEN→MCO) (2026)",                     url: "https://www.united.com/en-us/flights-from-denver-to-orlando" } },
        crp:      { type: "connecting",                                                  summary: "Connecting flights required via Frontier, Southwest, or United through Texas hubs.", details: "Accessing Corpus Christi from Denver relies on connecting flights via Frontier, Southwest, or United through Texas hubs (DFW or IAH). No direct service exists.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "Google Flights (DEN→CRP) (2026)",                                   url: "https://www.google.com/travel/flights" } },
        sfo:      { type: "direct",                                                      summary: "Nonstop via United, Southwest, Frontier — high frequency, competitive.",        details: "As a centrally positioned western hub, Denver serves as a primary logistical funnel for SFO traffic. United Airlines, Southwest, and Frontier provide immense direct, nonstop capacity, driving down pricing structures and providing corporate travelers with high-frequency scheduling flexibility throughout the business day.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           source: { name: "FlightsFrom.com (DEN) (2026)",                                      url: "https://www.flightsfrom.com/DEN" } },
        anc:      { type: "direct",     time: "5h 34m",                                 summary: "Nonstop via United — 5h 34m. One of only two subject cities with ANC nonstop.",  details: "Denver emerges as a premier logistical launchpad for Arctic operations. United Airlines capitalizes on its Denver hub to operate a direct, nonstop flight to Anchorage (ANC) in 5 hours and 34 minutes. The ability to bypass West Coast hubs entirely makes Denver a supreme asset for high-latitude transit.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           source: { name: "Google Flights (DEN→ANC) (2026)",                                   url: "https://www.google.com/travel/flights/flights-to-anchorage.html" } },
        fai:      { type: "direct",     time: "5h 35m",                                 summary: "Nonstop via United — 5h 35m. Denver is the ONLY subject city with a Fairbanks nonstop.", details: "Denver is uniquely positioned as the only subject city offering a direct, nonstop flight to Fairbanks (FAI). United Airlines operates this route, covering 2,423 miles in 5 hours and 35 minutes. No other city in this comparison — not DFW, not SLC, not Raleigh — can reach Fairbanks without a connection.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "FlightConnections (DEN→FAI) (2026)",                                url: "https://www.flightconnections.com/flights-from-den-to-fai" } },
        tokyo:    { type: "direct",    time: "~11h 50m",          fare: "$949–$1,102 RT", summary: "Nonstop to Tokyo Narita (NRT) via United — ~11h 50m, $949–$1,102 RT.",                          details: "Denver utilizes United Airlines' transpacific footprint to offer a direct, nonstop flight to Tokyo Narita (NRT). Average round-trip costs run near $949, with business class near $4,439. This nonstop eliminates the need for a West Coast staging city and makes Denver one of the most internationally accessible hubs in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "Google Flights (DEN→TYO) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-denver-to-tokyo.html" } },
        rome:     { type: "upcoming",   time: "10h 35m",          fare: "~$642 RT",      note: "United nonstop starts May 2026",  summary: "United nonstop to Rome FCO — 10h 35m, ~$642 RT. Starting May 2026.", details: "Recognizing massive unserved transatlantic demand, United Airlines is inaugurating direct, nonstop flights from Denver to Rome Fiumicino (FCO) starting in May 2025/2026. This 10-hour, 35-minute flight eliminates the need for East Coast layovers, with introductory pricing as low as $642 round-trip. Denver will be one of very few non-coastal U.S. cities with a direct Rome service.",                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "Denver International Airport Press Release (2026)",                  url: "https://www.flydenver.com/press-release/denver-international-airport-closes-out-the-year-with-new-route-offerings/" } }
      },
      slc: {
        roanoke:  { type: "connecting",                                                  summary: "Connecting flights via major eastern hubs required.",                            details: "Like Denver, accessing the regional spoke of Roanoke from Salt Lake City requires navigating a layover through a major eastern hub — typically Charlotte (CLT), Atlanta (ATL), or Chicago (ORD). No direct service exists.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "Google Flights (2026)",                                             url: "https://www.google.com/travel/flights" } },
        waldorf:  { type: "direct",                                                      summary: "Nonstop to DCA and IAD via Delta.",                                             details: "Salt Lake City provides direct, nonstop service to Washington D.C. via Delta Air Lines, serving both DCA and IAD. Delta's hub dominance at SLC ensures reliable, high-frequency service to the capital region.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "SLC Airport Flight Schedule (2026)",                                url: "https://slcairport.com/airlines-flights/flight-schedule/" } },
        denver:   { type: "direct",     time: "~1h 30m",                                summary: "Nonstop via Delta, Frontier, Southwest, United — ~1h 30m.",                     details: "Direct, nonstop flights are scheduled to Denver from SLC via multiple carriers. The 1.5-hour flight is a high-frequency corridor in the Mountain West.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              source: { name: "FlightsFrom.com (DEN) (2026)",                                      url: "https://www.flightsfrom.com/DEN" } },
        slc:      { type: "self" },
        raleigh:  { type: "direct",     time: "~4h 15m",                                summary: "Nonstop via Delta Air Lines — ~4h 15m.",                                        details: "Direct, nonstop flights to Raleigh from Salt Lake City operate primarily via Delta Air Lines, taking roughly 4 hours and 15 minutes. Delta's hub control at SLC ensures availability, though Delta yield premiums may mean fares are higher than multi-carrier markets.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        dfw:      { type: "direct",     time: "~2h 45m",                                summary: "Nonstop via AA and Delta — ~2h 45m.",                                           details: "Direct, nonstop service to Dallas from Salt Lake City operates heavily on American Airlines and Delta Air Lines to DFW, with typical flight times approaching 2 hours and 45 minutes.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        dc:       { type: "direct",                                                      summary: "Nonstop to DCA and IAD via Delta.",                                             details: "Salt Lake City provides efficient transcontinental routing to Washington D.C., primarily driven by Delta Air Lines. Direct, nonstop service operates into both DCA and IAD.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           source: { name: "SLC Airport Flight Schedule (2026)",                                url: "https://slcairport.com/airlines-flights/flight-schedule/" } },
        richmond: { type: "connecting", time: "~5h 30m (1 stop)", fare: "$211–$279 RT",   summary: "Connecting flights to Richmond (RIC) — ~5h 30m.",                              details: "SLC to Richmond (RIC) requires a connecting flight, typically routing through a southern or mid-Atlantic hub. Travel time is approximately 5h 30m with fares averaging $211–$279 round-trip.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "FlightConnections (SLC) (2026)",                                    url: "https://www.flightconnections.com/flights-from-salt-lake-city-slc" } },
        nyc:      { type: "direct",    time: "~4h 28m–6h 30m",   fare: "~$237 RT",       summary: "Nonstop to LGA, JFK, and EWR via Delta and others — ~$237 RT.",                            details: "Salt Lake City provides direct, nonstop service into all three New York City metro airports — LaGuardia (LGA), JFK, and Newark (EWR) — primarily driven by Delta's hub operations. Competitive pricing exists despite Delta's dominant market position.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "FlightConnections (SLC) (2026)",                                    url: "https://www.flightconnections.com/flights-from-salt-lake-city-slc" } },
        sna:      { type: "direct",     time: "1h 24m",           fare: "~$140 RT",      summary: "Nonstop via 7 carriers — 1h 24m, ~$140 RT. Best SoCal access in the comparison.", details: "Due to geographic proximity, Salt Lake City exercises total supremacy in accessing Southern California. Direct, nonstop flights from SLC to Orange County (SNA) are operated by Alaska, American, Delta, Frontier, Hawaiian, Southwest, and United — seven carriers. The 587-mile flight averages 1 hour and 24 minutes, with round-trip pricing aggressively positioned around $140. This is the most competitive West Coast short-haul market in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                        source: { name: "Expedia (SLC→SNA) (2026)",                                          url: "https://www.expedia.com/lp/flights/slc/sna/salt-lake-city-to-orange-county" } },
        mco:      { type: "direct",                                                      summary: "Nonstop to Orlando via Delta.",                                                 details: "Direct, nonstop flights to Orlando (MCO) are provided by Delta Air Lines from SLC. While Delta's yield management means pricing is less aggressive than DEN→MCO, the nonstop option eliminates connection time.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "FlightConnections (SLC) (2026)",                                    url: "https://www.flightconnections.com/flights-from-salt-lake-city-slc" } },
        crp:      { type: "connecting", time: "~6h 16m (1 stop)", fare: "$409–$463 RT",   summary: "Connecting flights required via Texas hubs — ~6h 16m.",                        details: "Corpus Christi from SLC requires connecting flights through Texas hubs (DFW or IAH). No direct service exists. Fares average $409–$463 RT.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   source: { name: "American Airlines (2026)",                                          url: "https://www.aa.com/en-us/flights-to-corpus-christi" } },
        sfo:      { type: "direct",                               fare: "from $187 RT",  summary: "9 daily nonstops via Delta and United — from $187 RT.",                         details: "SLC operates as an incredibly efficient staging ground for flights into San Francisco. Nine direct flights operate daily between the two cities on Delta and United, offering extremely aggressive pricing structures with return fares recorded as low as $187. The proximity and frequency make SFO one of SLC's strongest connectivity assets.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "Visit Salt Lake / Direct Flights (2026)",                           url: "https://www.visitsaltlake.com/meetings/why-salt-lake/easy-access/direct-flights/" } },
        anc:      { type: "direct",     time: "4h 59m",           fare: "~$363 RT",      summary: "Nonstop via Delta — 4h 59m, ~$363 RT (2,132 miles).",                           details: "Salt Lake City provides highly efficient direct flights to Anchorage via Delta Air Lines, capitalizing on its northern latitude to push the 2,132-mile flight under five hours (4 hours 59 minutes), with round-trip costs as low as $363. This is the shortest ANC flight time of any city in this comparison outside Denver.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           source: { name: "FlightsFrom.com (SLC→ANC) (2026)",                                  url: "https://www.flightsfrom.com/SLC-ANC" } },
        fai:      { type: "connecting", time: "8h 15m+",                                summary: "Connecting via SEA or PDX — 8h 15m+.",                                          details: "Unlike Denver, SLC currently lacks direct flights to Fairbanks. Passengers must connect through Seattle (SEA) or Portland (PDX), pushing travel times past 8 to 9 hours. This is SLC's only notable Alaska connectivity gap compared to Denver.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "Skyscanner (SLC→FAI) (2026)",                                       url: "https://www.skyscanner.com/routes/slc/fai/salt-lake-city-to-fairbanks-international.html" } },
        tokyo:    { type: "connecting", time: "~13h 46m (1 stop)", fare: "$657–$1,081 RT", summary: "Connecting via SEA or LAX — ~13h 46m, $657–$1,081 RT.",                                  details: "Surprisingly, given its geographic positioning, Salt Lake City does not currently offer direct flights to Tokyo. Travelers must connect through Delta's coastal hubs (Seattle or Los Angeles) or utilize codeshares with Alaska Airlines and Starlux. Despite the connection penalty, dynamic yield management keeps prices relatively competitive at $872–$1,030 round trip.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            source: { name: "Google Flights (SLC→TYO) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-salt-lake-city-to-tokyo.html" } },
        rome:     { type: "connecting", time: "13h 7m+",          fare: "~$807 RT",      summary: "Connecting via CDG or AMS — 13h 7m+, ~$807 RT.",                               details: "For Rome, SLC travelers must connect, typically routing through SkyTeam partners in Paris (CDG) or Amsterdam (AMS). These connections push travel times past 13 hours, with baseline fares around $807. SLC lacks any direct transatlantic service.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "Google Flights (SLC→ROM) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-salt-lake-city-to-rome.html" } }
      },
      raleigh: {
        roanoke:  { type: "drive",      time: "2h 47m, 116 mi",                         summary: "Personal auto — 116 miles, ~2h 47m. Best option by a wide margin.",             details: "From Raleigh, traveling to Roanoke is most efficiently done by personal auto — a 116-mile drive taking roughly 2 hours and 47 minutes across the Virginia/North Carolina border. Flight options from RDU to ROA require at least one connection and typically add 3+ hours of total transit time versus the direct drive.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               source: { name: "Google Flights / Rome2Rio (2026)",                                  url: "https://www.rome2rio.com" } },
        waldorf:  { type: "direct",    time: "~1h 18m",          fare: "$153–$191 RT",   summary: "Nonstop to DCA/IAD via multiple carriers — ~1h 18m.",                                     details: "From RDU, direct, nonstop flights to the D.C. area (DCA and IAD) are available across multiple carriers. The Research Triangle's rapidly expanding hub infrastructure ensures competitive pricing and frequent departures for D.C. travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        denver:   { type: "direct",                                                      summary: "Nonstop via Frontier, United, Southwest.",                                      details: "From RDU, traveling to Denver is accomplished with ease via direct, nonstop service on Frontier, United, and Southwest. The Amtrak option (Raleigh to Denver) takes a grueling 44 hours and 54 minutes at $255 and effectively eliminates surface transit as a viable tool for western travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        slc:      { type: "direct",                                                      summary: "Nonstop via Delta Air Lines.",                                                  details: "Direct, nonstop service to Salt Lake City operates from RDU via Delta Air Lines. Delta's bilateral hub relationship between RDU and SLC ensures reliable service for this transcontinental corridor.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        raleigh:  { type: "self" },
        dfw:      { type: "direct",    time: "~2h 41m",          fare: "$123–$133 RT",   summary: "Nonstop via AA, Frontier, and Spirit (NK) — ~2h 41m, $123–$133 RT.",                                    details: "Direct, nonstop flights to Dallas-Fort Worth operate from RDU via American Airlines, Frontier, and Spirit. The Amtrak alternative (Raleigh to Dallas) takes 48 hours and 6 minutes at $243 — firmly establishing air travel as the only viable option for DFW travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        dc:       { type: "mixed",      time: "Amtrak 5h 55m",    fare: "Amtrak $48",   summary: "Nonstop flights (DCA/IAD) + Amtrak Floridian/Carolinian (5h 55m, $48).",         details: "Raleigh's geographic proximity to the Mid-Atlantic corridor provides unmatched versatility for D.C. travel. RDU offers rapid direct, nonstop flights to DCA and IAD across a multitude of carriers. Furthermore, Raleigh is deeply integrated into the Amtrak network — the Floridian and Carolinian lines connect Raleigh's Union Station directly to Washington D.C. in as little as 5 hours and 55 minutes for $48.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                   source: { name: "Wanderu / RDU Airline Destinations (2026)",                         url: "https://www.wanderu.com/en-us/train/us-nc/raleigh/us-dc/washington/" } },
        richmond: { type: "mixed",      time: "Amtrak 3h 26m",    fare: "Amtrak $35",   summary: "Amtrak Floridian (3h 26m, $35) or drive (2h 33m).",                             details: "Travel to Richmond from Raleigh is highly expedient via the Amtrak Floridian, taking 3 hours and 26 minutes to reach the Staples Mill Road Station for $35. Driving is even faster at approximately 2 hours and 33 minutes via I-85 and I-95. Both are practical options.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "Wanderu / Rome2Rio (2026)",                                         url: "https://www.wanderu.com/en-us/train/us-nc/raleigh/us-va/richmond/" } },
        nyc:      { type: "direct",                                                      summary: "Nonstop to LGA, JFK, and EWR via AA, Delta, JetBlue, and Frontier.",            details: "RDU provides rapid direct, nonstop flights to New York City serving LGA, JFK, and EWR across a multitude of carriers including Delta, American, JetBlue, and Frontier. Raleigh's Eastern Seaboard position makes NYC travel straightforward.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        sna:      { type: "upcoming",  time: "~5h 23m (nonstop)", fare: "$97–$234 RT",    note: "Breeze Airways nonstop starts May 2026",  summary: "Breeze Airways nonstop starts May 2026 — ~5h 23m, $97–$234 RT.", details: "Raleigh's access to Orange County is undergoing a fundamental change. Historically, reaching SNA from RDU required connecting flights through hubs like Charlotte or Dallas, costing between $433 and $997 round-trip. This changes in May 2026 when Breeze Airways inaugurates direct, nonstop service from RDU to SNA — a highly anticipated addition to the Research Triangle's growing LCC footprint.",                                                                                                                                                                                                                                                                                                                                                                                                                                                    source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        mco:      { type: "direct",                                                      summary: "Nonstop via Breeze, Delta, Frontier, and Southwest.",                           details: "Raleigh has successfully developed an immense leisure pipeline to Orlando. Direct, nonstop flights operate across Breeze, Delta, Frontier, and Southwest, with strong multi-carrier competition keeping fares accessible.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                source: { name: "FlightsFrom.com (RDU) (2026)",                                      url: "https://www.flightsfrom.com/RDU" } },
        crp:      { type: "connecting", time: "~5h 48m (1 stop)", fare: "$193–$209 RT",   summary: "Connecting via Nashville (BNA) or Dallas — ~5h 48m, $193–$209 RT.",                        details: "Corpus Christi remains a connecting market from RDU, with Southwest routing passengers through Nashville (BNA) or Dallas for roughly $297 to $386. No direct service exists.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "Expedia (RDU→CRP) (2026)",                                          url: "https://www.expedia.com/lp/flights/rdu/crp/raleigh-to-corpus-christi" } },
        sfo:      { type: "direct",                                                      summary: "Nonstop via United Airlines — dedicated transcontinental link.",                details: "RDU has cultivated vital transcontinental links to support the Research Triangle's technology ecosystem. United Airlines operates a dedicated direct, nonstop flight bridging RDU directly into its SFO hub, ensuring high-yield corporate traffic bypasses mid-continent layovers.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        anc:      { type: "connecting",                                                  summary: "Connecting flights via ORD, DFW, or SEA required.",                             details: "Like Roanoke, RDU suffers from severe transcontinental penalty for Alaskan travel. Passengers must utilize lengthy, multi-leg journeys connecting through Chicago, Dallas, or Seattle. RDU completely lacks direct, nonstop capability to ANC.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          source: { name: "WRAL / RDU (2026)",                                                 url: "https://www.wral.com/lifestyle/travel/rdu-airport-80-nonstop-flights-2025/" } },
        fai:      { type: "connecting", time: "12.5–33h",                                summary: "Connecting flights — 12.5 to 33 hours total depending on routing.",             details: "Flights to Fairbanks from RDU take between 12.5 and 33 hours depending on the routing matrix chosen. RDU completely lacks direct, nonstop capability to FAI, and the multi-connection penalty is among the most severe in this comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "FlightConnections (RDU→FAI) (2026)",                                url: "https://www.flightconnections.com/flights-from-rdu-to-fai" } },
        tokyo:    { type: "connecting", time: "~19h 15m–20h 40m (1 stop)", fare: "$876–$948 RT",  summary: "Connecting via domestic hubs (DFW, ORD, EWR) — ~19–20h, $876–$948 RT.",                       details: "RDU lacks any direct, nonstop Asian service. Travel to Tokyo requires routing passengers backward through domestic hubs like DFW, ORD, or EWR prior to the transpacific leg. RDU is rapidly expanding transatlantic service (Paris, London, Frankfurt, Dublin), but Asia Pacific remains connection-dependent.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "Air France / RDU (2026)",                                           url: "https://wwws.airfrance.us/en-us/flights-from-raleigh" } },
        rome:     { type: "connecting", time: "~10h 36m (1 stop)", fare: "$594–$642 RT",   summary: "Connecting via European alliance gateways — ~10h 36m, $594–$642 RT.",           details: "RDU is rapidly expanding its transatlantic portfolio with direct flights to Paris, London, and Frankfurt, but lacks direct flights to Rome. Passengers must connect through European alliance gateways for FCO travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 source: { name: "Air France / RDU (2026)",                                           url: "https://wwws.airfrance.us/en-us/flights-from-raleigh" } }
      },
      dfw: {
        roanoke:  { type: "upcoming",   time: "~3h 16m",          fare: "~$349",         note: "American Airlines nonstop starts June 2026",  summary: "AA nonstop starts June 2026 — 3h 16m, ~$349.",  details: "Traveling from DFW to Roanoke currently requires a connecting flight, though this bottleneck will be permanently eliminated in June 2026 when American Airlines launches its direct, nonstop DFW→ROA route in roughly 3 hours and 16 minutes. This new route is the most significant near-term connectivity upgrade affecting the Roanoke relocation market.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        source: { name: "American Airlines / Roanoke-Blacksburg Regional Airport (2026)",    url: "https://flyroa.com/american-airlines-announces-new-nonstop-service-roa-dallas-fort-worth" } },
        waldorf:  { type: "direct",                                                      summary: "Nonstop to DCA and IAD via multiple carriers.",                                 details: "Dallas-Fort Worth provides direct, nonstop service to Washington D.C. via multiple carriers to both DCA and IAD. The extensive lift out of DFW ensures daily frequency for D.C. business travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        denver:   { type: "direct",                                                      summary: "Nonstop via AA, Frontier, United, Southwest — multiple daily options.",         details: "As the paramount hub in the southern United States, Dallas provides intense frequency and capacity to Denver via American Airlines from DFW and Southwest Airlines from DAL. The sheer volume of departures ensures flexibility for all schedules.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        slc:      { type: "direct",                                                      summary: "Nonstop via AA and Delta.",                                                     details: "Direct, nonstop service from DFW to Salt Lake City operates via American Airlines and Delta. Reliable daily service with legacy carrier frequency ensures SLC travel from the DFW metro is straightforward.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        raleigh:  { type: "direct",    time: "~2h 41m",          fare: "$123–$133 RT",   summary: "Nonstop via AA, Frontier, and Spirit — ~2h 41m, $123–$133 RT.",                 details: "Travelers from DFW benefit from continuous direct, nonstop flights to Raleigh-Durham via American Airlines, Frontier, and Spirit. DFW's massive scale ensures high-frequency service for this Southeast corridor.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     source: { name: "RDU Airline Destinations (2026)",                                   url: "https://www.rdu.com/airline-information/airline-destinations/" } },
        dfw:      { type: "self" },
        dc:       { type: "direct",                                                      summary: "Nonstop to DCA and IAD via multiple carriers.",                                 details: "Dallas-Fort Worth utilizes the massive scale of American Airlines to execute high-frequency operations into the Washington D.C. market, serving both DCA and IAD with direct, nonstop service.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        richmond: { type: "direct",                                                      summary: "Nonstop flights available to Richmond (RIC).",                                  details: "DFW provides direct, nonstop service to Richmond International Airport (RIC), making Virginia's second-largest metro directly accessible from the North Texas area.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        nyc:      { type: "direct",     time: "3h 31m",           fare: "from $33",      summary: "Nonstop to LGA, JFK, EWR — 3h 31m, fares from $33.",                           details: "Dallas-Fort Worth executes high-frequency, direct, nonstop operations into New York City with average flight times of 3 hours and 31 minutes and hyper-competitive pricing observed as low as $33 on low-cost entrants. This is among the most aggressively priced DFW routes in the comparison.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      source: { name: "Skyscanner (DFW→NYC) (2026)",                                       url: "https://www.skyscanner.com/routes/dfw/nyca/dallas-fort-worth-international-to-new-york.html" } },
        sna:      { type: "direct",     time: "2h 30m",           fare: "~$190 RT",      summary: "Nonstop via multiple carriers — 2h 30m, ~$190 RT.",                            details: "DFW provides immense direct, nonstop service to Orange County (SNA) via multiple carriers. The 2h 30m flight at approximately $190 RT makes SoCal travel from DFW highly accessible, second only to SLC's proximity advantage.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       source: { name: "Expedia (DFW→SNA) (2026)",                                          url: "https://www.expedia.com/lp/flights/dfw/sna/dallas-to-orange-county" } },
        mco:      { type: "direct",                                                      summary: "Nonstop to Orlando via multiple carriers.",                                     details: "DFW provides immense direct, nonstop service to Orlando International Airport (MCO) across virtually all major domestic carriers. Extensive daily frequency ensures scheduling flexibility for Florida leisure travel.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        crp:      { type: "direct",     time: "~1h",              fare: "$255–$500",     summary: "44 weekly AA nonstops from DFW + Southwest from DAL — only city with direct CRP service.", details: "Dallas acts as the primary conduit for all traffic flowing into Corpus Christi International Airport (CRP). DFW is the undisputed optimal origin, with American Airlines executing 44 weekly direct, nonstop flights taking merely one hour, with typical pricing straddling the $285 to $500 mark. Southwest operates intense, competing point-to-point service via Dallas Love Field (DAL) at $255–$450. DFW is the only subject city with direct Corpus Christi service.",                                                                                                                                                                                                                                                                                                                                                                                                        source: { name: "Google Flights (DFW→CRP) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-dallas-to-corpus-christi.html" } },
        sfo:      { type: "direct",                                                      summary: "Nonstop via AA from DFW and Southwest from DAL.",                              details: "Dallas-Fort Worth ensures SFO is heavily saturated with direct, nonstop lift from both American Airlines out of DFW and Southwest Airlines from DAL. Dual-airport access to SFO provides scheduling and fare flexibility.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                source: { name: "FlightsFrom.com (DFW) (2026)",                                      url: "https://www.flightsfrom.com/DFW" } },
        anc:      { type: "direct",     time: "6h 48m–7h 12m",                          summary: "Nonstop via American Airlines — 6h 48m to 7h 12m (3,054 miles).",              details: "DFW acts as a reliable long-haul gateway to Anchorage, operating direct, nonstop flights via American Airlines that take roughly 6 hours and 48 minutes to 7 hours and 12 minutes to traverse the 3,054 miles.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "FlightsFrom.com (DFW→ANC) (2026)",                                  url: "https://www.flightsfrom.com/DFW-ANC" } },
        fai:      { type: "connecting", time: "~8h 45m (1 stop)", fare: "$343–$360 RT",   summary: "Connecting via SLC or Minneapolis (MSP) — ~8h 45m, $343–$360 RT.",                            details: "Fairbanks (FAI) requires a connection from DFW, usually through Salt Lake City or Minneapolis, extending travel time to a minimum of 7 hours and 45 minutes.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         source: { name: "FlightConnections (DFW→FAI) (2026)",                                url: "https://www.flightconnections.com/flights-from-dfw-to-fai" } },
        tokyo:    { type: "direct",     time: "13h 5m",           fare: "$876–$920 RT",   summary: "Nonstop to Tokyo Haneda (HND) via AA and JAL — 13h 5m, $876–$920 RT.",                        details: "As a oneworld alliance nexus, DFW provides massive direct lift across the Pacific. American Airlines and Japan Airlines (JAL) execute direct, nonstop flights bridging DFW and Tokyo Haneda (HND) in approximately 13 hours and 5 minutes.",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            source: { name: "Trip.com (DFW→TYO) (2026)",                                         url: "https://www.trip.com/hot/flight-time-from-dallas-to-tokyo/" } },
        rome:     { type: "direct",                               fare: "$750–$1,850",   summary: "Nonstop via American Airlines — 7 weekly flights, ~$750–$1,850.",               details: "DFW offers reliable year-round and seasonal direct, nonstop lift to Rome Fiumicino (FCO) via American Airlines. Typical pricing for the Rome direct flights runs from $750 to $1,850. DFW is one of only two subject cities with a direct Rome connection (alongside Waldorf/IAD and the upcoming Denver FCO service).",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  source: { name: "Google Flights (DFW→ROM) (2026)",                                   url: "https://www.google.com/travel/flights/flights-from-dallas-to-rome.html" } }
      }
    },

    // Per-city hub profiles (Option C — hub profile cards)
    hubProfiles: {
      roanoke: {
        airportCode: "ROA",
        airportName: "Roanoke-Blacksburg Regional Airport",
        airportType: "Regional Spoke",
        btsFare: null,
        btsFareNote: "ROA not included in BTS top-100 airport index; aggregate fares elevated due to hub connection dependency and limited LCC competition",
        strengths: [
          "Amtrak NE Regional — one-seat ride to D.C. (5h 5m, from $21) and NYC",
          "Nonstop flights to NYC LaGuardia (AA, Delta)",
          "DFW nonstop launching June 2026 (AA, 3h 16m) — major westbound upgrade",
          "Orlando Sanford nonstop via Allegiant (through Aug 2026)"
        ],
        gaps: [
          "Nearly all westbound travel requires connecting flights",
          "No international nonstop access of any kind",
          "No LCC direct market saturation — structural fare premium",
          "Alaska and international cities require 11–33+ hours of connecting travel"
        ],
        summary: "ROA is a classic regional spoke with strong Amtrak integration and improving westbound reach. The June 2026 DFW nonstop is a significant upgrade, but structural connectivity limitations persist for most long-haul destinations.",
        details: "Roanoke Regional Airport (Woodrum Field) operates as a classic regional spoke within the U.S. aviation network. The macroeconomic disadvantage of originating at a regional spoke is the necessity of a two-segment journey for nearly all transcontinental and international travel, exposing travelers to increased delay vectors and higher algorithmic fare baselines due to the lack of low-cost carrier market saturation. The Amtrak Northeast Regional line is Roanoke's most underrated transit asset — providing a low-cost, one-seat ride to Washington D.C. and an alternative to the aviation friction-penalty for mid-Atlantic travel. The scheduled June 2026 DFW nonstop will be transformative for westward access, but Roanoke will remain structurally disadvantaged for international travel, Alaska, and West Coast routes for the foreseeable future."
      },
      waldorf: {
        airportCode: "DCA / IAD / BWI",
        airportName: "Washington D.C. Airport Triad",
        airportType: "Multi-Airport Metro (Hub Access)",
        btsFare: null,
        btsFareNote: "Per-airport BTS averages: DCA $374.49 · IAD $462.97 · BWI $364.51 — multi-airport competition keeps blended fares competitive; BWI/DCA significantly undercut IAD",
        strengths: [
          "Nonstop to all 5 subject cities",
          "Nonstop to NYC, San Francisco, Orange County, Orlando",
          "IAD: Nonstop to Tokyo Haneda (HND) via United and ANA",
          "IAD: Nonstop to Rome Fiumicino (FCO) via United and ITA Airways",
          "IAD: Seasonal United nonstop to Anchorage (7h 38m)",
          "MTA bus to D.C. for $4–$7 — lowest-cost urban transit in comparison"
        ],
        gaps: [
          "Severe ground access friction — $158–$240 by car service to airports",
          "Traffic corridors (I-95, I-495) add 90–120 min before departure in peak hours",
          "Fairbanks requires connecting flights",
          "No direct Corpus Christi service"
        ],
        summary: "Waldorf benefits from the D.C. triad's world-class international nonstop network — including Tokyo HND and Rome FCO via IAD — but exacts a severe ground access toll. Budget 90–120 minutes before any flight departure.",
        details: "Waldorf, located in Charles County, Maryland, functions as an exurb of the Washington D.C. MSA. The primary logistical hurdle is ground transportation friction. While the macroeconomic fares from the DCA/IAD/BWI triad are highly competitive due to intense multi-airport competition, the cost of accessing the terminals from Waldorf severely degrades the overall logistical efficiency. Accessing BWI averages $227 by black car service, or a complex MTA bus to Union Station to MARC or Amtrak routing. DCA via MTA bus + Metro costs $4–$7 but takes 71 minutes. Reaching Dulles (IAD) incurs $240 by black car. Once at the terminals, the connectivity is exceptional — direct nonstops are available to all subject cities, Tokyo HND via United/ANA, Rome FCO via United, seasonal Anchorage via United, and SFO via Alaska and United. The multi-airport structure requires residents to strategically select which airport to use based on destination and carrier availability."
      },
      denver: {
        airportCode: "DEN",
        airportName: "Denver International Airport",
        airportType: "Mega-Hub (United, Southwest, Frontier)",
        btsFare: "363.47",
        btsFareNote: "BTS avg $363.47 — one of the lowest in the U.S.; extreme LCC competition from United, Southwest, and Frontier",
        strengths: [
          "Nonstop to all 5 subject cities (including upcoming ROA nonstop via AA, June 2026)",
          "NYC, D.C., SFO, Orange County, Orlando — all nonstop",
          "Nonstop to ANC and FAI — only subject city with a Fairbanks nonstop",
          "Tokyo NRT nonstop via United (~$949 RT)",
          "Rome FCO nonstop via United starting May 2026 (~$642 RT)",
          "BTS avg fare $363.47 — lowest of all evaluated hubs",
          "A-Line commuter rail to downtown in ~37 min — zero airport friction"
        ],
        gaps: [
          "Corpus Christi requires connecting flights — only notable domestic gap",
          "I-70 ski traffic (unrelated to aviation but relevant for lifestyle planning)"
        ],
        summary: "DEN is the undisputed connectivity champion among evaluated cities — combining the lowest BTS average fares, unmatched domestic nonstop reach, and unique assets like Fairbanks and the upcoming Rome direct service.",
        details: "Denver International Airport (DEN) serves as a premier central-geography mega-hub and operates as a unique three-way competitive battleground between United Airlines, Southwest Airlines, and Frontier Airlines. This intense capacity saturation creates one of the most favorable macroeconomic pricing environments in the United States — the BTS average fare at DEN is $363.47, one of the most economical major hubs nationally. DEN provides nonstop service to every subject city in this comparison, all major domestic leisure markets, both Alaskan major airports (a unique capability in this group), Tokyo Narita via United, and the newly inaugurated Rome Fiumicino nonstop via United. The A-Line commuter rail provides a 37-minute, zero-friction link between downtown Denver and the terminal. By virtually every logistical metric, DEN is the superior relocation hub for frequent domestic and international travelers."
      },
      slc: {
        airportCode: "SLC",
        airportName: "Salt Lake City International Airport",
        airportType: "Fortress Hub (Delta Air Lines ~70% share)",
        btsFare: "450.03",
        btsFareNote: "BTS avg $450.03 — Delta fortress premium; meaningfully higher than DEN ($363.47) and RDU ($355.40)",
        strengths: [
          "Nonstop to all 5 subject cities",
          "Orange County (SNA): 7 carriers, 1h 24m, ~$140 RT — best SoCal access in comparison",
          "San Francisco: 9 daily nonstops via Delta and United, from $187 RT",
          "Anchorage: Nonstop via Delta, 4h 59m, ~$363 RT",
          "NYC (LGA, JFK, EWR) and D.C. (DCA, IAD) all nonstop",
          "Orlando nonstop via Delta",
          "Newly rebuilt $4.1B terminal (2024) — most modern facility in comparison",
          "15–20 min drive from downtown — minimal airport access friction"
        ],
        gaps: [
          "No Tokyo nonstop — must connect via SEA or LAX",
          "No Rome nonstop — must connect via European hubs (CDG or AMS)",
          "No Fairbanks nonstop — must connect via SEA or PDX",
          "Delta fortress premium limits fare competition compared to DEN or DFW",
          "No Corpus Christi direct service"
        ],
        summary: "SLC is a high-efficiency, high-reliability hub with exceptional domestic and West Coast nonstop reach. Its single strategic weakness is intercontinental access — no direct Asian or European routes currently exist.",
        details: "Salt Lake City International Airport (SLC) operates primarily as a highly efficient fortress hub for Delta Air Lines, which controls approximately 70% of total traffic. SLC ranks as the 22nd busiest airport in the United States and is lauded for its operational efficiency and minimal delay times. The macroeconomic trade-off for this efficiency is the yield premium exacted by Delta Air Lines, which limits the ultra-low-cost fare options prevalent in markets like Denver. SLC's West Coast connectivity is exceptional — 7 carriers to Orange County (SNA), 9 daily flights to SFO — and its proximity makes it the fastest Mountain West→SoCal corridor in this comparison. The 2024 terminal rebuild ($4.1 billion) produced one of the most efficiently designed, modern airport facilities in the country. The strategic gaps — no Tokyo, Rome, or Fairbanks nonstops — reflect Delta's hub prioritization toward eastern coast gateways rather than direct transpacific routing from SLC."
      },
      raleigh: {
        airportCode: "RDU",
        airportName: "Raleigh-Durham International Airport",
        airportType: "Focus City / Rapidly Expanding",
        btsFare: "355.40",
        btsFareNote: "BTS avg $355.40 — lowest of all evaluated airports; Breeze and Frontier expansion driving fares below even DEN",
        strengths: [
          "Nonstop to all 5 subject cities",
          "NYC (LGA, JFK, EWR) and D.C. (DCA, IAD) nonstop",
          "San Francisco nonstop via United",
          "Orlando nonstop via Breeze, Delta, Frontier, Southwest",
          "Orange County nonstop via Breeze starting May 2026",
          "Amtrak integration — D.C. from $48 (5h 55m), Richmond from $35 (3h 26m)",
          "87 destinations, 10 countries, 18 airlines — rapid expansion underway",
          "Transatlantic: Paris, London, Frankfurt nonstops established; Dublin upcoming"
        ],
        gaps: [
          "No Tokyo nonstop — requires domestic hub connection",
          "No Rome nonstop — must route via European gateways",
          "No Alaska nonstop (ANC or FAI)",
          "Corpus Christi connecting only (~$297–$386)",
          "International long-haul capacity significantly below DFW or Waldorf/IAD"
        ],
        summary: "RDU is a rapidly expanding focus city with the lowest BTS average fare ($355.40) of all evaluated airports. Excellent Amtrak integration, growing LCC presence, and strong domestic reach. Transcontinental and Asia Pacific routes are where gaps emerge.",
        details: "Raleigh-Durham International Airport (RDU) functions as a rapidly expanding focus city rather than a traditional mega-hub. Buoyed by the immense economic growth of the Research Triangle, RDU provides service to 87 destinations across 10 countries via 18 airlines. American Airlines and Delta Air Lines are the largest scheduled carriers, though the airport is undergoing significant capacity expansion from low-cost operators such as Breeze Airways and Frontier Airlines. RDU's Amtrak integration is its most distinctive asset relative to other airports in this comparison — the Carolinian and Floridian lines provide genuine, practical surface transit to D.C. and Richmond at a quality level unavailable from Denver, SLC, or DFW. Transatlantic expansion is accelerating: Paris, London, and Frankfurt nonstops are established, with Dublin upcoming. However, Asia Pacific remains entirely connection-dependent, and Alaska has no direct service."
      },
      dfw: {
        airportCode: "DFW + DAL",
        airportName: "Dallas-Fort Worth Int'l + Dallas Love Field",
        airportType: "Global Super-Hub + LCC Secondary (Southwest at DAL)",
        btsFare: "417.35",
        btsFareNote: "BTS avg $417.35 at DFW — AA fortress premium; Southwest at nearby DAL (10 min) provides significant LCC pressure on many domestic routes",
        strengths: [
          "Nonstop to all subject cities (ROA nonstop launching June 2026)",
          "Tokyo Haneda (HND) nonstop via AA and JAL — 13h 5m",
          "Rome Fiumicino (FCO) nonstop via AA — 7 weekly flights",
          "Anchorage nonstop via AA — 6h 48m to 7h 12m",
          "Orange County: 2h 30m nonstop, ~$190 RT",
          "NYC from $33 — most competitive transcontinental pricing in comparison",
          "Corpus Christi: 44 weekly AA nonstops (1h) — only city with direct CRP service",
          "271 global destinations — broadest international reach of any evaluated city",
          "Dual-airport structure: AA global reach at DFW + Southwest pricing at DAL"
        ],
        gaps: [
          "Fairbanks (FAI) requires connection via SLC or MSP",
          "AA fortress hub yield premium at DFW vs. LCC-saturated markets",
          "Roanoke nonstop pending until June 2026"
        ],
        summary: "DFW is the premier global hub in this comparison — unmatched international reach (Tokyo HND, Rome FCO), exclusive Alaska access, Corpus Christi exclusivity, and NYC from $33. The DFW+DAL dual-airport structure balances global AA reach with Southwest cost flexibility.",
        details: "Dallas-Fort Worth operates as a global super-hub. DFW International Airport is the primary headquarters and largest fortress hub for American Airlines, connecting to 271 destinations globally. The region also benefits from Dallas Love Field (DAL), a major Southwest Airlines base offering 73 unique market connections — just 10 minutes from downtown Dallas. The sheer volume of lift out of North Texas provides unparalleled logistical leverage. DFW is the only city in this comparison with a direct nonstop to Corpus Christi (44 weekly AA flights), to Tokyo Haneda via the AA-JAL partnership, and offers Rome Fiumicino nonstop via American Airlines. The upcoming June 2026 ROA nonstop will close the final gap in inter-subject-city connectivity. The primary trade-off versus DEN is fare structure: American Airlines' fortress hub yields a premium fare environment at DFW, partially mitigated by Southwest's competing service from DAL across most major domestic markets."
      }
    }
  }

};
