"use strict";

console.log("WELCOME TO MY PERFECT DAY");

/* ---------------- CURRENCY LOOKUP ---------------- */
// Simple, non-exhaustive country -> currency map. Falls back to manual entry.
const currencyMap = {
  "pakistan": "Rs",
  "india": "₹",
  "bangladesh": "৳",
  "sri lanka": "Rs",
  "nepal": "Rs",
  "united states": "$",
  "usa": "$",
  "us": "$",
  "united kingdom": "£",
  "uk": "£",
  "canada": "$",
  "australia": "$",
  "new zealand": "$",
  "uae": "AED",
  "united arab emirates": "AED",
  "saudi arabia": "SAR",
  "qatar": "QAR",
  "kuwait": "KWD",
  "china": "¥",
  "japan": "¥",
  "south korea": "₩",
  "germany": "€",
  "france": "€",
  "italy": "€",
  "spain": "€",
  "netherlands": "€",
  "ireland": "€",
  "portugal": "€",
  "turkey": "₺",
  "russia": "₽",
  "brazil": "R$",
  "mexico": "$",
  "south africa": "R",
  "egypt": "E£",
  "indonesia": "Rp",
  "malaysia": "RM",
  "singapore": "$",
  "thailand": "฿",
  "philippines": "₱",
  "vietnam": "₫",
};

function guessCurrency(countryStr) {
  const key = countryStr.trim().toLowerCase();
  if (currencyMap[key]) return currencyMap[key];
  // partial match, e.g. "United States of America"
  const found = Object.keys(currencyMap).find((k) => key.includes(k));
  return found ? currencyMap[found] : "";
}

