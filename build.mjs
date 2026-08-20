// ALLTRA WORLD — concept rebuild (MP Launch, 2026-08-20)
// node build.mjs  → emits index.html, pricing.html, about.html sharing one chrome.
//
// Every factual statement below traces to alltra.world's own published pages
// (home and /p/about-us), captured 2026-08-20. Nothing is inferred or invented;
// where the source site is silent, this rebuild stays silent rather than filling
// the gap. Full source table lives in the prospect folder, not in this repo.
//
import { writeFileSync } from "node:fs";

const YEAR = 2026;

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230B0F19'/%3E%3Ccircle cx='32' cy='32' r='17' fill='none' stroke='%23C8A24A' stroke-width='3'/%3E%3Cpath d='M32 15v34M15 32h34' stroke='%23C8A24A' stroke-width='3' stroke-linecap='round' opacity='.55'/%3E%3C/svg%3E";

/* ───────────────────────── drawn art (no stock imagery) ───────────────────── */

const ART_HERO = `
<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="glow" cx="72%" cy="34%" r="52%">
      <stop offset="0%" stop-color="#C8A24A" stop-opacity=".26"/>
      <stop offset="55%" stop-color="#C8A24A" stop-opacity=".06"/>
      <stop offset="100%" stop-color="#C8A24A" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C8A24A" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#5B7FE8" stop-opacity=".30"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="720" fill="url(#glow)"/>
  <g fill="none" stroke="url(#wire)" stroke-width="1">
    <circle cx="1040" cy="250" r="96"/>
    <circle cx="1040" cy="250" r="150" opacity=".65"/>
    <circle cx="1040" cy="250" r="214" opacity=".40"/>
    <circle cx="1040" cy="250" r="290" opacity=".22"/>
    <circle cx="1040" cy="250" r="378" opacity=".12"/>
  </g>
  <g stroke="#C8A24A" stroke-width="1" opacity=".30">
    <path d="M1040 60v380M850 250h380" stroke-dasharray="3 9"/>
  </g>
  <g fill="#C8A24A">
    <circle cx="1040" cy="100" r="3.5" opacity=".9"/>
    <circle cx="1190" cy="250" r="3" opacity=".7"/>
    <circle cx="1040" cy="464" r="2.5" opacity=".5"/>
    <circle cx="890" cy="250" r="2.5" opacity=".55"/>
  </g>
  <g fill="none" stroke="#8FA3C8" stroke-width="1" opacity=".13">
    <path d="M-40 596c260-52 470 44 736-8 266-52 520 26 784-24"/>
    <path d="M-40 648c260-52 470 44 736-8 266-52 520 26 784-24"/>
    <path d="M-40 700c260-52 470 44 736-8 266-52 520 26 784-24"/>
  </g>
</svg>`;

const ART_LEDGER = `
<svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <g fill="none" stroke="#0B0F19" stroke-width="1" opacity=".07">
    <path d="M0 60h1440M0 130h1440M0 200h1440M0 270h1440M0 340h1440"/>
  </g>
  <g fill="none" stroke="#C8A24A" stroke-width="1.5" opacity=".26">
    <path d="M0 270c180 0 180-70 240-70s60 70 240 70 180-140 240-140 60 140 240 140 180-70 240-70 60 70 240 70"/>
  </g>
</svg>`;

/* ───────────────────────────── shared chrome ──────────────────────────────── */

const NAV = [
  ["index.html#hub", "Business Hub"],
  ["index.html#exchange", "Exchange"],
  ["index.html#assets", "Digital assets"],
  ["pricing.html", "Pricing"],
  ["about.html", "About"],
];

const head = (title, desc, page) => `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body data-page="${page}">
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="lockup" href="index.html" aria-label="Alltra World — home">
      <span class="mark" aria-hidden="true"></span>
      <span class="lk-t"><b>ALLTRA</b><i>WORLD</i></span>
    </a>
    <input type="checkbox" id="nav-t" aria-hidden="true">
    <label class="burger" for="nav-t" aria-label="Menu"><span></span><span></span><span></span></label>
    <nav class="nav" aria-label="Main">
      ${NAV.map(([h, l]) => `<a class="lnk${page === l.toLowerCase() ? " on" : ""}" href="${h}">${l}</a>`).join("\n      ")}
      <a class="btn btn-gold" href="#contact">Talk to us</a>
    </nav>
  </div>
</header>
<main id="main">`;

const foot = `</main>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div class="ftr-brand">
        <span class="lockup lockup-lg">
          <span class="mark" aria-hidden="true"></span>
          <span class="lk-t"><b>ALLTRA</b><i>WORLD</i></span>
        </span>
        <p>A merchant hub, business directory and marketplace built on Alltra Chain — an EVM&#8209;compatible blockchain network.</p>
        <p class="op">Operated by Ozz Metals Co. Pty Ltd.</p>
      </div>
      <div class="ftr-cols">
        <div><h4>Platform</h4>
          <a href="index.html#hub">Business Hub</a>
          <a href="index.html#features">Features</a>
          <a href="pricing.html">Pricing</a>
          <a href="index.html#directory">Business directory</a>
        </div>
        <div><h4>Network</h4>
          <a href="index.html#assets">Digital assets</a>
          <a href="about.html#protocol">Protocol</a>
          <a href="index.html#tools">Network tools</a>
          <a href="about.html">About Alltra</a>
        </div>
        <div><h4>Legal</h4>
          <a href="#legal">Terms &amp; conditions</a>
          <a href="#legal">Privacy policy</a>
          <a href="#legal">Acceptable use policy</a>
          <a href="#legal">Returns policy</a>
          <a href="#legal">Disclaimer</a>
        </div>
        <div><h4>Contact</h4>
          <a href="mailto:Team@alltra.world">Team@alltra.world</a>
          <a href="#contact">Enquiry form</a>
        </div>
      </div>
    </div>
    <div class="risk" role="note" id="legal">
      <h4>Important — please read before participating</h4>
      <p>Alltra World is a technology platform. Digital assets described on this site are volatile, are not bank deposits, and are not covered by any government guarantee. Nothing on this site is financial, investment, legal or tax advice, and no statement here is a recommendation to acquire any asset. Values can fall as well as rise, and you may lose the amount you put in. Consider your own circumstances and seek independent professional advice before participating.</p>
    </div>
    <div class="ftr-btm">
      <p>© ${YEAR} Ozz Metals Co. Pty Ltd. All rights reserved.</p>
      <p class="cx">Concept design — not the live Alltra World website.</p>
    </div>
  </div>
</footer>
<script>
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"], a[href*=".html#"]');
    if (!a) return;
    var id = a.getAttribute('href').split('#')[1];
    var el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var t = document.getElementById('nav-t'); if (t) t.checked = false;
  });
</script>
</body>
</html>`;

/* CTA band reused across pages */
const CTA = `
<section class="band cta" id="contact">
  <div class="wrap cta-in">
    <div>
      <h2 class="h2">Talk to the team before you commit</h2>
      <p class="lede">Tell us what your business sells and we will tell you plainly whether the hub fits — and what it costs to run. No obligation, and a person answers.</p>
      <ul class="ticks">
        <li>A walkthrough of the merchant hub before you pay</li>
        <li>Straight answers on fees, settlement and what the tokens do</li>
        <li>Help migrating an existing site and domain</li>
      </ul>
    </div>
    <form class="card form" onsubmit="return false;" novalidate>
      <h3>Send an enquiry</h3>
      <label>Name<input type="text" name="name" autocomplete="name" placeholder="Your name"></label>
      <label>Email<input type="email" name="email" autocomplete="email" placeholder="you@business.com.au"></label>
      <label>Business<input type="text" name="business" placeholder="Business or trading name"></label>
      <label>What do you need?<textarea name="msg" rows="3" placeholder="A short note about your business"></textarea></label>
      <button class="btn btn-gold btn-lg" type="submit">Send enquiry</button>
      <p class="fine">We reply from Team@alltra.world. Demonstration form — not connected in this concept.</p>
    </form>
  </div>
</section>`;

/* ─────────────────────────────── index.html ───────────────────────────────── */

const FEATURES = [
  ["Custom domains", "Run the hub on your own domain, not a borrowed subdomain. Your address, your search equity, your first impression."],
  ["Multilingual pages", "Publish the same site in as many languages as your customers actually read."],
  ["Themes", "A set of ready layouts to launch against, so a listing looks finished on day one."],
  ["Form builder", "Build the enquiry, quote and booking forms you need and collect leads straight from the page."],
  ["QR code builder", "Generate codes that link print, packaging and shopfront signage back to your listing."],
  ["Digital business cards", "vCards you can send or scan, so a contact lands in a phone rather than a pocket."],
];

const HUB_INCLUDES = [
  "Ecommerce", "Blog", "Portfolio", "Custom pages", "Services", "Team",
  "Careers", "Testimonials", "Request a quote", "Follow / unfollow", "Counters", "Skills",
];

const PLUGINS = ["Google Analytics", "Disqus", "WhatsApp", "Facebook Pixel", "Tawk.to"];

const STEPS = [
  ["Create your account", "Register and verify your email address."],
  ["Choose a plan", "Start on a trial or purchase a membership outright."],
  ["Connect your domain", "Point a custom domain, or start on a subdomain and move later."],
  ["Add your content", "Upload your pages, products and images, and set your languages."],
  ["Publish", "Your listing goes live in the directory and on your own address."],
];

const ASSETS = [
  ["11::11", "Gold&#8209;referenced unit", "Each 11::11 represents one one&#8209;thousandth (1/1000) of an ounce of fine gold, under ongoing supply agreements.", "From $50 AUD"],
  ["HYBX", "Issuance token", "Issued to 11::11 holders. Alltra describes it as functioning similarly to a promissory note, and it is the unit used to buy and sell on the Hyper&#8209;Barter Exchange.", "Issued to holders"],
  ["ALL", "Network coin", "The native coin of Alltra Chain. Used to pay transaction fees on the network and to stake with validators.", "Network fees"],
  ["ALL$", "Alltra Dollar", "Pegged to the Australian dollar and issued against HYBX held in escrow.", "AUD&#8209;pegged"],
];

const ROUTES = [
  ["Buy 11::11", "$50 AUD minimum", "Acquire the gold&#8209;referenced unit directly.", ""],
  ["Supply metal", "10 kg minimum", "Supply gold or precious metals into the programme.", ""],
  ["Become a merchant", "$89 AUD setup", "List your business and trade on the Hyper&#8209;Barter Exchange.", ""],
  ["Business support manager", "Licensed role", "A licensed role supporting merchants onto the platform.", ""],
  ["Run a validator", "$30,000 AUD minimum", "Operate a validating node under the network's delegated proof&#8209;of&#8209;stake consensus.", ""],
  ["Launch a project", "By arrangement", "Deploy your own project or contracts onto Alltra Chain.", ""],
  ["Staking farms", "—", "Announced by Alltra as not yet available.", "soon"],
  ["NFTs", "—", "Announced by Alltra as not yet available.", "soon"],
];

const DIRECTORY = [
  ["LMDTECH Pty Ltd", "lmdtech"],
  ["Freedom Tech", "freedomtech"],
  ["Hyper-Barter Exchange", "HyperBarterExchange"],
  ["Original Art Paintings", "CDS"],
  ["11::11 Coin", "11::11coin"],
  ["Alltra Chain Solutions", "AlltraChainSolutions"],
];

