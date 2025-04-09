import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/users";
import { message } from 'antd';


function ProtectedRoute ({children}){

    // all the logic for validating the token 
    // redirecting to login page
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    const getValidUser = async () =>{
        try{
            const response = await GetCurrentUser();
            console.log(response.data);
            setUser(response.data);
             message.success(response.message);
            // navigate("/login");
        }
        catch(err){
            message.success(err.message);
            console.log(err);

        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValidUser();
        } else {
           navigate("/login");
        }
    }, []);


    return(

        <div>
            <p>ooooo</p>
            {user?.name}
            {children}
        </div>



    )


}

export default ProtectedRoute;