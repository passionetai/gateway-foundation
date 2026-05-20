/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */
const { useState } = React;

const CURRENCIES = [
  { code: "NGN", symbol: "\u20A6", label: "NGN", presets: [5000, 15000, 50000, 150000, 500000] },
  { code: "USD", symbol: "$",      label: "USD", presets: [5, 15, 50, 150, 500] },
  { code: "GBP", symbol: "\u00A3", label: "GBP", presets: [5, 15, 50, 150, 500] },
  { code: "EUR", symbol: "\u20AC", label: "EUR", presets: [5, 15, 50, 150, 500] }
];

const IMPACT = [
  { ngn: 5000,   highlight: false, label: "One school prevention visit", body: "Materials for one classroom session reaching 30\u201350 students." },
  { ngn: 15000,  highlight: false, label: "One week of group counselling", body: "Covers a counsellor's honorarium for one recovery circle." },
  { ngn: 50000,  highlight: false, label: "A safe shelter bed for one week", body: "Food, security, and basic care for one survivor." },
  { ngn: 150000, highlight: false, label: "A full medical detox cycle", body: "7\u201314 days of supervised withdrawal in a partner clinic." },
  { ngn: 500000, highlight: true,  label: "A 90-day vocational training cohort", body: "Tailoring, catering, or digital skills for one cohort \u2014 to graduation." }
];

const DESIGNATIONS = [
  "Greatest need",
  "Drug abuse work",
  "Trafficking rescue",
  "Safe house"
];

const SPEND_SPLIT = [
  { pct: "72%", label: "Direct programs" },
  { pct: "18%", label: "Operations" },
  { pct: "7%",  label: "Awareness & films" },
  { pct: "3%",  label: "Fundraising" }
];

const OTHER_WAYS = [
  {
    icon: "building-bank",
    title: "Bank transfer",
    body: "For larger gifts or partner organisations.",
    block: [
      "Gateway to Better Life Foundation",
      "Acct: 0123456789",
      "Bank: First Bank of Nigeria"
    ]
  },
  {
    icon: "package",
    title: "In-kind donations",
    body: "Clothing, food, training equipment, or professional services.",
    cta: { label: "Email give@gtblf.org", href: "mailto:give@gtblf.org" }
  },
  {
    icon: "briefcase",
    title: "Corporate partnerships",
    body: "CSR programs, matched giving, or multi-year sponsorships.",
    cta: { label: "Email partners@gtblf.org", href: "mailto:partners@gtblf.org" }
  }
];

const FAQ = [
  {
    q: "Is my donation tax-deductible?",
    a: "Donations may qualify for tax relief under Nigerian Companies Income Tax Act provisions — we'll issue an official receipt within 5 minutes of your gift. For donations from outside Nigeria, please check with your local tax authority."
  },
  {
    q: "Can I donate from outside Nigeria?",
    a: "Yes. We accept USD, GBP, and EUR through Paystack and Flutterwave, both of which support international cards. For wire transfers from abroad, email finance@gtblf.org for our routing details."
  },
  {
    q: "How do I cancel a monthly donation?",
    a: "Email finance@gtblf.org with the email address you used to set up the recurring donation, and we'll cancel it within one business day. You can also cancel directly through your Paystack receipt — every recurring receipt includes a one-click cancel link."
  },
  {
    q: "Can I designate my donation to a specific program?",
    a: "Yes. The donation form lets you direct your gift to one of four areas: greatest need, drug-abuse work, trafficking rescue, or our safe house. For more specific designations (a named cohort, a partner school, etc.), email finance@gtblf.org before completing your gift."
  },
  {
    q: "Who can I contact about a large gift?",
    a: "Our founder, Ambassador Reverend Chukwudi Eke, handles all major gifts and planned giving conversations personally. Email chukwudi@gtblf.org or call +1 617 401 5060 for a confidential conversation."
  }
];

// Format a value in a given currency
const formatAmount = (amount, currency) => {
  if (!amount || amount <= 0) return `${currency.symbol}0`;
  return `${currency.symbol}${amount.toLocaleString()}`;
};

