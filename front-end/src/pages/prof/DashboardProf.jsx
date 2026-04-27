import React from "react";
import Sidebar from "../../components/Sidebar";
import "./styles/dashboardProf.css";

const DashboardProf = () => {
  const classes = [
    { name: "Classe B", level: "2ème année", students: 25 },
    { name: "Classe C", level: "3ème année", students: 35 },
    { name: "Classe D", level: "Master", students: 30 },
  ];

  const cours = [
    { label: "Algorithmique", pct: 78 },
    { label: "Bases de données", pct: 55 },
    { label: "Réseaux", pct: 40 },
    { label: "Mathématiques", pct: 90 },
  ];

  return (
    <div className="dp-layout">
      <aside className="dp-sidebar">
        <Sidebar />
      </aside>

      <main className="dp-main">
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
            <h3>8</h3>
            <p>Cours</p>
          </div>
          <div className="dp-stat">
            <h3>4</h3>
            <p>Classes</p>
          </div>
          <div className="dp-stat">
            <h3>120</h3>
            <p>Élèves</p>
          </div>
        </div>

        {/* CLASSES */}
        <div className="dp-classes">
          {classes.map((cls) => (
            <div className="dp-class" key={cls.name}>
              <h3>{cls.name}</h3>
              <p>{cls.level}</p>
              <span>{cls.students} élèves</span>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="dp-progress">
          {cours.map((c) => (
            <div key={c.label}>
              <span>{c.label}</span>
              <div className="bar">
                <div style={{ width: `${c.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardProf;