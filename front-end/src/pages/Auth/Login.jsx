import{useState} from 'react';
import {login} from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login as loginAction} from '../../Redux/authSlice';
import './style/login.css';

export default function Login(){
    const [formData, setData] = useState({
        "email": "",
        "password": ""
    })
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const handleChange = (e) => {
       setData({
        ...formData,
        [e.target.name]: e.target.value
       })
    }
    const onSubmit = async (e) => {
         e.preventDefault();

         try{
            const response = await login(formData);
            const user = response.data.data
            // localStorage.setItem('token', response.data.token);
            dispatcher(loginAction({
                token: response.data.token,
                ...user
            }));

            

            if(user.role === 'professeur'){
                navigate('/professeur')
            }else if(user.role === 'eleve'){
                navigate('/eleve')
            }else{
                navigate('/admin');
            }

            }catch(error){
                if(error.response){
                console.log("STATUS:", error.response.status);
                console.log("DATA:", error.response.data);

                if(error.response.data.errors){
                    console.log(error.response.data.errors);
                } else {
                    console.log(error.response.data.message);
                }

    } else {
        console.log(error.message);
    }
            
         }

    }


    return(
        <>
        <h1 className="d-flex justify-content-center mt-5">Login</h1>
            <div className="conatiner mt-5 w-100 maring-left-auto d-flex justify-content-center">
                

                <form action="" className="form-group w-50" onSubmit={onSubmit}>

                    <label htmlFor="">Email : </label>
                    <input type="email" name="email" className="form-control mt-3" placeholder="Entre your email"
                    onChange={handleChange} />

                    <label className="form-label mt-3">Password :</label>
                    <input type="password" name="password" className="form-control mt-3" placeholder="Enter your password" 
                    onChange={handleChange}/>
                    <button className="btn btn-success  mt-3 w-50">login</button>
                </form>
            </div>
        </>
    )
}