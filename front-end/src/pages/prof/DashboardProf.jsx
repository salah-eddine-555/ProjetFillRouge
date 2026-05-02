import React from "react";
import Sidebar from "../../components/Sidebar";
import "./styles/dashboardProf.css";
import { getStatistiques} from "../../services/courService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const DashboardProf = () => {
  const [statistiques, setStatistiques] = useState({});
 
  const navigate = useNavigate();
 
  const fetchStatistiques = async () => {
    const res = await getStatistiques();
    setStatistiques(res.data.data);
  };
 

 
  useEffect(() => {
    fetchStatistiques();
  
  }, []);
 
  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>
 
      <main className="dp-main">
 
        {/* HEADER */}
        <div className="dp-header">
          <div>
            <h1 className="dp-header__title">Mon Dashboard</h1>
            <p className="dp-header__sub">Bienvenue, Prof</p>
          </div>
          <span className="dp-header__badge">Semestre 2</span>
        </div>
 
        {/* STATS */}
        <div className="dp-stats">
          <div className="dp-stat">
            <h3>{statistiques.totalCours}</h3>
            <p>Cours</p>
          </div>
          <div className="dp-stat">
            <h3>{statistiques.totalClasses}</h3>
            <p>Classes</p>
          </div>
          <div className="dp-stat">
            <h3>{statistiques.totalEleves}</h3>
            <p>Élèves</p>
          </div>
        </div>
 
        {/* CLASSES */}
        <div className="dp-classes">
          {statistiques.classes?.map((cls) => (
            <div
              className="dp-class clickable"
              key={cls.id}
              onClick={() => navigate(`/classe/${cls.id}`)}
            >
              <div className="dp-class-header">
                <h3>{cls.name}</h3>
                <span className="badge">{cls.niveau?.name}</span>
              </div>
              <div className="dp-class-body">
                <span className="students">{cls.eleves_count} élèves</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
 
export default DashboardProf;