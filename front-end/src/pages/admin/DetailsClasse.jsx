import Sidebar from "../../components/Sidebar";
import "./style/detailsClasse.css";
import { assigneEleve, getClasseById, getElevesNonAssigne, getProfesseurs, assigneProf, retirerEleve } from "../../services/classeService";
import { useParams } from "react-router-dom";
import { useEffect, useState,  } from "react";

export default function DetailsClasse() {
    
   const {id} = useParams();

    const [classe, setClasse] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [elevesNonAssigne, setElevesNonAssigne] = useState([]);
    const [professeur, setProfesseur ] =  useState([])
    const [showModalProf, setShowModalProf] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
      classe_id : id,
      eleves_ids: [],
    })

    

    const hansleSelected = (id) => {
      console.log(id);
      setData((prev) => {
        console.log(prev);
        if(prev.eleves_ids.includes(id)){
            return prev;
        } else{
             return {
            ...prev,
            eleves_ids: [...prev.eleves_ids, id]
            }
        }
        
        fetchElevesNonAssigne();
        

      })
     
    }


    const fetchClasse = async () => {
        try{
            const res = await getClasseById(id);
            // console.log(res.data.data);
            setClasse(res.data.data);
        }catch(error){
            console.log(error);
        }
    }

    const fetchProfesseurs = async () => {
      const res = await getProfesseurs();
      console.log(res.data.data);
      setProfesseur(res.data.data);

    }

    const fetchElevesNonAssigne = async () => {
        const res = await getElevesNonAssigne();
        setElevesNonAssigne(res.data.data);
    }

    const valider = () => {
        assigneEleve(data);
        setShowModal(false);
        fetchClasse();

    }
    const validerProf = async () => {
        try {
          await assigneProf({
            classe_id: id,
            prof_id: data.professeur_id,
          });
        
          setShowModalProf(false);
          fetchClasse();
        
        } catch (error) {
          console.log(error);
        }
  };

  const Retirer = async (eleveId) => {
      // console.log(eleveId);
      // console.log(id);
          const res =await retirerEleve({classe_id: id, eleve_id: eleveId});
          console.log(res.data.message);
          setMessage(res.data.message);
          fetchClasse();
  }

    useEffect(()=> {
        fetchClasse()
        fetchElevesNonAssigne();
        fetchProfesseurs();
    }, [])
  
  useEffect(()=> {
    if(message){
      const timer = setTimeout(() => {
        setMessage("")
      }, 3000);
    }
  },[message])

  return (
    <div className="details-layout">

      {/* Sidebar */}
      <aside className="sidebar-area">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="content-area">

        {/* Header */}
        <div className="page-header">
          <div>
            <h3>Détails de la classe</h3>
            <p>Informations complètes</p>
          </div>

          <div className="actions">
            <button className="btn btn-success btn-sm" onClick={() => setShowModal(true)}>
              Assigner élèves
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowModalProf(true)}
            >
              {classe.prof ? "Changer professeur" : "Assigner professeur"}
            </button>
          </div>
        </div>

        {/* Class Info */}
        <div className="card-box">
          <div className="grid-3">

            <div>
              <small>Nom de la classe</small>
              <h5>{classe.name}</h5>
            </div>

            <div>
              <small>Niveau   </small>
              <span className="badge bg-success">{classe.niveau?.name}</span>
            </div>

            <div>
              <small>Capacité</small>
              <h5>35 élèves</h5>
            </div>

          </div>
        </div>

        {/* Professor */}
        <div className="card-box">
          <div className="card-header">
            <small>professeur : </small>
           
          </div>

          <div className="card-body flex-between">
            <div>
               {classe.prof ? (
                <h5>{classe.prof?.user?.firstname}</h5>
              
                ) : (
                <h5>pas encore assigné</h5>
            )}
              
            </div>

            <button className="btn btn-outline-danger btn-sm" onClick={() => setShowModalProf(true)}>
              Changer
            </button>
          </div>
        </div>

        {/* Students */}
        <div className="card-box">
          <div className="card-header flex-between">
            <span>Liste des élèves</span>
            {/* <span className="badge bg-primary">25</span> */}
          </div>
             {message && (
              <div className="alert alert-success">{message}</div>
            )}
          <table className="table table-hover mb-0">
           
            <thead className="table-light">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
           {classe.eleves?.map((e) => (
                <tr key={e.id}>
                  <td>{e.user?.firstname}</td>
                  <td>{e.user?.lastname}</td>
                  <td>{e.user?.email}</td>
                   <td className="text-end">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => Retirer(e.id)}>
                    Retirer
                  </button>
                </td>
                </tr>
            ))}
            {classe.eleves?.length  === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">Acune eleves assigne pour le moment</td>
              </tr>
            )}
            </tbody>

          </table>
        </div>
                  {showModal && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowModal(false)}
                      ></div>

                      {/* Modal */}
                      <div className="modal d-block custom-modal-wrapper" tabIndex="-1">
                  
                        <div className="modal-dialog modal-dialog-centered custom-modal">
                  
                          <div className="modal-content border-0 shadow-lg rounded-4 modal-fixed-height">
                  
                            {/* Header */}
                            <div className="modal-header bg-white border-bottom py-2">
                              <h5 className="modal-title fw-bold fs-6">
                                Assigner des élèves
                              </h5>
                  
                              <button
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                              />
                            </div>
                  
                            {/* Search */}
                            <div className="px-2 py-2 border-bottom bg-light">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Rechercher un élève..."
                              />
                            </div>
                  
                            {/* Body */}
                            <div className="modal-body modal-scroll p-2">
                              <button className="btn btn-success btn-xs  sm w-25 h-10"
                                onClick={valider}>Valider</button>

                              {elevesNonAssigne.length === 0 ? (
                                <div className="text-center text-muted py-3 small">
                                  Aucun élève disponible
                                </div>
                              ) : (
                                elevesNonAssigne.map((e) => (
                                
                                  <div
                                    key={e.id}
                                    className="d-flex align-items-center justify-content-between compact-item"
                                  >
                                  
                                    {/* Left */}
                                    <div className="d-flex align-items-center gap-2">
                                
                                      <div className="avatar-sm">
                                        {e.user?.firstname?.charAt(0)}
                                      </div>
                                
                                      <div className="line-text">
                                        <div className="fw-semibold name">
                                          {e.user?.firstname} {e.user?.lastname}
                                        </div>
                                
                                        <small className="text-muted">
                                          {e.sex === "H" ? "Homme" : "Femme"}
                                        </small>
                                      </div>
                                
                                    </div>
                                
                                    {/* Button */}
                                    <button className={`btn btn-xs ${ data.eleves_ids?.includes(e.id) ? "btn-secondary" : "btn-success"}`}
                                      onClick={() => hansleSelected(e.id)}>
                                      {data.eleves_ids.includes(e.id)? 'ajoutee' : 'assigne'}
                                    </button>
                                
                                  </div>
                                ))
                              )}

                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </>
                  )}


                {showModalProf && (
                        <>
                          <div
                            className="modal-backdrop fade show"
                            onClick={() => setShowModalProf(false)}
                          ></div>

                          <div className="modal d-block custom-modal-wrapper">
                            <div className="modal-dialog modal-dialog-centered custom-modal">

                              <div className="modal-content modal-fixed-height">

                                {/* Header */}
                                <div className="modal-header py-2">
                                  <h6 className="mb-0">Assigner professeur</h6>
                                  <button
                                    className="btn-close"
                                    onClick={() => setShowModalProf(false)}
                                  />
                                </div>

                                {/* Body scrollable */}
                                <div className="modal-body modal-scroll p-2">

                                  {professeur.map((p) => (
                                    <div
                                      key={p.id}
                                      className={`p-2 border mb-2 rounded cursor-pointer ${
                                        data.professeur_id === p.id
                                          ? "bg-success text-white"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setData((prev) => ({
                                          ...prev,
                                          professeur_id: p.id,
                                        }))
                                      }
                                    >
                                      <strong>{p.lastname}</strong>
                                    
                                      <div className="small">
                                        <strong>Spécialité :</strong> {p.prof?.specialite}
                                      </div>
                                    </div>
                                  ))}

                                </div>
                                
                                {/* Footer fixe */}
                                <div className="p-2 border-top">
                                  <button
                                    className="btn btn-primary w-100"
                                    onClick={validerProf}
                                  >
                                    Valider
                                  </button>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </>
                  )}
          </main>
   
    </div>
  );
}