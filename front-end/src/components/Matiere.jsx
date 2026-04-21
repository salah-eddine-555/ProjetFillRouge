

export default function Matiere() {
  return (
    <div className="w-100">

      {/* 🔵 Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

        <h2 className="fw-bold text-dark m-0">
          Gestion des matières
        </h2>

        <button className="btn btn-success mt-2 mt-md-0">
          + Nouvelle matière
        </button>

      </div>

      {/* 🔵 Card */}
      <div className="card shadow-sm border-0">

        <div className="card-body">

          {/* 🔵 Table responsive */}
          <div className="table-responsive">

            <table className="table table-hover align-middle">

              {/* Header */}
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nom de la matière</th>
                  <th>Niveau</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>

                {/* Exemple 1 */}
                <tr>
                  <td>1</td>
                  <td>Mathématiques</td>
                  <td>1ère année</td>
                  <td className="text-end">

                    <button className="btn btn-sm btn-outline-primary me-2">
                      Modifier
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Supprimer
                    </button>

                  </td>
                </tr>

                {/* Exemple 2 */}
                <tr>
                  <td>2</td>
                  <td>Physique</td>
                  <td>2ème année</td>
                  <td className="text-end">

                    <button className="btn btn-sm btn-outline-primary me-2">
                      Modifier
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                      Supprimer
                    </button>

                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  );
}