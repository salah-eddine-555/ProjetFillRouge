import { useState } from 'react';
import './style/dashboard.css';
import { getStatistiques, getUsers } from '../../services/AdminService';
import { useEffect } from 'react';
    

    export default function DashboardAdmin() {

      const [data, setData] = useState({
        total_eleves: 0,
        total_classNamees: 0,
        total_professeurs: 0,
        total_matieres: 0
      });
      const [users, SetUsers] = useState({});

      useEffect(() => {
          const fetchData = async () => {
            try{ 
                const res = await getStatistiques();
                const user = await getUsers();
               
                console.log(res.data);
                setData(res.data);
                SetUsers(user.data);
            }catch(error){
              console.log(error);
            }  
        }
        fetchData();
      },[])


        return (
            
           <div className="container-fluid">
  <div className="row">

 
    <nav className="col-md-3 col-lg-2 d-md-block bg-white shadow-sm vh-100 p-3">
      <h5 className="text-success fw-bold mb-4">EcoSmart</h5>

      <ul className="nav flex-column small">

        <li className="cnav-item mb-2">
          <a className="nav-link active bg-success text-white rounded px-3" href="#">
            Tableau de bord
          </a>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-dark px-3" href="#">
            Gestion des Niveaux
          </a>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-dark px-3" href="#">
            Gestion des classNamees
          </a>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-dark px-3" href="#">
            Gestion des Élèves
          </a>
        </li>

      </ul>

      <div className="mt-4">
        <button className="btn btn-success w-100">+ Nouveau Rapport</button>
      </div>
    </nav>


    <main className="col-md-9 col-lg-10 px-4 py-4 bg-light">

      <div className="bg-success text-white p-4 rounded mb-4">
        <h5 className="mb-1">Tableau de bord Administrateur</h5>
        <small>Bienvenue, suivez vos statistiques en temps réel</small>
      </div>


      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0">
            <small className="text-muted">Total Étudiants</small>
            <h4 className="fw-bold">{data.total_eleves}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0">
            <small className="text-muted">classes Actives</small>
            <h4 className="fw-bold">{data.total_classes}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0">
            <small className="text-muted">Total Professeurs</small>
            <h4 className="fw-bold">{data.total_professeurs}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm border-0">
            <small className="text-muted">Total Matieres</small>
            <h4 className="fw-bold">{data.total_matieres}</h4>
          </div>
        </div>

      </div>

                  <div className="card shadow-sm border-0 p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Aperçu des Niveaux</h6>
                      <div>
                        <button className="btn btn-light btn-sm me-2">Filtrer</button>
                        <button className="btn btn-success btn-sm">+ Ajouter un Niveau</button>
                      </div>
                    </div>

                    <table className="table align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Niveau</th>
                          <th>Cycle</th>
                          <th>Nombre d'Élèves</th>
                          <th>Responsable</th>
                          <th>Statut</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>3ème Année</td>
                          <td>Secondaire</td>
                          <td>245</td>
                          <td>Jean Dupont</td>
                          <td><span className="badge bg-success">Actif</span></td>
                          <td>✏️ 🗑️</td>
                        </tr>

                        <tr>
                          <td>5ème Année</td>
                          <td>Primaire</td>
                          <td>180</td>
                          <td>Marie Laurent</td>
                          <td><span className="badge bg-warning text-dark">Maintenance</span></td>
                          <td>✏️ 🗑️</td>
                        </tr>

                        <tr>
                          <td>1ère Année</td>
                          <td>Primaire</td>
                          <td>120</td>
                          <td>Sophie Petit</td>
                          <td><span className="badge bg-success">Actif</span></td>
                          <td>✏️ 🗑️</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </main>

              </div>
            </div>
        )
    }