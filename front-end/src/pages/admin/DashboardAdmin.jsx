    import './style/dashboard.css';
    import 'bootstrap/dist/css/bootstrap.min.css';

    export default function DashboardAdmin() {


        return (
            
           <div class="container-fluid">
  <div class="row">

 
    <nav class="col-md-3 col-lg-2 d-md-block bg-white shadow-sm vh-100 p-3">
      <h5 class="text-success fw-bold mb-4">EcoSmart</h5>

      <ul class="nav flex-column small">

        <li class="nav-item mb-2">
          <a class="nav-link active bg-success text-white rounded px-3" href="#">
            Tableau de bord
          </a>
        </li>

        <li class="nav-item mb-2">
          <a class="nav-link text-dark px-3" href="#">
            Gestion des Niveaux
          </a>
        </li>

        <li class="nav-item mb-2">
          <a class="nav-link text-dark px-3" href="#">
            Gestion des Classes
          </a>
        </li>

        <li class="nav-item mb-2">
          <a class="nav-link text-dark px-3" href="#">
            Gestion des Élèves
          </a>
        </li>

      </ul>

      <div class="mt-4">
        <button class="btn btn-success w-100">+ Nouveau Rapport</button>
      </div>
    </nav>


    <main class="col-md-9 col-lg-10 px-4 py-4 bg-light">

    
      <div class="d-flex justify-content-between align-items-center mb-4">
        <input class="form-control w-25" placeholder="Rechercher..." />
        <div class="d-flex align-items-center gap-3">
          <span>🔔</span>
          <span>⚙️</span>
          <div class="d-flex align-items-center">
            <img src="https://via.placeholder.com/35" class="rounded-circle me-2" />
            <small>Admin Eco</small>
          </div>
        </div>
      </div>


      <div class="bg-success text-white p-4 rounded mb-4">
        <h5 class="mb-1">Tableau de bord Administrateur</h5>
        <small>Bienvenue, suivez vos statistiques en temps réel</small>
      </div>


      <div class="row g-3 mb-4">

        <div class="col-md-3">
          <div class="card p-3 shadow-sm border-0">
            <small class="text-muted">Total Étudiants</small>
            <h4 class="fw-bold">1,248</h4>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card p-3 shadow-sm border-0">
            <small class="text-muted">Classes Actives</small>
            <h4 class="fw-bold">42</h4>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card p-3 shadow-sm border-0">
            <small class="text-muted">Nouveaux inscrits</small>
            <h4 class="fw-bold">18</h4>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card p-3 shadow-sm border-0">
            <small class="text-muted">En attente</small>
            <h4 class="fw-bold">6</h4>
          </div>
        </div>

      </div>

                  <div class="card shadow-sm border-0 p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h6 class="mb-0">Aperçu des Niveaux</h6>
                      <div>
                        <button class="btn btn-light btn-sm me-2">Filtrer</button>
                        <button class="btn btn-success btn-sm">+ Ajouter un Niveau</button>
                      </div>
                    </div>

                    <table class="table align-middle">
                      <thead class="table-light">
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
                          <td><span class="badge bg-success">Actif</span></td>
                          <td>✏️ 🗑️</td>
                        </tr>

                        <tr>
                          <td>5ème Année</td>
                          <td>Primaire</td>
                          <td>180</td>
                          <td>Marie Laurent</td>
                          <td><span class="badge bg-warning text-dark">Maintenance</span></td>
                          <td>✏️ 🗑️</td>
                        </tr>

                        <tr>
                          <td>1ère Année</td>
                          <td>Primaire</td>
                          <td>120</td>
                          <td>Sophie Petit</td>
                          <td><span class="badge bg-success">Actif</span></td>
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