  import NavBar  from './components/NavBar';
  import {Routes, Route} from 'react-router-dom';
  import Login from './pages/Auth/Login';
  import Register from './pages/Auth/Register';

  import Logout from './pages/Auth/Logout';


  import Professeur from './pages/Professeur';
  import Eleve from './pages/Eleve';
  import Home from './pages/Home';
  import Profile from './pages/Profile';
  import CreateProfileForm from './pages/CreateProfileForm';
  import UpdateProfileForm from './pages/UpdateProfileForm';
  import DashboardAdmin from './pages/admin/DashboardAdmin';



  function App() {

    return (
      <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/professeur" element={<Professeur />}/>
            <Route path="/eleve" element={<Eleve />}/>
            <Route path="/admin" element={<DashboardAdmin />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="profile/create" element={<CreateProfileForm />}/>
            <Route path="profile/edit" element={<UpdateProfileForm />}/>
        </Routes>
      </>
    )
  }

  export default App;
