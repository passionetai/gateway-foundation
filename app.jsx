/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, ChromeIcon, ChromeNav, ChromeFooter */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B86E40",
  "heroVariant": "light",
  "showHairlines": true
}/*EDITMODE-END*/;

const smoothTo = id => e => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Icon = ChromeIcon;

// ---------- Hero ----------
function Hero({ variant }) {
  const dark = variant === "dark";
  return (
    <section id="top" className={"hero " + (dark ? "hero-dark" : "")}>
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true"></span>
            Rescue &middot; Rehabilitate &middot; Rebuild
          </span>
          <h1 className="hero-title">
            A gateway out of drug abuse and trafficking, into a better life.
          </h1>
          <p className="hero-lead">
            We rescue, rehabilitate, and empower victims of drug abuse and sex trafficking
            &mdash; through awareness, intervention, and a structured path back to dignity.
          </p>
          <div className="hero-ctas">
            <a href="Who%20we%20are.html#contact" className="btn btn-primary">
              Support our work
              <Icon name="arrow-right" size={16}/>
            </a>
            <a href="#activities" className="btn btn-ghost" onClick={smoothTo("activities")}>
              Get help
            </a>
          </div>
        </div>
        <figure className="hero-figure">
          <div className="photo-slot photo-slot-hero" role="img" aria-label="Hero image">
            <img src="images/heroimage.png" alt="Gateway to Better Life Foundation" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}/>
          </div>
        </figure>
      </div>
    </section>
  );
}