const TOOLS = [
  ["Block explorer", "Inspect any transaction, block or address on the network.", "https://alltra.global"],
  ["PouchPay wallet", "The Alltra wallet, on the App Store and Google Play.", "#"],
  ["Staking", "Delegate to a validator and track rewards.", "https://staking.alltra.global/"],
  ["Validator manager", "Validator listings and node management.", "https://validators.alltra.global/poa-dapps-validators"],
  ["Swap", "Exchange between supported assets.", "https://alltrasonicswap.trade/swap"],
];

const index = `${head(
  "Alltra World — merchant hub, business directory and marketplace on Alltra Chain",
  "Publish your business, list it in the directory, and trade goods and services on the Hyper-Barter Exchange. Built on Alltra Chain, an EVM-compatible blockchain network.",
  "home"
)}

<section class="hero">
  <div class="art">${ART_HERO}</div>
  <div class="wrap hero-in">
    <p class="eyebrow">Built on Alltra Chain</p>
    <h1>Put your business online.<br><em>Then trade with it.</em></h1>
    <p class="lede">Alltra World is two things working together: a hub where you build and publish your business website, and a marketplace where you can trade goods and services with the businesses beside you in the directory.</p>
    <div class="hero-cta">
      <a class="btn btn-gold btn-lg" href="pricing.html">See plans and pricing</a>
      <a class="btn btn-ghost btn-lg" href="#hub">How the hub works</a>
    </div>
    <dl class="hero-facts">
      <div><dt>Network</dt><dd>EVM&#8209;compatible</dd></div>
      <div><dt>Consensus</dt><dd>Delegated proof of stake</dd></div>
      <div><dt>Merchant setup</dt><dd>$89 AUD</dd></div>
      <div><dt>Operator</dt><dd>Ozz Metals Co. Pty Ltd</dd></div>
    </dl>
  </div>
</section>

<section class="band plain" id="hub">
  <div class="wrap">
    <p class="eyebrow center">Start here</p>
    <h2 class="h2 center">Three parts, in plain English</h2>
    <p class="lede center narrow">People bounce off crypto platforms because nobody explains what is actually being offered. Here is the whole thing in three sentences.</p>
    <div class="grid-3 explain">
      <article class="card">
        <span class="num">01</span>
        <h3>The Business Hub</h3>
        <p>A website builder and business directory. You build a site, connect your own domain, and your business gets a listing other members can find.</p>
        <p class="tie">This is the part you pay a monthly membership for.</p>
      </article>
      <article class="card">
        <span class="num">02</span>
        <h3>The Hyper-Barter Exchange</h3>
        <p>A marketplace where members buy and sell goods and services from each other, settled with the HYBX token through smart contracts rather than invoices.</p>
        <p class="tie">This is what the hub connects you to.</p>
      </article>
      <article class="card">
        <span class="num">03</span>
        <h3>Alltra Chain</h3>
        <p>The blockchain underneath. It is EVM&#8209;compatible, so anything that runs on Ethereum can run here, and it was built to avoid Ethereum and Bitcoin transaction costs.</p>
        <p class="tie">This is the rail everything settles on.</p>
      </article>
    </div>
  </div>
</section>

<section class="band paper" id="features">
  <div class="art art-ledger">${ART_LEDGER}</div>
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">The Business Hub</p>
        <h2 class="h2">Everything you need to look like a real business</h2>
      </div>
      <p class="lede">A listing is not a website. Every membership includes the tools to publish a proper site — your own domain, your own languages, and the pages customers actually look for.</p>
    </div>
    <div class="grid-3 feats">
      ${FEATURES.map(
        ([t, d], i) => `<article class="card feat">
        <span class="fi" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <h3>${t}</h3><p>${d}</p>
      </article>`
      ).join("\n      ")}
    </div>
    <div class="incl">
      <div class="incl-b">
        <h4>Also included on every plan</h4>
        <ul class="chips">${HUB_INCLUDES.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="incl-b">
        <h4>Integrations</h4>
        <ul class="chips">${PLUGINS.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>
    </div>
  </div>
</section>

<section class="band plain" id="how">
  <div class="wrap">
    <p class="eyebrow center">Getting started</p>
    <h2 class="h2 center">Five steps from sign-up to live</h2>
    <ol class="steps">
      ${STEPS.map(
        ([t, d], i) => `<li><span class="sn">${String(i + 1).padStart(2, "0")}</span><div><h3>${t}</h3><p>${d}</p></div></li>`
      ).join("\n      ")}
    </ol>
  </div>
</section>

<section class="band ink" id="exchange">
  <div class="wrap">
    <div class="sec-head on-ink">
      <div>
        <p class="eyebrow">The Hyper-Barter Exchange</p>
        <h2 class="h2">Turn spare capacity into trade</h2>
      </div>
      <p class="lede">The exchange exists so businesses can trade what they already have — unused hours, surplus stock, spare capacity — with other members, settled through smart contracts on the network instead of chasing invoices.</p>
    </div>
    <div class="grid-2 xg">
      <article class="card ink-card">
        <h3>What you can trade</h3>
        <p>Goods and services, between members, using the HYBX token as the unit of exchange.</p>
      </article>
      <article class="card ink-card">
        <h3>How it settles</h3>
        <p>Through smart contracts on Alltra Chain — the terms execute on the network rather than sitting in an accounts department.</p>
      </article>
    </div>
  </div>
</section>

<section class="band paper" id="assets">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Digital assets</p>
        <h2 class="h2">What each unit is, precisely</h2>
      </div>
      <p class="lede">Four units do four different jobs. These are Alltra's own definitions, stated plainly and without embellishment. Read the risk note at the foot of this page before acquiring any of them.</p>
    </div>
    <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th scope="col">Unit</th><th scope="col">Type</th><th scope="col">What it is</th><th scope="col">Entry</th></tr></thead>
        <tbody>
          ${ASSETS.map(
            ([n, t, d, e]) =>
              `<tr><th scope="row"><span class="tk">${n}</span></th><td class="ty" data-l="Type">${t}</td><td data-l="What it is">${d}</td><td class="en" data-l="Entry">${e}</td></tr>`
          ).join("\n          ")}
        </tbody>
      </table>
    </div>
    <p class="fine tbl-fine">Definitions as published by Alltra World. Digital assets are volatile and are not covered by any government guarantee — see the risk note below.</p>
  </div>
</section>

<section class="band plain" id="participate">
  <div class="wrap">
    <p class="eyebrow center">Ways in</p>
    <h2 class="h2 center">Eight ways to participate</h2>
    <p class="lede center narrow">Different entry points suit different businesses. Two are announced but not yet available, and they are labelled as such.</p>
    <div class="grid-4 routes">
      ${ROUTES.map(
        ([t, m, d, tag]) => `<article class="card route${tag ? " soon" : ""}">
        ${tag ? '<span class="tag">Coming soon</span>' : ""}
        <h3>${t}</h3>
        <p class="min">${m}</p>
        <p>${d}</p>
      </article>`
      ).join("\n      ")}
    </div>
  </div>
</section>

<section class="band paper" id="directory">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Business directory</p>
        <h2 class="h2">Members already listed</h2>
      </div>
      <p class="lede">Every membership includes a directory listing, so other members can find you and trade with you.</p>
    </div>
    <ul class="dir">
      ${DIRECTORY.map(
        ([n, h]) => `<li><span class="av" aria-hidden="true">${n.charAt(0)}</span><div><b>${n}</b><span>@${h}</span></div></li>`
      ).join("\n      ")}
    </ul>
  </div>
</section>

<section class="band ink" id="tools">
  <div class="wrap">
    <div class="sec-head on-ink">
      <div>
        <p class="eyebrow">Open network tools</p>
        <h2 class="h2">Check it yourself</h2>
      </div>
      <p class="lede">The network is public. You do not have to take our word for any of it — every transaction, block and validator is inspectable.</p>
    </div>
    <div class="grid-3 tools">
      ${TOOLS.map(
        ([t, d, u]) => `<a class="card ink-card tool" href="${u}"${u.startsWith("http") ? ' rel="noopener"' : ""}>
        <h3>${t}<span aria-hidden="true">→</span></h3><p>${d}</p>
      </a>`
      ).join("\n      ")}
    </div>
  </div>
</section>

${CTA}
${foot}`;

