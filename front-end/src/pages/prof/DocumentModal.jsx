import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DocumentModal = ({ doc, onSave, onClose }) => {
  const [titre, setTitre] = useState("");
  const [content, setContent] = useState("");

  // 🧠 ملي يكون تعديل
  useEffect(() => {
    if (doc) {
      setTitre(doc.titre || "");
      setContent(doc.content || "");
    } else {
      setTitre("");
      setContent("");
    }
  }, [doc]);

  const handleSubmit = () => {
    onSave({
      id: doc?.id,
      titre,
      content,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>{doc ? "Modifier document" : "Nouveau document"}</h2>

        {/* titre */}
        <input
          type="text"
          placeholder="Titre du document"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />

        {/* 🧠 ReactQuill (Word editor) */}
        <ReactQuill
          value={content}
          onChange={setContent}
        />

        {/* actions */}
        <div className="modal-actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSubmit}>
            Sauvegarder
          </button>
        </div>

      </div>
    </div>
  );
};

export default DocumentModal;