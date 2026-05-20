/* global React, ReactDOM, ChromeIcon, ChromeNav, ChromeFooter, ARTICLES */
const { useState, useEffect } = React;

function notFound() {
  return (
    <div className="page">
      <ChromeNav currentPage="articles"/>
      <main style={{ padding: "120px 24px", textAlign: "center" }}>
        <h1 style={{ color: "var(--green)", fontSize: 28 }}>Article not found</h1>
        <p style={{ color: "var(--ink-muted)", marginTop: 12 }}>
          <a href="../Articles.html" style={{ color: "var(--green)" }}>Back to all articles</a>
        </p>
      </main>
      <ChromeFooter/>
    </div>
  );
}

function Breadcrumb({ title }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          <li><a href="../index.html">Home</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li><a href="../Articles.html">Articles</a></li>
          <li aria-hidden="true" className="breadcrumb-sep">/</li>
          <li aria-current="page">{title}</li>
        </ol>
      </div>
    </nav>
  );
}

function ArticleHero({ article, idx }) {
  return (
    <section className="article-hero">
      <div className="container">
        <span className={"article-badge article-badge-" + article.badgeTone}>{article.badge}</span>
        <h1 className="article-page-title">{article.title}</h1>
        <div className="article-hero-meta">
          <div className="article-hero-author">
            <div className={"author-avatar author-avatar-" + article.author.tone}>{article.author.initials}</div>
            <div className="author-text">
              <span className="author-name">{article.author.name}</span>
              <span className="author-role"> &middot; {article.author.role}</span>
            </div>
          </div>
          <div className="article-hero-time">
            <ChromeIcon name="clock" size={13}/>
            <span>{article.readTime}</span>
            <span className="article-meta-dot" aria-hidden="true"/>
            <time dateTime={article.dateRaw}>{article.date}</time>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShareRow({ slug }) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    }
  };
  return (
    <div className="article-share-row">
      <button type="button" className="article-share-btn" onClick={copyLink}>
        <ChromeIcon name={copied ? "check" : "link"} size={14}/>
        <span>{copied ? "Link copied" : "Copy link"}</span>
      </button>
      <a className="article-share-btn" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener">
        <ChromeIcon name="brand-x" size={14}/>
        <span>Post</span>
      </a>
      <a className="article-share-btn" href={`mailto:?body=${encodeURIComponent(window.location.href)}`}>
        <ChromeIcon name="mail" size={14}/>
        <span>Email</span>
      </a>
    </div>
  );
}

function RelatedArticles({ current }) {
  const related = ARTICLES.filter(a => a.slug !== current.slug).slice(0, 3);
  return (
    <section className="article-related">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow eyebrow-accent">Keep reading</span>
          <h2 className="section-title">More from our team.</h2>
        </header>
        <div className="related-grid">
          {related.map((a) => (
            <a key={a.slug} href={a.slug + ".html"} className="related-card">
              <span className={"article-badge article-badge-" + a.badgeTone}>{a.badge}</span>
              <h3 className="related-title">{a.title}</h3>
              <div className="related-meta">
                <span>{a.readTime}</span>
                <span className="article-meta-dot" aria-hidden="true"/>
                <span>{a.date}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="article-back-row">
          <a href="../Articles.html" className="link-arrow">
            <ChromeIcon name="arrow-left" size={12}/>
            All articles
          </a>
        </div>
      </div>
    </section>
  );
}

function ArticleApp() {
  const slug = window.__articleSlug;
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) return notFound();

  const idx = ARTICLES.findIndex(a => a.slug === slug);
  const Body = article.Body;

  useEffect(() => {
    document.title = `${article.title.replace(/\u2014/g, "—")} · Gateway to Better Life Foundation`;
  }, [article]);

  return (
    <div data-screen-label={"06 Article: " + slug} className="page article-page">
      <ChromeNav currentPage="articles"/>
      <Breadcrumb title={article.title}/>
      <main>
        <ArticleHero article={article} idx={idx}/>
        <section className="article-page-body">
          <div className="container article-page-grid">
            <article className="article-page-content article-body">
              <ShareRow slug={slug}/>
              <Body/>
              <footer className="article-foot article-foot-page">
                <ul className="article-tags">
                  {article.tags.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <ShareRow slug={slug}/>
              </footer>
            </article>
          </div>
        </section>
        <RelatedArticles current={article}/>
      </main>
      <ChromeFooter/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ArticleApp/>);
