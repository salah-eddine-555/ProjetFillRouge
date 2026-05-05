export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .page {
          min-height: 100vh;
          background: #0a2e1a;
          font-family: 'DM Sans', sans-serif;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 40px 40px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .orb1 { width: 420px; height: 420px; background: radial-gradient(circle, #1a6b3a55 0%, transparent 70%); top: -80px; right: -60px; }
        .orb2 { width: 300px; height: 300px; background: radial-gradient(circle, #2e9e5b33 0%, transparent 70%); bottom: 40px; left: -80px; }
        .orb3 { width: 150px; height: 150px; background: radial-gradient(circle, #4ade8044 0%, transparent 70%); top: 45%; left: 42%; }

        .pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 30px; padding: 6px 16px;
          font-size: 0.75rem; font-weight: 600;
          color: #86efac; letter-spacing: 0.6px;
          text-transform: uppercase; margin-bottom: 28px;
          position: relative; z-index: 2;
        }
        .pill-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 8px #22c55e;
          animation: pd 2s ease-in-out infinite;
        }
        @keyframes pd { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }

        .home-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          line-height: 1.12; color: #f0fdf4;
          margin-bottom: 18px; max-width: 680px;
          position: relative; z-index: 2;
        }
        .home-title em { font-style: italic; color: #4ade80; }

        .desc {
          font-size: 1rem; color: rgba(255,255,255,0.55);
          line-height: 1.75; max-width: 500px;
          margin: 0 auto 38px;
          position: relative; z-index: 2;
        }
        .actions {
          display: flex; gap: 12px; justify-content: center;
          flex-wrap: wrap; margin-bottom: 56px;
          position: relative; z-index: 2;
        }
        .btn-g {
          background: #22c55e; color: #052e10;
          border: none; border-radius: 12px; padding: 14px 30px;
          font-size: 0.92rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 22px #22c55e44;
          transition: transform 0.18s;
        }
        .btn-g:hover { transform: translateY(-2px); }
        .btn-o {
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8); border-radius: 12px;
          padding: 14px 30px; font-size: 0.92rem; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .cards {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 16px; max-width: 760px; width: 100%;
          position: relative; z-index: 2;
        }
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px; padding: 22px; text-align: left;
          transition: border-color 0.2s, background 0.2s;
        }
        .card:hover { border-color: rgba(34,197,94,0.35); background: rgba(34,197,94,0.06); }
        .card-ico {
          width: 38px; height: 38px;
          background: rgba(34,197,94,0.15); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; margin-bottom: 12px;
        }
        .card-t { font-size: 0.85rem; font-weight: 600; color: #d1fae5; margin-bottom: 5px; }
        .card-s { font-size: 0.76rem; color: rgba(255,255,255,0.4); line-height: 1.55; }
        .card-n { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #4ade80; margin-top: 10px; }
        .footer-strip {
          display: flex; align-items: center; justify-content: center;
          gap: 24px; padding-top: 40px; flex-wrap: wrap;
          position: relative; z-index: 2;
        }
        .fitem { display: flex; align-items: center; gap: 7px; font-size: 0.75rem; color: rgba(255,255,255,0.28); }
        .fdot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; }
      `}</style>

      <div className="page">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        <div className="pill"><span className="pill-dot" />Plateforme de Transition Verte</div>

        <h1 className="home-title">Bienvenue sur<br /><em>EcoSmart</em></h1>

        <p className="desc">
          La plateforme intelligente qui pilote votre transition écologique.
          Réduisez votre empreinte carbone, optimisez votre consommation
          énergétique et construisez un avenir durable — depuis un seul tableau de bord.
        </p>

        <div className="actions">
          <button className="btn-g">Démarrer Gratuitement →</button>
          <button className="btn-o">Voir la Démo</button>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-ico">⚡</div>
            <div className="card-t">Énergie Verte</div>
            <div className="card-s">Surveillez et optimisez votre consommation en temps réel.</div>
            <div className="card-n">−38%</div>
          </div>
          <div className="card">
            <div className="card-ico">🌍</div>
            <div className="card-t">Bilan Carbone</div>
            <div className="card-s">Mesurez, compensez et réduisez vos émissions CO₂.</div>
            <div className="card-n">500+</div>
          </div>
          <div className="card">
            <div className="card-ico">📊</div>
            <div className="card-t">Analyse IA</div>
            <div className="card-s">Rapports certifiés ISO 14064 et recommandations intelligentes.</div>
            <div className="card-n">98%</div>
          </div>
        </div>

        <div className="footer-strip">
          <div className="fitem"><span className="fdot" />500+ entreprises</div>
          <div className="fitem"><span className="fdot" />Certifié ISO 14064</div>
          <div className="fitem"><span className="fdot" />12 ans d'expertise</div>
          <div className="fitem"><span className="fdot" />Support 24/7</div>
        </div>
      </div>
    </>
  );
}