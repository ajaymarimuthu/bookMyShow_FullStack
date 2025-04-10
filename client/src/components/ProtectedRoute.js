import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/users";
import { message, Menu, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

function ProtectedRoute ({children}){

    // all the logic for validating the token 
    // redirecting to login page
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    const navItems = [
        {
          label: "Home",
          icon: <HomeOutlined />,
        },
        {
          label: `${user? user.name : ""}`,
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <span
                  onClick={() => {
                    user.isAdmin ? navigate("/admin") : navigate("/profile")
                  }}
                >
                  My Profile
                </span>
              ),
              icon: <ProfileOutlined/>
            },
            {
              label: (
                <Link to="/login" onClick={() => {
                  localStorage.removeItem("token");
                }}>Logout</Link>
              ),
              icon: <LogoutOutlined />,
            }
          ]
        }
      ]
    

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
        <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
  
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
        
      </>
    )


}

export default ProtectedRoute;