import "./style/UpdateProfileForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {updateProfile} from "../services/profileService";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/authSlice";



export default function UpdateProfileForm() {

    const [formData, setFormData] = useState({
       firstname: "",
       lastname: "",
       email: "",
       adresse: "",
       Etat_professionelle: "",
       experiences: "",
       sex: "",
       number_parent: ""
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);

    useEffect(() => {
      if(user) {
        setFormData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          adresse: user.adresse || "",
          email: user.email || "",

           Etat_professionelle: user.profile?.Etat_professionelle || "",
          experiences: Number(user.profile?.experiences) || "",
          sexe: user.profile?.sexe || "",
          number_parent: String(user.profile?.number_parent) || "",
        });
      }
    },[user])
   


    // console.log(user.profile.specialite);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try{
          const res = await updateProfile(formData);
          dispatch(setUser(res.data.data));
           console.log(res.data.data);

          navigate('/profile');
          
         

      }catch(error){
         
          // console.log("STATUS:", error.response.status);
          console.log("MESSAGE:", error.response.data.message);
          console.log("VALIDATION ERRORS:", error.response.data.errors);
      }
    }

  return (
    <div className="upf-wrapper">
      <div className="upf-card">


        <form onSubmit={handleSubmit}>

          <p className="upf-section-label">Informations personnelles</p>

          <div className="row g-3 mb-3">

            <div className="col-md-6">
              <label htmlFor="firstname" className="upf-label form-label">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
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
                value={formData.lastname}
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
              value={formData.email}
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
              value={formData.adresse}
              onChange={handleChange}
              className="form-control upf-input"
              placeholder="Votre adresse"
            />
          </div>

        
          {user.role === 'professeur' && (
            <>
              <p className="upf-section-label">Profil professeur</p>

              <div className="row g-3 mb-4">

           <select
            name="Etat_professionelle"
            value={formData.Etat_professionelle}
            onChange={handleChange}
            className="form-control upf-input"
            >
                <option value="">-- Sélectionner --</option>
                <option value="Prof titulaire">Prof titulaire</option>
                <option value="Prof vacataire">Prof vacataire</option>
            </select>

                <div className="col-md-6">
                  <label htmlFor="experiences" className="upf-label form-label">Expérience (ans)</label>
                  <input
                    type="number"
                    id="experiences"
                    name="experiences"
                    value={formData.experiences}
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
                  <select id="sex" name="sex" className="form-select upf-input"
                  value={formData.sexe} onChange={handleChange}
                  >
                    <option value="">-- Sélectionner --</option>
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
                    value={formData.number_parent}
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