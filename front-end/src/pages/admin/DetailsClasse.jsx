import Sidebar from "../../components/Sidebar";
import "./style/detailsClasse.css";
import { getClasseById } from "../../services/classeService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsClasse() {
    
    const [classe, setClasse] = useState({});

    const {id} = useParams();


    const fetchClasse = async () => {
        try{
            const res = await getClasseById(id);
            console.log(res.data.data);
            setClasse(res.data.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=> {
        fetchClasse()
    }, [])
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
            <button className="btn btn-success btn-sm">
              Assigner élèves
            </button>
            <button className="btn btn-outline-primary btn-sm">
              Assigner professeur
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
                <h5>{classe.prof.name}</h5>
              
                ) : (
                <h5>pas encore assigné</h5>
            )}
              
            </div>

            <button className="btn btn-outline-danger btn-sm">
              Changer
            </button>
          </div>
        </div>

        {/* Students */}
        <div className="card-box">
          <div className="card-header flex-between">
            <span>Liste des élèves</span>
            <span className="badge bg-primary">25 élèves</span>
          </div>

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
              <tr>
                <td>Ahmed</td>
                <td>Ali</td>
                <td>ahmed@gmail.com</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-danger">
                    Retirer
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>

      </main>
    </div>
  );
}