/* ────────────────────────────── pricing.html ──────────────────────────────── */

const TIERS = [
  {
    n: "Landing Page Lite",
    p: "$12.90",
    per: "one-off, lifetime",
    d: "A single published page and one digital business card. The cheapest way to hold your name on the network.",
    v: "1 vCard",
    f: ["Subdomain", "One landing page", "1 vCard", "QR builder", "Directory listing"],
    cta: "Purchase",
    note: "",
  },
  {
    n: "Basic Business",
    p: "$220",
    per: "per month",
    d: "The standard membership. A full site on your own domain, ecommerce, and everything in the hub.",
    v: "3 vCards",
    f: ["Custom domain", "Full site + ecommerce", "3 vCards", "Blog, portfolio, custom pages", "All integrations", "Directory listing"],
    cta: "Start trial",
    note: "",
    feat: true,
  },
  {
    n: "Growth Business",
    p: "$789",
    per: "per month",
    d: "For a business running several brands, locations or reps who each need their own card.",
    v: "10 vCards",
    f: ["Everything in Basic", "10 vCards", "Multi-brand / multi-location", "Priority directory placement"],
    cta: "Start trial",
    note: "",
  },
  {
    n: "Premium Business",
    p: "$1,790",
    per: "per month",
    d: "For larger teams — thirty cards, so every person on the floor has their own.",
    v: "30 vCards",
    f: ["Everything in Growth", "30 vCards", "Team-wide rollout"],
    cta: "Start trial",
    note: "",
  },
];

