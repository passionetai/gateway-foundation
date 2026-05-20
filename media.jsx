/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */

// ---------- All our original videos ----------
const OUR_VIDEOS = [
  { title: "badfriend", desc: "Showing the effect of a bad friend who introduces a friend going through hard times to drugs.", video: "video/badfriend (1).mp4", tag: "Drama" },
  { title: "menoffaithagainstabuse", desc: "Showing men of faith in christianity warning against sexual trafficking and drug abuse.", video: "video/menoffaithagainstabuse (1).mp4", tag: "Faith" },
  { title: "adviceguy", desc: "Showing a young male advising the youth against drug abuse.", video: "video/adviceguy (1).mp4", tag: "Awareness" },
  { title: "pastorsmessage", desc: "Showing pastors advising the people against drug abuse.", video: "video/pastorsmessage (1).mp4", tag: "Faith" },
  { title: "drugtraffick", desc: "Showing the end of drug traffickers.", video: "video/drugtraffick (1).mp4", tag: "Awareness" },
  { title: "landlord", desc: "Showing how people in authority e.g landlords can use their power to solicit sex from their tenants behind on rent.", video: "video/landlord (1).mp4", tag: "Awareness" }
];

// ---------- Related social media content ----------
const SOCIAL_CONTENT = [
  {
    title: "David Jones - Drug Awareness",
    platform: "TikTok",
    url: "https://www.tiktok.com/@davidjonesdavidtiktok/video/7601245915663453447?_r=1&_t=ZT-96VJdwOlZte",
    embed: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@davidjonesdavidtiktok/video/7601245915663453447" data-video-id="7601245915663453447" style="max-width: 605px;min-width: 325px;"><section><a target="_blank" href="https://www.tiktok.com/@davidjonesdavidtiktok/video/7601245915663453447?_r=1&_t=ZT-96VJdwOlZte">@davidjonesdavidtiktok</a></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>'
  },
  {
    title: "Rapper Medikal Using His Brand to Help Fight Drug Addiction",
    platform: "TikTok / Instagram",
    urls: [
      { platform: "TikTok", url: "https://www.tiktok.com/@sikaofficial1z/video/7616427096478371092?_r=1&_t=ZT-96VLS6Ap44z" },
      { platform: "Instagram", url: "https://www.instagram.com/reel/DYVWR3wsITo/?igsh=cWRobnE5anpsbjF3" }
    ],
    embed: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@sikaofficial1z/video/7616427096478371092" data-video-id="7616427096478371092" style="max-width: 605px;min-width: 325px;"><section><a target="_blank" href="https://www.tiktok.com/@sikaofficial1z/video/7616427096478371092?_r=1&_t=ZT-96VLS6Ap44z">@sikaofficial1z</a></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>'
  },
  {
    title: "David Jones - Youth Drug Prevention",
    platform: "TikTok",
    url: "https://www.tiktok.com/@davidjonesdavidtiktok/video/7029796545906199814?_r=1&_t=ZT-96VLklMai46",
    embed: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@davidjonesdavidtiktok/video/7029796545906199814" data-video-id="7029796545906199814" style="max-width: 605px;min-width: 325px;"><section><a target="_blank" href="https://www.tiktok.com/@davidjonesdavidtiktok/video/7029796545906199814?_r=1&_t=ZT-96VLklMai46">@davidjonesdavidtiktok</a></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>'
  }
];

// ---------- Breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Media</li>
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
        <span className="eyebrow eyebrow-accent">
          <ChromeIcon name="video" size={12}/>
          Our media
        </span>
        <h1 className="page-title">
          Films, content & social awareness.
        </h1>
        <p className="page-lead">
          We produce documentary shorts, dramatised scenarios, and social content to expose what
          hides behind closed doors &mdash; and reach the people who need to hear it most.
          Browse our full library below.
        </p>
      </div>
    </section>
  );
}

// ---------- Our videos section ----------
function OurVideos() {
  const [playing, setPlaying] = React.useState(null);

  return (
    <section className="media-videos section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Our films</span>
          <h2 className="section-title">Gateway to Better Life videos.</h2>
          <p className="section-sub">
            All original content produced by Gateway to Better Life Foundation for awareness,
            education, and advocacy.
          </p>
        </header>
        <div className="media-videos-grid">
          {OUR_VIDEOS.map((v, i) => (
            <div key={i} className="media-video-card" onClick={() => setPlaying(playing === i ? null : i)}>
              <div className="media-video-thumb">
                {playing === i ? (
                  <video controls autoPlay style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'contain', background: '#000' }}>
                    <source src={v.video} type="video/mp4"/>
                  </video>
                ) : (
                  <>
                    <div className="film-overlay" aria-hidden="true"></div>
                    <div className="film-play" aria-hidden="true">
                      <ChromeIcon name="player-play-filled" size={22}/>
                    </div>
                    <span className="film-tag">{v.tag}</span>
                  </>
                )}
              </div>
              <div className="media-video-meta">
                <h3 className="film-title">{v.title}</h3>
                <p className="film-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Social content section ----------
function SocialContent() {
  return (
    <section className="media-social section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Related content</span>
          <h2 className="section-title">Social media awareness.</h2>
          <p className="section-sub">
            Curated social media content from advocates and partners raising awareness about
            drug abuse and trafficking.
          </p>
        </header>
        <div className="media-social-grid">
          {SOCIAL_CONTENT.map((s, i) => (
            <div key={i} className="media-social-card">
              <div className="media-social-embed" dangerouslySetInnerHTML={{ __html: s.embed }}/>
              <div className="media-social-info">
                <h3 className="media-social-title">{s.title}</h3>
                <div className="media-social-links">
                  {s.urls ? (
                    s.urls.map((u, j) => (
                      <a key={j} href={u.url} target="_blank" rel="noopener noreferrer" className="media-social-link">
                        <ChromeIcon name="external-link" size={12}/>
                        View on {u.platform}
                      </a>
                    ))
                  ) : (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="media-social-link">
                      <ChromeIcon name="external-link" size={12}/>
                      View on {s.platform}
                    </a>
                  )}
                </div>
              </div>
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
    <section className="media-cta">
      <div className="who-cta-inner">
        <div className="who-cta-copy">
          <span className="eyebrow eyebrow-on-dark">
            <ChromeIcon name="heart" size={12}/>
            Support our work
          </span>
          <h2 className="who-cta-title">Help us create more content.</h2>
          <p className="who-cta-sub">
            Every film we produce reaches thousands of young people. Your support helps us create
            more awareness content and expand our reach.
          </p>
        </div>
        <div className="who-cta-actions">
          <a href="Who%20we%20are.html#contact" className="btn btn-cream btn-full">
            Contact us
            <ChromeIcon name="arrow-right" size={14}/>
          </a>
          <a href="index.html" className="btn btn-ghost-dark btn-full">
            Back to home
            <ChromeIcon name="arrow-left" size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function MediaApp() {
  return (
    <div data-screen-label="Media" className="page">
      <ChromeNav currentPage="media"/>
      <Breadcrumb/>
      <main>
        <PageHeader/>
        <OurVideos/>
        <SocialContent/>
        <CTA/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MediaApp/>);
