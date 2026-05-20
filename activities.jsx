/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */
const { useState, useEffect, useMemo } = React;

const STEPS = [
  { n: 1, label: "Detox",          body: "Medical withdrawal under qualified care." },
  { n: 2, label: "Rehab",          body: "Counselling, therapy, and group work." },
  { n: 3, label: "Shelter",        body: "Safe transitional housing." },
  { n: 4, label: "Re-orientation", body: "Values, identity, and life skills." },
  { n: 5, label: "Training",       body: "Vocational skill-building." },
  { n: 6, label: "Empowerment",    body: "Job placement and alumni support.", highlight: true }
];

const TABS = [
  { key: "all",      label: "All programs" },
  { key: "drugs",    label: "Drug abuse" },
  { key: "traffic",  label: "Sex trafficking" },
  { key: "media",    label: "Awareness & films" }
];

const DRUG_PROGRAMS = [
  { icon: "stethoscope",     tag: "Detox",      title: "Medical detox program",  body: "Supervised withdrawal in partnership with licensed medical facilities. Free for indigent cases.", meta: "Partner clinics · 7–14 days" },
  { icon: "users-group",     tag: "Rehab",      title: "Recovery circles",       body: "Weekly peer-led counselling and therapy groups, held in community centres.",                  meta: "Lagos · Ibadan · Abeokuta" },
  { icon: "school",          tag: "Awareness",  title: "School outreach",        body: "Prevention talks in secondary schools, exposing the dangers of substance-use disorders.",     meta: "62 partner schools · 3 states" },
  { icon: "heart-handshake", tag: "Family",     title: "Family counselling",     body: "Support sessions for families navigating a loved one's addiction or relapse.",                meta: "Mon–Fri · Confidential" }
];

const TRAFFIC_PROGRAMS = [
  { icon: "home-shield",     tag: "Shelter",         title: "Safe house program",                body: "Secure, undisclosed shelter for rescued survivors, with 24/7 staff and trauma-informed care.", meta: "Location protected · 18 beds" },
  { icon: "brain",           tag: "Re-orientation",  title: "Trauma counselling & life skills",  body: "One-on-one therapy and structured re-orientation for survivors reclaiming agency.",            meta: "Licensed counsellors" },
  { icon: "briefcase",       tag: "Empowerment",     title: "Vocational training",                body: "Tailoring, catering, hairdressing, and digital skills — paired with job placement.",          meta: "90-day cohorts" },
  { icon: "microphone-2",    tag: "Advocacy",        title: "Anti-trafficking advocacy",         body: "Working with NAPTIP and local authorities on policy, prevention campaigns, and rescue operations.", meta: "Nationwide" }
];

const FILMS = [
  { title: "The road back",       duration: "12 min", category: "Drug abuse",  catKey: "drugs" },
  { title: "Behind the promise",  duration: "8 min",  category: "Trafficking", catKey: "traffic" },
  { title: "One year later",      duration: "6 min",  category: "Both",        catKey: "both" }
];

