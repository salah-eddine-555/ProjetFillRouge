import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getClasseById } from "../../services/classeService";
import { getCoursProf } from "../../services/courService";
import { useParams } from "react-router-dom";
import "./styles/Classe.css";
 
const Classe = () => {
  const { id } = useParams();
  const [classe, setClasse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCours, setSelectedCours] = useState("");
  const [cours, setCours] = useState([]);
 
    const fetchCoursProf = async () => {
      try {
        const res = await getCoursProf();
        console.log(res.data.data);
        setCours(res.data.data);
      } catch (error) {
        console.error("Erreur fetch cours:", error);
      }
    };
 
  const fetchClasse = async (id) => {
    try {
      const res = await getClasseById(id);
      setClasse(res.data.data);
    } catch (error) {
      console.error("Erreur fetch classe:", error);
    }
  };
 
  useEffect(() => {
    fetchClasse(id);
    fetchCoursProf();
  }, []);
 
  const handleAssigner = () => {
    if (!selectedCours) return;
    console.log("Cours assigné :", selectedCours, "à la classe :", id);
    setShowModal(false);
    setSelectedCours("");
  };
 
  if (!classe) {
    return (
      <div className="classe-page">
        <Sidebar />
        <div className="classe-spinner-wrapper">
          <div className="spinner-border classe-spinner" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="classe-page">
      <Sidebar />
 
      <div className="classe-content">
 
        {/* Header */}
        <div className="classe-header">
          <div className="classe-header-left">
            <div className="classe-header-icon">
              <i className="bi bi-building fs-4 text-white"></i>
            </div>
            <div>
              <h2 className="classe-header-title">{classe.name}</h2>
              <span className="classe-header-niveau">
                Niveau : <strong>{classe.niveau?.name}</strong>
              </span>
            </div>
          </div>
 
          <button className="btn-assigner" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle-fill"></i>
            Assigner un Cours
          </button>
        </div>
 
        <div className="row g-4">
 
          {/* Card Infos Générales */}
          <div className="col-md-4">
            <div className="card classe-card">
              <div className="card-body">
                <h6 className="classe-card-title">Informations Générales</h6>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Nom de la classe</span>
                    <strong>{classe.name}</strong>
                  </li>
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Niveau</span>
                    <strong>{classe.niveau?.name}</strong>
                  </li>
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Nombre d'élèves</span>
                    <span className="badge-eleves">{classe.eleves?.length}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
 
          {/* Card Professeur */}
          <div className="col-md-4">
            <div className="card classe-card">
              <div className="card-body">
                <h6 className="classe-card-title">Professeur</h6>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="prof-avatar">
                    <i className="bi bi-person-fill fs-5 text-white"></i>
                  </div>
                  <div>
                    <p className="prof-name">{classe.prof?.user?.firstname ?? "N/A"}</p>
                    <span className="text-muted" style={{ fontSize: 13 }}>
                      {classe.prof?.user?.email ?? ""}
                    </span>
                  </div>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Etat_professionelle</span>
                    <strong>{classe.prof?.Etat_professionelle}</strong>
                  </li>
                  <li className="d-flex justify-content-between py-2">
                    <span className="text-muted">Expérience</span>
                    <strong>{classe.prof?.experiences} ans</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
 
          {/* Card Stats */}
          <div className="col-md-4">
            <div className="card-stats d-flex flex-column justify-content-center align-items-center text-center gap-2 p-4">
              <i className="bi bi-people-fill" style={{ fontSize: 48, opacity: 0.85 }}></i>
              <h1 className="card-stats-number">{classe.eleves?.length}</h1>
              <p className="mb-0 opacity-75">Élèves inscrits</p>
            </div>
          </div>
 
          {/* Table Élèves */}
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
              <div className="card-body">
                <h6 className="classe-card-title">Liste des Élèves</h6>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 table-eleves">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classe.eleves?.map((ele) => (
                        <tr key={ele.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="eleve-avatar"
                                style={{
                                  background: `hsl(${(ele.id * 57) % 360}, 65%, 55%)`,
                                }}
                              >
                                {ele.user?.name?.charAt(0).toUpperCase() ?? "E"}
                              </div>
                              <span className="fw-semibold">
                                {ele.user?.name ?? ele.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-muted" style={{ fontSize: 14 }}>
                            {ele.user?.email ?? "—"}
                          </td>
                          <td>
                            <span className="badge-actif">Actif</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Modale */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
 
          <div className="modal-box">
            {/* Header modale */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center gap-2">
                <div className="modal-header-icon">
                  <i className="bi bi-journal-plus text-white"></i>
                </div>
                <h5 className="modal-title">Assigner un Cours</h5>
              </div>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
 
            {/* Classe cible */}
            <div className="modal-classe-info">
              <i className="bi bi-building" style={{ color: "#16a34a" }}></i>
              <span>
                Classe cible : <strong>{classe.name}</strong> —{" "}
                <span className="text-muted">{classe.niveau?.name}</span>
              </span>
            </div>
 
            {/* Select cours */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ fontSize: 14, color: "#14532d" }}>
                Sélectionner un cours
              </label>
 
              {cours.length === 0 ? (
                <div className="text-muted text-center py-3" style={{ fontSize: 14 }}>
                  <i className="bi bi-info-circle me-2"></i>
                  Aucun cours disponible
                </div>
              ) : (
                <select
                  className="form-select modal-select"
                  value={selectedCours}
                  onChange={(e) => setSelectedCours(e.target.value)}
                >
                  <option value="">-- Choisir un cours --</option>
                 
                  {cours.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titre}
                    </option>
                  ))}
                </select>
              )}
            </div>
 
            {/* Boutons */}
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-annuler" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button
                className={`btn btn-confirmer ${selectedCours ? "active" : "disabled"}`}
                onClick={handleAssigner}
                disabled={!selectedCours}
              >
                <i className="bi bi-check-circle me-2"></i>
                Assigner
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
 
export default Classe;