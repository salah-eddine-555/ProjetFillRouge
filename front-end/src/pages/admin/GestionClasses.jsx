  import Sidebar from "../../components/Sidebar";
  import "./style/classes.css";
  import { addClasse, getClasses } from "../../services/classeService";
  import { useEffect, useState } from "react";
  import { getNivaux } from "../../services/niveauxService";
  import { useNavigate } from "react-router-dom";


  export default function GestionClasses() {

      const[formData, setFormData] = useState({
        name: "",
        niveau_id: "",
      })
      const [message, setMessage] = useState("");

      const [classes, setClasses] = useState([]);
      const [niveaux, setNiveaux] = useState([]);
      const [selectedNiveaux, setSelectedNiveaux] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const [error, setError] = useState([]);

      const navigate = useNavigate();
      

    const fetchClasses = async() => {
      try{
        const res = await getClasses();
        console.log(res.data.data);
        setClasses(res.data.data);
      }catch(error){
        console.log(error.response);
      }
    }

    const fetchNiveaux = async() => {
      try{
        const res = await getNivaux();
        console.log(res.data);
        setNiveaux(res.data);
      }catch(error){
        
        console.log(error.response.data.errors);
      }
    }

    useEffect(()=>{
      fetchNiveaux();
      fetchClasses();
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const res = await addClasse(formData);
        console.log(res.data.message);
        setMessage(res.data.message);
        setShowModal(false);

        setFormData({
          name: "",
          niveau_id: ""
        });

        fetchClasses();
        
      }catch(error){
        if(error.response?.data.errors){
          console.log(error.response.data.errors);
          setError(error.response.data.errors);
        }
        console.log('ERREUR DE valiadation');
      }
    }

    const filterClasses = selectedNiveaux === null ? classes : classes.filter(c => c.niveau_id === selectedNiveaux)


    return (
      <div className="d-flex">

        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="content flex-grow-1 p-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3 className="fw-bold m-0">Gestion des classes</h3>

            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              + Ajouter Classe
            </button>
          </div>

          {/* Filter */}
          <div className="filter-bar mb-4 d-flex flex-wrap gap-2">
            <button className={`filter-btn ${selectedNiveaux === null ? 'active' : ''}`}
            onClick={() => setSelectedNiveaux(null)} >
              Toutes</button>
            {niveaux.map((n) => (
              <button key={n.id} className={`filter-btn ${selectedNiveaux === n.id ? 'active': ''}`}
              onClick={() => setSelectedNiveaux(n.id)}>{n.name}</button>
            ))}
    
          </div>

          {/* Cards */}
          <div className="row g-4">

            {filterClasses.map((c)=> (
              <div key={c.id} className="col-12 col-sm-6 col-lg-4">
                  <div className="class-card">
                    <div className="d-flex justify-content-between">
                      <span className="class-code">CA</span>
                      <span className="badge niveau">{c.niveau.name}</span>
                    </div>

                    <h5 className="mt-3">{c.name}</h5>
                    <p className="mt-2">
                          <span className="fw-semibold text-muted">Professeur :</span>{" "}

                          {c.prof ? (
                            <span className="badge bg-success">
                              {c.prof.name}
                            </span>
                          ) : (
                            <span className="badge bg-secondary">
                              Non assigné
                            </span>
                          )}
                    </p>

                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <small>Étudiants</small>
                        <h6>{c.eleves_count}</h6>
                      </div>
                      <div>
                        <small>Capacité</small>
                        <h6>35</h6>
                      </div>
                    </div>

                    <div className="progress mt-3">
                      <div className="progress-bar bg-success" style={{width:"0%"}}></div>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-outline-success btn-sm"
                        onClick={() => navigate(`/admin/classes/${c.id}`)}
                      
                      >Détails</button>
                      <button className="btn btn-outline-secondary btn-sm">Modifier</button>
                    </div>
                  </div>
            </div>

            ))}


          </div>

        </div>
            {showModal && (
              <div className="modal modal show d-block" 
                id="addClasseModal" 
                tabIndex="-1"
              >
                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                      <div className="modal-dialog">
                        <div className="modal-content">

                    
                          <div className="modal-header">
                            <h5 className="modal-title">Ajouter une Classe</h5>
                            <button className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)}></button>
                          </div>

                  
                          <div className="modal-body">

                            {/* Nom classe */}
                          
                            <div className="mb-3">
                              
                              <label className="form-label">Nom de la classe</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ex: Classe A"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                                {error && (
                                  <p className="text-danger">{error.name}</p>
                                )}
                            </div>

                            {/* Select niveaux */}
                            <div className="mb-3">
                              <label className="form-label">Niveau</label>
                              <select
                                className="form-select"
                                onChange={(e) => setFormData({...formData, niveau_id: Number(e.target.value) })}
                              >
                                <option value="">-- Choisir un niveau --</option>

                                {niveaux.map((n) => (
                                  <option key={n.id} value={n.id}>
                                    {n.name}
                                  </option>
                                ))}
                                {error.niveau_id && (
                                  <p className="text-danger">{error.niveau_id[0]}</p>
                                )}

                              </select>
                            </div>
                              
                          </div>
                              
                          {/* Footer */}
                          <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>
                              Annuler
                            </button>
                              
                            <button 
                              className="btn btn-success"
                              onClick={handleSubmit}
                            >
                              Ajouter
                            </button>
                          </div>
                              
                        </div>
                      </div>
              </div>
            )}
      </div>
    );
  }