// ---------- Two pillars ----------
function Pillars() {
  return (
    <section id="vision" className="pillars section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Our focus</span>
          <h2 className="section-title">Two crises, one mission.</h2>
          <p className="section-sub">We exist where drug abuse and human trafficking overlap &mdash; the same vulnerable young people are targeted by both, and they deserve a single, joined-up response.</p>
        </header>
        <div className="pillars-grid">
          <article className="pillar pillar-green">
            <div className="pillar-icon"><Icon name="pill-off" size={26}/></div>
            <h3 className="pillar-title">Drug abuse & addiction</h3>
            <p className="pillar-body">
              We expose the dangers of substance-use disorders, rescue those caught in addiction,
              and walk them through detox, rehabilitation, and re-entry into life.
            </p>
            <ul className="pillar-tags">
              <li>Awareness</li>
              <li>Rescue</li>
              <li>Recovery</li>
            </ul>
          </article>
          <article className="pillar pillar-clay">
            <div className="pillar-icon"><Icon name="hand-stop" size={26}/></div>
            <h3 className="pillar-title">Sex trafficking</h3>
            <p className="pillar-body">
              We rescue victims of trafficking and provide safe shelter, counselling, re-orientation,
              and the vocational training needed to reclaim a future.
            </p>
            <ul className="pillar-tags">
              <li>Shelter</li>
              <li>Counselling</li>
              <li>Reintegration</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

// ---------- Intervention pathway ----------
const STEPS = [
  { n: 1, label: "Detox", body: "Medical withdrawal under qualified care.", icon: "stethoscope" },
  { n: 2, label: "Rehab", body: "Counselling, therapy, and group work.", icon: "heart-rate-monitor" },
  { n: 3, label: "Shelter", body: "Safe transitional housing.", icon: "home" },
  { n: 4, label: "Re-orientation", body: "Values, identity, and life skills.", icon: "compass" },
  { n: 5, label: "Training", body: "Vocational skill-building.", icon: "tools" },
  { n: 6, label: "Empowerment", body: "Job placement and alumni support.", icon: "sparkles", highlight: true }
];

function Pathway() {
  return (
    <section id="activities" className="pathway">
      <div className="pathway-inner">
        <header className="pathway-head">
          <span className="eyebrow eyebrow-on-dark">
            <Icon name="route" size={12}/>
            Our intervention pathway
          </span>
          <h2 className="pathway-title">From rescue to a rebuilt life &mdash; six structured steps.</h2>
          <p className="pathway-sub">No one is dropped between stages. Each step has trained staff, a clear outcome, and a hand-off into the next.</p>
        </header>

        <div className="pathway-steps" role="list">
          <div className="pathway-line" aria-hidden="true"></div>
          {STEPS.map(s => (
            <div key={s.n} role="listitem" className={"step " + (s.highlight ? "step-highlight" : "")}>
              <div className="step-node">
                <span className="step-num">{s.n}</span>
              </div>
              <div className="step-label">{s.label}</div>
              <div className="step-body">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="pathway-foot">
          <div className="pathway-foot-item">
            <span className="pathway-foot-label">Average time, end to end</span>
            <span className="pathway-foot-value">9&ndash;12 months</span>
          </div>
          <div className="pathway-foot-item">
            <span className="pathway-foot-label">Staffed by</span>
            <span className="pathway-foot-value">Clinicians, counsellors, social workers, vocational trainers</span>
          </div>
          <a href="Who%20we%20are.html#contact" className="btn btn-cream">
            Fund a place
            <Icon name="arrow-right" size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Stats ----------
const STATS = [
  { value: "1,200+", label: "Lives reached", sub: "Through awareness, rescue, and recovery" },
  { value: "38", label: "Communities served", sub: "Across Edo, Lagos, and FCT" },
  { value: "14", label: "Active programs", sub: "Prevention, recovery, shelter, advocacy" },
  { value: "15", label: "Awareness films", sub: "Documentaries, shorts & social content" }
];

function Stats() {
  return (
    <section className="stats" aria-label="Our work in numbers">
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

// ---------- Who ----------
function Who() {
  return (
    <section id="who" className="who section">
      <div className="container who-grid">
        <div className="who-left">
          <span className="eyebrow eyebrow-accent">Who we are</span>
        </div>
        <div className="who-right">
          <h2 className="who-lede">A registered Nigerian foundation, built around dignity.</h2>
          <p className="who-body">
            Gateway to Better Life Foundation is led by faith leaders, professionals, and survivors who
            believe rescue is just the first step &mdash; restoration is the goal. We are accountable to the communities we serve.
          </p>
          <p className="who-body">
            We are independent of political affiliation, transparent on outcomes, and committed to
            measuring ourselves a year after someone leaves our care &mdash; not on the day they arrive.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Films ----------
const FILMS = [
  { title: "The Bad Influence", duration: "3 min", tag: "Drama", desc: "A young man already struggling through a rough patch is drawn into drugs by someone he trusted as a friend — a sobering look at how peer pressure quietly turns pain into addiction.", video: "video/badfriend (1).mp4" },
  { title: "Voices of Faith", duration: "3 min", tag: "Faith", desc: "Christian leaders speak out against the twin evils of sexual trafficking and drug abuse, urging families and congregations to protect the vulnerable around them.", video: "video/menoffaithagainstabuse (1).mp4" },
  { title: "A Word to the Youth", duration: "3 min", tag: "Awareness", desc: "Peer-to-peer, plain-spoken: a young man speaks directly to other young people about the real cost of drug abuse — and why walking away is strength, not weakness.", video: "video/adviceguy (1).mp4" }
];

function Films() {
  const [playing, setPlaying] = useState(null);

  return (
    <section className="films section">
      <div className="container">
        <header className="section-head section-head-row">
          <div>
            <span className="eyebrow eyebrow-accent">Awareness through story</span>
            <h2 className="section-title">Short films & multimedia.</h2>
            <p className="section-sub" style={{ marginTop: 12 }}>
              We produce documentary shorts, dramatised scenarios, and social content to expose what
              hides behind closed doors &mdash; and reach the people who need to hear it most.
            </p>
          </div>
          <a href="Media.html" className="link-arrow">
            All films
            <Icon name="arrow-right" size={12}/>
          </a>
        </header>
        <div className="films-grid">
          {FILMS.map((f, i) => (
            <div key={i} className="film" onClick={() => setPlaying(playing === i ? null : i)} style={{ cursor: 'pointer' }}>
              <div className="film-thumb">
                {playing === i ? (
                  <video controls autoPlay style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }}>
                    <source src={f.video} type="video/mp4"/>
                  </video>
                ) : (
                  <>
                    <video
                      muted
                      playsInline
                      preload="metadata"
                      src={`${f.video}#t=1.5`}
                      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }}
                    />
                    <div className="film-overlay" aria-hidden="true"></div>
                    <div className="film-play" aria-hidden="true">
                      <Icon name="player-play-filled" size={18}/>
                    </div>
                    <span className="film-tag">{f.tag}</span>
                  </>
                )}
              </div>
              <div className="film-meta">
                <h3 className="film-title">{f.title}</h3>
                <p className="film-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Articles + News (combined) ----------
const ARTICLES = [
  { cat: "Prevention", read: "5 min read", title: "Talking to teens about substances &mdash; without scaring them off." },
  { cat: "Advocacy", read: "7 min read", title: "How trafficking recruiters operate online." },
  { cat: "Stories", read: "8 min read", title: "What recovery really looks like at month six." },
  { cat: "Family", read: "4 min read", title: "A short guide for parents who just found something they didn&rsquo;t want to find." }
];

const NEWS = [
  { source: "Premium Times", date: "2d ago", title: "NAPTIP rescues 22 women in Edo operation." },
  { source: "UNODC", date: "1w ago", title: "UN report on youth substance trends &mdash; 2026 outlook." },
  { source: "Reuters", date: "2w ago", title: "Nigeria expands rehabilitation access in three states." },
  { source: "The Lancet", date: "3w ago", title: "Community-based recovery outperforms residential rehab on year-one outcomes." },
  { source: "BBC Africa", date: "1mo ago", title: "NDLEA seizes record consignment of tramadol at Lagos port." }
];

function ArticlesNews() {
  return (
    <section className="an section">
      <div className="container an-grid">
        <div id="articles" className="an-articles">
          <header className="an-head">
            <span className="eyebrow eyebrow-accent">Articles</span>
            <h2 className="section-title">From our team.</h2>
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

        <aside id="news" className="an-news">
          <header className="an-head">
            <span className="eyebrow eyebrow-accent">Global news</span>
            <h2 className="section-title an-news-title">Anti-drug & anti-trafficking.</h2>
          </header>
          <ul className="news-list">
            {NEWS.map((n, i) => (
              <li key={i} className="news-item">
                <a href="#" onClick={e => e.preventDefault()}>
                  <div className="news-meta">
                    <span className="news-source">{n.source}</span>
                    <span className="news-dot" aria-hidden="true">&middot;</span>
                    <span className="news-date">{n.date}</span>
                  </div>
                  <div className="news-title" dangerouslySetInnerHTML={{ __html: n.title }}/>
                </a>
              </li>
            ))}
          </ul>
          <a href="#" className="news-more" onClick={e => e.preventDefault()}>
            Subscribe to weekly digest
            <Icon name="arrow-right" size={12}/>
          </a>
        </aside>
      </div>
    </section>
  );
}

// ---------- Donate ----------
function Donate() {
  return (
    <section id="donate" className="donate">
      <div className="donate-inner">
        <div className="donate-left">
          <span className="eyebrow eyebrow-on-dark">
            <Icon name="heart" size={12}/>
            Support our work
          </span>
          <h2 className="donate-title">Fund a rescue. Fund a future.</h2>
          <p className="donate-sub">
            Your contribution funds detox beds, shelter nights, counselling sessions, and the
            vocational training that closes the loop &mdash; from rescue to rebuilt life.
          </p>
          <ul className="donate-trust">
            <li><Icon name="check" size={14}/> Funds routed directly to program operations</li>
            <li><Icon name="check" size={14}/> Audited annually &middot; reports published openly</li>
          </ul>
        </div>

        <div className="donate-card">
          <h3 style={{ color: 'var(--cream)', fontSize: '20px', fontWeight: 500, margin: 0 }}>Get in touch with us</h3>
          <p style={{ color: 'rgba(250, 246, 236, 0.74)', fontSize: '15px', lineHeight: 1.6 }}>
            Interested in supporting our work? Reach out to us directly and we'll get back to you.
          </p>
          <a href="Who%20we%20are.html#contact" className="btn btn-cream btn-full">
            Contact us
            <Icon name="arrow-right" size={16}/>
          </a>
          <div className="donate-methods">
            <span>Or call us at</span>
            <span className="donate-method-pill">+1 617 401 5060</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("who");

  useEffect(() => {
    const ids = ["vision", "activities", "articles", "news", "donate"];
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
      <ChromeNav currentPage="home" activeAnchor={active}/>
      <main>
        <Hero variant={t.heroVariant}/>
        <Pillars/>
        <Pathway/>
        <Stats/>
        <Who/>
        <Films/>
        <ArticlesNews/>
        <Donate/>
      </main>
      <ChromeFooter/>

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
