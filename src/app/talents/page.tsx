"use client";

import Link from "next/link";

const bgPattern = "https://www.figma.com/api/mcp/asset/f8da2c41-cdf1-4786-8653-8083a526831a";
const heroImg1 = "https://www.figma.com/api/mcp/asset/6c1ccd83-868e-471d-986e-454ababf6406";
const heroImg2 = "https://www.figma.com/api/mcp/asset/9c1b38f4-b1cf-4454-829b-9a821f0eebe8";
const heroImg3 = "https://www.figma.com/api/mcp/asset/1497b363-a66a-492a-be84-a85f02593b22";
const heroImg4 = "https://www.figma.com/api/mcp/asset/2f4bb4b7-4d90-4c23-9780-445dce3fcc16";
const heroImg5 = "https://www.figma.com/api/mcp/asset/73dfe8aa-7d09-4f46-9cce-749c3d0db832";
const portraitTammy = "https://www.figma.com/api/mcp/asset/fafd2ea2-787a-406d-8c75-526b57a6a60d";
const portraitEolia = "https://www.figma.com/api/mcp/asset/10b887d7-1fed-4994-b8da-7f9afa57a49a";
const artTammy = "https://www.figma.com/api/mcp/asset/e4a63507-58c5-4324-bd76-4156561429ef";
const artIfetaofic = "https://www.figma.com/api/mcp/asset/9ada5072-dd67-4e64-b7cc-1c2aff231cbe";
const artEolia = "https://www.figma.com/api/mcp/asset/fd4ea13e-e0d4-43e0-b0b1-7a2fcb0c1463";

const heroFaces = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const sections = [
  {
    name: "TAMMY SINCLAIR",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vestibulum duis faucibus laoreet nunc at. Tortor malesuada augue mauris egestas eu suspendisse semper ornare.",
    portrait: portraitTammy,
    work: artTammy,
    reverse: false,
    href: "/talents/visual",
  },
  {
    name: "IFETAOFIC",
    description:
      "Lorem ipsum dolor sit amet consectetur. Morbi varius et amet magna. Enim et in enim viverra arcu. Ultrices non egestas lacus in. Elit volutpat sodales laoreet bibendum eget.",
    portrait: portraitTammy,
    work: artIfetaofic,
    reverse: true,
    href: "/talents/sonic",
  },
  {
    name: "EOLIA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ac nisi viverra fringilla sed. Ac lectus quisque facilisi tincidunt nunc varius. Aenean pretium feugiat ut eu.",
    portrait: portraitEolia,
    work: artEolia,
    reverse: false,
    href: "/talents/visual",
  },
];

