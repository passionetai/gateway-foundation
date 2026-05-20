/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */
const { useState, useRef, useEffect } = React;

/* ──────────────────────────────────────────────────────────────────────
   EDITABLE — update weekly when the feed is refreshed.
   ────────────────────────────────────────────────────────────────────── */
const WEEK_OF = "Week of 18 May 2026";

/* Filter tabs. Each story's `categories` array is intersected with the
   active tab's `match` array. "all" matches everything. */
const TABS = [
  { key: "all",       label: "All stories",    match: null },
  { key: "drugs",     label: "Drug abuse",     match: ["drugs"] },
  { key: "traffic",   label: "Sex trafficking",match: ["traffic"] },
  { key: "nigeria",   label: "Nigeria",        match: ["nigeria"] },
  { key: "global",    label: "Global",         match: ["global"] }
];

const FEATURED = {
  source: "Guardian Nigeria",
  url: "https://guardian.ng/news/nigeria/metro/billionaire-drug-baron-arrested-as-ndlea-dismantles-global-laundering-network/",
  date: "12 May 2026",
  location: "Nigeria \u00B7 Drug enforcement",
  title: "Billionaire drug baron arrested as NDLEA dismantles global laundering network",
  excerpt: "NDLEA, working with the US DEA and partners in Switzerland, France, and Greece, dismantled a transnational criminal organisation moving hundreds of billions of naira through drug-money-laundering operations. Three arrests across two continents.",
  tags: ["Drug abuse", "Nigeria", "Enforcement"],
  categoryTone: "green"
};

const STORIES = [
  {
    source: "The Daily Signal",
    url: "https://www.dailysignal.com/2026/05/18/hhs-program-missing-foster-children/",
    title: "HHS launches Operation Hope to rescue missing foster children before traffickers reach them",
    excerpt: "A new pilot program in Mississippi has already located 13 missing foster children. About 60% of all child sex-trafficking victims have spent time in the child-welfare system.",
    location: "USA",
    date: "18 May 2026",
    tag: "Trafficking",
    tone: "clay",
    categories: ["traffic", "global"]
  },
  {
    source: "Blueprint Newspapers",
    url: "https://blueprint.ng/ndlea-arrests-170-suspected-drug-traffickers-seizes-130kg-illicit-drugs-in-ebonyi/",
    title: "NDLEA arrests 170 suspected drug traffickers in Ebonyi sweep",
    excerpt: "Operatives seized more than 130 kilograms of illicit substances across the state in a Q1 crackdown \u2014 146 male and 24 female suspects detained.",
    location: "Nigeria",
    date: "16 May 2026",
    tag: "Drug abuse",
    tone: "green",
    categories: ["drugs", "nigeria"]
  },
  {
    source: "OPB \u00B7 Portland.gov",
    url: "https://www.opb.org/article/2026/05/07/portland-oregon-crime-human-trafficking-operation/",
    title: "Portland police rescue 6 teenage girls being sex trafficked along 82nd Avenue",
    excerpt: "The girls, aged 13 to 17, were recovered over three weeks. Local advocacy group Safety Compass reports 73% of trafficking cases assisted last month involved minors \u2014 a sharp jump from their usual 50%.",
    location: "USA",
    date: "7 May 2026",
    tag: "Trafficking",
    tone: "clay",
    categories: ["traffic", "global"]
  },
  {
    source: "International Rescue Committee",
    url: "https://www.rescue.org/press-release/irc-collaborates-hpe-launch-sarah-agentic-ai-tool-helping-survivors-human-trafficking",
    title: "IRC launches \u201CSarah,\u201D an AI career coach for trafficking survivors",
    excerpt: "The International Rescue Committee, partnering with HPE, has launched a trauma-informed AI tool to help survivors rebuild careers and avoid re-trafficking \u2014 available 24/7 in a private, secure interface.",
    location: "Global",
    date: "7 May 2026",
    tag: "Trafficking",
    tone: "clay",
    categories: ["traffic", "global"]
  },
  {
    source: "CDC Overdose Prevention",
    url: "https://www.cdc.gov/overdose-prevention/data-research/facts-stats/index.html",
    title: "CDC reports 13.9% decline in US overdose deaths for 2025",
    excerpt: "Preliminary data predicts 69,973 overdose deaths for the 12 months ending December 2025 \u2014 a meaningful drop credited to wider treatment access, though fentanyl and emerging adulterants like xylazine remain serious threats.",
    location: "USA",
    date: "13 May 2026",
    tag: "Drug abuse",
    tone: "green",
    categories: ["drugs", "global"]
  },
  {
    source: "PRNigeria News",
    url: "https://prnigeria.com/2026/05/14/troops-ndlea-disrupt-drug/",
    title: "Troops and NDLEA disrupt drug and ammunition supply networks linked to terrorists",
    excerpt: "Joint operations in Katsina and Yobe states surfaced the deepening link between illicit drug distribution and armed groups operating across northern Nigeria.",
    location: "Nigeria",
    date: "14 May 2026",
    tag: "Drug abuse",
    tone: "green",
    categories: ["drugs", "nigeria"]
  }
];