const pricing = `${head(
  "Pricing — Alltra World Business Hub",
  "Membership plans for the Alltra World Business Hub, from a $12.90 lifetime landing page to full business memberships. Validator packages listed separately.",
  "pricing"
)}

<section class="hero hero-sm">
  <div class="art">${ART_HERO}</div>
  <div class="wrap hero-in">
    <p class="eyebrow">Pricing</p>
    <h1>Pick the plan that<br><em>matches your business</em></h1>
    <p class="lede">Every plan publishes a real site on the hub and lists you in the directory. The difference between them is scale — how many digital business cards you need, and how many brands you are running.</p>
  </div>
</section>

<section class="band paper">
  <div class="wrap">
    <div class="tiers">
      ${TIERS.map(
        (t) => `<article class="card tier${t.feat ? " feat-tier" : ""}">
        ${t.feat ? '<span class="tag tag-gold">Most chosen</span>' : ""}
        <h2>${t.n}</h2>
        <p class="price"><span>${t.p}</span><small>${t.per}</small></p>
        <p class="tdesc">${t.d}</p>
        <ul class="tlist">${t.f.map((x) => `<li>${x}</li>`).join("")}</ul>
        <a class="btn ${t.feat ? "btn-gold" : "btn-line"} btn-block" href="#contact">${t.cta}</a>
      </article>`
      ).join("\n      ")}
    </div>
    <p class="fine center">Prices as published by Alltra World. Merchant setup on the Hyper-Barter Exchange is a separate one-off fee of $89 AUD.</p>
  </div>
</section>

<section class="band plain">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="eyebrow">A different kind of product</p>
        <h2 class="h2">Validator packages</h2>
        <p class="lede">A validator is not a bigger website plan — it is a role on the network. Validators are elected under the network's delegated proof-of-stake consensus, run a node, and can be staked to by delegators.</p>
        <p>Because it is a network role rather than a hosting product, it is listed separately here rather than at the end of the membership table. It carries its own minimum and its own obligations.</p>
      </div>
      <aside class="card val">
        <h3>Validator as a Business</h3>
        <p class="price"><span>$6,500</span><small>per month</small></p>
        <ul class="tlist">
          <li>Validator node operation</li>
          <li>Full Business Hub membership included</li>
          <li>3 vCards</li>
          <li>Listed in the validator manager</li>
        </ul>
        <p class="min">Separate participation minimum: $30,000 AUD</p>
        <a class="btn btn-gold btn-block" href="#contact">Talk to us first</a>
        <p class="fine">Given the commitment, we would rather have a conversation than take an online purchase.</p>
      </aside>
    </div>
  </div>
</section>

${CTA}
${foot}`;

