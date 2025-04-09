import React from 'react';
import { Button, Form, Input } from 'antd';
import { LoginUser } from '../../api/users';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { message } from "antd";
import { message } from 'antd';

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);

      console.log('ressss', response);
      if(response.success){
        localStorage.setItem('token', response.token);
        window.location.href="/";
        message.success("user logged in");
      }
      else {
        console.log(response.message);
        message.error(response.message);
      }
      
      
    // //   if (response.success) {
    // //     localStorage.setItem('token', response.token);
    // //     window.location.href = '/';
    // //     console.log(response);
    //     message.success("user Logged in")
    //   } else {
    //     console.log(response.message);
    //     message.error(response.message);
    //   }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/");
    }
  }, []);


  return (
  <header className="App-header">
    <main className="main-area mw-500 text-center px-3">
      <section className="left-section">
        <h1>
          Login to BookMyShow
        </h1>
      </section>
      <section className="right-section">
        <Form
            layout='vertical'
            onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            className="d-block"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              id="email"
              type="text"
              placeholder="Enter your Email"
            ></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            className="d-block"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"

            ></Input>
          </Form.Item>
          <Form.Item className="d-block">
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </section>
    </main>
  </header>
  )
}

export default Login;


// 1) Protect the route for home page 
// 2) If user is logged in only then the route for homepage should be accessible
// 3) don't show login page again if the user is logged in 
// 4) check the token in the local storage
// 5) Add a check in login page for local storage token 
// 6) If token exists take the user to home page 
// 7) Else ask the user to login 
// 8) The route for home page should be protected
// 9) Check if they have a valid token or not and let them go to home page
// 10) Else take them to the login page 
// 11) How to check for validity of the token?
// 12) Api call to the backend to check the token for its validity 
// 13) If the backend says all well 
// 14) Let the user in or let them login 