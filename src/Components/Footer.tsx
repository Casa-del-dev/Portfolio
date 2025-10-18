import "./Footer.css";

export function Footer() {
  return (
    <div className="footer-main">
      <div className="thanks">
        {/* <div>
          Website heavily inspired by{" "}
          <a
            className="link-footer"
            href="https://ly.gd.edu.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Li Yuan
          </a>
        </div>*/}
        <div className="email">
          Don't hesitate to contact me:{" "}
          <a href="mailto:erenhomburg@gmail.com" className="link-footer">
            erenhomburg@gmail.com
          </a>
        </div>
      </div>
      <div className="last-updated">Last updated: 18.10.2025</div>
    </div>
  );
}
