import React from 'react';
import './Login.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Login from '../../Components/Login Form/Login';
import Register from '../../Components/Register Form/Register';

const LoginPage = (props) => {

    if(localStorage.getItem("email") !== null) {
        window.location.replace("/home"); 
    }

    return (
        <div className="containerx register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="https://cdn-icons-png.flaticon.com/512/5060/5060049.png" alt=""/>
                    <h3>Welcome</h3>
                    <p>Write Something About the App!</p>
                </div>
                <div className="col-md-9 register-right">
                    <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="login" title="Login">
                            <Login/>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Register/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>				                            
    )
}

export default LoginPage;