/* ---------------- COUNTRY -> ISO CODE (for search localization) ---------------- */
// The web_search tool's user_location.country needs a 2-letter ISO code,
// not a free-text country name, so we map the typed country to one.
// This covers all ISO 3166-1 countries plus common aliases/short names,
// so an unrecognized country no longer silently falls back to whatever
// location the request actually originates from.
const countryCodeMap = {
  "afghanistan": "AF", "albania": "AL", "algeria": "DZ", "andorra": "AD",
  "angola": "AO", "antigua and barbuda": "AG", "argentina": "AR", "armenia": "AM",
  "australia": "AU", "austria": "AT", "azerbaijan": "AZ", "bahamas": "BS",
  "bahrain": "BH", "bangladesh": "BD", "barbados": "BB", "belarus": "BY",
  "belgium": "BE", "belize": "BZ", "benin": "BJ", "bhutan": "BT",
  "bolivia": "BO", "bosnia and herzegovina": "BA", "bosnia": "BA", "botswana": "BW",
  "brazil": "BR", "brunei": "BN", "bulgaria": "BG", "burkina faso": "BF",
  "burundi": "BI", "cabo verde": "CV", "cape verde": "CV", "cambodia": "KH",
  "cameroon": "CM", "canada": "CA", "central african republic": "CF", "chad": "TD",
  "chile": "CL", "china": "CN", "colombia": "CO", "comoros": "KM",
  "congo": "CG", "democratic republic of the congo": "CD", "dr congo": "CD",
  "costa rica": "CR", "croatia": "HR", "cuba": "CU", "cyprus": "CY",
  "czech republic": "CZ", "czechia": "CZ", "denmark": "DK", "djibouti": "DJ",
  "dominica": "DM", "dominican republic": "DO", "east timor": "TL", "timor-leste": "TL",
  "ecuador": "EC", "egypt": "EG", "el salvador": "SV", "equatorial guinea": "GQ",
  "eritrea": "ER", "estonia": "EE", "eswatini": "SZ", "swaziland": "SZ",
  "ethiopia": "ET", "fiji": "FJ", "finland": "FI", "france": "FR",
  "gabon": "GA", "gambia": "GM", "georgia": "GE", "germany": "DE",
  "ghana": "GH", "greece": "GR", "grenada": "GD", "guatemala": "GT",
  "guinea": "GN", "guinea-bissau": "GW", "guyana": "GY", "haiti": "HT",
  "honduras": "HN", "hong kong": "HK", "hungary": "HU", "iceland": "IS",
  "india": "IN", "indonesia": "ID", "iran": "IR", "iraq": "IQ",
  "ireland": "IE", "israel": "IL", "italy": "IT", "ivory coast": "CI",
  "cote d'ivoire": "CI", "jamaica": "JM", "japan": "JP", "jordan": "JO",
  "kazakhstan": "KZ", "kenya": "KE", "kiribati": "KI", "kosovo": "XK",
  "kuwait": "KW", "kyrgyzstan": "KG", "laos": "LA", "latvia": "LV",
  "lebanon": "LB", "lesotho": "LS", "liberia": "LR", "libya": "LY",
  "liechtenstein": "LI", "lithuania": "LT", "luxembourg": "LU", "macau": "MO",
  "madagascar": "MG", "malawi": "MW", "malaysia": "MY", "maldives": "MV",
  "mali": "ML", "malta": "MT", "marshall islands": "MH", "mauritania": "MR",
  "mauritius": "MU", "mexico": "MX", "micronesia": "FM", "moldova": "MD",
  "monaco": "MC", "mongolia": "MN", "montenegro": "ME", "morocco": "MA",
  "mozambique": "MZ", "myanmar": "MM", "burma": "MM", "namibia": "NA",
  "nauru": "NR", "nepal": "NP", "netherlands": "NL", "new zealand": "NZ",
  "nicaragua": "NI", "niger": "NE", "nigeria": "NG", "north korea": "KP",
  "north macedonia": "MK", "macedonia": "MK", "norway": "NO", "oman": "OM",
  "pakistan": "PK", "palau": "PW", "palestine": "PS", "panama": "PA",
  "papua new guinea": "PG", "paraguay": "PY", "peru": "PE", "philippines": "PH",
  "poland": "PL", "portugal": "PT", "qatar": "QA", "romania": "RO",
  "russia": "RU", "rwanda": "RW", "saint kitts and nevis": "KN", "saint lucia": "LC",
  "saint vincent and the grenadines": "VC", "samoa": "WS", "san marino": "SM",
  "sao tome and principe": "ST", "saudi arabia": "SA", "senegal": "SN",
  "serbia": "RS", "seychelles": "SC", "sierra leone": "SL", "singapore": "SG",
  "slovakia": "SK", "slovenia": "SI", "solomon islands": "SB", "somalia": "SO",
  "south africa": "ZA", "south korea": "KR", "korea": "KR", "south sudan": "SS",
  "spain": "ES", "sri lanka": "LK", "sudan": "SD", "suriname": "SR",
  "sweden": "SE", "switzerland": "CH", "syria": "SY", "taiwan": "TW",
  "tajikistan": "TJ", "tanzania": "TZ", "thailand": "TH", "togo": "TG",
  "tonga": "TO", "trinidad and tobago": "TT", "tunisia": "TN", "turkey": "TR",
  "turkmenistan": "TM", "tuvalu": "TV", "uganda": "UG", "ukraine": "UA",
  "united arab emirates": "AE", "uae": "AE", "united kingdom": "GB", "uk": "GB",
  "great britain": "GB", "england": "GB", "scotland": "GB", "wales": "GB",
  "united states": "US", "united states of america": "US", "usa": "US", "us": "US",
  "america": "US", "uruguay": "UY", "uzbekistan": "UZ", "vanuatu": "VU",
  "vatican city": "VA", "venezuela": "VE", "vietnam": "VN", "yemen": "YE",
  "zambia": "ZM", "zimbabwe": "ZW",
};

function guessCountryCode(countryStr) {
  const key = countryStr.trim().toLowerCase();
  if (countryCodeMap[key]) return countryCodeMap[key];
  // Exact-word match first, then falls back to substring containment
  // (sorted longest-key-first so "south korea" wins over "korea").
  const keys = Object.keys(countryCodeMap).sort((a, b) => b.length - a.length);
  const found = keys.find((k) => key.includes(k));
  return found ? countryCodeMap[found] : "";
}

/* ---------------- DATA ---------------- */
let num = 0;
let i = 0;
let currentName = "";
let participants = [];

// group-level fields, asked once
let country = "";
let city = "";
let currency = "";
let budgetMin = 0;
let budgetMax = 0;

// Hard cap on how many recommended places are ever requested/shown.
const MAX_PLACES = 6;

