  import NavBar  from './components/NavBar';
  import {Routes, Route} from 'react-router-dom';
  import Login from './pages/Auth/Login';
  import Register from './pages/Auth/Register';

  import Logout from './pages/Auth/Logout';


  import Professeur from './pages/Professeur';
  import Eleve from './pages/Eleve';
  import Home from './pages/Home';








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
        </Routes>
      </>
    )
  }

  export default App;
