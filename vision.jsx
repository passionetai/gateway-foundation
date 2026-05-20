/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */

const OBJECTIVES = [
  {
    n: "01",
    title: "Awareness, advocacy & intervention",
    body: "Create awareness, advocacy, and intervention programs — detox, rehab, shelter, re-orientation, training, and empowerment — for rescuing victims of drug abuse and sex trafficking.",
    tone: "green",
    tags: ["Detox", "Rehab", "Shelter", "Re-orientation", "Training", "Empowerment"]
  },
  {
    n: "02",
    title: "Education through film & multi-format content",
    body: "Expose the dangers of drug abuse, addiction, and substance use disorders (SUDs) through short films and multi-format content — providing enlightenment that supports the rescue of victims of drug abuse and sex trafficking.",
    tone: "clay",
    tags: ["Short films", "Documentaries", "Social content", "School outreach", "Community talks"]
  }
];

const VALUES = [
  { icon: "heart-handshake", label: "Dignity",         body: "Every person we meet is treated as a person, not a case file." },
  { icon: "shield-check",    label: "Confidentiality", body: "What is shared in our care stays in our care." },
  { icon: "eye-check",       label: "Transparency",    body: "Open books, open reports, open conversations with our partners." },
  { icon: "flame",           label: "Persistence",     body: "Recovery isn't linear. Our commitment is." }
];

const BENEFICIARIES = [
  { icon: "user-heart", label: "Victims & survivors", body: "People caught in addiction or trafficking, seeking a way out or already rescued." },
  { icon: "users",      label: "Families",            body: "Parents, siblings, and partners trying to support someone in crisis." },
  { icon: "school",     label: "At-risk youth",       body: "Students and young adults vulnerable to recruitment or substance use." }
];

// ---------- breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Vision & mission</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- page header ----------
function PageHeader() {
  return (
    <section className="page-header vm-page-header">
      <div className="container">
        <span className="eyebrow eyebrow-accent">Vision & mission</span>
        <h1 className="page-title">Why we exist, and what we&rsquo;re building toward.</h1>
        <p className="page-lead">
          Every program, partnership, and naira spent at Gateway to Better Life Foundation flows from
          these two statements &mdash; and the values that hold them together.
        </p>
      </div>
    </section>
  );
}

// ---------- vision block ----------
function VisionBlock() {
  return (
    <section className="vm-statement vm-vision">
      <div className="container">
        <div className="vm-statement-card vm-vision-card">
          <ChromeIcon name="eye" className="vm-statement-glyph" size={140}/>
          <div className="vm-statement-body">
            <span className="vm-statement-eyebrow">Our vision</span>
            <p className="vm-statement-quote vm-statement-quote-light">
              A Nigeria where no one is defined by addiction or trafficking &mdash; where every rescued
              life finds a real path back to dignity, work, and belonging.
            </p>
            <p className="vm-statement-foot vm-statement-foot-light">
              This is the world we are working toward, one rescue, one rehab cohort, one school visit,
              one film at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- mission block ----------
function MissionBlock() {
  return (
    <section className="vm-statement vm-mission">
      <div className="container">
        <div className="vm-statement-card vm-mission-card">
          <ChromeIcon name="target-arrow" className="vm-statement-glyph vm-statement-glyph-dark" size={140}/>
          <div className="vm-statement-body">
            <span className="vm-statement-eyebrow">Our mission</span>
            <p className="vm-statement-quote vm-statement-quote-dark">
              To create awareness, rescue victims, and deliver structured intervention &mdash; detox,
              rehab, shelter, re-orientation, training, and empowerment &mdash; for those caught in drug
              abuse and sex trafficking.
            </p>
            <p className="vm-statement-foot">
              Our mission is not a slogan &mdash; it&rsquo;s a pipeline. Every word in that sentence
              corresponds to a program, a budget line, and a person whose job it is to deliver it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- objectives ----------
function Objectives() {
  return (
    <section className="vm-objectives section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Our objectives</span>
          <h2 className="section-title">What we&rsquo;ve committed to do.</h2>
          <p className="section-sub">
            These are the formal aims that guide every decision we make.
          </p>
        </header>
        <div className="objective-list">
          {OBJECTIVES.map((o, i) => (
            <article key={i} className={"objective-card objective-card-" + o.tone}>
              <div className="objective-num">{o.n}</div>
              <div className="objective-body">
                <h3 className="objective-title">{o.title}</h3>
                <p className="objective-text">{o.body}</p>
                <ul className="objective-tags">
                  {o.tags.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- values ----------
function Values() {
  return (
    <section className="vm-values section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">What guides us</span>
          <h2 className="section-title">The values behind every decision.</h2>
        </header>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon"><ChromeIcon name={v.icon} size={22}/></div>
              <div className="value-label">{v.label}</div>
              <p className="value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- who we serve ----------
function Beneficiaries() {
  return (
    <section className="vm-beneficiaries section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Who we serve</span>
          <h2 className="section-title">The people behind every number.</h2>
        </header>
        <div className="beneficiary-grid">
          {BENEFICIARIES.map((b, i) => (
            <div key={i} className="beneficiary-card">
              <div className="beneficiary-icon"><ChromeIcon name={b.icon} size={26}/></div>
              <div className="beneficiary-label">{b.label}</div>
              <p className="beneficiary-body">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section className="vm-cta">
      <div className="who-cta-inner">
        <div className="who-cta-copy">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="heart" size={12}/>
            Support our work
          </span>
          <h2 className="who-cta-title">Help us live this out.</h2>
          <p className="who-cta-sub">
            A vision without funding is just a statement. Your support turns these objectives into
            rescues, rehab beds, and graduations.
          </p>
        </div>
        <div className="who-cta-actions">
          <a href="Who%20we%20are.html#contact" className="btn btn-cream btn-full">
            Contact us
            <ChromeIcon name="arrow-right" size={14}/>
          </a>
          <a href="Activities.html" className="btn btn-ghost-dark btn-full">
            See our programs
            <ChromeIcon name="arrow-right" size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function VisionApp() {
  return (
    <div data-screen-label="04 Vision and mission" className="page">
      <ChromeNav currentPage="vision"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <VisionBlock/>
        <MissionBlock/>
        <Objectives/>
        <Values/>
        <Beneficiaries/>
        <CTA/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<VisionApp/>);
