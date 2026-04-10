import { useSelector } from 'react-redux';
import './style/profile.css';

export default function Profile(){

    const user = useSelector((state) => state.auth.user);
    
    
    

    return(
        <div className="profile-container">
            <h1 className="profile-title">Mon Profil</h1>
        
            <div className="profile-card">
                <div className="profile-item">
                    <span>Prénom :</span>
                    <p>{user?.firstname}</p>
                </div>

                <div className="profile-item">
                    <span>Nom :</span>
                    <p>{user?.lastname}</p>
                </div>

                <div className="profile-item">
                    <span>Email :</span>
                    <p>{user?.email}</p>
                </div>

                <div className="profile-item">
                    <span>Adresse :</span>
                    <p>{user?.adresse}</p>
                </div>

                <div className="profile-item">
                    <span>Rôle :</span>
                    <p className="role">{user?.role}</p>
                </div>
              
                <div className="profile-item">
                    <span>Profil :</span>
                </div>
                {user?.role === "professeur" && user?.profile &&(

                        <>
                            <div className="profile-item">
                                <span>specialite :</span>
                                <p>{user.profile.specialite}</p>
                            </div>

                            <div className="profile-item">
                                <span>experiences :</span>
                                <p>{user.profile.experiences} ans</p>
                            </div>
                        </>
                )}
                {user?.role === 'eleve' && user?.profile && (
                    <>
                        <div className="profile-item">
                            <span>sex</span>
                            <p>{user.profile.sex}</p>
                        </div>
                         <div className="profile-item">
                            <span>Number of parent</span>
                            <p>{user.profile.number_parent}</p>
                        </div>
                    </>
                )}

                {!user?.profile && (
                    <div className="profile-item">
                        <p>il n'existe pas d'informations de profil pour le moment</p>
                    </div>
                )}
            
              
            </div>
        </div>
    )
}