import { useDebugValue, useState } from 'react';
import { resgiter } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import {login} from '../../Redux/authSlice';
  import { useDispatch } from "react-redux";
import './style/register.css';

export default function Registre() {

    const [formData, setData] = useState({
        firstname: "",
        lastname: "",
        adresse: "",
        email: "",
        password: "",
        role_id: ""
    });
    const dispatcher = useDispatch();

    const [error, setError] = useState({});
    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
   
        setError({});

        try {
            const response = await resgiter(formData);
            const user = response.data.data;
         
            dispatcher(login({
                token: response.data.token,
                ...user
            }));
            

            if (user.role === 'professeur') {
                navigate('/professeur');
            } else if (user.role === 'eleve') {
                navigate('/eleve');
            } else {
                navigate('/admin');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.errors || {});
            }
        }
    };

    return (
        <div className="register-page">

            {/* Left panel décoratif */}
            <div className="register-left">
                <div className="brand">
                    <span className="brand-dot">●</span>
                    <span className="brand-eco">Eco</span>
                    <span className="brand-smart">Smart</span>
                </div>
                <div className="left-content">
                    <h1>Rejoignez notre plateforme éducative</h1>
                    <p>Connectez élèves, professeurs et administrateurs dans un seul espace collaboratif.</p>
                    <div className="left-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>

            {/* Right panel formulaire */}
            <div className="register-right">
                <div className="register-card">

                    <div className="card-header">
                        <h2>Créer un compte</h2>
                        <p>Remplissez les informations ci-dessous</p>
                    </div>

                    <form onSubmit={Submit} noValidate>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    placeholder="Jean"
                                    className={error.firstname ? 'input-error' : ''}
                                    onChange={(e) => setData({ ...formData, firstname: e.target.value })}
                                />
                                {error.firstname && <span className="error-msg">{error.firstname[0]}</span>}
                            </div>
                            <div className="form-group">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    placeholder="Dupont"
                                    className={error.lastname ? 'input-error' : ''}
                                    onChange={(e) => setData({ ...formData, lastname: e.target.value })}
                                />
                                {error.lastname && <span className="error-msg">{error.lastname[0]}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Adresse</label>
                            <input
                                type="text"
                                placeholder="12 rue des Écoles, Paris"
                                className={error.adresse ? 'input-error' : ''}
                                onChange={(e) => setData({ ...formData, adresse: e.target.value })}
                            />
                            {error.adresse && <span className="error-msg">{error.adresse[0]}</span>}
                        </div>

                        <div className="form-group">
                            <label>Rôle</label>
                            <select
                                className={error.role_id ? 'input-error' : ''}
                                onChange={(e) => setData({ ...formData, role_id: e.target.value })}
                            >
                                <option value="">— Sélectionner un rôle —</option>
                                <option value="2">Professeur</option>
                                <option value="3">Élève</option>
                            </select>
                            {error.role_id && <span className="error-msg">{error.role_id[0]}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="jean.dupont@email.com"
                                className={error.email ? 'input-error' : ''}
                                onChange={(e) => setData({ ...formData, email: e.target.value })}
                            />
                            {error.email && <span className="error-msg">{error.email[0]}</span>}
                        </div>

                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={error.password ? 'input-error' : ''}
                                onChange={(e) => setData({ ...formData, password: e.target.value })}
                            />
                            {error.password && <span className="error-msg">{error.password[0]}</span>}
                        </div>

                        <button type="submit" className="btn-register">
                            register
                        </button>

                    </form>

                    <div className="login-redirect">
                        Vous avez déjà un compte ?
                        <span onClick={() => navigate('/login')}>  Se connecter</span>
                    </div>

                </div>
            </div>
        </div>
    );
}