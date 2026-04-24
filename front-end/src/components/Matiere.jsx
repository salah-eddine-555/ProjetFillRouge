import { useState, useEffect } from "react";
import { getMatieres, updateMatiere, deleteMatiere, addMatiere } from "../services/matirerService";

export default function Matiere() {

  const [matieres,  setMatieres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMatieres, setNewMatieres] = useState("");
  const [errors, setErrors] = useState("");
  const [mode, setMode] = useState('create');

  const [message, setMessages] = useState("");

  const fetchMatieres = async () => {

    try{
      const res = await getMatieres();
      console.log(res);
      setMatieres(res);

    }catch(error){
      console.log(error.response.data);

    }
  }
  useEffect(()=> {
    
      fetchMatieres();
  }, [])

  const handleEdit = (m) => {
    setMode('edit');
    setNewMatieres(m.name);
    setSelectedId(m.id);
    setErrors({});
    setShowModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if(mode === 'create'){

       await addMatiere({name: newMatieres});

      }else{

        await updateMatiere(selectedId, {name: newMatieres});

      }
      setNewMatieres("");
      setShowModal(false);
      fetchMatieres();

    }catch(error){
      console.log(error.response.data.errors);
    }
  }

  const handleDelete = async (id) => {

    try{
      const res  = await deleteMatiere(id);
      console.log(res.data.message);
      setMessages(res.data.message)
      fetchMatieres();
      
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="w-100">

      {/* 🔵 Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

        <h2 className="fw-bold text-dark m-0">
          Gestion des matières
        </h2>

        <button className="btn btn-success mt-2 mt-md-0" onClick={() => setShowModal(true)}>
          + Nouvelle matière
        </button>
      </div>
      {message && (
          <div className="alert alert-success">{message}</div>
      )}
      

      {/* 🔵 Card */}
      <div className="card shadow-sm border-0">

        <div className="card-body">

          {/* 🔵 Table responsive */}
          <div className="table-responsive">

            <table className="table table-hover align-middle">

              {/* Header */}
              <thead className="table-light">
                <tr>
        
                  <th>Nom de la matière</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>  

              {/* Body */}
              <tbody>

                {matieres.map((m) => (
                    <tr key={m.id}>
                        <td>{m.name}</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(m)}>
                            Modifier
                          </button>
                       
                          <button className="btn btn-sm btn-outline-danger" onClick={()=> handleDelete(m.id)}>
                            Supprimer
                          </button>

                        </td>
                    </tr>
                ))} 
              </tbody>

            </table>

          </div>

        </div>
      </div>
      {showModal && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">

                      {/* Header */}
                      <div className="modal-header">
                        <h5 className="modal-title">
                          {mode === "create" ? "ajouter": "modifier matiere"}
                        </h5>
                        <button
                          className="btn-close"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>

                      {/* Body */}
                      <div className="modal-body">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom du matiere"
                          value={newMatieres}
                          onChange={(e) => setNewMatieres(e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-danger">
                              {errors.name}
                            </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Annuler
                        </button>

                        <button
                          className="btn btn-success"
                          onClick={handleSubmit}
                        >
                          {mode === 'create' ? "Ajouter" : "Modifier"}
                        </button>
                      </div>

                    </div>
                  </div>
            </div>
        )}

    </div>
  );
}