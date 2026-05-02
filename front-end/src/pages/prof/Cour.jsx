import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./styles/cour.css";
import { getCoursProf, addCour } from "../../services/courService";
import { getMatieres } from "../../services/matirerService";
import {useNavigate} from 'react-router-dom';
 
const Cour = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [form, setForm] = useState({
  titre: "",
  description: "",
  mass_horaire: "",
  matiere_id: "",
  date: "",
});
  const [matieres, setMatieres] = useState([]);
  const navigate = useNavigate();
 
  const fetchCoursProf = async () => {
    try {
      const res = await getCoursProf();
      setCours(res.data.data);
    } catch (error) {
      console.error("Erreur fetch cours:", error);
    } finally {
      setLoading(false);
    }
  };

  const CreeCour = async() => {
    const res = await addCour(form);
    console.log(res.data);
  }

  const fetchMatieres = async() => {

    try{
      const res = await getMatieres();
      console.log(res);
      setMatieres(res);
    }catch(error){
      console.log(error);
    }
  } 
 
  useEffect(() => {
    fetchCoursProf();
    fetchMatieres();
  }, []);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
 const handleCreer = async () => {
  if (!form.titre.trim()) return;
  try {
    await CreeCour();          
    await fetchCoursProf();    
    setShowModal(false);        
    setForm({ titre: "", description: "", mass_horaire: "", matiere_id: "", date: "" }); 
  } catch (error) {
    console.error("Erreur création cours:", error);
  }
};
 
  const handleDelete = (id) => {
    console.log("Supprimer cours :", id);
    setCours(cours.filter((c) => c.id !== id));
  };
 
  if (loading) {
    return (
      <div className="cour-page">
        <Sidebar />
        <div className="cour-spinner-wrapper">
          <div className="spinner-border cour-spinner" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="cour-page">
      <Sidebar />
 
      <div className="cour-content">
 
        {/* Header */}
        <div className="cour-header">
          <div className="cour-header-left">
            <div className="cour-header-icon">
              <i className="bi bi-journal-richtext fs-4 text-white"></i>
            </div>
            <div>
              <h2 className="cour-header-title">Gestion des Cours</h2>
              <span className="cour-header-subtitle">
                Liste de tous les cours créés
              </span>
            </div>
          </div>
 
          <button className="btn-creer" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle-fill"></i>
            Créer un Cours
          </button>
        </div>
 
        {/* Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-card-icon">
                <i className="bi bi-journal-text"></i>
              </div>
              <div>
                <p className="stat-card-number">{cours.length}</p>
                <p className="stat-card-label">Total des cours</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-card-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div>
                <p className="stat-card-number">{cours.length}</p>
                <p className="stat-card-label">Cours actifs</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-card-icon">
                <i className="bi bi-calendar-plus"></i>
              </div>
              <div>
                <p className="stat-card-number">
                  {new Date().toLocaleDateString("fr-FR")}
                </p>
                <p className="stat-card-label">Aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Table Cours */}
        <div className="card cour-table-card">
          <div className="card-body">
            <h6 className="cour-card-title">Liste des Cours</h6>
 
            {cours.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-journal-x"></i>
                <p>Aucun cours créé pour le moment.</p>
              </div>
            ) : (
              <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 cour-table">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Matière</th>
                        <th>Masse Horaire</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cours.map((c) => (
                        <tr key={c.id}                  >

                          {/* TITRE */}
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <p className="cour-name mb-0">{c.titre}</p>
                            </div>
                          </td                  >

                          {/* DESCRIPTION */}
                          <td>
                            <p className="cour-desc mb-0">{c.description}</p>
                          </td                  >

                          {/* MATIERE */}
                          <td>
                            <span className="badge-matiere">{c.matiere?.name}</span>
                          </td                  >

                          {/* MASSE HORAIRE */}
                          <td className="text-muted text-center">{c.mass_horaire}h</td                  >

                          {/* DATE */}
                          <td className="text-muted" style={{ fontSize: 13 }}>{c.date}</td                  >

                          {/* ACTIONS */}
                          <td>
                            <div className="d-flex gap-2"                 >

                              {/* 🗑️ Supprimer */}
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                title="Supprimer"
                                onClick={() => handleDelete(c.id)}
                              >
                                <i className="bi bi-trash3-fill"></i>
                                Supprimer
                              </button                  >

                              {/* 📚 Préparer le cours */}
                              <button
                                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                                title="Préparer le cours"
                                onClick={() => navigate(`/preparer-cours/${c.id}`)}
                              >
                                <i className="bi bi-journal-plus"></i>
                                Préparer
                              </button                  >

                            </div>
                          </td                  >

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                 )}
          </div>
        </div>
 
      </div>
 
      {/* Modale Créer un Cours */}
        {showModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
 
          <div className="modal-box">
 
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center gap-2">
                <div className="modal-header-icon">
                  <i className="bi bi-journal-plus text-white"></i>
                </div>
                <h5 className="modal-title-text">Créer un Cours</h5>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
 
            {/* Champ Titre */}
            <div className="mb-3">
              <label className="modal-label">Titre du cours</label>
              <input
                type="text"
                className="modal-input"
                name="titre"
                placeholder="Ex: Mathématiques Algèbre"
                value={form.titre}
                onChange={handleChange}
              />
            </div>
 
            {/* Champ Description */}
            <div className="mb-3">
              <label className="modal-label">Description</label>
              <textarea
                className="modal-input"
                name="description"
                placeholder="Ex: Algèbre, analyse, géométrie..."
                rows={3}
                value={form.description}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
            </div>
 
            {/* Champ Masse Horaire */}
            <div className="mb-3">
              <label className="modal-label">Masse Horaire (h)</label>
              <input
                type="number"
                className="modal-input"
                name="mass_horaire"
                placeholder="Ex: 2"
                min={1}
                value={form.mass_horaire}
                onChange={handleChange}
              />
            </div>
 
            {/* Champ Matière */}
            <div className="mb-3">
              <label className="modal-label">Matière</label>
              <select
                className="modal-input"
                name="matiere_id"
                value={form.matiere_id}
                onChange={handleChange}
              >
                <option value="">-- Choisir une matière --</option>
                {matieres.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
 
            {/* Champ Date */}
            <div className="mb-4">
              <label className="modal-label">Date</label>
              <input
                type="date"
                className="modal-input"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
 
            {/* Boutons */}
            <div className="d-flex gap-2 justify-content-end">
              <button
                className="btn btn-annuler"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className={`btn btn-confirmer ${form.titre.trim() ? "active" : "disabled"}`}
                onClick={handleCreer}
                disabled={!form.titre.trim()}
              >
                <i className="bi bi-check-circle me-2"></i>
                Créer
              </button>
            </div>
 
          </div>
        </>
      )}
    </div>
  );
};
 
export default Cour;