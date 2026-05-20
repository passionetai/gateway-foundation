/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter */

// ---------- All our original videos ----------
const OUR_VIDEOS = [
  { title: "The Bad Influence", desc: "A young man already struggling through a rough patch is drawn into drugs by someone he trusted as a friend — a sobering look at how peer pressure quietly turns pain into addiction.", video: "video/badfriend (1).mp4", tag: "Drama" },
  { title: "Voices of Faith", desc: "Christian leaders speak out against the twin evils of sexual trafficking and drug abuse, urging families and congregations to protect the vulnerable around them.", video: "video/menoffaithagainstabuse (1).mp4", tag: "Faith" },
  { title: "A Word to the Youth", desc: "Peer-to-peer, plain-spoken: a young man speaks directly to other young people about the real cost of drug abuse — and why walking away is strength, not weakness.", video: "video/adviceguy (1).mp4", tag: "Awareness" },
  { title: "A Pastor's Plea", desc: "Pastors deliver a heartfelt message from the pulpit, calling on parents and young people to take a stand against drug abuse before another life is lost.", video: "video/pastorsmessage (1).mp4", tag: "Faith" },
  { title: "The End of the Road", desc: "A dramatised look at how drug traffickers ultimately meet their downfall — a stark reminder that the trade always catches up with those who profit from it.", video: "video/drugtraffick (1).mp4", tag: "Awareness" },
  { title: "Abuse of Power", desc: "When rent falls behind, the wrong landlord becomes a predator. A dramatised exposé of how authority can be twisted into sexual exploitation — and why silence isn't safety.", video: "video/landlord (1).mp4", tag: "Awareness" }
];

// ---------- Related social media content ----------
const SOCIAL_CONTENT = [
  {
    title: "David Jones — Speaking Out on Drug Awareness",
    platform: "TikTok",
    type: "tiktok",
    videoId: "7601245915663453447",
    username: "@davidjonesdavidtiktok",
    url: "https://www.tiktok.com/@davidjonesdavidtiktok/video/7601245915663453447?_r=1&_t=ZT-96VJdwOlZte"
  },
  {
    title: "Rapper Medikal — Fighting Drug Addiction (TikTok)",
    platform: "TikTok",
    type: "tiktok",
    videoId: "7616427096478371092",
    username: "@sikaofficial1z",
    url: "https://www.tiktok.com/@sikaofficial1z/video/7616427096478371092?_r=1&_t=ZT-96VLS6Ap44z"
  },
  {
    title: "Rapper Medikal — Fighting Drug Addiction (Instagram)",
    platform: "Instagram",
    type: "instagram",
    permalink: "https://www.instagram.com/reel/DYVWR3wsITo/",
    url: "https://www.instagram.com/reel/DYVWR3wsITo/?igsh=cWRobnE5anpsbjF3"
  },
  {
    title: "David Jones — Youth Drug Prevention Message",
    platform: "TikTok",
    type: "tiktok",
    videoId: "7029796545906199814",
    username: "@davidjonesdavidtiktok",
    url: "https://www.tiktok.com/@davidjonesdavidtiktok/video/7029796545906199814?_r=1&_t=ZT-96VLklMai46"
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
                    <video
                      muted
                      playsInline
                      preload="metadata"
                      src={`${v.video}#t=1.5`}
                      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover' }}
                    />
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
function loadScriptOnce(src, id) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  s.id = id;
  document.body.appendChild(s);
}

function SocialEmbed({ item }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (item.type === 'tiktok') {
      loadScriptOnce('https://www.tiktok.com/embed.js', 'tiktok-embed-script');
    } else if (item.type === 'instagram') {
      loadScriptOnce('https://www.instagram.com/embed.js', 'instagram-embed-script');
      // re-process Instagram embeds if the script is already on the page
      const tryProcess = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      tryProcess();
      const t = setTimeout(tryProcess, 600);
      return () => clearTimeout(t);
    }
  }, [item]);

  if (item.type === 'tiktok') {
    return (
      <div className="media-social-embed" ref={ref}>
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/${item.username}/video/${item.videoId}`}
          data-video-id={item.videoId}
          style={{ maxWidth: 605, minWidth: 325 }}
        >
          <section>
            <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.username}</a>
          </section>
        </blockquote>
      </div>
    );
  }

  if (item.type === 'instagram') {
    return (
      <div className="media-social-embed media-social-embed-ig" ref={ref}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={item.permalink}
          data-instgrm-version="14"
          style={{ background: '#FFF', border: 0, margin: 0, maxWidth: 540, minWidth: 280, width: '100%' }}
        >
          <a href={item.permalink} target="_blank" rel="noopener noreferrer">View on Instagram</a>
        </blockquote>
      </div>
    );
  }

  return null;
}

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
              <SocialEmbed item={s}/>
              <div className="media-social-info">
                <h3 className="media-social-title">{s.title}</h3>
                <div className="media-social-links">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="media-social-link">
                    <ChromeIcon name="external-link" size={12}/>
                    View on {s.platform}
                  </a>
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
