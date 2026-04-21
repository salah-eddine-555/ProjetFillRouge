
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Matiere from "../../components/Matiere";
import Niveaux from "../../components/Niveaux";

// import Niveaux from "./Niveaux";
// import Matieres from "./Matieres";

export default function GestionAcademique() {

 
  const [activeTab, setActiveTab] = useState("niveaux");

  return (
    
 <div className="container-fluid">
  <div className="row">

    {/* 🔵 Sidebar (Desktop فقط) */}
    <div className="d-none d-md-block col-md-3 col-lg-2 p-0 bg-light vh-100 position-fixed">
      <Sidebar />
    </div>
    

    {/* 🔵 Content */}
    <div className="col-12 col-md-9 col-lg-10 offset-md-3 offset-lg-2 px-3 px-md-4 mt-3">

      {/* 🔵 Mobile Navbar */}
      <div className="d-md-none mb-3">
        <button 
          className="btn btn-success"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰ Menu
        </button>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center justify-content-md-start gap-2 mb-4 flex-wrap">
        <button
          className={`btn ${activeTab === "niveaux" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("niveaux")}
        >
          Gestion Niveaux
        </button>

        <button
          className={`btn ${activeTab === "matieres" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("matieres")}
        >
          Gestion Matières
        </button>
      </div>

      {/* Content */}
      <div className="card p-3 shadow-sm">
        {activeTab === 'matieres' &&  <Matiere />}
        {activeTab ==='niveaux' && <Niveaux />}

      </div>

    </div>

  </div>

  {/* 🔵 Sidebar Mobile (Offcanvas) */}
  <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
    <div className="offcanvas-body p-0">
      <Sidebar />
    </div>
  </div>

</div>
  );
}