// ---------- breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Support our work</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- page header ----------
function PageHeader() {
  return (
    <section className="donate-page-header">
      <div className="container donate-page-header-grid">
        <div>
          <span className="eyebrow eyebrow-accent">Support our work</span>
          <h1 className="page-title">Fund a rescue. Fund a future.</h1>
          <p className="page-lead">
            Every naira and dollar you give translates directly into beds, counselling sessions,
            school visits, and the training that helps someone rebuild. Here&rsquo;s exactly where
            your support goes.
          </p>
        </div>
        <aside className="donate-trust-strip" aria-label="Donation trust signals">
          <div className="donate-trust-pill">
            <ChromeIcon name="shield-check" size={16}/>
            <span>Registered non-profit</span>
          </div>
          <div className="donate-trust-pill">
            <ChromeIcon name="lock" size={16}/>
            <span>Secure payments &middot; Paystack & Flutterwave</span>
          </div>
          <div className="donate-trust-pill">
            <ChromeIcon name="file-certificate" size={16}/>
            <span>Receipt emailed within 5 minutes</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------- donation form ----------
function DonationForm() {
  const [freq, setFreq] = useState("once");
  const [curIdx, setCurIdx] = useState(0);
  const [presetIdx, setPresetIdx] = useState(1); // default: ₦15,000 (most given)
  const [custom, setCustom] = useState("");
  const [designation, setDesignation] = useState(DESIGNATIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anon, setAnon] = useState(false);

  const currency = CURRENCIES[curIdx];
  const amount = custom
    ? parseInt(custom.replace(/[^\d]/g, ""), 10) || 0
    : currency.presets[presetIdx];

  const onPickPreset = (i) => {
    setPresetIdx(i);
    setCustom("");
  };
  const onCustomChange = (e) => {
    const v = e.target.value.replace(/[^\d]/g, "");
    setCustom(v);
    setPresetIdx(-1);
  };
  const onCurrencyChange = (i) => {
    setCurIdx(i);
    setPresetIdx(1); // reset to "most given"
    setCustom("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Stub — real implementation hands off to Paystack/Flutterwave with these params.
    // eslint-disable-next-line no-console
    console.log("Donation:", { freq, currency: currency.code, amount, designation, name, email, anon });
  };

  return (
    <form className="donate-form" id="donate-form" onSubmit={onSubmit}>
      <span className="eyebrow eyebrow-accent">Make a donation</span>
      <h2 className="donate-form-title">Give in three steps.</h2>

      {/* Step 1: Frequency */}
      <div className="donate-step">
        <div className="donate-step-label">Step 1 &middot; Frequency</div>
        <div className="donate-freq-toggle" role="tablist" aria-label="Donation frequency">
          <button
            type="button"
            role="tab"
            aria-selected={freq === "once"}
            className={freq === "once" ? "is-on" : ""}
            onClick={() => setFreq("once")}
          >One-time</button>
          <button
            type="button"
            role="tab"
            aria-selected={freq === "monthly"}
            className={freq === "monthly" ? "is-on" : ""}
            onClick={() => setFreq("monthly")}
          >Monthly</button>
        </div>
      </div>

      {/* Step 2: Amount */}
      <div className="donate-step">
        <div className="donate-step-label">Step 2 &middot; Amount</div>

        {/* Currency pills */}
        <div className="donate-currency" role="radiogroup" aria-label="Currency">
          {CURRENCIES.map((c, i) => (
            <button
              key={c.code}
              type="button"
              role="radio"
              aria-checked={i === curIdx}
              className={"donate-currency-pill " + (i === curIdx ? "is-on" : "")}
              onClick={() => onCurrencyChange(i)}
            >
              {c.symbol} {c.label}
            </button>
          ))}
        </div>

        {/* Amount tiles */}
        <div className="donate-amount-grid">
          {currency.presets.map((p, i) => (
            <button
              key={i}
              type="button"
              className={"donate-amount-tile " + (i === presetIdx && !custom ? "is-on" : "")}
              onClick={() => onPickPreset(i)}
              aria-pressed={i === presetIdx && !custom}
            >
              {i === 1 && (
                <span className="donate-amount-badge" aria-label="Most given">Most given</span>
              )}
              <span className="donate-amount-value">{formatAmount(p, currency)}</span>
              <span className="donate-amount-impact">{IMPACT[i].label.replace(/Tailoring.*$/, "")}</span>
            </button>
          ))}
          <label className={"donate-amount-tile donate-amount-custom " + (custom ? "is-on" : "")}>
            <span className="donate-amount-custom-head">Custom</span>
            <div className="donate-amount-custom-field">
              <span className="donate-amount-custom-prefix">{currency.symbol}</span>
              <input
                type="text"
                inputMode="numeric"
                value={custom}
                onChange={onCustomChange}
                placeholder="Enter amount"
                aria-label="Custom amount"
              />
            </div>
          </label>
        </div>

        {/* Designation */}
        <div className="donate-designation">
          <div className="donate-designation-label">Direct my gift to:</div>
          <div className="donate-designation-pills" role="radiogroup" aria-label="Designation">
            {DESIGNATIONS.map(d => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={designation === d}
                className={"donate-designation-pill " + (designation === d ? "is-on" : "")}
                onClick={() => setDesignation(d)}
              >{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Details */}
      <div className="donate-step">
        <div className="donate-step-label">Step 3 &middot; Your details</div>
        <div className="donate-fields">
          <input
            type="text"
            placeholder="Full name"
            aria-label="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email for receipt"
            aria-label="Email for receipt"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <label className="donate-anon">
          <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)}/>
          <span>Donate anonymously &mdash; don&rsquo;t list my name in the annual report.</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-full donate-give-btn">
        Give {formatAmount(amount, currency)} {freq === "monthly" ? "/ month" : "now"}
        <ChromeIcon name="arrow-right" size={16}/>
      </button>
      <p className="donate-form-fineprint">
        Powered by Paystack and Flutterwave. Your card details never touch our servers.
      </p>
    </form>
  );
}

// ---------- impact ladder ----------
function ImpactLadder() {
  return (
    <aside className="donate-impact" aria-label="Where your money goes">
      <span className="eyebrow eyebrow-accent">Where your money goes</span>
      <h2 className="donate-impact-title">Real costs, named.</h2>
      <div className="donate-impact-list">
        {IMPACT.map((it, i) => (
          <div key={i} className={"donate-impact-row " + (it.highlight ? "is-highlight" : "")}>
            <div className="donate-impact-amount">{formatAmount(it.ngn, CURRENCIES[0])}</div>
            <div className="donate-impact-body">
              <div className="donate-impact-label">{it.label}</div>
              <p className="donate-impact-text">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ---------- accountability ----------
function Accountability() {
  return (
    <section className="donate-accountability">
      <div className="container">
        <div className="donate-accountability-card">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="chart-pie" size={12}/>
            How we spend
          </span>
          <div className="donate-spend-grid">
            {SPEND_SPLIT.map((s, i) => (
              <div key={i} className="donate-spend-item">
                <div className="donate-spend-pct">{s.pct}</div>
                <div className="donate-spend-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="donate-spend-foot">
            <p>Independently audited annually. Full financials published in our annual report.</p>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="news-ext-link news-ext-link-on-dark"
              aria-label="Read the 2025 annual report (opens in a new tab when published)"
            >
              <span>Read 2025 report</span>
              <ChromeIcon name="external-link" size={12}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- other ways ----------
function OtherWays() {
  return (
    <section className="donate-other section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Other ways to give</span>
          <h2 className="section-title">Beyond card payments.</h2>
        </header>
        <div className="donate-other-grid">
          {OTHER_WAYS.map((w, i) => (
            <article key={i} className="donate-other-card">
              <div className="donate-other-icon"><ChromeIcon name={w.icon} size={26}/></div>
              <h3 className="donate-other-title">{w.title}</h3>
              <p className="donate-other-body">{w.body}</p>
              {w.block && (
                <div className="donate-other-block">
                  {w.block.map((line, j) => <div key={j}>{line}</div>)}
                </div>
              )}
              {w.cta && (
                <a href={w.cta.href} className="donate-other-cta">
                  <span>{w.cta.label}</span>
                  <ChromeIcon name="arrow-right" size={14}/>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"donate-faq-item " + (open ? "is-open" : "")}>
      <button
        type="button"
        className="donate-faq-q"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>{q}</span>
        <ChromeIcon name={open ? "chevron-up" : "chevron-down"} size={16}/>
      </button>
      {open && (
        <div className="donate-faq-a">{a}</div>
      )}
    </div>
  );
}

function Faq() {
  return (
    <section className="donate-faq section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Questions</span>
          <h2 className="section-title">Things people ask before giving.</h2>
        </header>
        <div className="donate-faq-list">
          {FAQ.map((f, i) => <FaqItem key={i} q={f.q} a={f.a}/>)}
        </div>
      </div>
    </section>
  );
}

// ---------- thank you ----------
function ThankYou() {
  return (
    <section className="donate-thanks">
      <div className="container">
        <div className="donate-thanks-card">
          <div className="donate-thanks-icon">
            <ChromeIcon name="heart" size={32}/>
          </div>
          <div>
            <blockquote className="donate-thanks-quote">
              &ldquo;Whether you give &#8358;5,000 or &#8358;5&nbsp;million &mdash; what matters is that someone in this country wakes up tomorrow with a way forward they didn&rsquo;t have yesterday. Thank you.&rdquo;
            </blockquote>
            <div className="donate-thanks-attribution">
              &mdash; Ambassador Reverend Chukwudi Eke, Founder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function DonateApp() {
  return (
    <div data-screen-label="08 Donate" className="page page-donate">
      <ChromeNav currentPage="donate"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <section className="donate-grid-wrap">
          <div className="container donate-grid">
            <DonationForm/>
            <ImpactLadder/>
          </div>
        </section>
        <Accountability/>
        <OtherWays/>
        <Faq/>
        <ThankYou/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<DonateApp/>);
