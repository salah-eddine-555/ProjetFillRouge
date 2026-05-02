import React, {useState, useEffect} from 'react'
import Sidebar from "../../components/Sidebar";
import './styles/prepaereCour.css';
import {useParams} from 'react-router-dom';
import {showCour, getDocumentsCour} from '../../services/courService';
import DocumentModal from "./DocumentModal";




const PreparerCours = () => {
  const { id } = useParams()
  const [cours, setCours] = useState({});
  const [docs, setDocs] = useState([]);
  const [modal, setModal] = useState(null)  // null | { doc }

  const fetchCour = async(id) => {
    try{
        const res = await showCour(id);
        // console.log(res.data.data);
        setCours(res.data.data);

    }catch(error){
        console.log|(error);
    }
  }

  const fetchDocuments = async(id) => {
    try{
        const res = await getDocumentsCour(id);
        console.log(res.data.data);
        setDocs(res.data.data);
    }catch(error){
        console.log(error)
    }
  }
  useEffect(() => {
    fetchCour(id);
    fetchDocuments(id);
  },[])

  



  const handleSave = (data) => {
    if (data.id) {
      setDocs(prev => prev.map(d => d.id === data.id ? { ...d, ...data } : d))
    } else {
      setDocs(prev => [...prev, {
        ...data,
        id: Date.now(),
        updatedAt: new Date().toLocaleDateString('fr-FR'),
        images: [],
      }])
    }
    setModal(null)
  }

  const handleDelete = (docId) => {
    if (window.confirm('Supprimer ce document ?'))
      setDocs(prev => prev.filter(d => d.id !== docId))
  }

  const handleAddImage = (docId) => {
    // TODO: file picker + upload → remplacer par la vraie logique back-end
    const fake = { id: Date.now(), path: '/placeholder.png' }
    setDocs(prev => prev.map(d =>
      d.id === docId ? { ...d, images: [...d.images, fake] } : d
    ))
  }

  const handleDeleteImage = (docId, imgId) => {
    setDocs(prev => prev.map(d =>
      d.id === docId ? { ...d, images: d.images.filter(i => i.id !== imgId) } : d
    ))
  }

  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>

      <main className="dp-main">

        {/* ── En-tête ─────────────────────────────── */}
        <div className="pc-header">
          <p className="pc-breadcrumb">
            Cours &rsaquo; <span className="pc-bread-link">{cours.titre}</span> &rsaquo; Préparation
          </p>
          <h1 className="pc-page-title">Préparer le cours</h1>
          <p className="pc-page-sub">
            Gérez les documents et ressources — cours ID : <strong>{id}</strong>
          </p>
        </div>

        {/* ── Bannière cours ───────────────────────── */}
        <div className="pc-cours-banner">
          <div className="pc-cb-badge">
            <span className="pc-cb-mat">{cours.matiere?.name}</span>
            <span className="pc-cb-h">{cours.mass_horaire}h</span>
          </div>
          <div className="pc-cb-info">
            <p className="pc-cb-name">{cours.titre} — {cours.classes?.[0]?.niveau?.name}</p>
            <div className="pc-cb-tags">
              <span className="pc-cb-tag">{cours.matiere?.name}</span>
              <span className="pc-cb-tag">Masse horaire : {cours.mass_horaire}h</span>
              <span className="pc-cb-tag">{cours.date}</span>
            </div>
          </div>
          <div className="pc-cb-stats">
            <div className="pc-stat">
              <span className="pc-stat-n">{cours.documents_count}</span>
              <span className="pc-stat-l">Documents</span>
            </div>
            {/* <div className="pc-stat">
              <span className="pc-stat-n">{totalImages}</span>
              <span className="pc-stat-l">Images</span>
            </div> */}
          </div>
        </div>

        {/* ── Section documents ────────────────────── */}
        <div className="pc-sec-hd">
          <span className="pc-sec-title">Documents du cours</span>
          <button className="pc-btn-new" onClick={() => setModal({ doc: null })}>
            + Nouveau document
          </button>
        </div>

        <div className="pc-docs-grid">
          {docs.map(doc => (
            <div key={doc.id} className="pc-doc-card">

              <div className="pc-doc-top">
                <div className="pc-doc-ico">📄</div>
                <span className="pc-doc-htitle">{doc.titre}</span>
                <div className="pc-doc-actions">
                  <button className="pc-dib" title="Modifier" onClick={() => setModal({ doc })}>✏️</button>
                  <button className="pc-dib pc-dib-del" title="Supprimer" onClick={() => handleDelete(doc.id)}>🗑</button>
                </div>
              </div>

              <div className="pc-doc-body">
                <p className="pc-doc-txt">{doc.content}</p>
              </div>

              <div className="pc-doc-ft">
                <span className="pc-doc-date">Modifié le {doc.updatedAt}</span>
                <button className="pc-btn-edit" onClick={() => setModal({ doc })}>
                  Modifier contenu
                </button>
              </div>

            </div>
          ))}

          {/* Carte ajout */}
          <button className="pc-doc-new" onClick={() => setModal({ doc: null })}>
            <span style={{ fontSize: 28 }}>📄</span>
            <span className="pc-doc-new-l">Ajouter un document</span>
            <span className="pc-doc-new-s">titre · contenu · images</span>
          </button>
        </div>

        {/* ── Modal ────────────────────────────────── */}
        {modal && (
          <DocumentModal
            doc={modal.doc}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        )}

      </main>
    </div>
  )
}

export default PreparerCours