/* ---------------- DOM REFS ---------------- */
const homeDiv = document.getElementById("home");
const peopleStepDiv = document.getElementById("people-step");
const locationStepDiv = document.getElementById("location-step");
const nameStepDiv = document.getElementById("name-step");
const preferencesDiv = document.getElementById("preferences");
const resultDiv = document.getElementById("result");

const peopleInput = document.getElementById("people");
const countryInput = document.getElementById("country-input");
const cityInput = document.getElementById("city-input");
const currencyInput = document.getElementById("currency-input");
const budgetMinInput = document.getElementById("budget-min");
const budgetMaxInput = document.getElementById("budget-max");
const nameInput = document.getElementById("name-input");
const activityInput = document.getElementById("activity-input");
const moodInput = document.getElementById("mood-input");
const environmentInput = document.getElementById("environment-input");
const nameHeading = document.getElementById("name-heading");
const personHeading = document.getElementById("person-heading");
const placeTypeInput = document.getElementById("place-type-input");
const placeDetailWrap = document.getElementById("place-detail-wrap");
const placeDetailLabel = document.getElementById("place-detail-label");
const placeDetailInput = document.getElementById("place-detail-input");

// What follow-up question to ask (if any) once a place type is picked.
const placeDetailConfig = {
  "Restaurant": { label: "What type of food/cuisine?", placeholder: "e.g. Italian, BBQ, Ramen" },
  "Cafe": { label: "What type of food/drink?", placeholder: "e.g. Coffee, Bakery, Bubble tea" },
  "Bar": { label: "What type of drinks/vibe?", placeholder: "e.g. Cocktails, Sports bar, Wine bar" },
  "Museum": { label: "What kind of museum?", placeholder: "e.g. Art, History, Science" },
  "Library": { label: "What genre are you interested in?", placeholder: "e.g. Fiction, Non-fiction, Comics" },
  "Park": { label: "What kind of outdoor activity?", placeholder: "e.g. Walking, Picnic, Sports" },
  "Other": { label: "Any specific details?", placeholder: "Tell us more" },
};

placeTypeInput.addEventListener("change", () => {
  const config = placeDetailConfig[placeTypeInput.value];
  placeDetailInput.value = "";

  if (config) {
    placeDetailLabel.textContent = config.label;
    placeDetailInput.placeholder = config.placeholder;
    placeDetailWrap.style.display = "block";
  } else {
    placeDetailWrap.style.display = "none";
  }
});

/* ---------------- STEP 1: HOME ---------------- */
function start() {
  homeDiv.style.display = "none";
  peopleStepDiv.style.display = "flex";
}

/* ---------------- STEP 2: NUMBER OF PARTICIPANTS ---------------- */
function next() {
  const value = Number(peopleInput.value);

  if (isNaN(value) || value < 1 || value > 10) {
    alert("PARTICIPANTS MUST BE BETWEEN 1 AND 10, PLZ RE-ENTER");
    return;
  }

  num = value;
  participants = [];
  i = 0;

  peopleStepDiv.style.display = "none";
  locationStepDiv.style.display = "flex";
}

/* ---------------- STEP 3: LOCATION + BUDGET RANGE (once) ---------------- */
countryInput.addEventListener("blur", () => {
  if (!currencyInput.value.trim() && countryInput.value.trim()) {
    currencyInput.value = guessCurrency(countryInput.value);
  }
});

function locationNext() {
  const countryVal = countryInput.value.trim();
  const cityVal = cityInput.value.trim();
  const currencyVal = currencyInput.value.trim();
  const minVal = Number(budgetMinInput.value);
  const maxVal = Number(budgetMaxInput.value);

  if (!countryVal || !cityVal) {
    alert("PLZ ENTER YOUR COUNTRY AND CITY");
    return;
  }

  if (!currencyVal) {
    alert("PLZ ENTER A CURRENCY (e.g. Rs, $, ₹)");
    return;
  }

  if (!budgetMinInput.value || !budgetMaxInput.value || isNaN(minVal) || isNaN(maxVal) || minVal < 0 || maxVal <= minVal) {
    alert("PLZ ENTER A VALID BUDGET RANGE (max must be greater than min)");
    return;
  }

  country = countryVal;
  city = cityVal;
  currency = currencyVal;
  budgetMin = minVal;
  budgetMax = maxVal;

  locationStepDiv.style.display = "none";
  goToNameStep();
}

