import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import './style/FormCreateProfile.css';
import {createProfileProf, createProfileEleve} from '../services/profileService';
import { setUser } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";


export default function CreateProfileForm(){
    const [formData, setFormData] = useState({
        "specialite": "",
        "experiences": "",
        "phone": "",
        "sex": ""
    })
    const [errors, setErrors] = useState({});

    const user = useSelector((state) => state.auth.user);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
        [e.target.name] : e.target.value
    })
        
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;
        try{
            if(user?.role === 'professeur'){
                 res = await createProfileProf(formData);
                console.log(res.data);
            }
            if(user?.role === 'eleve') {
                 res = await createProfileEleve(formData);
                console.log(res.data);
            }
            dispatch(setUser({
                ...user,
                profile: res.data.profile
            }
             
               ));

            navigate('/profile')
            console.log("profile cree avec success .");

        }catch(error){
            if(error.response?.data.errors){
                setErrors(error.response.data.errors);
            }
        }
    }

    return(
        <div className="profile-wrapper">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        {/* Header card */}
                        <div className="profile-header-card text-center mb-3">
                            <h4 className="profile-name mb-1">Créer mon profil</h4>
                            <span className="role-badge">{user?.role}</span>
                        </div>

                        {/* Form card */}
                        <div className="profile-info-card mb-3">
                            
                            <form onSubmit={handleSubmit}>

                                {user?.role === 'professeur' && (
                                    <>
                                        <p className="section-label">Profil professeur</p>

                                        <div className="form-field">
                                            <label htmlFor="sp" className="field-label">Spécialité</label>
                                            <input
                                                type="text"
                                                id="sp"
                                                name="specialite"
                                                onChange={handleChange}
                                                className="field-input"
                                                placeholder="Votre spécialité"
                                            />
                                            {errors.specialite && (
                                                <p className="error-text text-danger">{errors.specialite}</p>
                                            )}
                                    </div>

                                        <div className="form-field">
                                            <label htmlFor="exp" className="field-label">Expériences</label>
                                            <input
                                                type="number"
                                                id="exp"
                                                name="experiences"
                                                placeholder="Années d'expériences"
                                                onChange={handleChange}
                                                className="field-input"
                                            />
                                            {errors.experiences && (
                                                <p className="error-text text-danger">{errors.experiences}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {user?.role === 'eleve' && (
                                    <>
                                        <p className="section-label">Profil élève</p>

                                        <div className="form-field">
                                            <label htmlFor="number" className="field-label">Numéro des parents</label>
                                            <input
                                                type="phone"
                                                id="number"
                                                name="phone"
                                                placeholder="Numéro de téléphone"
                                                onChange={handleChange}
                                                className="field-input"
                                            />
                                            {errors.number_parent && (
                                                <p className="error-text text-danger">{errors.number_parent}</p>
                                            )}

                                            <label htmlFor="sex" className="field-label">Sexe</label>
                                            <div className="radio-group">
                                                <label className="radio-option">
                                                    <input
                                                        type="radio"
                                                        name="sex"
                                                        value="H"
                                                        onChange={handleChange}
                                                    />
                                                    Homme
                                                </label>
                                                <label className="radio-option">
                                                    <input
                                                        type="radio"
                                                        name="sex"
                                                        value="F"
                                                        onChange={handleChange}
                                                    />
                                                    Femme
                                                </label>
                                                 {errors.sex && (
                                                <p className="error-text text-danger">{errors.sex}</p>
                                            )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="submit" className="btn-profile-action">
                                        Enregistrer
                                    </button>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}