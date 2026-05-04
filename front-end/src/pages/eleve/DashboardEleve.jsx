import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import "./styles/dashboardEleve.css";
import {getInfoEleve} from '../../services/EleveService';
 

const DashboardEleve = () => {
  const [info, setInfo]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchInfoEleve = async () => {
  const res = await getInfoEleve();
  // console.log(res.data);
  setInfo(res.data);
  setLoading(false);
};
 
  useEffect(() => {
    fetchInfoEleve();

  }, []);
 
 
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

        {loading && (
          <div className="eco-loading">
            <div className="spinner-border eco-spinner" role="status" />
            <span>Chargement de votre espace…</span>
          </div>
        )}
 
    

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
 
              <div className="eco-card-body">
                <div className="eco-prof-row">
                  <div className="eco-prof-avatar">👨‍🏫</div>
                  <div className="eco-prof-info">
                    <div className="prof-role">Professeur responsable</div>
                    <div className="prof-name">{info.professeur?.firstname}-{info.professeur?.lastname}</div>
                    <div className="prof-exp">
                       {info.professeur?.email} 
                    </div>
                  </div>
                  <span className="eco-prof-badge">⭐ Vacataire</span>
                </div>
              </div>
            </div>
 
        
            <div className="eco-section-label">Statistiques</div>
            <div className="row g-4">
 
 
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
  
                </div>
              </div>
 
 
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
              
                </div>
              </div>

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