/* ---------------- STEP 4: NAME ENTRY (per participant) ---------------- */
function goToNameStep() {
  nameHeading.textContent = `Participant ${i + 1}`;
  nameInput.value = "";
  nameStepDiv.style.display = "flex";
}

function submitName() {
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  currentName = name;
  nameStepDiv.style.display = "none";
  preferencesDiv.style.display = "flex";
  renderPerson();
}

/* ---------------- STEP 5: PREFERENCES (per participant, all free text) ---------------- */
function renderPerson() {
  personHeading.textContent = `Enter your preferences, ${currentName}`;
  activityInput.value = "";
  moodInput.value = "";
  environmentInput.value = "";
  placeTypeInput.value = "";
  placeDetailInput.value = "";
  placeDetailWrap.style.display = "none";
}

function nextPerson() {
  // All fields are optional now — blank means "skip".
  const activity = activityInput.value.trim();
  const mood = moodInput.value.trim();
  const environment = environmentInput.value.trim();
  const placeType = placeTypeInput.value;
  const placeDetail = placeDetailInput.value.trim();

  participants.push({ name: currentName, activity, mood, environment, placeType, placeDetail });

  i++;

  if (i < num) {
    preferencesDiv.style.display = "none";
    goToNameStep();
  } else {
    console.log("Just a sec… the app is putting on its thinking cap 🧠✨");
    console.log(participants);
    preferencesDiv.style.display = "none";
    showResults();
  }
}

