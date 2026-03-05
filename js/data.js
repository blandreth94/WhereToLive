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
        roanoke:  "Roanoke is exceptionally affordable — median home prices are approximately 22% below the national average, making it one of the most accessible markets for first-time buyers in the Eastern U.S.",
        waldorf:  "Waldorf's home values are entirely driven by Washington D.C. proximity. The high barrier to entry locks many residents into long-term renting, perpetuating wealth accumulation disadvantage.",
        denver:   "Denver's entry cost is punitive for median wage earners. Recent cooling has not fundamentally changed affordability dynamics, and appreciation cycles tend to be steep when activity resumes.",
        slc:      "Salt Lake City has experienced immense appreciation over the last decade, but remains slightly more accessible than Denver. The broader Utah market continues to outpace income growth.",
        raleigh:  "Raleigh maintains resilient values despite national corrections, fueled by continuous Research Triangle tech and pharma demand. A relatively balanced market compared to Mountain West peers.",
        dfw:      "DFW relies on high construction volumes to manage costs. Despite massive population growth, Dallas proper remains well below national median — one of the best values among large metros."
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
        denver:   "Denver has the most developed transit network among the evaluated cities, with an extensive light rail and commuter rail system (RTD). The FasTracks expansion has significantly improved suburban connectivity, though gaps remain.",
        slc:      "UTA's TRAX light rail is a genuine urban transit success story. Combined with the FrontRunner commuter rail linking Salt Lake City to Ogden (north) and Provo (south), the network provides real car-free or car-light commuting options.",
        raleigh:  "Raleigh lacks rail transit, relying entirely on buses. The GoRaleigh/GoTriangle network is functional but cannot compete with Western rail systems. A Bus Rapid Transit proposal has faced repeated delays. Car dependency is high.",
        dfw:      "DART's 13 light rail lines make it one of the largest light rail networks in the U.S. by route miles, but suburban density makes walking to stations impractical in much of the metro. Plano and nearby Collin County suburbs have meaningful DART access."
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
      description: "Key differentiators for outdoor recreation, skiing, BLM land access, aviation connectivity, and motorcycle culture.",
      source: {
        name: "Various — BLM.gov, Snowfeet, local tourism authorities",
        url: "https://www.blm.gov/visit"
      },
      values: {
        roanoke: {
          skiing:    "Wintergreen (3,514 ft) and Massanutten (2,881 ft) within 2–3 hours. East Coast skiing with artificial snowmaking.",
          blm:       "No BLM land in Virginia. Blue Ridge Parkway and George Washington National Forest provide regulated recreation.",
          aviation:  "ROA airport has limited direct routes; connections through Charlotte (CLT) or D.C. hubs for West Coast travel.",
          motorcycle: "Premium Blue Ridge Parkway and Appalachian access. Blue Ridge staging point for East Coast riding culture. Tail of the Dragon reachable in ~3 hours.",
          fullAnalysis: "Roanoke's lifestyle proposition is rooted in immediate, affordable access to East Coast Appalachian culture. The Blue Ridge Parkway runs along the city's western edge, offering some of the most scenic driving and cycling on the continent. Roanoke itself is exceptionally walkable by mid-sized city standards — the Roanoke Valley Greenway system, Mill Mountain with its iconic Star, and Downtown Market Square form a compact, highly livable urban core. East Coast skiing is available at Wintergreen (3,514 ft elevation, 26 trails) and Massanutten, both accessible within 2–3 hours — respectable for the region but operating on artificial snowmaking and dramatically outclassed by any Rocky Mountain resort. For aviation, ROA services connections through Charlotte (CLT) and D.C. hubs; West Coast travel requires 1–2 connections. Roanoke is celebrated as a staging point for legendary motorcycle routes: the Blue Ridge Parkway, Skyline Drive, and the Tail of the Dragon (US-129, 318 curves in 11 miles) are all within reach. Laconia Motorcycle Week in New Hampshire is a traditional rally circuit for East Coast riders. The city lacks BLM land but the George Washington & Jefferson National Forests provide 1.8 million acres of regulated backcountry access. Cultural amenities include the Taubman Museum of Art, a vibrant craft brewery scene, and the GO Outside Festival. The trade-off is lower economic velocity than growth metros and limited direct flight options."
        },
        waldorf: {
          skiing:    "Same East Coast options as Roanoke. D.C. hubs provide flight access to Western ski destinations.",
          blm:       "No BLM land in Maryland. Shenandoah National Park and Delaware Water Gap within driving range.",
          aviation:  "Exceptional: DCA, IAD, and BWI provide dense flight options. Severe traffic to reach airports from Charles County.",
          motorcycle: "Same Appalachian routes as Roanoke but much more painful logistics due to D.C. traffic corridor.",
          fullAnalysis: "Waldorf's lifestyle equation is dominated by two realities: exceptional access to Washington D.C.'s world-class cultural and institutional infrastructure, and the grinding logistical penalty of actually accessing any of it. The National Mall, Smithsonian, Kennedy Center, and every amenity of a global capital are within 30–40 miles — but those miles sit atop I-95 and US-301, two of the most chronically congested corridors in the eastern United States. The D.C. airport trifecta (DCA, IAD, BWI) provides unmatched domestic and international flight frequency, including direct service to every major West Coast hub and ski market — but accessing those airports from Charles County requires 45–75 minutes of traffic navigation on a good day. East Coast skiing is identical to Roanoke's options: Wisp, Whitetail, Massanutten within 2–3 hours. The Chesapeake Bay and Potomac River provide recreational boating and fishing culture distinct to the Mid-Atlantic. Shenandoah National Park and Great Falls are accessible day trips. Waldorf itself lacks a strong urban identity — it is a suburban bedroom community with commercial strip infrastructure, not a lifestyle destination. The primary draw is D.C.'s cultural gravity and the associated labor market, not Waldorf per se."
        },
        denver: {
          skiing:    "Breckenridge (2,908 acres, 187 trails), Vail, Keystone — 60–90 min via I-70. World-class, but I-70 weekend traffic is severe (90 min can become 3+ hours).",
          blm:       "Vast BLM access. Hardscrabble SRMA near Florence offers OHV/ATV zones. Millions of acres for dispersed camping throughout Colorado.",
          aviation:  "DEN is a United/Southwest/Frontier hub. Daily non-stop to LAX, SAN, SNA, ONT, BUR. Excellent SoCal connectivity.",
          motorcycle: "Four Corners Rally access. Million Dollar Highway (US-550). Incredible mountain riding with a short season due to altitude/weather.",
          fullAnalysis: "Denver's outdoor recreation proposition is genuinely world-class, though the logistics of accessing it have materially degraded as the city's population has surged. World-class skiing at Breckenridge (2,908 skiable acres, 187 trails), Vail, Keystone, Arapahoe Basin, and A-Basin is nominally 60–90 minutes via I-70 West — but weekend ski traffic is notorious, routinely turning that drive into 3–5 hours in peak season. The CDOT I-70 express lanes, Ski Train from Union Station to Winter Park, and staggered departure timing partially mitigate this but don't eliminate it. Denver's BLM access is vast: the Hardscrabble Special Recreation Management Area offers distinct OHV/ATV and dispersed camping zones, and the Rocky Mountain Arsenal National Wildlife Refuge sits adjacent to the city itself. Denver International Airport is a massive central U.S. hub serving as a primary base for United, Southwest, and Frontier — offering daily non-stop service to all targeted Southern California airports (LAX, SAN, SNA, ONT, BUR) and excellent national connectivity. Motorcycle culture is intense: the Four Corners Rally, the Million Dollar Highway (US-550 through Ouray), and hundreds of miles of high-altitude mountain roads define Colorado riding. The season is limited by alpine conditions (June–September at elevation) but the density of world-class routes compensates. The city's cultural fabric includes the Denver Art Museum, Colorado Symphony, Red Rocks Amphitheater (a genuinely unparalleled outdoor music venue), and one of the most active craft brewery scenes in the nation. The 300 days of sunshine is Denver's most cited quality-of-life attribute and it is legitimate — even heavy snowstorms are often followed by brilliant blue skies within 24 hours."
        },
        slc: {
          skiing:    "Best ski access in North America. Alta, Snowbird, Park City, Deer Valley — under 45 min from downtown. Sandy/Draper residents reach resorts in <30 min. World-famous light powder.",
          blm:       "Legendary BLM access. Millions of acres of Utah desert, canyonlands, and alpine terrain for dispersed camping and OHV just 1–2 hours south and west.",
          aviation:  "SLC is a Delta fortress hub. Daily non-stop to LAX, SNA, SAN. One of the most efficiently rebuilt modern airport terminals in the U.S.",
          motorcycle: "Year-round potential (valley floor); world-class mountain roads in summer. Canyon roads to ski resorts are exceptional for sport riding. BLM lands offer dirt/adventure riding.",
          fullAnalysis: "Salt Lake City offers arguably the highest outdoor recreation density per square mile of any major U.S. city. The combination of world-class alpine skiing, legendary BLM desert lands, and a compact, functional urban core creates a lifestyle proposition unmatched by any peer city in this comparison. Alta, Snowbird, Park City Mountain Resort, and Deer Valley are all within 45 minutes of downtown SLC — and for residents of Sandy or Draper, that drive shrinks below 30 minutes, completely bypassing the ski traffic constraints that plague Denver's I-70 corridor. The snow quality is world-famous: the 'Greatest Snow on Earth' moniker is not marketing — Alta and Snowbird average 500+ inches of ultra-light, low-density powder annually, creating conditions that other resorts spend millions trying to simulate artificially. Utah's BLM access is legendary. Millions of acres of desert, canyonlands, slot canyons, and alpine terrain for dispersed camping and OHV recreation lie just 1–2 hours south and west of SLC. Moab's slickrock trails, Goblin Valley, the San Rafael Swell, and the Bonneville Salt Flats are all within half a day's drive. SLC Airport is a Delta fortress hub with a recently completed $4.1 billion terminal overhaul — one of the most efficiently designed modern airport facilities in the country. Daily non-stop service to LAX, SNA, and SAN is routine. Motorcycle riding has a dual character: valley floor roads allow near-year-round riding, while the Wasatch canyon roads to ski resorts (Little Cottonwood Canyon, Big Cottonwood Canyon) are exceptional for sport riding in summer. BLM desert routes open an entirely separate discipline of adventure and dirt riding. The primary lifestyle trade-offs are the winter inversion events (trapped pollution in the valley for days at a time during stable atmospheric conditions) and the cultural homogeneity driven by the LDS community's predominance in Utah's social fabric."
        },
        raleigh: {
          skiing:    "Sugar Mountain, NC (~3 hours). Virginia ski resorts ~4 hours. No world-class skiing; requires flights to access Western mountains.",
          blm:       "No BLM land in North Carolina. National Forests (Pisgah, Nantahala) and State Parks provide regulated recreation.",
          aviation:  "RDU has direct flights to LAX (American, Delta). Secondary SoCal airports (SNA, BUR) typically require a layover via DFW, ATL, or CLT.",
          motorcycle: "Blue Ridge Parkway and Tail of the Dragon are accessible (3+ hours). NC hosts significant moto culture. Year-round riding season is excellent.",
          fullAnalysis: "Raleigh's lifestyle proposition is defined by an exceptional balance of Southern quality of life, intellectual and cultural depth from the Research Triangle universities, and a mild climate that extends outdoor living significantly beyond Northern peers. The city lacks the dramatic outdoor recreation infrastructure of the Mountain West — there is no alpine skiing within practical driving distance (Sugar Mountain, NC is 3 hours; mountain resorts in Virginia add another hour), and North Carolina's forests are regulated National Forest land, not the free-access BLM terrain of Colorado and Utah. However, the compensating advantages are meaningful: a 11-month riding season makes Raleigh one of the best motorcycle touring bases in the Eastern U.S. The Blue Ridge Parkway and Tail of the Dragon (US-129) are accessible 3+ hours west, and North Carolina's cycling and touring community is among the most active on the East Coast. The Research Triangle's cultural infrastructure is surprisingly robust for a non-coastal city: NC State, Duke, and UNC anchor a dense ecosystem of museums, performing arts, and professional sports (Carolina Hurricanes NHL, NC Courage NWSL). Raleigh's park system is actively improving — Dorothea Dix Park, a 308-acre former state hospital grounds being converted to a world-class urban park, is a major pending addition. RDU's aviation connectivity is solid for domestic travel: direct service to LAX via American and Delta, though secondary SoCal markets (SNA, BUR, ONT) typically require a connection through DFW, ATL, or CLT. The city's food and beer scene punches well above its size, and the combination of affordable housing and warm weather creates an exceptionally high quality-adjusted standard of living."
        },
        dfw: {
          skiing:    "Zero alpine skiing in Texas. Requires flying to DEN or SLC for winter sports.",
          blm:       "Minimal BLM land in Texas (primarily far west Texas near Big Bend). No meaningful dispersed camping near DFW.",
          aviation:  "DFW is an American Airlines global hub — best international and domestic connectivity evaluated. DAL (Love Field) is a Southwest hub for SAN, BUR, LAX. Unmatched SoCal frequency.",
          motorcycle: "12-month riding season is a major advantage. DFW terrain is flat; Hill Country (2 hours south) provides the best Texas riding. No helmet law adds to the riding freedom calculus.",
          fullAnalysis: "DFW's lifestyle equation is defined by logistical excellence and economic opportunity rather than natural environment. Texas has zero alpine skiing infrastructure — accessing the mountain West requires flying, though DFW's aviation dominance makes this practical. DFW International Airport is the American Airlines global hub and one of the busiest airports on earth, providing direct service to every domestic market and most international ones. Dallas Love Field (DAL) serves as a Southwest Airlines hub with direct service to SAN, BUR, and LAX, giving DFW metro residents effectively two major airport options for SoCal travel — the best aviation positioning in this comparison by a significant margin. BLM land in Texas is minimal and concentrated in far west Texas near Big Bend — not practically accessible for DFW residents. The Texas Hill Country (Austin/San Antonio region, ~2 hours south) provides the best natural terrain for riding, camping, and recreation near DFW. Motorcycle culture in Texas benefits enormously from the 12-month riding season — riders from Northern states frequently winter in Texas to maintain year-round saddle time. No state helmet law for adults 21+ adds to the calculus for riders who prefer that freedom. The DFW flat topography makes urban and suburban riding practical and low-stress, while the Hill Country's rolling limestone terrain and abundant live oak canopy provide an entirely different riding character on weekends. Culturally, DFW delivers exceptional professional sports density (Cowboys, Mavericks, Rangers, Stars, FC Dallas), a world-class culinary scene driven by the most diverse metro in Texas, and a cost structure that allows households to allocate capital toward experiences rather than housing overhead. The absence of state income tax meaningfully expands disposable income for lifestyle spending."
        }
      }
    }

  }

};
