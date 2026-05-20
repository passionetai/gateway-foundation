/* global React */
/*
 * Shared chrome: Logo, Nav, Footer, Icon, smoothTo.
 * Each page should provide `currentPage` ('home' | 'who' | 'vision' | 'activities' | 'articles' | 'news')
 * to highlight the active nav item.
 *
 * Cross-page anchor links: when an anchor target doesn't exist on the current page,
 * navigate to the home page with the anchor. When it does exist, smooth-scroll.
 *
 * Subdirectory pages (e.g. /articles/<slug>.html) should set
 *   window.__navBase = "../"
 * BEFORE chrome.jsx loads, so nav/footer hrefs resolve correctly.
 */

const NAV_BASE = (typeof window !== "undefined" && window.__navBase) || "";
const navHref = (p) => NAV_BASE + p;

const ChromeIcon = ({ name, size, className }) => (
  <i className={`ti ti-${name} ${className || ""}`} style={size ? { fontSize: size } : undefined} aria-hidden="true"/>
);

// "who", "vision", "activities", and "news" link to their own pages; "articles" goes to its index
const NAV_ITEMS = [
  { key: "who",        label: "Who we are",       href: navHref("Who we are.html"),         kind: "page" },
  { key: "vision",     label: "Vision & mission", href: navHref("Vision and mission.html"), kind: "page" },
  { key: "activities", label: "Activities",       href: navHref("Activities.html"),         kind: "page" },
  { key: "media",      label: "Media",            href: navHref("Media.html"),              kind: "page" },
  { key: "articles",   label: "Articles",         href: navHref("Articles.html"),           kind: "page" },
  { key: "news",       label: "News",             href: navHref("News.html"),               kind: "page" }
];

function smartNavigate(item, currentPage, ev) {
  // Page links — let the browser handle them
  if (item.kind === "page") return;
  // If we're already on home and the anchor exists, smooth-scroll
  if (currentPage === "home") {
    const el = document.getElementById(item.anchor);
    if (el) {
      ev.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  // Otherwise let the browser navigate to index.html#anchor
}

function ChromeLogo({ tone = "default", href }) {
  return (
    <a href={href || navHref("index.html")} className={`logo logo-${tone}`} aria-label="Gateway to Better Life Foundation">
      <span className="logo-mark" aria-hidden="true" style={{ background: 'none', borderRadius: 0, overflow: 'hidden' }}>
        <img src="images/logo.png" alt="" style={{ width: '34px', height: '34px', objectFit: 'contain' }}/>
      </span>
      <span className="logo-text">
        <span className="logo-name">Gateway to Better Life</span>
        <span className="logo-sub">Foundation</span>
      </span>
    </a>
  );
}

function ChromeNav({ currentPage = "home", activeAnchor }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <ChromeLogo/>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map(item => {
            const isActive = item.key === currentPage || (currentPage === "home" && activeAnchor === item.anchor);
            return (
              <a
                key={item.key}
                href={item.href}
                className={"nav-link " + (isActive ? "is-active" : "")}
                onClick={(e) => smartNavigate(item, currentPage, e)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="nav-cta">
          <a
            href="Who%20we%20are.html#contact"
            className="btn btn-primary btn-sm"
          >
            Contact us
          </a>
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
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href} onClick={(e) => { smartNavigate(item, currentPage, e); setOpen(false); }}>
              {item.label}
            </a>
          ))}
          <a href="Who%20we%20are.html#contact" className="nav-mobile-cta">Contact us</a>
        </div>
      )}
    </header>
  );
}

function ChromeFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <ChromeLogo tone="dark"/>
            <p className="footer-tag">
              Rescue. Rehabilitate. Rebuild. <br/>
              Restoration is the goal.
            </p>
          </div>
          <div className="footer-cols">
            <div>
              <div className="footer-col-head">Foundation</div>
              <a href={navHref("Who we are.html")}>Who we are</a>
              <a href={navHref("Vision and mission.html")}>Vision & mission</a>
              <a href="#" onClick={e => e.preventDefault()}>Annual report</a>
              <a href="#" onClick={e => e.preventDefault()}>Careers & volunteer</a>
            </div>
            <div>
              <div className="footer-col-head">Programs</div>
              <a href={navHref("Activities.html")}>Intervention pathway</a>
              <a href="#" onClick={e => e.preventDefault()}>Get help now</a>
              <a href="#" onClick={e => e.preventDefault()}>Refer someone</a>
              <a href="#" onClick={e => e.preventDefault()}>Partner with us</a>
            </div>
            <div>
              <div className="footer-col-head">Contact</div>
              <a href="mailto:info@bettergatewayfoundation.org">info@bettergatewayfoundation.org</a>
              <a href="tel:+16174015060">+1 617 401 5060</a>
              <span className="footer-addr">Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="footer-rule" aria-hidden="true"></div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 Gateway to Better Life Foundation</span>
          <div className="footer-legal">
            <a href="#" onClick={e => e.preventDefault()}>Privacy</a>
            <a href="#" onClick={e => e.preventDefault()}>Terms</a>
            <a href="#" onClick={e => e.preventDefault()}>Financials</a>
          </div>
          <div className="footer-social" aria-label="Social">
            <a href="#" onClick={e => e.preventDefault()} aria-label="Facebook"><ChromeIcon name="brand-facebook" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="Instagram"><ChromeIcon name="brand-instagram" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="Twitter / X"><ChromeIcon name="brand-x" size={16}/></a>
            <a href="#" onClick={e => e.preventDefault()} aria-label="LinkedIn"><ChromeIcon name="brand-linkedin" size={16}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ChromeIcon, ChromeLogo, ChromeNav, ChromeFooter
});
