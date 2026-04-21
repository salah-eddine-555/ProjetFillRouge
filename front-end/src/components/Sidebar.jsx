import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-white shadow-sm vh-100 p-3" 
    style={{
         position: "fixed",
        width: "250px",
        height: "100vh",
      
    }}>

      <h5 className="text-success fw-bold mb-4">EcoSmart</h5>

      <ul className="nav flex-column small">

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark px-3" to="/admin">
            Tableau de bord
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark px-3" to="/admin/niveaux">
            Gestion des Niveaux && matiers
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark px-3" to="/admin/classes">
            Gestion des Classes
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark px-3" to="/admin/eleves">
            Gestion des Élèves
          </Link>
        </li>

      </ul>

      <div className="mt-4">
        <button className="btn btn-success w-100">
          + Nouveau Rapport
        </button>
      </div>

    </nav>
  );
}