const Ext = ({ href, children, className, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

// ---------- breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Global news</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- page header ----------
function PageHeader() {
  return (
    <section className="news-header">
      <div className="container news-header-grid">
        <div>
          <span className="eyebrow eyebrow-accent">Curated world news</span>
          <h1 className="page-title">What&rsquo;s happening in the fight against drugs and trafficking.</h1>
          <p className="page-lead">
            A short, hand-picked feed of stories from credible sources around the world &mdash; to
            keep our community informed about the wider movement we&rsquo;re part of.
          </p>
        </div>
        <aside className="news-update-card" aria-label="Feed status">
          <div className="news-update-status">
            <span className="news-update-pulse" aria-hidden="true"></span>
            <span className="news-update-status-label">Updated weekly</span>
          </div>
          <div className="news-update-week" data-editable="week-of">{WEEK_OF}</div>
          <p className="news-update-note">All stories from the last 14 days, sourced and linked to original publishers.</p>
        </aside>
      </div>
    </section>
  );
}

// ---------- filter tabs (ARIA tablist + keyboard nav) ----------
function FilterTabs({ value, onChange }) {
  const refs = useRef({});
  const focusByKey = (key) => {
    const el = refs.current[key];
    if (el) el.focus();
  };

  const onKeyDown = (e) => {
    const idx = TABS.findIndex(t => t.key === value);
    if (idx < 0) return;
    let next = idx;
    switch (e.key) {
      case "ArrowRight": next = (idx + 1) % TABS.length; break;
      case "ArrowLeft":  next = (idx - 1 + TABS.length) % TABS.length; break;
      case "Home":       next = 0; break;
      case "End":        next = TABS.length - 1; break;
      default: return;
    }
    e.preventDefault();
    const nextKey = TABS[next].key;
    onChange(nextKey);
    focusByKey(nextKey);
  };

  return (
    <div className="news-tabs-wrap">
      <div className="container">
        <div className="news-tabs" role="tablist" aria-label="Filter stories by category" onKeyDown={onKeyDown}>
          {TABS.map((t) => {
            const isActive = t.key === value;
            return (
              <button
                key={t.key}
                ref={el => (refs.current[t.key] = el)}
                type="button"
                role="tab"
                id={`news-tab-${t.key}`}
                aria-selected={isActive}
                aria-controls="news-grid"
                tabIndex={isActive ? 0 : -1}
                className={"news-tab " + (isActive ? "is-active" : "")}
                onClick={() => onChange(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- featured top story ----------
function FeaturedStory() {
  return (
    <section className="news-top">
      <div className="container">
        <span className="news-section-eyebrow">Top story this week</span>
        <article className="news-feature-card">
          <div className="news-feature-photo" aria-hidden="true">
            <div className="news-feature-photo-overlay"></div>
            <ChromeIcon name="news" size={48} className="news-feature-photo-icon"/>
            <div className="news-feature-photo-label">{FEATURED.location}</div>
          </div>
          <div className="news-feature-body">
            <div className="news-feature-meta">
              <div className="news-feature-source">
                <ChromeIcon name="world" size={13}/>
                <span>{FEATURED.source}</span>
              </div>
              <span className="article-meta-dot" aria-hidden="true"/>
              <time className="news-feature-date" dateTime="2026-05-12">{FEATURED.date}</time>
            </div>
            <h2 className="news-feature-title">{FEATURED.title}</h2>
            <p className="news-feature-excerpt">{FEATURED.excerpt}</p>
            <div className="news-feature-foot">
              <ul className="news-tag-list">
                {FEATURED.tags.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Ext
                href={FEATURED.url}
                className="news-ext-link news-ext-link-prominent"
                ariaLabel={`Read full story on ${FEATURED.source}: ${FEATURED.title} (opens in new tab)`}
              >
                <span>Read full story</span>
                <ChromeIcon name="external-link" size={14}/>
              </Ext>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

// ---------- story card ----------
function StoryCard({ s }) {
  return (
    <article className="news-card">
      <header className="news-card-head">
        <span className={"news-card-tag news-card-tag-" + s.tone}>{s.tag}</span>
        <span className="news-card-location">{s.location} &middot; {s.date}</span>
      </header>
      <h3 className="news-card-title">{s.title}</h3>
      <p className="news-card-excerpt">{s.excerpt}</p>
      <footer className="news-card-foot">
        <span className="news-card-source">{s.source}</span>
        <Ext
          href={s.url}
          className="news-ext-link"
          ariaLabel={`Read full story on ${s.source}: ${s.title} (opens in new tab)`}
        >
          <span>Read</span>
          <ChromeIcon name="external-link" size={12}/>
        </Ext>
      </footer>
    </article>
  );
}

// ---------- story grid ----------
function StoryGrid({ filter }) {
  const tab = TABS.find(t => t.key === filter);
  const filtered = !tab || tab.match === null
    ? STORIES
    : STORIES.filter(s => s.categories.some(c => tab.match.includes(c)));

  return (
    <section className="news-grid-wrap">
      <div className="container">
        <header className="news-grid-head">
          <span className="news-section-eyebrow">More from the past 14 days</span>
          <span className="news-result-count" aria-live="polite">
            Showing {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            {filter !== "all" && <> &middot; <span>{tab.label}</span></>}
          </span>
        </header>
        {filtered.length === 0 ? (
          <div className="news-empty">
            No stories matched this filter for the current week. Try{" "}
            <button type="button" className="news-empty-link" onClick={() => window.dispatchEvent(new CustomEvent("newsFilter", { detail: "all" }))}>All stories</button>.
          </div>
        ) : (
          <div className="news-grid" id="news-grid" role="tabpanel" aria-labelledby={`news-tab-${filter}`}>
            {filtered.map((s, i) => <StoryCard key={i} s={s}/>)}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- data point ----------
function DataPoint() {
  return (
    <section className="news-datapoint">
      <div className="container">
        <div className="news-datapoint-card">
          <span className="news-datapoint-eyebrow">Data point</span>
          <p className="news-datapoint-quote">
            An estimated 292&nbsp;million people used drugs globally in 2022 &mdash; a 20% increase over
            the past decade. Behind every statistic is a person who needed help and didn&rsquo;t get it.
          </p>
          <div className="news-datapoint-foot">
            <span>Source: UN Office on Drugs and Crime, World Drug Report 2025</span>
            <Ext
              href="https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2025.html"
              className="news-ext-link news-ext-link-on-dark"
              ariaLabel="Read the UNODC World Drug Report 2025 (opens in new tab)"
            >
              <span>Read the report</span>
              <ChromeIcon name="external-link" size={12}/>
            </Ext>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- archive ----------
function ArchiveRow() {
  return (
    <section className="news-archive">
      <div className="container">
        <a href="#" className="news-archive-row" onClick={e => e.preventDefault()} aria-label="Browse the full news archive going back to January 2026">
          <div className="news-archive-text">
            <div className="news-archive-title">Looking for older stories?</div>
            <div className="news-archive-sub">Browse our full news archive going back to January 2026.</div>
          </div>
          <div className="news-archive-cta">
            <span>View archive</span>
            <ChromeIcon name="arrow-right" size={14}/>
          </div>
        </a>
      </div>
    </section>
  );
}

// ---------- about feed ----------
function AboutFeed() {
  return (
    <section className="news-about">
      <div className="container">
        <div className="news-about-card">
          <div className="news-about-icon"><ChromeIcon name="info-circle" size={22}/></div>
          <div className="news-about-body">
            <div className="news-about-title">About this feed</div>
            <p className="news-about-text">
              Stories are hand-picked weekly by our team from credible publishers. We don&rsquo;t
              republish content &mdash; every link goes directly to the original source. Have a
              story to suggest? <a className="news-about-mail" href="mailto:news@gtblf.org">news@gtblf.org</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function NewsApp() {
  // Filter state — hash-routed for shareable filtered views (e.g. News.html#nigeria)
  const tabFromHash = () => {
    const h = (window.location.hash || "").replace("#", "");
    return TABS.find(t => t.key === h) ? h : "all";
  };
  const [filter, setFilter] = useState(tabFromHash);

  useEffect(() => {
    const onHash = () => setFilter(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Listen for newsFilter custom event (from empty-state CTA)
  useEffect(() => {
    const onFilter = (e) => onChangeFilter(e.detail);
    window.addEventListener("newsFilter", onFilter);
    return () => window.removeEventListener("newsFilter", onFilter);
  });

  const onChangeFilter = (key) => {
    setFilter(key);
    if (key === "all") {
      history.replaceState(null, "", window.location.pathname);
    } else {
      history.replaceState(null, "", "#" + key);
    }
  };

  return (
    <div data-screen-label="07 News" className="page page-news">
      <ChromeNav currentPage="news"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <FilterTabs value={filter} onChange={onChangeFilter}/>
        <FeaturedStory/>
        <StoryGrid filter={filter}/>
        <DataPoint/>
        <ArchiveRow/>
        <AboutFeed/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NewsApp/>);