// ---------- breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Activities</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- page header ----------
function PageHeader() {
  return (
    <section className="act-header">
      <div className="container act-header-grid">
        <div>
          <span className="eyebrow eyebrow-accent">What we do</span>
          <h1 className="page-title act-page-title">
            Awareness, rescue, and the long road back.
          </h1>
          <p className="act-lead">
            Our programs span two crises &mdash; drug abuse and sex trafficking &mdash; and follow the same
            pathway: rescue the person, restore their dignity, equip them to rebuild.
          </p>
        </div>
        <aside className="act-ministats" aria-label="Program counts">
          <div className="act-ministat">
            <span className="act-ministat-label">Drug-abuse programs</span>
            <span className="act-ministat-value">8</span>
          </div>
          <div className="act-ministat">
            <span className="act-ministat-label">Trafficking programs</span>
            <span className="act-ministat-value">6</span>
          </div>
          <div className="act-ministat">
            <span className="act-ministat-label">Films produced</span>
            <span className="act-ministat-value">12</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------- tabs ----------
function Tabs({ value, onChange }) {
  return (
    <div className="act-tabs-wrap">
      <div className="container">
        <div className="act-tabs" role="tablist" aria-label="Program filter">
          {TABS.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={value === t.key}
              className={"act-tab " + (value === t.key ? "is-active" : "")}
              onClick={() => onChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- pathway ----------
function Pathway() {
  return (
    <section className="pathway pathway-act">
      <div className="pathway-inner">
        <header className="pathway-head">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="route" size={12}/>
            The pathway
          </span>
          <h2 className="pathway-title">Six steps. Every victim. No one dropped between.</h2>
          <p className="pathway-sub">
            The same intervention model applies whether someone comes to us from addiction or from
            trafficking. The needs differ &mdash; the structure doesn&rsquo;t.
          </p>
        </header>
        <div className="pathway-steps" role="list">
          <div className="pathway-line" aria-hidden="true"></div>
          {STEPS.map(s => (
            <div key={s.n} role="listitem" className={"step " + (s.highlight ? "step-highlight" : "")}>
              <div className="step-node"><span className="step-num">{s.n}</span></div>
              <div className="step-label">{s.label}</div>
              <div className="step-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- pillar banner ----------
function PillarBanner({ tone, eyebrow, title, icon }) {
  return (
    <div className={"pillar-banner pillar-banner-" + tone}>
      <div className="pillar-banner-icon"><ChromeIcon name={icon} size={26}/></div>
      <div className="pillar-banner-meta">
        <span className="pillar-banner-eyebrow">{eyebrow}</span>
        <span className="pillar-banner-title">{title}</span>
      </div>
    </div>
  );
}

// ---------- program card ----------
function ProgramCard({ tone, p }) {
  return (
    <article className={"program-card program-card-" + tone}>
      <div className="program-card-top">
        <div className="program-icon"><ChromeIcon name={p.icon} size={24}/></div>
        <span className="program-tag">{p.tag}</span>
      </div>
      <h3 className="program-title">{p.title}</h3>
      <p className="program-body">{p.body}</p>
      <div className="program-meta">{p.meta}</div>
    </article>
  );
}

// ---------- pillar section ----------
function PillarSection({ id, tone, eyebrow, title, icon, programs }) {
  return (
    <section id={id} className="pillar-section">
      <div className="container">
        <PillarBanner tone={tone} eyebrow={eyebrow} title={title} icon={icon}/>
        <div className="program-grid">
          {programs.map((p, i) => <ProgramCard key={i} tone={tone} p={p}/>)}
        </div>
      </div>
    </section>
  );
}

// ---------- films ----------
function FilmsSection() {
  return (
    <section id="films" className="films-section">
      <div className="container">
        <PillarBanner tone="green" eyebrow="Cross-cutting" title="Awareness through short films & media" icon="movie"/>
        <p className="films-lede">
          We produce documentary shorts, dramatised scenarios, and social-first content that exposes
          what hides behind closed doors &mdash; and reaches the people who need to hear it most.
        </p>
        <div className="films-grid films-grid-act">
          {FILMS.map((f, i) => (
            <a key={i} href="#" className="film" onClick={e => e.preventDefault()}>
              <div className="film-thumb">
                <div className="film-overlay" aria-hidden="true"></div>
                <div className="film-play" aria-hidden="true">
                  <ChromeIcon name="player-play-filled" size={18}/>
                </div>
                <span className="film-tag">{f.category}</span>
                <span className="film-duration">{f.title} &middot; {f.duration}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- survivor quote ----------
function SurvivorStory() {
  return (
    <section className="survivor section">
      <div className="container">
        <article className="survivor-card">
          <div className="survivor-portrait" aria-hidden="true">
            <ChromeIcon name="user" size={48}/>
            <span className="survivor-portrait-label">[ portrait withheld ]</span>
          </div>
          <div className="survivor-body">
            <span className="eyebrow eyebrow-accent">Survivor story</span>
            <blockquote className="survivor-quote">
              &ldquo;They didn&rsquo;t just take me out of that house. They sat with me until I could imagine
              a life again. Now I run my own tailoring shop.&rdquo;
            </blockquote>
            <div className="survivor-attribution">
              &mdash; Survivor, safe-house alumna <span className="muted">(name withheld for safety)</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

// ---------- get involved ----------
const INVOLVE = [
  { icon: "hand-heart",  title: "Volunteer",       body: "Counsellors, mentors, trainers — we need all of you.", cta: "Apply to volunteer" },
  { icon: "coin",        title: "Donate",          body: "Fund a bed, a session, a rescue, a training cohort.",   cta: "Make a donation" },
  { icon: "phone-call",  title: "Report a case",   body: "If you or someone you know needs help, reach us confidentially.", cta: "Confidential helpline" }
];

function GetInvolved() {
  return (
    <section className="involve">
      <div className="involve-inner">
        <header className="involve-head">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="users-plus" size={12}/>
            Get involved
          </span>
          <h2 className="involve-title">Three ways to help us keep the gateway open.</h2>
        </header>
        <div className="involve-grid">
          {INVOLVE.map((it, i) => (
            <a key={i} href="#" className="involve-card" onClick={e => e.preventDefault()}>
              <div className="involve-icon"><ChromeIcon name={it.icon} size={28}/></div>
              <h3 className="involve-card-title">{it.title}</h3>
              <p className="involve-card-body">{it.body}</p>
              <div className="involve-card-cta">
                {it.cta}
                <ChromeIcon name="arrow-right" size={14}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function ActivitiesApp() {
  // tab routing via hash
  const tabFromHash = () => {
    const h = (window.location.hash || "").replace("#", "");
    return TABS.find(t => t.key === h) ? h : "all";
  };
  const [tab, setTab] = useState(tabFromHash);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setTabAndHash = (key) => {
    setTab(key);
    if (key === "all") {
      history.replaceState(null, "", window.location.pathname);
    } else {
      history.replaceState(null, "", "#" + key);
    }
  };

  const show = useMemo(() => ({
    pathway: tab === "all",
    drugs:   tab === "all" || tab === "drugs",
    traffic: tab === "all" || tab === "traffic",
    media:   tab === "all" || tab === "media"
  }), [tab]);

  return (
    <div data-screen-label="03 Activities" className="page page-act">
      <ChromeNav currentPage="activities"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <Tabs value={tab} onChange={setTabAndHash}/>

        {show.pathway && <Pathway/>}

        {show.drugs && (
          <PillarSection
            id="drugs"
            tone="green"
            eyebrow="Pillar one"
            title="Drug abuse & addiction"
            icon="pill-off"
            programs={DRUG_PROGRAMS}
          />
        )}

        {show.traffic && (
          <PillarSection
            id="traffic"
            tone="clay"
            eyebrow="Pillar two"
            title="Sex trafficking rescue & restoration"
            icon="hand-stop"
            programs={TRAFFIC_PROGRAMS}
          />
        )}

        {show.media && <FilmsSection/>}
        {tab === "all" && <SurvivorStory/>}

        <GetInvolved/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ActivitiesApp/>);
