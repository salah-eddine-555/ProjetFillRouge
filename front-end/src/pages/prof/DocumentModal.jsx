import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles/documentModal.css";

const QUILL_MODULES = {
  toolbar: [
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "font", "size", "bold", "italic", "underline", "strike",
  "color", "background", "align",
  "list", "bullet", "indent",
  "blockquote", "code-block",
  "link", "image",
];

const DocumentModal = ({ doc, onSave, onClose }) => {
  const [titre,   setTitre]   = useState("");
  const [content, setContent] = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doc) {
      setTitre(doc.titre   || "");
      setContent(doc.content || "");
    } else {
      setTitre("");
      setContent("");
    }
    setError("");
  }, [doc]);

  const handleSubmit = async () => {
    if (!titre.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!content || content === "<p><br></p>") {
      setError("Le contenu est obligatoire.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSave({ id: doc?.id, titre, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dm-overlay" onClick={onClose}>
      <div className="dm-modal" onClick={e => e.stopPropagation()}>

        {/* ── Header ─────────────────────────────── */}
        <div className="dm-header">
          <div className="dm-header-left">
            <div className="dm-header-ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </div>
            <div>
              <p className="dm-header-title">
                {doc ? "Modifier le document" : "Nouveau document"}
              </p>
              <p className="dm-header-sub">Rédigez le contenu de ce cours</p>
            </div>
          </div>
          <button className="dm-close" onClick={onClose} title="Fermer">✕</button>
        </div>

        {/* ── Body ───────────────────────────────── */}
        <div className="dm-body">

          {/* Titre */}
          <div className="dm-field">
            <label className="dm-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#3B6D11">
                <path d="M5 4v3h5.5v12h3V7H19V4z"/>
              </svg>
              Titre du document
            </label>
            <input
              className={`dm-input ${error && !titre.trim() ? "dm-input-error" : ""}`}
              type="text"
              value={titre}
              onChange={e => { setTitre(e.target.value); setError(""); }}
              placeholder="Ex : Introduction aux vecteurs..."
              autoFocus
            />
          </div>

          {/* Contenu Quill */}
          <div className="dm-field">
            <label className="dm-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#3B6D11">
                <path d="M3 18h12v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
              Contenu du document
            </label>
            <div className={`dm-quill-wrap ${error && (!content || content === "<p><br></p>") ? "dm-quill-error" : ""}`}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={val => { setContent(val); setError(""); }}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder="Rédigez le contenu ici..."
              />
            </div>
            <p className="dm-hint">
              Supporte le texte riche : titres, listes, couleurs, images, liens...
            </p>
          </div>

          {/* Erreur */}
          {error && (
            <div className="dm-error-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E24B4A">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </div>
          )}

        </div>

        {/* ── Footer ─────────────────────────────── */}
        <div className="dm-footer">
          <p className="dm-footer-hint">
            {doc ? "Les modifications remplaceront l'ancien contenu." : "Le document sera ajouté à ce cours."}
          </p>
          <div className="dm-footer-actions">
            <button className="dm-btn-cancel" onClick={onClose} disabled={loading}>
              Annuler
            </button>
            <button className="dm-btn-save" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <span className="dm-spinner"></span>
                  Enregistrement...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                  </svg>
                  {doc ? "Enregistrer les modifications" : "Créer le document"}
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DocumentModal;