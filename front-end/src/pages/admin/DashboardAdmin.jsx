import { useState } from 'react';
import './style/dashboard.css';
import { getStatistiques, getUsers } from '../../services/AdminService';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
    

    export default function DashboardAdmin() {

      const [data, setData] = useState({
        total_eleves: 0,
        total_classNamees: 0,
        total_professeurs: 0,
        total_matieres: 0
      });
      const [users, setUsers] = useState([]);
      const [filter, setFilter] = useState("tous");

      useEffect(() => {
          const fetchData = async () => {
            try{ 
                const res = await getStatistiques();
                const user = await getUsers();
                console.log(user.data);
                // console.log(user.data.eleves);
                const formUser = [
                  ...user.data.professeurs.map((u) => ({
                    ...u,
                    role: 'professeur'
                  })),
                  ...user.data.eleves.map((u) => ({
                    ...u,
                    role: "eleve"
                  }))

                ]

                setData(res.data);
               
                setUsers(formUser);
               
            }catch(error){
              console.log(error);
            }  
        }
        fetchData();
      },[])

       const filterUsers = users.filter((user) => {
        if(filter === 'tous') return true;

        return user.role === filter;
      })

      


        return (
            
           <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                
                  <main className="col-md-9 col-lg-10 px-4 py-4 bg-light" style={{
                    marginLeft: "250px",
                    padding: "20px",
                    minHeight: "100vh"
                  }}>

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
                      <h6 className="mb-0">list de utilisateurs</h6>
                      <div>
                        <select className="form-select form-select-sm w-auto me-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="tous" >Tous</option>
                            <option value="professeur">Professeurs</option>
                            <option value="eleve">Eleves</option>
                        </select>
                      </div>
                    </div>

                    <div className="custom-table-card">

                            <table className="custom-table">
                              <thead>
                                <tr>
                                  <th>Firstname</th>
                                  <th>Lastname</th>
                                  <th>Adresse</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Statut</th>
                                </tr>
                              </thead>

                              <tbody>
                                {filterUsers.map((user) => (
                                  <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.adresse}</td>
                                    <td>{user.email}</td>
                                
                                    <td>
                                      <span className={`badge-role ${
                                        user.role === "professeur"
                                          ? "role-professeur"
                                          : "role-eleve"
                                      }`}>
                                        {user.role}
                                      </span>
                                    </td>
                                    
                                    <td>
                                      <span className={`badge-status ${
                                        user.is_active
                                          ? "badge-active"
                                          : "badge-inactive"
                                      }`}>
                                        {user.is_active ? "Active" : "Inactive"}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                    </div>

                  </div>

                </main>

              </div>
            </div>
        )
}