/* ---------------- STEP 6: RESULTS ---------------- */
// Case-insensitive tally that still displays the most common original casing.
// Blank answers (skipped) are excluded entirely.
function tally(category) {
  const counts = {};
  const display = {};
  let answered = 0;

  participants.forEach((p) => {
    const raw = (p[category] || "").trim();
    if (!raw) return; // skipped
    answered++;
    const key = raw.toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
    if (!display[key]) display[key] = raw;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) {
    return {
      winner: null,
      winnerCount: 0,
      minority: [],
      total: participants.length,
      answered: 0,
      tieCount: 0,
    };
  }

  const [winnerKey, winnerCount] = sorted[0];
  const minority = sorted.slice(1).map(([key]) => display[key]);

  return {
    winner: display[winnerKey],
    winnerCount,
    minority,
    total: participants.length,
    answered,
    tieCount: sorted.length,
  };
}

// Returns every distinct answer for a category (winner + minority), most
// common first, capped so a big group doesn't blow up the request list.
function distinctAnswers(category, cap = 4) {
  const t = tally(category);
  if (!t.winner) return [];
  return [t.winner, ...t.minority].slice(0, cap);
}

// Full vote breakdown for a category: every distinct answer with its raw
// vote count, sorted most-voted first. Used to compute real match
// percentages instead of asking the AI to guess them.
function voteBreakdown(category) {
  const counts = {};
  const display = {};

  participants.forEach((p) => {
    const raw = (p[category] || "").trim();
    if (!raw) return;
    const key = raw.toLowerCase();
    counts[key] = (counts[key] || 0) + 1;
    if (!display[key]) display[key] = raw;
  });

  return Object.entries(counts)
    .map(([key, votes]) => ({ value: display[key], votes }))
    .sort((a, b) => b.votes - a.votes);
}

// Builds one "ask" per distinct activity/place-type answer, each tagged
// with how many people voted for it and what % of the whole group that
// represents. Sorted so majority answers come first, with minority
// answers filling any remaining slots — then capped at MAX_PLACES so the
// group never gets more requests (and therefore more result cards) than
// that, no matter how many distinct answers were typed in.
function buildCandidates(maxTotal = MAX_PLACES) {
  const total = participants.length || 1;
  const candidates = [];

  voteBreakdown("activity").forEach(({ value, votes }) => {
    candidates.push({
      category: "activity",
      value,
      votes,
      match: Math.round((votes / total) * 100),
    });
  });

  voteBreakdown("placeType").forEach(({ value, votes }) => {
    candidates.push({
      category: "placeType",
      value,
      votes,
      detail: detailsForType(value),
      match: Math.round((votes / total) * 100),
    });
  });

  // Highest vote count (majority) first; ties keep insertion order. Once
  // majority answers are placed, whatever slots remain go to minority
  // answers — so a minority pick only gets dropped if there simply isn't
  // room left within MAX_PLACES.
  candidates.sort((a, b) => b.votes - a.votes);

  return candidates.slice(0, maxTotal);
}

function describeResult(category) {
  const t = tally(category);

  if (t.answered === 0) {
    return "Everyone skipped this one.";
  }

  const skippedCount = t.total - t.answered;

  if (t.tieCount === 1 && skippedCount === 0) {
    return `Everyone picked ${t.winner}.`;
  }

  let text = `${t.winner} (${t.winnerCount} of ${t.total} votes).`;
  if (t.minority.length > 0) {
    text += ` A few of you wanted ${t.minority.join(" or ")} instead — worth mixing in if you can.`;
  }
  if (skippedCount > 0) {
    text += ` (${skippedCount} skipped this one.)`;
  }
  return text;
}

// Collects the free-text details (cuisine, genre, etc.) given by anyone
// who picked a specific place type, e.g. all cuisines named by "Restaurant" voters.
function detailsForType(type) {
  return [...new Set(
    participants
      .filter((p) => p.placeType === type && p.placeDetail)
      .map((p) => p.placeDetail)
  )].join(", ");
}

function showResults() {
  resultDiv.style.display = "flex";

  document.getElementById("location-result").textContent =
    `${city}, ${country} — Budget: ${currency}${budgetMin.toLocaleString()} - ${currency}${budgetMax.toLocaleString()}`;
  document.getElementById("activity-result").textContent = describeResult("activity");
  document.getElementById("mood-result").textContent = describeResult("mood");
  document.getElementById("environment-result").textContent = describeResult("environment");
  document.getElementById("place-result").textContent = describeResult("placeType");

  fetchRecommendations();
}

/* ---------------- STEP 7: AI + WEB SEARCH RECOMMENDATIONS ---------------- */
async function fetchRecommendations() {
  const recDiv = document.getElementById("recommendations");
  recDiv.innerHTML = `<p class="rec-status" id="rec-status">Looking things up…</p>`;

  const moodWinner = tally("mood").winner;
  const environmentWinner = tally("environment").winner;

  // One candidate per distinct activity/place-type answer, majority votes
  // first, minority votes filling remaining slots, capped at MAX_PLACES —
  // so the group never gets more requests than that regardless of how many
  // different answers were typed in.
  const candidates = buildCandidates();

  // Build an explicit, per-candidate request list so the model can't drift
  // toward generic landmarks that ignore what was actually asked for. Each
  // line carries the real, group-computed match % so the model just needs
  // to echo it back rather than invent one.
  const requestLines = candidates.map((c) => {
    if (c.category === "activity") {
      return `- [match: ${c.match}%, ${c.votes} of ${participants.length} people] One place or venue in ${city} for doing/experiencing: ${c.value}.`;
    }
    return `- [match: ${c.match}%, ${c.votes} of ${participants.length} people] One place in ${city} that is specifically a ${c.value}${c.detail ? ` (matching: ${c.detail})` : ""}. Do not substitute a different kind of place.`;
  });

  if (requestLines.length === 0) {
    requestLines.push(`- [no vote data] Two or three generally well-reviewed, popular restaurants or activity spots in ${city}.`);
  }

  const filterLines = [];
  if (moodWinner) filterLines.push(`Mood the group is going for: ${moodWinner}.`);
  if (environmentWinner) filterLines.push(`Environment preference: ${environmentWinner}.`);
  filterLines.push(`Budget: roughly ${currency}${budgetMin} to ${currency}${budgetMax} per person — only suggest places that realistically fit this.`);

  const prompt = `You are finding REAL, CURRENTLY OPEN places in ${city}, ${country} for a group's outing. Use web search to verify these are real and currently operating.

IMPORTANT: Search specifically for places in ${city}, ${country}. Do not substitute results from any other city, even if that's where the search appears to be originating from.

What to find (one distinct place per bullet below — do not return the same generic landmark for multiple bullets, and do not substitute a place that fails to meet its bullet's requirement):
${requestLines.join("\n")}

Apply these filters to your choices:
${filterLines.join("\n")}

Hard rules:
- Do NOT suggest museums, palaces, monuments, or generic tourist attractions unless one of the bullets above specifically asks for that type of place.
- If a food/cuisine was requested, that place must be a restaurant or eatery that actually serves it — verify with web search, don't guess.
- Return exactly ${requestLines.length} place(s) total, each matching one of the bullets above, and NEVER more than ${MAX_PLACES} places even if you think of more options.
- Each place's "match" field must be copied EXACTLY as the number given in that bullet's "[match: X%]" tag — this is real vote data from the group and must not be changed, estimated, or recalculated. If a bullet says "[no vote data]", omit the "match" field entirely for that place.

Respond with ONLY a raw JSON array (no markdown fences, no commentary) of objects shaped exactly like:
{"name": "...", "type": "restaurant or activity", "area": "brief neighborhood/area description", "hours": "brief opening/closing hours if known, else 'Hours vary, call ahead'", "why": "one short sentence tying this specifically to the bullet it satisfies", "match": 83}`;

  try {
    // Localize the search to the entered city/country instead of letting it
    // default to wherever the request is physically coming from.
    const searchLocation = { type: "approximate", city: city };
    const countryCode = guessCountryCode(country);
    if (countryCode) searchLocation.country = countryCode;

    // Calls OUR OWN server (server.js) instead of Anthropic directly.
    // The real API key lives only on the server — never in this file.
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        tools: [{ type: "web_search_20250305", name: "web_search", user_location: searchLocation }],
      }),
    });

    console.log("API status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("API error body:", errText);
      throw new Error(`API returned ${response.status}: ${errText.slice(0, 200)}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);

    const fullText = (data.content || [])
      .map((block) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n");

    console.log("Extracted text:", fullText);

    const cleaned = fullText.replace(/```json|```/g, "").trim();
    let places = JSON.parse(cleaned);

    // Hard safety cap — never show more than MAX_PLACES regardless of what
    // the model returns.
    if (Array.isArray(places)) places = places.slice(0, MAX_PLACES);

    renderRecommendations(places);
  } catch (err) {
    console.error("Recommendation fetch failed:", err);
    recDiv.innerHTML = `
      <p class="rec-status">Couldn't find suggestions right now.</p>
      <p class="rec-error-detail">${escapeHtml(err.message || String(err))}</p>
      <p class="hint-text">Open your browser's DevTools console (F12) for the full error and raw response — that'll show exactly what's failing.</p>
      <button onclick="fetchRecommendations()">Try Again</button>
    `;
  }
}

function renderRecommendations(places) {
  const recDiv = document.getElementById("recommendations");

  if (!Array.isArray(places) || places.length === 0) {
    recDiv.innerHTML = `<p class="rec-status">No matching places found — try adjusting your preferences.</p>`;
    return;
  }

  recDiv.innerHTML = places
    .slice(0, MAX_PLACES)
    .map((place) => {
      const hasMatch = typeof place.match === "number" && !isNaN(place.match);
      const matchPct = hasMatch ? Math.max(0, Math.min(100, Math.round(place.match))) : null;
      const matchBadge = hasMatch
        ? `<div class="rec-match">${matchPct}% match with your group's answers</div>`
        : "";
      return `
      <div class="rec-card">
        <h3>${escapeHtml(place.name || "Unnamed spot")}</h3>
        <div class="rec-meta">${escapeHtml(place.type || "")} · ${escapeHtml(place.area || "")}</div>
        <div class="rec-meta">🕒 ${escapeHtml(place.hours || "Hours vary, call ahead")}</div>
        ${matchBadge}
        <p>${escapeHtml(place.why || "")}</p>
      </div>
    `;
    })
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------- RESTART ---------------- */
function restart() {
  num = 0;
  i = 0;
  currentName = "";
  participants = [];
  country = "";
  city = "";
  currency = "";
  budgetMin = 0;
  budgetMax = 0;

  peopleInput.value = "";
  countryInput.value = "";
  cityInput.value = "";
  currencyInput.value = "";
  budgetMinInput.value = "";
  budgetMaxInput.value = "";
  placeTypeInput.value = "";
  placeDetailInput.value = "";
  placeDetailWrap.style.display = "none";

  resultDiv.style.display = "none";
  homeDiv.style.display = "flex";
}
