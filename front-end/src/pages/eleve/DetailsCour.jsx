import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { showDeatisCour } from '../../services/EleveService';
import './styles/detailscour.css';

const DetailsCour = () => {
  const [detail, setDetail]      = useState(null);
  const [loading, setLoading]     = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await showDeatisCour(id);
        console.log(res.data.data);
        setDetail(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ← manquait
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>

      <main className="dp-main">

        {/* ── Spinner ── */}
        {loading && (
          <div className="dc-spinner-wrap">
            <div className="spinner-border dc-spinner" role="status" />
            <span>Chargement du cours…</span>
          </div>
        )}

        {/* ── Contenu ── */}
        {!loading && detail && (
          <>
            {/* Header cours */}
            <div className="dc-header">
              <div className="dc-header-icon">📘</div>
              <div className="dc-header-info">
                <span className="dc-matiere-badge">
                  {detail.matiere?.name || "Matière"}
                </span>
                <h1 className="dc-titre">{detail.titre}</h1>
                <p className="dc-description">{detail.description}</p>
              </div>
            </div>

            {/* Section documents */}
            <div className="dc-section-label">
              <span>📄</span> Documents du cours
            </div>

            {detail.documents?.length === 0 && (
              <div className="dc-empty">
                <div>🗂️</div>
                <p>Aucun document disponible pour ce cours.</p>
              </div>
            )}

            <div className="row g-3">
              {detail.documents?.map(doc => (
                <div key={doc.id} className="col-12 col-sm-6 col-lg-4">
                  <div
                    className={`dc-doc-card ${selectedDoc?.id === doc.id ? 'dc-doc-card--active' : ''}`}
                    onClick={() => setSelectedDoc(selectedDoc?.id === doc.id ? null : doc)}
                  >
                    <div className="dc-doc-icon">📄</div>
                    <div className="dc-doc-info">
                      <div className="dc-doc-titre">{doc.titre}</div>
                      <div className="dc-doc-hint">Cliquer pour voir le contenu</div>
                    </div>
                    <div className="dc-doc-arrow">
                      {selectedDoc?.id === doc.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>

      
            {selectedDoc && (
              <div className="dc-doc-detail mt-4">
                <div className="dc-doc-detail-header">
                  <div className="dc-doc-detail-title">
                    <span>📄</span> {selectedDoc.titre}
                  </div>
                  <button
                    className="dc-close-btn"
                    onClick={() => setSelectedDoc(null)}
                  >
                    ✕ Fermer
                  </button>
                </div>
                <div
                  className="dc-doc-content"
                  dangerouslySetInnerHTML={{ __html: selectedDoc.content }}
                />
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default DetailsCour;