    import { useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import {logout} from '../../Redux/authSlice';
    import { useDispatch } from "react-redux";



    export default function Logout(){

        const navigate = useNavigate();
        const dispatcher = useDispatch();
        
        useEffect(() => {
            
            dispatcher(logout())

            navigate('/');
        })

        return null;
    }