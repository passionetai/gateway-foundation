/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B86E40",
  "heroVariant": "light",
  "showHairlines": true
}/*EDITMODE-END*/;

const NAV = [
  { id: "who", label: "Who we are" },
  { id: "vision", label: "Vision & mission" },
  { id: "activities", label: "Activities" },
  { id: "articles", label: "Articles" },
  { id: "news", label: "News" }
];

const smoothTo = id => e => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Icon = ({ name, size, className }) => (
  <i className={`ti ti-${name} ${className || ""}`} style={size ? { fontSize: size } : undefined} aria-hidden="true"/>
);

function Logo({ tone = "default" }) {
  return (
    <a href="#top" className={`logo logo-${tone}`} aria-label="Gateway to Better Life Foundation">
      <span className="logo-mark" aria-hidden="true">
        <Icon name="shield-check" size={18}/>
      </span>
      <span className="logo-text">
        <span className="logo-name">Gateway to Better Life</span>
        <span className="logo-sub">Foundation</span>
      </span>
    </a>
  );
}

// ---------- Nav ----------
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const onClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo/>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={"nav-link " + (active === s.id ? "is-active" : "")}
              onClick={e => onClick(e, s.id)}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a href="#donate" className="btn btn-primary btn-sm" onClick={e => onClick(e, "donate")}>Donate</a>
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {NAV.map(s => (
            <a key={s.id} href={`#${s.id}`} onClick={e => onClick(e, s.id)}>{s.label}</a>
          ))}
          <a href="#donate" className="nav-mobile-cta" onClick={e => onClick(e, "donate")}>Donate</a>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero({ variant }) {
  const dark = variant === "dark";
  return (
    <section id="top" className={"hero " + (dark ? "hero-dark" : "")}>
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true"></span>
            Hope &middot; Recovery &middot; Renewal
          </span>
          <h1 className="hero-title">
            A gateway out of addiction, into a better life.
          </h1>
          <p className="hero-lead">
            We walk alongside individuals, families, and communities affected by drug addiction
            &mdash; through education, support, and recovery pathways grounded in dignity.
          </p>
          <div className="hero-ctas">
            <a href="#donate" className="btn btn-primary" onClick={smoothTo("donate")}>
              Support our work
              <Icon name="arrow-right" size={16}/>
            </a>
            <a href="#activities" className="btn btn-ghost" onClick={smoothTo("activities")}>
              Get help
            </a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Registered</span>
              <span className="hero-meta-value">CAC Nigeria &middot; RC 9103502</span>
            </div>
            <div className="hero-meta-divider" aria-hidden="true"></div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Founded</span>
              <span className="hero-meta-value">December 2025</span>
            </div>
          </div>
        </div>
        <figure className="hero-figure">
          <div className="photo-slot photo-slot-hero" role="img" aria-label="Editorial photograph">
            <div className="photo-overlay" aria-hidden="true"></div>
            <Icon name="photo" size={56} className="photo-icon"/>
            <div className="photo-label">[ photograph: youth, community ]</div>
          </div>
        </figure>
      </div>
    </section>
  );
}

// ---------- Stats ----------
const STATS = [
  { value: "1,200+", label: "Lives reached", sub: "Through outreach and recovery programs" },
  { value: "38", label: "Communities served", sub: "Across Edo, Lagos, and FCT" },
  { value: "14", label: "Active programs", sub: "Prevention, recovery, family, advocacy" },
  { value: "2025", label: "Founded", sub: "Registered with CAC, December 2025" }
];

