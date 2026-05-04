import React, {useState, useEffect }from 'react';
import Sidebar from "../../components/Sidebar";
import {getCourEleve} from '../../services/EleveService';
import './styles/courEleve.css'
import {useNavigate} from 'react-router-dom'


const ElevesCours = () => {
  const [cours,   setCours]   = useState([]);
  const [loading, setLoading] = useState(true);
  
   const navigate = useNavigate();

  const fetchCourEleve = async () => {
    try {
      const res = await getCourEleve();
      console.log(res.data.data);
      setCours(res.data.data);
    } catch (err) {
      setError(err.response?.data.message || "Erreur lors du chargement des cours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourEleve();
  }, []);

  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>

      <main className="dp-main">

        {/* Header */}
        <div className="cours-header">
          <div className="cours-header-icon">📚</div>
          <div>
            <h1 className="cours-header-title">Mes Cours</h1>
            <span className="cours-header-sub">Programme 2025–2026</span>
          </div>
        </div>

       
        {loading && (
          <div className="cours-spinner-wrap">
            <div className="spinner-border cours-spinner" role="status" />
            <span>Chargement des cours…</span>
          </div>
        )}

  
       {!loading && (
  <div className="row g-4">
    {cours.map((cour, i) => {
      return (
        <div key={cour.id} className="col-12 col-md-6 col-xl-4">
          <div className="cour-card">
            <div className="cour-accent" />
            <div className="cour-body">
              <div className="cour-icon-box">📖</div>
              <div className="cour-info">
                <div className="cour-title">{cour.titre}</div>
                <p className="cour-title">{cour.description}</p>
                <div className="cour-prof">Matiere: --- <strong>{cour.matiere?.name}</strong></div>
              </div>
            </div>
            <div className="cour-footer" onClick={()=> navigate(`/cours/eleve/${cour.id}`)}>
              <span className="cour-footer-link">Voir le cours →</span>
            </div>
          </div>
        </div>
      );
    })}
          </div>
        )}

      </main>
    </div>
  );
};

export default ElevesCours;