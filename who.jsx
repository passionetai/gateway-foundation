/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */
const { useState } = React;

const TEAM = [
  {
    name: "Mr. Ejike Ibe",
    role: "Director of Outreach",
    badge: "Director",
    photo: "assets/team/director-ejike.png",
    bio: "Ejike leads community engagement and youth outreach. He builds the partnerships with schools, churches, and local leaders that get our programs through the door.",
    email: "ejike@gtblf.org"
  },
  {
    name: "Engr. Jerry Asemota",
    role: "Director of Operations",
    badge: "Director",
    photo: "assets/team/director-jerry.jpg",
    bio: "Jerry oversees operations, digital infrastructure, and communications. He keeps the foundation's systems, reporting, and public presence running cleanly.",
    email: "jerry@gtblf.org"
  }
];

const VALUES = [
  { icon: "heart-handshake", label: "Dignity",         body: "We meet every person as a person — never as a statistic." },
  { icon: "eye-check",       label: "Transparency",    body: "Open books, open reports, open conversations." },
  { icon: "shield-check",    label: "Confidentiality", body: "What is shared in our care stays in our care." },
  { icon: "flame",           label: "Persistence",     body: "Recovery isn't linear. Neither is our commitment." }
];

// ---------- Breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Who we are</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- Page header ----------
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <span className="eyebrow eyebrow-accent">Who we are</span>
        <h1 className="page-title">
          A registered Nigerian foundation, built around one belief &mdash; that recovery is possible.
        </h1>
        <p className="page-lead">
          Gateway to Better Life Foundation is a non-profit dedicated to preventing drug addiction
          and walking with individuals, families, and communities through recovery. Founded by faith
          leaders, professionals, and survivors, our work runs on dignity, evidence, and showing up.
        </p>
      </div>
    </section>
  );
}

// ---------- Our story ----------
function Story() {
  return (
    <section className="story section">
      <div className="container story-grid">
        <div className="story-left">
          <span className="eyebrow eyebrow-accent">Our story</span>
          <h2 className="story-title">Why this work, and why now.</h2>
        </div>
        <div className="story-right">
          <p>
            Across Nigeria, too many families have lost someone to addiction &mdash; quietly, slowly,
            often without ever asking for help. The shame keeps the door shut. The system rarely opens it.
          </p>
          <p>
            Gateway to Better Life Foundation was founded to open that door. We bring prevention into
            schools, recovery into communities, and counsel to the families left behind. We&rsquo;re led by
            people who have either walked the road themselves or stood beside someone who has.
          </p>
          <p>
            We&rsquo;re small enough to know the names of the people we serve, and structured enough to
            keep showing up for them.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Leadership ----------
function Leadership() {
  return (
    <section className="leadership section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Leadership</span>
          <h2 className="section-title">The people behind the work.</h2>
        </header>

        {/* Grand Patron — featured row */}
        <article className="founder-card">
          <div className="founder-photo">
            <img src="assets/team/founder.jpeg" alt="Ambassador Reverend Chukwudi Eke"/>
          </div>
          <div className="founder-body">
            <span className="founder-badge">Grand Patron</span>
            <h3 className="founder-name">Ambassador Reverend Chukwudi Eke</h3>
            <div className="founder-role">Board chair</div>
            <p className="founder-bio">
              Ambassador Eke is a faith leader, advocate, and humanitarian who has spent his career
              standing alongside vulnerable communities across Nigeria. He founded Gateway to Better
              Life Foundation to bring structured, dignified support to families affected by
              addiction &mdash; and to those rescued from trafficking, abuse, and exploitation.
            </p>
            <div className="founder-meta">
              <a href="#" className="founder-link" onClick={e => e.preventDefault()}>
                <ChromeIcon name="file-text" size={15}/>
                Read full bio
              </a>
            </div>
          </div>
        </article>

        {/* Directors */}
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <article key={i} className="team-card">
              <div className="team-head">
                <div className="team-photo">
                  <img src={m.photo} alt={m.name}/>
                </div>
                <div className="team-meta">
                  <span className="team-badge">{m.badge}</span>
                  <h3 className="team-name">{m.name}</h3>
                  <div className="team-role">{m.role}</div>
                </div>
              </div>
              <p className="team-bio">{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Values ----------
function Values() {
  return (
    <section className="values section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">What guides us</span>
          <h2 className="section-title">Our values.</h2>
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

// ---------- Partners ----------
function Partners() {
  const items = [
    { label: "CAC Nigeria", placeholder: false },
    { label: "NDLEA",       placeholder: false },
    { label: "Partner logo", placeholder: true },
    { label: "Partner logo", placeholder: true }
  ];
  return (
    <section className="partners section">
      <div className="container">
        <div className="partners-card">
          <span className="eyebrow eyebrow-accent">Partners & affiliations</span>
          <div className="partners-grid">
            {items.map((p, i) => (
              <div key={i} className={"partner-slot " + (p.placeholder ? "is-placeholder" : "")}>
                {p.placeholder ? <span className="muted">[ {p.label} ]</span> : <span>{p.label}</span>}
              </div>
            ))}
          </div>
          <p className="partners-note muted">
            Logos shown as placeholders. We&rsquo;ll update this band as partnerships are confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact section ----------
function ContactSection() {
  return (
    <section id="contact" className="who-cta">
      <div className="who-cta-inner">
        <div className="who-cta-copy">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="phone" size={12}/>
            Contact us
          </span>
          <h2 className="who-cta-title">Get in touch.</h2>
          <p className="who-cta-sub">
            Whether you want to refer someone, partner with us, volunteer, or support our work &mdash;
            we&rsquo;d love to hear from you.
          </p>
        </div>
        <div className="who-cta-actions">
          <a href="tel:+16174015060" className="btn btn-cream btn-full">
            <ChromeIcon name="phone" size={14}/>
            +1 617 401 5060
          </a>
          <a href="mailto:info@bettergatewayfoundation.org" className="btn btn-ghost-dark btn-full">
            info@bettergatewayfoundation.org
            <ChromeIcon name="mail" size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function WhoApp() {
  return (
    <div data-screen-label="02 Who we are" className="page">
      <ChromeNav currentPage="who"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <Story/>
        <Leadership/>
        <Values/>
        <Partners/>
        <ContactSection/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WhoApp/>);
