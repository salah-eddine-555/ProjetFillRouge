import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import "./styles/dashboardEleve.css";
 
// ── Service ───────────────────────────────────────────────────
const getInfoEleve = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/eleve/info", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Erreur lors du chargement des données élève.");
  return response.json();
};
 
// ── Composant ─────────────────────────────────────────────────
const DashboardEleve = () => {
  const [info, setInfo]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
 
  useEffect(() => {
    getInfoEleve()
      .then((data) => setInfo(data))
      .catch((err)  => setError(err.message))
      .finally(()   => setLoading(false));
  }, []);
 
  // helpers
//   const elevePct  = info ? Math.min(Math.round((info.nombre_eleves / 40) * 100), 100) : 0;
//   const coursPct  = info ? Math.min(Math.round((info.cours / 15) * 100), 100) : 0;
//   const niveauPct = 60;
 
  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>
 
      <main className="dp-main">
 
        {/* ── Hero Header ── */}
        <div className="eco-header mb-4">
          <div className="eco-header-inner">
            <div className="eco-header-icon">🌿</div>
            <div>
              <h1 className="eco-title mb-0">Mon Espace</h1>
              <span className="eco-subtitle">Tableau de bord élève</span>
            </div>
            <span className="eco-header-badge">✦ Année 2025–2026</span>
          </div>
        </div>
 
        {/* ── Loading ── */}
        {loading && (
          <div className="eco-loading">
            <div className="spinner-border eco-spinner" role="status" />
            <span>Chargement de votre espace…</span>
          </div>
        )}
 
        {/* ── Error ── */}
        {error && (
          <div className="eco-alert-error d-flex align-items-center gap-2" role="alert">
            ⚠️ {error}
          </div>
        )}
 
        {/* ── Contenu ── */}
        {!loading && !error && info && (
          <>
            {/* Section Classe */}
            <div className="eco-section-label">Ma Classe</div>
            <div className="eco-card-classe">
 
              {/* Header de la card */}
              <div className="eco-card-header-bar">
                <div className="eco-card-header-icon">🏫</div>
                <div className="eco-card-header-text">
                  <div className="label">Classe assignée</div>
                  <div className="value">{info.classe?.name}</div>
                </div>
                <span className="eco-active-pill">Active</span>
              </div>
 
              {/* Body de la card */}
              <div className="eco-card-body">
                <div className="eco-prof-row">
                  <div className="eco-prof-avatar">👨‍🏫</div>
                  <div className="eco-prof-info">
                    <div className="prof-role">Professeur responsable</div>
                    <div className="prof-name">{info.professeur?.Etat_professionelle}</div>
                    <div className="prof-exp">
                      🏅 {info.professeur?.experiences} ans d'expérience
                    </div>
                  </div>
                  <span className="eco-prof-badge">⭐ Vacataire</span>
                </div>
              </div>
            </div>
 
            {/* Section Stats */}
            <div className="eco-section-label">Statistiques</div>
            <div className="row g-4">
 
              {/* Élèves */}
              <div className="col-md-6 col-lg-4">
                <div className="eco-stat-card eco-stat-eleves">
                  <div className="eco-accent-strip" />
                  <div className="eco-blob" />
                  <div className="eco-stat-top">
                    <div className="eco-stat-icon-wrap">👥</div>
                    <span className="eco-stat-trend">↑ Actifs</span>
                  </div>
                  <div className="eco-stat-value">{info.nombre_eleves}</div>
                  <div className="eco-stat-label">Élèves dans la classe</div>
                  <div className="eco-prog-wrap">
                    <div className="eco-prog-bar">
                      {/* <div className="eco-prog-fill" style={{ width: `${elevePct}%` }} /> */}
                    </div>
                    {/* <span className="eco-prog-pct">{elevePct}%</span> */}
                  </div>
                </div>
              </div>
 
              {/* Cours */}
              <div className="col-md-6 col-lg-4">
                <div className="eco-stat-card eco-stat-cours">
                  <div className="eco-accent-strip" />
                  <div className="eco-blob" />
                  <div className="eco-stat-top">
                    <div className="eco-stat-icon-wrap">📚</div>
                    <span className="eco-stat-trend">↑ Disponibles</span>
                  </div>
                  <div className="eco-stat-value">{info.cours}</div>
                  <div className="eco-stat-label">Cours disponibles</div>
                  <div className="eco-prog-wrap">
                    <div className="eco-prog-bar">
                      {/* <div className="eco-prog-fill" style={{ width: `${coursPct}%` }} /> */}
                    </div>
                    {/* <span className="eco-prog-pct">{coursPct}%</span> */}
                  </div>
                </div>
              </div>
 
              {/* Niveau */}
              <div className="col-md-6 col-lg-4">
                <div className="eco-stat-card eco-stat-niveau">
                  <div className="eco-accent-strip" />
                  <div className="eco-blob" />
                  <div className="eco-stat-top">
                    <div className="eco-stat-icon-wrap">🎯</div>
                    <span className="eco-stat-trend">En cours</span>
                  </div>
                  <div className="eco-stat-value">N·{info.classe?.niveau_id}</div>
                  <div className="eco-stat-label">Niveau scolaire</div>
                  <div className="eco-prog-wrap">
                    <div className="eco-prog-bar">
                      {/* <div className="eco-prog-fill" style={{ width: `${niveauPct}%` }} /> */}
                    </div>
                    {/* <span className="eco-prog-pct">{niveauPct}%</span> */}
                  </div>
                </div>
              </div>
 
            </div>
          </>
        )}
 
      </main>
    </div>
  );
};
 
export default DashboardEleve;