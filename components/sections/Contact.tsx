import { profile } from "@/data/profile";
import CopyEmail from "../CopyEmail";

export default function Contact() {
  const { email, phone, linkedin, github } = profile.contact;
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="card contact" data-reveal>
          <div className="contact-grid">
            <div>
              <p className="chip-now">
                <b>07</b>contact
              </p>
              <h2>
                Let&apos;s build something people use <em>every day</em>.
              </h2>
            </div>
            <div className="contact-list">
              <div className="c-item">
                <div>
                  <span className="k">email</span>
                  <span className="v">{email}</span>
                </div>
                <CopyEmail email={email} />
              </div>
              <a className="c-item" href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <div>
                  <span className="k">phone / whatsapp</span>
                  <span className="v">+62 818 432 630</span>
                </div>
                <span className="arrow">↗</span>
              </a>
              <a className="c-item" href={linkedin} target="_blank" rel="noopener noreferrer">
                <div>
                  <span className="k">linkedin</span>
                  <span className="v">in/nezta-misgi-febyandanu</span>
                </div>
                <span className="arrow">↗</span>
              </a>
              {github.map((g) => (
                <a key={g} className="c-item" href={g} target="_blank" rel="noopener noreferrer">
                  <div>
                    <span className="k">github</span>
                    <span className="v">{g.replace("https://", "")}</span>
                  </div>
                  <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="footer">
          <span>© 2026 Nezta Misgi Febyandanu</span>
        </footer>
      </div>
    </section>
  );
}