/* ─────────────────────────────── about.html ───────────────────────────────── */

const about = `${head(
  "About — Alltra World and Alltra Chain",
  "Alltra is an EVM-based independent blockchain ecosystem with its own coins, tokens, marketplace and exchange, hosted on the Alltra Chain Network. Operated by Ozz Metals Co. Pty Ltd.",
  "about"
)}

<section class="hero hero-sm">
  <div class="art">${ART_HERO}</div>
  <div class="wrap hero-in">
    <p class="eyebrow">About</p>
    <h1>An independent chain,<br><em>built for trade</em></h1>
    <p class="lede">Alltra is a fully developed, EVM-based, independent blockchain ecosystem — its own coins, tokens, marketplace, projects and exchange, all hosted on the Alltra Chain Network.</p>
  </div>
</section>

<section class="band paper" id="protocol">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="eyebrow">Why the chain exists</p>
        <h2 class="h2">It started with transaction costs</h2>
        <p class="lede">The founders set out to address the cost of transacting on the Ethereum and Bitcoin networks. If a network is meant to carry everyday commerce between small businesses, fees have to be small enough that everyday commerce survives them.</p>
        <p>The answer was a delegated proof-of-stake network: validators are elected to produce blocks, delegators stake to those validators, and the chain stays EVM-compatible with Ethereum — so any contract that deploys there can deploy here.</p>
      </div>
      <aside class="card spec">
        <h3>Protocol at a glance</h3>
        <dl>
          <div><dt>Network</dt><dd>Alltra Chain</dd></div>
          <div><dt>Consensus</dt><dd>Delegated proof of stake (DPoS)</dd></div>
          <div><dt>Compatibility</dt><dd>EVM — Ethereum-compatible contracts</dd></div>
          <div><dt>Native coin</dt><dd>ALL — pays network fees, used for staking</dd></div>
          <div><dt>Block explorer</dt><dd><a href="https://alltra.global" rel="noopener">Public and open</a></dd></div>
        </dl>
      </aside>
    </div>
  </div>
</section>

<section class="band plain">
  <div class="wrap">
    <p class="eyebrow center">The ecosystem</p>
    <h2 class="h2 center">Four units, four jobs</h2>
    <div class="grid-4 units">
      ${ASSETS.map(
        ([n, t, d]) => `<article class="card"><span class="tk">${n}</span><h3>${t}</h3><p>${d}</p></article>`
      ).join("\n      ")}
    </div>
  </div>
</section>

<section class="band ink">
  <div class="wrap narrow-w">
    <p class="eyebrow">Who operates it</p>
    <h2 class="h2">Ozz Metals Co. Pty Ltd</h2>
    <p class="lede">Alltra World is operated by Ozz Metals Co. Pty Ltd. The team can be reached directly at <a href="mailto:Team@alltra.world">Team@alltra.world</a>.</p>
    <p>Announcements from the company, including the March 2026 statement regarding a one-tonne gold offtake agreement, are published on the Alltra World blog.</p>
  </div>
</section>

${CTA}
${foot}`;

/* ───────────────────────────────── write ──────────────────────────────────── */

writeFileSync("index.html", index);
writeFileSync("pricing.html", pricing);
writeFileSync("about.html", about);
console.log("built: index.html, pricing.html, about.html");