function Stats() {
  return (
    <section className="stats" aria-label="Impact at a glance">
      <div className="stats-inner">
        <div className="stats-head">
          <span className="eyebrow eyebrow-on-tint">
            <Icon name="trending-up" size={12}/>
            Our work in numbers
          </span>
          <span className="stats-period muted">First-year figures &middot; placeholders</span>
        </div>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Who we are ----------
function Who() {
  return (
    <section id="who" className="who section">
      <div className="container who-grid">
        <div className="who-left">
          <span className="eyebrow eyebrow-accent">Who we are</span>
        </div>
        <div className="who-right">
          <h2 className="who-lede">Built by people who&rsquo;ve walked the road.</h2>
          <p className="who-body">
            Gateway to Better Life Foundation is a non-profit dedicated to preventing drug addiction
            and supporting those in recovery. Founded by survivors, counsellors, and educators, we
            believe better lives begin with honest conversations &mdash; in the classroom, the clinic,
            and the family living room.
          </p>
          <p className="who-body">
            We are non-religious, non-political, and we measure ourselves on outcomes a year out,
            not on attendance at our events.
          </p>
          <div className="who-trustees">
            <div className="who-trustees-label">Board of trustees</div>
            <div className="who-trustees-names">
              Jerry Asemota &nbsp;&middot;&nbsp; Patrick Chiekwe &nbsp;&middot;&nbsp; Ejike Ibe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Vision / Mission ----------
function VisionMission() {
  return (
    <section id="vision" className="vm section">
      <div className="container">
        <div className="vm-head">
          <span className="eyebrow eyebrow-accent">What we stand for</span>
          <h2 className="section-title">Vision &amp; mission.</h2>
        </div>
        <div className="vm-grid">
          <article className="vm-card">
            <div className="vm-icon" aria-hidden="true"><Icon name="eye" size={22}/></div>
            <div className="vm-label">Our vision</div>
            <h3 className="vm-heading">A society where no one is defined by addiction &mdash; where recovery is met with support, not shame.</h3>
          </article>
          <article className="vm-card">
            <div className="vm-icon" aria-hidden="true"><Icon name="target-arrow" size={22}/></div>
            <div className="vm-label">Our mission</div>
            <h3 className="vm-heading">To prevent addiction through education, advocacy, and accessible recovery support across underserved communities.</h3>
          </article>
        </div>
      </div>
    </section>
  );
}

// ---------- Activities ----------
const ACTIVITIES = [
  {
    icon: "school",
    tag: "Prevention",
    title: "School outreach",
    body: "Prevention talks and structured curriculum delivered in secondary schools and youth centres &mdash; paired with teacher training and a parent night.",
    meta: "Ages 12&ndash;18"
  },
  {
    icon: "users-group",
    tag: "Recovery",
    title: "Recovery circles",
    body: "Weekly peer-led support meetings, free to attend, with clinician supervision and a 12-week structured arc plus open-door alumni Saturdays.",
    meta: "Free &middot; weekly"
  },
  {
    icon: "heart-handshake",
    tag: "Family",
    title: "Family support",
    body: "Confidential counselling and a moderated parents&rsquo; network for families navigating a loved one&rsquo;s addiction.",
    meta: "Sliding scale"
  }
];

function Activities() {
  return (
    <section id="activities" className="activities section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">What we do</span>
          <h2 className="section-title">Activities &amp; programs.</h2>
          <p className="section-sub">From the first conversation in a classroom to a stable year after treatment &mdash; we run the long game.</p>
        </header>
        <div className="act-grid">
          {ACTIVITIES.map((a, i) => (
            <article className="act-card" key={i}>
              <div className="act-icon" aria-hidden="true"><Icon name={a.icon} size={24}/></div>
              <div className="act-card-meta">
                <span className="act-tag">{a.tag}</span>
                <span className="act-num">0{i + 1}</span>
              </div>
              <h3 className="act-title">{a.title}</h3>
              <p className="act-body" dangerouslySetInnerHTML={{ __html: a.body }}/>
              <div className="act-foot">
                <span className="act-meta" dangerouslySetInnerHTML={{ __html: a.meta }}/>
                <a href="#" className="act-link" onClick={e => e.preventDefault()}>
                  Learn more
                  <Icon name="arrow-right" size={12}/>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Articles ----------
const ARTICLES = [
  { cat: "Prevention", read: "5 min read", title: "Talking to teens about substances &mdash; without scaring them off." },
  { cat: "Stories", read: "8 min read", title: "What recovery really looks like at month six." },
  { cat: "Field notes", read: "6 min read", title: "Why peer-led circles outperform formal rehab on year-one outcomes." },
  { cat: "Family", read: "4 min read", title: "A short guide for parents who just found something they didn&rsquo;t want to find." }
];

function Articles() {
  return (
    <section id="articles" className="articles section">
      <div className="container">
        <header className="section-head section-head-row">
          <div>
            <span className="eyebrow eyebrow-accent">Articles</span>
            <h2 className="section-title">From our team.</h2>
          </div>
          <a href="#" className="link-arrow" onClick={e => e.preventDefault()}>
            All articles
            <Icon name="arrow-right" size={12}/>
          </a>
        </header>
        <div className="article-grid">
          {ARTICLES.map((a, i) => (
            <a href="#" key={i} className="article-card" onClick={e => e.preventDefault()}>
              <div className="article-meta">
                <span className="article-cat">{a.cat}</span>
                <span className="article-dot" aria-hidden="true">&middot;</span>
                <span className="article-read">{a.read}</span>
              </div>
              <h3 className="article-title" dangerouslySetInnerHTML={{ __html: a.title }}/>
              <div className="article-foot">
                <span>Read article</span>
                <Icon name="arrow-up-right" size={14}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- News ----------
const NEWS = [
  { source: "Reuters", date: "2d ago", title: "Nigeria expands rehabilitation access in three states amid rising opioid use." },
  { source: "UNODC", date: "1w ago", title: "UN report on global youth substance-use trends &mdash; 2026 outlook." },
  { source: "The Lancet", date: "2w ago", title: "Community-based recovery outperforms residential rehab on 12-month outcomes." },
  { source: "BBC Africa", date: "3w ago", title: "NDLEA seizes record consignment of tramadol at Lagos port." },
  { source: "Guardian NG", date: "1mo ago", title: "Edo state pilots peer-recovery model first piloted by Lagos charities." }
];

function News() {
  return (
    <section id="news" className="news section">
      <div className="container">
        <header className="section-head section-head-row">
          <div>
            <span className="eyebrow eyebrow-accent">Global news</span>
            <h2 className="section-title">Anti-drug movement.</h2>
            <p className="section-sub" style={{ marginTop: 12 }}>A curated weekly digest of what&rsquo;s moving in policy, treatment, and research worldwide.</p>
          </div>
          <a href="#" className="link-arrow" onClick={e => e.preventDefault()}>
            Subscribe to digest
            <Icon name="arrow-right" size={12}/>
          </a>
        </header>
        <ul className="news-list">
          {NEWS.map((n, i) => (
            <li key={i} className="news-item">
              <a href="#" onClick={e => e.preventDefault()}>
                <div className="news-body">
                  <div className="news-meta">
                    <span className="news-source">{n.source}</span>
                    <span className="news-dot" aria-hidden="true">&middot;</span>
                    <span className="news-date">{n.date}</span>
                  </div>
                  <div className="news-title" dangerouslySetInnerHTML={{ __html: n.title }}/>
                </div>
                <Icon name="arrow-up-right" size={16} className="news-arrow"/>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Donate ----------
const PRESETS = [
  { value: 25, helper: "Funds a school outreach kit" },
  { value: 50, helper: "Sponsors one recovery-circle week" },
  { value: 100, helper: "Underwrites a family counselling session" }
];

function Donate() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [freq, setFreq] = useState("once");

  const pickPreset = v => {
    setAmount(v);
    setCustom("");
  };
  const onCustom = e => {
    const v = e.target.value.replace(/[^\d]/g, "");
    setCustom(v);
    setAmount(v ? parseInt(v, 10) : 0);
  };

  const displayAmount = amount && amount > 0 ? `$${amount.toLocaleString()}` : "$0";
  const activeHelper = !custom ? (PRESETS.find(p => p.value === amount) || {}).helper : null;

  return (
    <section id="donate" className="donate">
      <div className="donate-inner">
        <div className="donate-left">
          <span className="eyebrow eyebrow-on-dark">
            <Icon name="heart" size={12}/>
            Support our work
          </span>
          <h2 className="donate-title">Help us open another gateway.</h2>
          <p className="donate-sub">
            Every contribution funds counselling, outreach, and recovery support
            for someone who needs a way through. We publish a full financial report each year.
          </p>
          <ul className="donate-trust">
            <li>
              <Icon name="check" size={14}/>
              Registered with the Federal Republic of Nigeria &middot; RC 9103502
            </li>
            <li>
              <Icon name="check" size={14}/>
              Funds routed directly to program operations
            </li>
            <li>
              <Icon name="check" size={14}/>
              Audited annually &middot; reports published openly
            </li>
          </ul>
        </div>

        <form className="donate-card" onSubmit={e => e.preventDefault()}>
          <div className="donate-freq" role="tablist" aria-label="Donation frequency">
            <button type="button" role="tab" aria-selected={freq === "once"} className={freq === "once" ? "is-on" : ""} onClick={() => setFreq("once")}>Once</button>
            <button type="button" role="tab" aria-selected={freq === "monthly"} className={freq === "monthly" ? "is-on" : ""} onClick={() => setFreq("monthly")}>Monthly</button>
          </div>

          <div className="donate-presets">
            {PRESETS.map(p => (
              <button
                type="button"
                key={p.value}
                className={"preset " + (amount === p.value && !custom ? "is-on" : "")}
                onClick={() => pickPreset(p.value)}
              >
                ${p.value}
              </button>
            ))}
          </div>

          {activeHelper && <div className="donate-helper">{activeHelper}</div>}

          <label className="donate-custom">
            <span className="donate-custom-label">Or enter a custom amount</span>
            <div className="donate-custom-field">
              <span className="donate-custom-prefix">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={custom}
                onChange={onCustom}
                placeholder="Custom amount"
                aria-label="Custom donation amount"
              />
            </div>
          </label>

          <button type="submit" className="btn btn-cream btn-full">
            Donate {displayAmount}{freq === "monthly" ? " / month" : ""}
            <Icon name="arrow-right" size={16}/>
          </button>

          <div className="donate-methods">
            <span>Secured by</span>
            <span className="donate-method-pill">Paystack</span>
            <span className="donate-method-pill">Flutterwave</span>
            <span className="donate-method-pill">Stripe</span>
          </div>
        </form>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo tone="dark"/>
            <p className="footer-tag">
              Prevention. Recovery. Advocacy. <br/>
              Better lives begin with honest conversations.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <div className="footer-col-head">Foundation</div>
              <a href="#who" onClick={smoothTo("who")}>Who we are</a>
              <a href="#vision" onClick={smoothTo("vision")}>Vision &amp; mission</a>
              <a href="#" onClick={e => e.preventDefault()}>Annual report</a>
              <a href="#" onClick={e => e.preventDefault()}>Careers &amp; volunteer</a>
            </div>
            <div>
              <div className="footer-col-head">Programs</div>
              <a href="#activities" onClick={smoothTo("activities")}>School outreach</a>
              <a href="#activities" onClick={smoothTo("activities")}>Recovery circles</a>
              <a href="#activities" onClick={smoothTo("activities")}>Family support</a>
              <a href="#" onClick={e => e.preventDefault()}>Refer someone</a>
            </div>
            <div>
              <div className="footer-col-head">Contact</div>
              <a href="mailto:hello@gatewaytobetterlife.org">hello@gatewaytobetterlife.org</a>
              <a href="tel:+2348000000000">+234 800 000 0000</a>
              <span className="footer-addr">Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="footer-registration">
          <div className="footer-reg-row">
            <div className="footer-reg-item">
              <span className="footer-reg-label">Registration</span>
              <span className="footer-reg-value">RC 9103502</span>
            </div>
            <div className="footer-reg-item">
              <span className="footer-reg-label">Authority</span>
              <span className="footer-reg-value">CAC, Federal Republic of Nigeria</span>
            </div>
            <div className="footer-reg-item">
              <span className="footer-reg-label">Date of incorporation</span>
              <span className="footer-reg-value">20 December 2025</span>
            </div>
            <div className="footer-reg-item">
              <span className="footer-reg-label">Trustees</span>
              <span className="footer-reg-value">Jerry Asemota, Patrick Chiekwe, Ejike Ibe</span>
            </div>
          </div>
        </div>

        <div className="footer-rule" aria-hidden="true"></div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 Gateway to Better Life Foundation. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#" onClick={e => e.preventDefault()}>Privacy</a>
            <a href="#" onClick={e => e.preventDefault()}>Terms</a>
            <a href="#" onClick={e => e.preventDefault()}>Financials</a>
          </div>
          <div className="footer-social" aria-label="Social">
            <a href="#" onClick={e => e.preventDefault()} aria-label="Facebook"><Icon name="brand-facebook" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="Instagram"><Icon name="brand-instagram" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="Twitter / X"><Icon name="brand-x" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="LinkedIn"><Icon name="brand-linkedin" size={16}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("who");

  useEffect(() => {
    const ids = NAV.map(n => n.id).concat("donate");
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--hairline-strength", t.showHairlines ? "0.15" : "0.06");
  }, [t]);

  return (
    <div data-screen-label="01 Foundation site" className={"page " + (t.heroVariant === "dark" ? "hero-mode-dark" : "")}>
      <Nav active={active}/>
      <main>
        <Hero variant={t.heroVariant}/>
        <Stats/>
        <Who/>
        <VisionMission/>
        <Activities/>
        <Articles/>
        <News/>
        <Donate/>
      </main>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent"/>
        <TweakColor
          label="Accent color"
          value={t.accent}
          onChange={v => setTweak("accent", v)}
          options={["#B86E40", "#6E8E5C", "#2C5F6B", "#8A5A3B", "#A24A4A"]}
        />
        <TweakSection label="Hero"/>
        <TweakRadio
          label="Hero variant"
          value={t.heroVariant}
          onChange={v => setTweak("heroVariant", v)}
          options={["light", "dark"]}
        />
        <TweakSection label="Detail"/>
        <TweakToggle
          label="Visible hairlines"
          value={t.showHairlines}
          onChange={v => setTweak("showHairlines", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