export default function TalentsPage() {
  return (
    <div className="talents-page">
      <div className="page-overlay" />

      <section className="hero-strip">
        {heroFaces.map((src, index) => (
          <div key={src} className={`hero-face hero-face-${index + 1}`}>
            <img src={src} alt={`Talent portrait ${index + 1}`} />
          </div>
        ))}
      </section>

      <div className="top-cta-wrap">
        <Link href="/projects" className="top-cta">
          <button className="top-cta">EXPLORE TALENT PORTFOLIOS</button>
        </Link>
      </div>

      <section className="portfolio-stack">
        {sections.map((section) => (
          <article key={section.name} className="feature-row">
            <div className={`feature-inner ${section.reverse ? "reverse" : ""}`}>
              <div className="work-panel">
                <img src={section.work} alt={`${section.name} portfolio preview`} />
                <Link href={section.href} className="small-pill">
                  View portfolio
                </Link>
              </div>

              <div className="profile-panel">
                <img src={section.portrait} alt={section.name} />
                <div className="profile-copy">
                  <h3>{section.name}</h3>
                  <span>{section.description}</span>
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
          background-color: #000;
          background-image: url(${bgPattern});
          background-position: center;
          background-size: 660px auto;
          max-width: 1440px;
          margin: 0 auto;
          padding: 104px 24px 76px;
          overflow: hidden;
        }

        .page-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.92) 40%, #000 100%);
          z-index: 0;
        }

        .hero-strip {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          gap: 2px;
          margin: 0 auto 14px;
          max-width: 1320px;
        }

        .hero-face {
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          overflow: hidden;
          background: #080808;
          height: 300px;
          position: relative;
          flex: 1 1 0;
        }

        .hero-face::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.82) 86%, #000 100%);
        }

        .hero-face img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
        }

        .hero-face-1 {
          flex-grow: 1.18;
          clip-path: polygon(0 0, 100% 12%, 100% 100%, 0 100%);
        }

        .hero-face-2 {
          flex-grow: 0.95;
        }

        .hero-face-3 {
          flex-grow: 1.02;
        }

        .hero-face-4 {
          flex-grow: 1.02;
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
        }

        .hero-face-5 {
          flex-grow: 1.14;
        }

        .top-cta-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .top-cta {
          background: #f2f2f2;
          color: #111;
          border: none;
          font-size: 40px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          padding: 28px 78px;
          font-family: var(--font-montserrat), sans-serif;
        }

        .portfolio-stack {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .feature-row {
          border-radius: 44px;
          overflow: hidden;
          background: #050505;
        }

        .feature-inner {
          display: grid;
          grid-template-columns: 2fr 1fr;
          min-height: 356px;
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

        .work-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(270deg, rgba(0, 0, 0, 0.4) 8%, rgba(0, 0, 0, 0.05) 56%);
        }

        .work-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .small-pill {
          position: absolute;
          left: 14px;
          bottom: 14px;
          background: #fff;
          color: #111;
          border-radius: 999px;
          font-size: 11px;
          padding: 6px 12px;
          font-weight: 500;
          z-index: 2;
        }

        .profile-panel {
          position: relative;
          display: grid;
          grid-template-rows: 1fr auto;
          background: linear-gradient(160deg, #b07245 0%, #0a0a0a 64%);
        }

        .profile-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          min-height: 0;
        }

        .profile-copy {
          background: #000;
          padding: 14px 18px 16px;
          border-top-right-radius: 36px;
          min-height: 126px;
        }

        .profile-copy h3 {
          font-size: 24px;
          font-family: var(--font-playfair), serif;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .profile-copy span {
          display: block;
          color: #bfbfbf;
          font-size: 10px;
          line-height: 1.45;
        }

        .bottom-cta-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .bottom-cta {
          background: #fbe230;
          color: #111;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 22px;
          font-weight: 800;
          border: 2px solid #000;
        }

        @media (max-width: 1024px) {
          .talents-page {
            padding-top: 96px;
          }

          .hero-strip {
            max-width: 100%;
            margin-bottom: 12px;
          }

          .hero-face {
            height: 232px;
            border-top-left-radius: 22px;
            border-top-right-radius: 22px;
          }

          .top-cta-wrap {
            margin-bottom: 22px;
          }

          .top-cta {
            font-size: 30px;
            padding: 20px 36px;
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
            min-height: 248px;
          }

        }

        @media (max-width: 760px) {
          .talents-page {
            padding: 84px 12px 56px;
            background-size: 420px auto;
          }

          .hero-strip {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
            margin-bottom: 12px;
          }

          .hero-face-1,
          .hero-face-2,
          .hero-face-3,
          .hero-face-4,
          .hero-face-5 {
            flex-grow: unset;
            clip-path: none;
          }

          .hero-face {
            height: 168px;
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
          }

          .top-cta-wrap {
            margin-bottom: 16px;
          }

          .top-cta {
            width: min(100%, 332px);
            text-align: center;
            font-size: 13px;
            padding: 14px 14px;
          }

          .feature-row {
            border-radius: 24px;
          }

          .profile-copy {
            border-top-right-radius: 24px;
          }

          .profile-copy h3 {
            font-size: 18px;
          }
        }

        @media (max-width: 420px) {
          .hero-face {
            height: 148px;
          }

          .small-pill {
            font-size: 10px;
            padding: 5px 10px;
          }
        }
      `}</style>
    </div>
  );
}
