import { useSelector } from 'react-redux';
import './style/profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="profile-wrapper">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        {/* Header card */}
                        <div className="profile-header-card text-center mb-3">
                            <h4 className="profile-name mb-1">{user?.firstname} {user?.lastname}</h4>
                            <span className="role-badge">{user?.role}</span>
                        </div>

                        {/* Info card */}
                        <div className="profile-info-card mb-3">

                            <p className="section-label">Informations personnelles</p>

                            <div className="info-row">
                                <span className="info-key">Prénom</span>
                                <span className="info-value">{user?.firstname}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-key">Nom</span>
                                <span className="info-value">{user?.lastname}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-key">Email</span>
                                <span className="info-value">{user?.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-key">Adresse</span>
                                <span className="info-value">{user?.adresse}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-key">Rôle</span>
                                <span className="info-value role-text">{user?.role}</span>
                            </div>

                            {/* Profil Professeur */}
                            {user?.role === 'professeur' && user?.profile && (
                                <>
                                    <p className="section-label mt-4">Profil professeur</p>
                                    <div className="info-row">
                                        <span className="info-key">Spécialité</span>
                                        <span className="info-value">{user.profile.specialite}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-key">Expérience</span>
                                        <span className="info-value">{user.profile.experiences} ans</span>
                                    </div>
                                </>
                            )}

                            {/* Profil Élève */}
                            {user?.role === 'eleve' && user?.profile && (
                                <>
                                    <p className="section-label mt-4">Profil élève</p>
                                    <div className="info-row">
                                        <span className="info-key">Sexe</span>
                                        <span className="info-value">{user.profile.sex}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-key">N° parent</span>
                                        <span className="info-value">{user.profile.number_parent}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-end gap-2">
                            {!user?.profile && (
                                <button
                                    className="btn-profile-action"
                                    onClick={() => navigate('/profile/create')}
                                >
                                    + Ajouter profil
                                </button>
                            )}
                            {user?.profile && (
                                <button
                                    className="btn-profile-action btn-profile-edit"
                                    onClick={() => navigate('/profile/edit')}
                                >
                                    Modifier le profil
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}