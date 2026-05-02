import NavBar  from './components/NavBar';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Logout from './pages/Auth/Logout';

import Eleve from './pages/Eleve';
import DashboardProf from './pages/prof/DashboardProf';
import Classe from './pages/prof/Classe';
import Cour from './pages/prof/Cour';
import PreparerCours from './pages/prof/PreparerCours';

import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateProfileForm from './pages/CreateProfileForm';
import UpdateProfileForm from './pages/UpdateProfileForm';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import MangeNiveauxMatieres from './pages/admin/ManageNiveauxMatieres';
import GestionClasses from './pages/admin/GestionClasses';
import DetailsClasse from './pages/admin/DetailsClasse';





  function App() {

    return (
      <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/logout" element={<Logout />}/>

            <Route path="/professeur" element={<DashboardProf />}/>
            <Route path="/eleve" element={<Eleve />}/>

            <Route path="/admin" element={<DashboardAdmin />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="profile/create" element={<CreateProfileForm />}/>
            <Route path="profile/edit" element={<UpdateProfileForm />}/>
            <Route path="admin/niveaux" element={<MangeNiveauxMatieres />}/>
            <Route path="admin/classes" element = {<GestionClasses />} />
            <Route path="/admin/classes/:id" element = {<DetailsClasse />}/>

            <Route path="/classe/:id" element={<Classe />} />
            <Route path="/prof/cours" element={<Cour/>}/>
            <Route path="/preparer-cours/:id" element={<PreparerCours />}/>
        </Routes>
      </>
    )
  }


  
export default App;
