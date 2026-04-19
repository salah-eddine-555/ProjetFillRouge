import "./style/UpdateProfileForm.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function UpdateProfileForm() {

    const [formData, setFormData] = useState({
        "firstname": "",
        "lastname": "",
        "adresse": "",
        "email": "",
        "specialite": "",
        "expereinces": "",
        "sex": "",
        "number_parent": ""
    })
    const user = useSelector((state)=> state.auth.user);
    console.log(user.profile)
    // console.log(user.profile.specialite);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

  return (
    <div className="upf-wrapper">
      <div className="upf-card">


        <form>

          <p className="upf-section-label">Informations personnelles</p>

          <div className="row g-3 mb-3">

            <div className="col-md-6">
              <label htmlFor="firstname" className="upf-label form-label">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                className="form-control upf-input"
                placeholder="Votre prénom"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastname" className="upf-label form-label">Nom</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                className="form-control upf-input"
                placeholder="Votre nom"
              />
            </div>

          </div>

          <div className="mb-3">
            <label htmlFor="email" className="upf-label form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control upf-input"
              placeholder="exemple@email.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adresse" className="upf-label form-label">Adresse</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={user.adresse}
              onChange={handleChange}
              className="form-control upf-input"
              placeholder="Votre adresse"
            />
          </div>

        
          {user.role === 'professeur' && (
            <>
              <p className="upf-section-label">Profil professeur</p>

              <div className="row g-3 mb-4">

                <div className="col-md-6">
                  <label htmlFor="specialite" className="upf-label form-label">Spécialité</label>
                  <input
                    type="text"
                    id="specialite"
                    name="specialite"
                    value={user.profile?.specialite}
                    onChange={handleChange}
                    className="form-control upf-input"
                    placeholder="Ex : Mathématiques"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="experiences" className="upf-label form-label">Expérience (ans)</label>
                  <input
                    type="number"
                    id="experiences"
                    name="experiences"
                    value={user.profile?.experiences}
                    onChange={handleChange}
                    className="form-control upf-input"
                    placeholder="Ex : 5"
                    min="0"
                  />
                </div>

              </div>
            </>
          )}

       
          {user.role === 'eleve' && (
            <>
              <p className="upf-section-label">Profil élève</p>

              <div className="row g-3 mb-4">

                <div className="col-md-6">
                  <label htmlFor="sex" className="upf-label form-label">Sexe</label>
                  <select id="sex" name="sex" className="form-select upf-input">
                    <option value={user.profile.sex} onChange={handleChange}>-- Sélectionner --</option>
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="number_parent" className="upf-label form-label">Numéro du parent</label>
                  <input
                    type="tel"
                    id="number_parent"
                    name="number_parent"
                    value={user.profile.number_parent}
                    onChange={handleChange}
                    className="form-control upf-input"
                    placeholder="+212 6 00 00 00 00"
                  />
                </div>

              </div>
            </>
          )}

          {/* ── BOUTON ── */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn upf-btn-submit">
              Modifier le profil
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}