import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./style/nav.css";

export default function NavBar() {

   const auth = useSelector((state) => state.auth.auth);
   const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
   
  },[]);

  return (
    <nav className="navbar navbar-expand-lg ecosmart-navbar">
      <div className="container-fluid px-3 px-lg-4">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="brand-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" fill="#1D9E75"/>
              <path d="M12 6c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" fill="#085041"/>
            </svg>
          </div>
          <span className="brand-name">
            Eco<span className="brand-accent">Smart</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ecosmartNav"
          aria-controls="ecosmartNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="ecosmartNav">



          {/* Nav Links */}
          {!auth && (
             <ul className="navbar-nav nav-links-group align-items-lg-center mb-3 mb-lg-0">
            <li className="nav-item">
                <Link to="/register" className= "nav-link eco-nav-link"> register</Link>
                
            </li>
            <li className="nav-item">
              <Link to="/login" className= "nav-link eco-nav-link"> Login</Link>
            </li>
          </ul>

          )}
         

          {/* Right Actions */}
  
          <div className="nav-actions d-flex align-items-center gap-2">

            {/* Bell */}
            <button className="icon-action-btn position-relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notif-dot"></span>
            </button>

          {auth && (
              
            <div className="dropdown">
              <button
                className="profile-btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                    <div className="profile-info d-none d-sm-block">
                      <div className="profile-name">{user.firstname} - {user.lastname}</div>
                      <div className="profile-role">{user.role}</div>
                    </div>
              </button>

                          <ul className="dropdown-menu dropdown-menu-end eco-dropdown">
                            <li>
                              <Link className="eco-dropdown-item" to="/profile">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Mon Profil
                              </Link>
                            </li>
                            <li>
                              <Link className="eco-dropdown-item" to="/settings">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                                Paramètres
                              </Link>
                            </li>
                            <li><hr className="eco-divider" /></li>
                            <li>
                              <Link className="eco-dropdown-item danger" to="/logout">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                Déconnexion
                              </Link>
                            </li>
                          </ul>
                  </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}