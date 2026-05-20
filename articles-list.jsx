/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter, ARTICLES */
const { useState, useEffect, useRef } = React;

const articleUrl = (slug) => `articles/${slug}.html`;

// ---------- breadcrumb ----------
function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">Articles</li>
        </ol>
      </div>
    </nav>
  );
}

// ---------- page header + on-this-page sidebar ----------
function PageHeader({ activeSlug }) {
  const onJump = (e) => {
    const slug = e.target.value;
    if (!slug) return;
    const el = document.getElementById("article-" + slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = articleUrl(slug);
    }
    // reset select so the same option can be picked again
    setTimeout(() => { e.target.value = ""; }, 100);
  };

  return (
    <section className="articles-header">
      <div className="container articles-header-grid">
        <div>
          <span className="eyebrow eyebrow-accent">From our team</span>
          <h1 className="page-title">Long reads on rescue, recovery, and the road back.</h1>
          <p className="page-lead">
            A small, deliberate collection of pieces by our counsellors, founders, and partners
            &mdash; written to inform, equip, and tell the truth about the work.
          </p>
        </div>

        {/* Mobile: jump-to-article dropdown */}
        <div className="articles-jump">
          <label className="articles-jump-label" htmlFor="article-jump">
            <ChromeIcon name="list" size={14}/>
            Jump to article
          </label>
          <select id="article-jump" onChange={onJump} defaultValue="">
            <option value="" disabled>Select an article…</option>
            {ARTICLES.map((a, i) => (
              <option key={a.slug} value={a.slug}>
                {String(i + 1).padStart(2, "0")} &middot; {a.title.replace(/\u2014/g, "—")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

// ---------- sticky sidebar ----------
function OnThisPage({ activeSlug }) {
  const wrapRef = useRef(null);
  const [stop, setStop] = useState(false);

  // Release sticky when footer enters viewport
  useEffect(() => {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => setStop(e.isIntersecting));
    }, { rootMargin: "0px 0px 0px 0px", threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <aside ref={wrapRef} className={"articles-rail " + (stop ? "is-released" : "")} aria-label="On this page">
      <div className="articles-rail-inner">
        <div className="articles-rail-head">
          <span className="articles-rail-label">
            <ChromeIcon name="list-search" size={12}/>
            On this page
          </span>
        </div>
        <ol className="articles-rail-list">
          {ARTICLES.map((a, i) => (
            <li key={a.slug}>
              <a
                href={"#article-" + a.slug}
                className={"articles-rail-item " + (activeSlug === a.slug ? "is-active" : "")}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("article-" + a.slug);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="articles-rail-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="articles-rail-title">{a.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <a href="#subscribe" className="articles-rail-foot" onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("subscribe");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}>
          <ChromeIcon name="mail" size={13}/>
          Subscribe to new pieces
        </a>
      </div>
    </aside>
  );
}

// ---------- author chip ----------
function AuthorChip({ author, size }) {
  const cls = "author-chip " + (size === "lg" ? "author-chip-lg" : "");
  return (
    <div className={cls}>
      <div className={"author-avatar author-avatar-" + author.tone}>{author.initials}</div>
      <div className="author-text">
        <span className="author-name">{author.name}</span>
        <span className="author-role"> &middot; {author.role}</span>
      </div>
    </div>
  );
}

// ---------- meta strip ----------
function ArticleMetaStrip({ article, n, isFeatured }) {
  const onShare = (e) => {
    e.preventDefault();
    const slug = article.slug;
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/Articles\.html$/, "") + "articles/" + slug + ".html";
    url.hash = "";
    if (navigator.clipboard) navigator.clipboard.writeText(url.toString());
  };
  return (
    <div className="article-meta-strip">
      <div className="article-meta-left">
        <span className={"article-badge article-badge-" + article.badgeTone + (isFeatured ? " is-featured" : "")}>
          {article.badge}
        </span>
        <span className="article-meta-dot" aria-hidden="true"/>
        <span className="article-meta-pill">{article.readTime}</span>
        <span className="article-meta-dot" aria-hidden="true"/>
        <span className="article-meta-pill">{article.date}</span>
      </div>
      <button type="button" className="article-share" onClick={onShare} aria-label="Copy link">
        <ChromeIcon name="link" size={14}/>
        <span>Share</span>
      </button>
    </div>
  );
}

// ---------- featured article (inline expanded) ----------
function FeaturedArticle({ article, n }) {
  const Body = article.Body;
  return (
    <article id={"article-" + article.slug} className="article-full article-featured">
      <ArticleMetaStrip article={article} n={n} isFeatured={true}/>
      <header className="article-head">
        <div className="article-num">{String(n).padStart(2, "0")} &middot; Article</div>
        <h2 className="article-title">{article.title}</h2>
        <AuthorChip author={article.author}/>
      </header>
      <div className="article-body">
        <Body/>
        <footer className="article-foot">
          <ul className="article-tags">
            {article.tags.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <a
            href={"#articles-top"}
            className="article-back"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ChromeIcon name="arrow-up" size={13}/>
            <span>Back to top</span>
          </a>
        </footer>
      </div>
    </article>
  );
}

// ---------- collapsed article card ----------
function ArticleCard({ article, n }) {
  return (
    <article id={"article-" + article.slug} className="article-card-row">
      <div className="article-card-body">
        <div className="article-meta-strip article-meta-strip-compact">
          <div className="article-meta-left">
            <span className={"article-badge article-badge-" + article.badgeTone}>{article.badge}</span>
            <span className="article-meta-dot" aria-hidden="true"/>
            <span className="article-meta-pill">{article.readTime}</span>
            <span className="article-meta-dot" aria-hidden="true"/>
            <span className="article-meta-pill">{article.date}</span>
          </div>
        </div>
        <div className="article-num">{String(n).padStart(2, "0")} &middot; Article</div>
        <h2 className="article-card-title">{article.title}</h2>
        <p className="article-card-excerpt" dangerouslySetInnerHTML={{ __html: article.excerpt }}/>
        <AuthorChip author={article.author}/>
      </div>
      <a href={articleUrl(article.slug)} className="article-card-cta">
        <span>Read article</span>
        <ChromeIcon name="arrow-right" size={14}/>
      </a>
    </article>
  );
}

// ---------- divider ----------
function Divider() {
  return (
    <div className="article-divider" aria-hidden="true">
      <span className="article-divider-line"/>
      <ChromeIcon name="asterisk" size={14}/>
      <span className="article-divider-line"/>
    </div>
  );
}

// ---------- newsletter ----------
function Subscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };
  return (
    <section id="subscribe" className="articles-subscribe">
      <div className="container">
        <div className="articles-subscribe-card">
          <div className="articles-subscribe-copy">
            <div className="articles-subscribe-title">Get new articles when we publish them.</div>
            <div className="articles-subscribe-sub">No more than one email a month. Long-form pieces only &mdash; no fundraising spam.</div>
          </div>
          <form className="articles-subscribe-form" onSubmit={onSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              {done ? "Subscribed" : "Subscribe"}
              {!done && <ChromeIcon name="arrow-right" size={14}/>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ---------- App ----------
function ArticlesApp() {
  const [active, setActive] = useState(ARTICLES[0]?.slug);

  // Track which article is currently in view
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const slug = e.target.id.replace("article-", "");
          setActive(slug);
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    ARTICLES.forEach(a => {
      const el = document.getElementById("article-" + a.slug);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [featured, ...rest] = ARTICLES;

  return (
    <div data-screen-label="05 Articles" className="page">
      <ChromeNav currentPage="articles"/>
      <Breadcrumb/>
      <main id="articles-top">
        <PageHeader activeSlug={active}/>
        <section className="articles-layout">
          <div className="container articles-layout-grid">
            <div className="articles-main">
              <FeaturedArticle article={featured} n={1}/>
              <Divider/>
              {rest.map((a, i) => (
                <ArticleCard key={a.slug} article={a} n={i + 2}/>
              ))}
            </div>
            <OnThisPage activeSlug={active}/>
          </div>
        </section>
        <Subscribe/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ArticlesApp/>);
