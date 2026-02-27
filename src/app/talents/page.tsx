"use client";

import Link from "next/link";

const faces = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700",
  "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=700",
];

const sections = [
  {
    name: "TAMMY SINCLAIR",
    role: "Visual Artist",
    portrait:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=900",
    work: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1300",
  },
  {
    name: "LITMUSIC",
    role: "Sonic Artist",
    portrait:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=900",
    work: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1300",
  },
  {
    name: "BRIAN",
    role: "Visual Artist",
    portrait:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=900",
    work: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1300",
  },
];

export default function TalentsPage() {
  return (
    <div className="talents-page">
      <div className="screen-overlay" />

      <section className="talent-strip">
        {faces.map((src, index) => (
          <div key={src} className="face-card">
            <img src={src} alt={`Talent portrait ${index + 1}`} />
          </div>
        ))}
      </section>

      <div className="top-cta-wrap">
        <button className="top-cta">EXPLORE TALENT PORTFOLIOS</button>
      </div>

      <section className="portfolio-stack">
        {sections.map((section, index) => (
          <article key={section.name} className="feature-row">
            <div className={`feature-inner ${index % 2 === 1 ? "reverse" : ""}`}>
              <div className="work-panel">
                <img src={section.work} alt={`${section.name} portfolio preview`} />
                <button className="small-pill">View work</button>
              </div>

              <div className="profile-panel">
                <img src={section.portrait} alt={section.name} />
                <div className="profile-copy">
                  <h3>{section.name}</h3>
                  <p>{section.role}</p>
                  <span>
                    A curated profile of authored work and art direction with a focus on
                    identity, color, and sensory narrative.
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="bottom-cta-wrap">
        <Link href="/projects" className="bottom-cta">
          VIEW ALL PORTFOLIOS
        </Link>
      </div>

      <style jsx>{`
        .talents-page {
          position: relative;
          background: radial-gradient(circle at 30% 20%, #343229 0%, #101010 45%, #000 80%);
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          padding: 110px 24px 80px;
        }

        .screen-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.24;
          background-image: radial-gradient(circle at 2px 2px, #9a8e55 1.2px, transparent 0);
          background-size: 16px 16px;
        }

        .talent-strip {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 22px;
        }

        .face-card {
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          overflow: hidden;
          background: #080808;
          height: 220px;
        }

        .face-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.9);
        }

        .top-cta-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-bottom: 34px;
        }

        .top-cta {
          background: #ededed;
          color: #111;
          border: none;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 18px 36px;
        }

        .portfolio-stack {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-row {
          border-radius: 22px;
          overflow: hidden;
          background: #050505;
        }

        .feature-inner {
          display: grid;
          grid-template-columns: 2fr 1fr;
          min-height: 320px;
        }

        .feature-inner.reverse {
          grid-template-columns: 1fr 2fr;
        }

        .feature-inner.reverse .work-panel {
          order: 2;
        }

        .feature-inner.reverse .profile-panel {
          order: 1;
        }

        .work-panel {
          position: relative;
          background: #141414;
        }

        .work-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.88;
        }

        .small-pill {
          position: absolute;
          left: 14px;
          bottom: 14px;
          background: #fff;
          color: #111;
          border: none;
          border-radius: 999px;
          font-size: 10px;
          padding: 6px 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .profile-panel {
          position: relative;
          display: grid;
          grid-template-rows: 1fr auto;
          background: linear-gradient(155deg, #b67e52 0%, #0d0d0d 68%);
        }

        .profile-panel img {
          width: 100%;
          height: 100%;
          max-height: 220px;
          object-fit: cover;
          object-position: top;
        }

        .profile-copy {
          background: #000;
          padding: 12px 16px 14px;
        }

        .profile-copy h3 {
          font-size: 13px;
          letter-spacing: 0.08em;
          margin-bottom: 3px;
        }

        .profile-copy p {
          color: #d0ba52;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          font-size: 9px;
          margin-bottom: 8px;
        }

        .profile-copy span {
          display: block;
          color: #bfbfbf;
          font-size: 10px;
          line-height: 1.35;
        }

        .bottom-cta-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-top: 18px;
        }

        .bottom-cta {
          background: #d3b425;
          color: #111;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 12px 18px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .talents-page {
            padding: 92px 14px 60px;
          }

          .talent-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .face-card {
            height: 168px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
          }

          .feature-inner,
          .feature-inner.reverse {
            grid-template-columns: 1fr;
          }

          .feature-inner.reverse .work-panel,
          .feature-inner.reverse .profile-panel {
            order: unset;
          }

          .work-panel {
            min-height: 220px;
          }

          .profile-panel img {
            max-height: 230px;
          }
        }
      `}</style>
    </div>
  );
}
