import { useEffect, useState } from "react";
import { getNivaux, addNiveaux, updateNiveaux, deteleNiveaux } from "../services/niveauxService";


export default function Niveaux() {
  const [mode, setMode] = useState('create');

    const [showModal, setShowModal] = useState(false);
    const [niveaux, setNiveaux] = useState([]);
    const [newNiveau, setNewNiveau] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [errors, setErrors] = useState({});
    const [messages, setMessages] = useState("")

     const fetchNiveaux = async () => {
            try{
                const res = await getNivaux();
                console.log(res.data);
                setNiveaux(res.data);
                
            }catch(error){
                console.log(error.response?.data.errors);
                
            }
            //getNiveaux
        }

    useEffect((() => {
        fetchNiveaux();

    }),[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
      
      try{
        if(mode === 'create'){
          await addNiveaux({name: newNiveau});
        } else {
          await updateNiveaux(selectedId, {name: newNiveau});
        }

        setNewNiveau("");
        setShowModal(false);
        setSelectedId(null);
        fetchNiveaux();
      }catch(error){
        setErrors(error.response?.data.errors);
      }
       
       
    }
    const handleEdit = (niveau) => {
      setMode('edit');
      setSelectedId(niveau.id);
      setNewNiveau(niveau.name)
      setErrors({})
      setShowModal(true);
    }

    const handleDelete = async (id) => {
  
      try {
        
        const res = await deteleNiveaux(id);



        console.log(res.data.message);
        
        fetchNiveaux();

    } catch (error) {
      //  console.log(error.response.data.message);
      setMessages(error.response.data.message)
    }
 
  } 

  return (
    <div className="w-100">

      {/* 🔵 Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

        <h2 className="fw-bold text-dark m-0">
          Gestion des niveaux
        </h2>

        <button className="btn btn-success mt-2 mt-md-0" onClick={() => setShowModal(true)}>
          + Nouveau niveau
        </button>

      </div>
      
      {messages && (
        <div className="alert alert-danger">{messages}</div>
      )}
      

   
      <div className="card shadow-sm border-0">

        <div className="card-body">

      
          <div className="table-responsive">

            <table className="table table-hover align-middle">

              {/* Header table */}
              <thead className="table-light">
                <tr>
                
                  <th>Nom du niveau</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              {/* Body table */}
             <tbody>
               {niveaux.map((niveau) => (
                    <tr key={niveau.id}>
                        <td>{niveau.name}</td>
                        <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2" 
                             onClick={() =>  handleEdit(niveau)} >
                              Modifier
                            </button>

                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(niveau.id)}>
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
                        <h5 className="modal-title">Ajouter un niveau</h5>
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
                          placeholder="Nom du niveau"
                          value={newNiveau}
                          onChange={(e) => setNewNiveau(e.target.value)}
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